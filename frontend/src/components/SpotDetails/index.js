import { loadSingleSpotThunk } from "../../store/spots";
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react";
import { useParams } from "react-router-dom"
import "./spotDetails.css"
import { loadSpotReviewsThunk } from "../../store/reviews";
// import SpotReview from "../SpotReview";
import OpenModalButton from "../OpenModalButton";
import DeleteReviewModal from "../DeleteReviewModal";
import PostReviewModal from "../PostReviewModal";
import CreateBooking from "../Booking/CreateBooking";
import Map from "./Map";

function SpotDetails() {
    const dispatch = useDispatch();
    const { spotId } = useParams();

    const spot = useSelector(state => state.spots.singleSpot)
    const spotReviews = useSelector(state => state.reviews.spotReview)
    const currentUser = useSelector(state => state.session.user)
    let isLoggedIn = false;

    if (currentUser) isLoggedIn = true;


    let reviewsArr = Object.values(spotReviews).reverse();

    useEffect(() => {
        if (spotId) {
            dispatch(loadSpotReviewsThunk(spotId))
        }
        dispatch(loadSingleSpotThunk(spotId))
    }, [dispatch, spotId])


    if (Object.keys(spot).length === 0) return null;
    if (!reviewsArr) return null;
    // if (!spot) return null;

    let spotImages = [];
    if (spot.SpotImages) {

        spot.SpotImages.forEach((image) => {
            if (image.url) {
                spotImages.push(image.url)
            }
        })

        if (spotImages.length < 5) {

            for (let i = 0; i < 5; i++) {
                if (!spotImages[i]) {
                    spotImages[i] = ('https://papapita.com/file/2020/02/Image-Coming-Soon-Placeholder.jpg');
                }
            }
        }
    }

    // const reserveHandler = () => {
    //     window.alert("Feature coming soon")
    // }

    return (
        <div className="main-wrapper">
            <div className="spot-details-container">
                <h1>{spot.name}</h1>
                <div className="spot-locations"><span>{spot.city}, {spot.state}, {spot.country}</span></div>
                <div className="spotImg-container">
                    <div className="left-img">
                        <img className='spotImage1' src={spotImages[0]} alt="spot-description"></img>
                    </div>

                    <div className="four-img">
                            <img className='spotImage2' src={spotImages[1]} alt="spot-description"></img>
                            <img className='spotImage3' src={spotImages[2]} alt="spot-description"></img>
                            <img className='spotImage4' src={spotImages[3]} alt="spot-description"></img>
                            <img className='spotImage5' src={spotImages[4]} alt="spot-description"></img>
                    </div>
                </div>
                <div className="description-price-container">
                    <div className="title-description">
                        <h3>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h3>
                        <p>{spot.description}</p>
                    </div>
                    <CreateBooking spotId={spotId} />
                </div>
                <div className="main-reviews-container">
                    <div className="spot-details">
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
                    <div className="reviews-container">
                        <div className="post-button">
                            {isLoggedIn && currentUser.id !== spot.ownerId && !reviewsArr.find(review => review.userId === currentUser.id) && (
                                <OpenModalButton className="post-review-button" modalComponent={<PostReviewModal spotId={spot.id} />} buttonText="Post Your Review" />
                            )}
                        </div>
                        <div className="reviews-display">
                            {reviewsArr.map((review) => (
                                <div className="review-details" key={review.id}>
                                    <div>
                                        <div className="review-owner">{review.User.firstName}</div>
                                        <div className="review-date">{review.createdAt.slice(0, 10)}</div>
                                    </div>
                                    <div className="review">{review.review}</div>
                                    <div>
                                        {(isLoggedIn && currentUser.id === review.userId) && (
                                            <OpenModalButton className="delete-review-button" modalComponent={<DeleteReviewModal reviewId={review.id} spotId={spotId} />} buttonText="Delete" />
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div>
                            {isLoggedIn && currentUser.id !== spot.ownerId && reviewsArr.length === 0 && (
                                <p>Be the first to post a review!</p>
                            )}
                        </div>
                    </div>
                    <div>
                    <Map spot={spot} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SpotDetails;
