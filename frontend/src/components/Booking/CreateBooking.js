import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function CreateBooking({spotId}) {
    const dispatch = useDispatch();
    // const { spotId } = useParams();
    const spot = useSelector(state => state.spots.singleSpot)
    const spotReviews = useSelector(state => state.reviews.spotReview)
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    let reviewsArr = Object.values(spotReviews).reverse();
    const nightCount = (endDate - startDate) / (1000 * 60 * 60 * 24);


    const handleStartDateChange = (date) => {
        setStartDate(date);
        if (endDate && date > endDate) {
            setEndDate(date);
        }
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
        if (startDate && date < startDate) {
            setStartDate(date);
        }
    };
    return (
        <>
            <div className="booking-details">
                <div className="booking-price">${Number.parseFloat(spot.price).toFixed(2)} night</div>
                <div className="booking-rating">
                    {reviewsArr.length === 0 ? (
                        <span><i className="fa-solid fa-star"></i> New</span>
                    ) : (
                        <span>
                            <i className="fa-solid fa-star"></i>
                            {spot.numReviews === 1 ? (
                                ` ${parseFloat(spot.avgStarRating).toFixed(1)} • ${spot.numReviews} review`
                            ) : (
                                ` ${parseFloat(spot.avgStarRating).toFixed(1)} • ${spot.numReviews} reviews`
                            )}
                        </span>
                    )}
                </div>
                <div>
                    <label htmlFor="start-date">Start date:</label>
                    <DatePicker
                        id="start-date"
                        selected={startDate}
                        onChange={handleStartDateChange}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        dateFormat="MM/dd/yyyy"
                    />

                    <label htmlFor="end-date">End date:</label>
                    <DatePicker
                        id="end-date"
                        selected={endDate}
                        onChange={handleEndDateChange}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate}
                        dateFormat="MM/dd/yyyy"
                    />
                </div>
                <button>Reserve</button>
                <div className="fee-details-container">
                    <p>You won't be charged yet</p>
                    <div>
                        <div>${spot?.price}x{nightCount ? nightCount : 1} nights</div>
                        <div>${(spot?.price * (nightCount ? nightCount : 1)).toFixed(2)}</div>
                    </div>
                    <div>
                        <div>Cleaning fee</div>
                        <div>$185</div>
                    </div>
                    <div>
                        <div>Service fee</div>
                        <div>${((spot?.price * (nightCount ? nightCount : 1))*0.1).toFixed(0)}</div>
                    </div>
                    <div>
                        <div>Total before taxes</div>
                        <div>${(spot?.price * (nightCount ? nightCount : 1) + 185 + Number.parseFloat(((spot?.price * (nightCount ? nightCount : 1))*0.1).toFixed(0)))}</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateBooking;
