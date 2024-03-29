import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserBookingsThunk } from "../../store/booking";
import { Link } from "react-router-dom";
import "./UserBooking.css";
import OpenModalButton from "../OpenModalButton";
import CancelBookingModal from "./CancelBookingModal";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function UserBookings() {
  const currentUser = useSelector((state) => state.session.user);
  const history = useHistory()
  const dispatch = useDispatch();
  const userBookings = Object.values(
    useSelector((state) => state.bookings.userBookings)
  ).reverse();

  useEffect(() => {
    dispatch(getUserBookingsThunk());
  }, [dispatch]);

  if (!currentUser) history.push("/")

  return (
    <>
      <h1>My bookings</h1>
      <div className="my-booking-container">
        {userBookings.map((booking) => {
          return (
            <div className="single-booking" key={booking.id}>
              <Link to={`/spots/${booking.spotId}`}>
                <div>
                  <img src={booking.Spot.previewImage} alt="spot-review-img" />
                </div>
              </Link>
              <div className="booking-info">
                <h3>{booking.Spot.name}</h3>
                <p>
                  {booking.Spot.address}, {booking.Spot.city},{" "}
                  {booking.Spot.state}
                </p>
                <p>{booking.Spot.country}</p>
                <p>Check-in: {booking.startDate.slice(0, 10)}</p>
                <p>Checkout: {booking.endDate.slice(0, 10)}</p>
                <div className="booking-button-container">
                  <button>Edit</button>
                  <OpenModalButton
                    modalComponent={
                      <CancelBookingModal bookingId={booking.id} />
                    }
                    buttonText="Delete"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default UserBookings;
