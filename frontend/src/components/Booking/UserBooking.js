import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserBookingsThunk } from "../../store/booking";
import { Link } from "react-router-dom";

function UserBookings() {
    const dispatch = useDispatch();
    const userBookings = Object.values(useSelector(state => state.bookings.userBookings))

    useEffect(() => {
        dispatch(getUserBookingsThunk())
    }, [dispatch])

    return (
        <>
            <h1>My bookings</h1>
            <div className="my-booking-container">
                {userBookings.map(booking => {
                    return (
                        <div className="single-booking" key={booking.id}>
                            <Link to={`/spots/${booking.spotId}`}>
                                <div>
                                    <img src={booking.Spot.previewImage} alt="spot-review-img" />
                                </div>
                            </Link>
                            <div className="booking-info">
                                <h3>{booking.Spot.name}</h3>
                                <p>{booking.Spot.address}, {booking.Spot.city}, {booking.Spot.state}</p>
                                <p>{booking.Spot.country}</p>
                                <p>Start Date: {booking.startDate.slice(0, 10)}</p>
                                <p>End Date: {booking.endDate.slice(0, 10)}</p>
                                <div>
                                    <span><button>Edit</button></span>
                                    <span><button>Delete</button></span>
                                </div>
                            </div>
                        </div>
                    )
                })}

            </div>
        </>
    )
}

export default UserBookings;
