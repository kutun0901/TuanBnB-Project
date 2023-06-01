import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
import "./CreateBooking.css";
import { createBookingThunk, getSpotBookingsThunk } from "../../store/booking";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import { useHistory } from "react-router-dom";

function CreateBooking({ spotId }) {
    const history = useHistory()
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);
  const spotBookings = Object.values(
    useSelector((state) => state.bookings.spotBookings)
  );
  const spot = useSelector((state) => state.spots.singleSpot);
  const spotReviews = useSelector((state) => state.reviews.spotReview);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(() => {
    const nextDay = new Date();
    nextDay.setDate(nextDay.getDate() + 1);
    return nextDay;
  });
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    dispatch(getSpotBookingsThunk(spotId));
  }, [dispatch, spotId]);

  let reviewsArr = Object.values(spotReviews).reverse();
  const nightCount = Math.round((endDate - startDate) / (1000 * 60 * 60 * 24));

  const handleStartDateChange = (date) => {
    setStartDate(date);
    const nextDay = new Date(date);
    nextDay.setDate(nextDay.getDate() + 1);
    setEndDate(nextDay);
  };

  const handleEndDateChange = (date) => {
    if (startDate && date.getTime() === startDate.getTime()) {
      alert("End date can't be the same as start date");
      return;
    }

    setEndDate(date);

    if (startDate && date < startDate) {
      setStartDate(date);
    }
  };

  const handleBooking = (e) => {
    e.preventDefault();

    // if (!currentUser)
    //   return (
    //     <OpenModalButton
    //       modalComponent={<LoginFormModal />}
    //       buttonText="LogIn to reserve"
    //     />
    //   );

    if (currentUser && currentUser.id === spot.ownerId) {
      setErrors(["You cannot book your own spot."]);
      return;
    }

    const booking = {
      userId: currentUser.id,
      spotId,
      startDate,
      endDate,
    };
    const conflicts = [];

    for (let existingBooking of spotBookings) {
      const existingStart = new Date(existingBooking.startDate);
      const existingEnd = new Date(existingBooking.endDate);

      if (
        booking.startDate >= existingStart &&
        booking.startDate <= existingEnd
      ) {
        conflicts.push(existingBooking);
      } else if (
        booking.endDate >= existingStart &&
        booking.endDate <= existingEnd
      ) {
        conflicts.push(existingBooking);
      } else if (
        booking.startDate <= existingStart &&
        booking.endDate >= existingEnd
      ) {
        conflicts.push(existingBooking);
      }
    }

    if (conflicts.length > 0) {
        const conflictedDates = conflicts.map(
          (b) => `${b.startDate.slice(0, 10)} → ${b.endDate.slice(0, 10)}`
        );
        const errorMessage = (
          <div className="error-message">
            <p>
              The selected dates conflict with {conflicts.length} existing
              bookings:
            </p>
            <ul>
              {conflictedDates.map((date, index) => (
                <li key={index}>{date}</li>
              ))}
            </ul>
          </div>
        );
        setErrors([errorMessage]);
        return;
      }

    dispatch(createBookingThunk(booking, spotId)).then(() => {
      setErrors([]);
      setStartDate(new Date());
      const nextDay = new Date();
      nextDay.setDate(nextDay.getDate() + 1);
      setEndDate(nextDay);
      dispatch(getSpotBookingsThunk(spotId))
      history.push('/current/bookings')
    });
  };
  return (
    <>
      <div className="booking-details">
        <div className="booking-price">
          ${Number.parseFloat(spot.price).toFixed(2)} night
        </div>
        <div className="booking-rating">
          {reviewsArr.length === 0 ? (
            <span>
              <i className="fa-solid fa-star"></i> New
            </span>
          ) : (
            <span>
              <i className="fa-solid fa-star"></i>
              {spot.numReviews === 1
                ? ` ${parseFloat(spot.avgStarRating).toFixed(1)} • ${
                    spot.numReviews
                  } review`
                : ` ${parseFloat(spot.avgStarRating).toFixed(1)} • ${
                    spot.numReviews
                  } reviews`}
            </span>
          )}
        </div>
        <div className="date-container">
          <div>
            <label htmlFor="start-date">CHECK-IN</label>
            <DatePicker
              className="date-picker"
              id="start-date"
              selected={startDate}
              onChange={handleStartDateChange}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              minDate={new Date()}
              dateFormat="yyyy-MM-dd"
            />
          </div>

          <div>
            <label htmlFor="end-date">CHECKOUT</label>
            <DatePicker
              className="date-picker"
              id="end-date"
              selected={endDate}
              onChange={handleEndDateChange}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              dateFormat="yyyy-MM-dd"
            />
          </div>
        </div>
        {errors.length > 0 && (
          <div className="error-message">
            {errors.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}
        {currentUser ? (
          <button className="reserve-button" onClick={handleBooking}>Reserve</button>
        ) : (
          <OpenModalButton
            modalComponent={<LoginFormModal />}
            buttonText="Login to Reserve"
          />
        )}
        <div className="fee-details-container">
          <p>You won't be charged yet</p>
          <div>
            <div>
              ${spot?.price}x{nightCount ? nightCount : 1} nights
            </div>
            <div>
              ${(spot?.price * (nightCount ? nightCount : 1)).toFixed(2)}
            </div>
          </div>
          <div>
            <div>Cleaning fee</div>
            <div>$185</div>
          </div>
          <div>
            <div>Service fee</div>
            <div>
              ${(spot?.price * (nightCount ? nightCount : 1) * 0.1).toFixed(0)}
            </div>
          </div>
          <div>
            <div>Total before taxes</div>
            <div>
              $
              {(
                spot?.price * (nightCount ? nightCount : 1) +
                185 +
                Number.parseFloat(
                  spot?.price * (nightCount ? nightCount : 1) * 0.1
                )
              ).toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateBooking;
