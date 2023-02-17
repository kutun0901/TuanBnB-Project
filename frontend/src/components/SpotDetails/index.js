import { loadSingleSpotThunk } from "../../store/spots";
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react";
import { useParams } from "react-router-dom"
import "./spotDetails.css"
import { loadSpotReviewsThunk } from "../../store/reviews";

function SpotDetails() {
    const dispatch = useDispatch();
    const { spotId } = useParams();

    const currentUser = useSelector(state => state.session.user)
    // console.log(currentUser);
    const spot = useSelector(state => state.spots.singleSpot)
    // console.log(spot)
    const spotReviews = useSelector(state => state.reviews.spotReview)
    // console.log("aaaa", spotReviews);

    let hasReviewed = false;


    let reviewsArr = Object.values(spotReviews)
    // console.log(reviewsArr);

    if (currentUser && reviewsArr) {
        reviewsArr.map(review => {
            if (currentUser.id === reviewsArr.userId) {
                hasReviewed = true;
            }
        })
    }

    useEffect(() => {
        dispatch(loadSingleSpotThunk(spotId))
        dispatch(loadSpotReviewsThunk(spotId))
    }, [dispatch, spotId])



    // if (Object.keys(spot).length === 0) return null;
    // if (!reviewsArr) return null;

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
                    spotImages[i] = ('https://electricmirror.com/wp-content/uploads/2022/05/image-coming-soon-300x300.jpg');
                }
            }
        }
    }
    return (
        <div>
            <h1>{spot.name}</h1>
            <div><span>{spot.city}, {spot.state}, {spot.country}</span></div>
            <div className="spotImg-container">
                <img className='spotImage1' src={spotImages[0]}></img>
                <img className='spotImage2' src={spotImages[1]}></img>
                <img className='spotImage3' src={spotImages[2]}></img>
                <img className='spotImage4' src={spotImages[3]}></img>
                <img className='spotImage5' src={spotImages[4]}></img>
            </div>
            <div>
                <div>
                    <h3>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h3>
                    <p>{spot.description}</p>
                </div>
                <div>
                    <div>
                        <div>${spot.price} night</div>
                        <div>
                            <span><i class="fa-solid fa-star"></i>{!spot.numReviews ? "New" : `${parseFloat(spot.avgStarRating).toFixed(1)} • `}
                                {!spot.numReviews ? " " : `${spot.numReviews} reviews`}
                            </span>

                        </div>
                    </div>
                    <button>Reserve</button>
                </div>
            </div>
            <div className="reviews-container">
                <div className="spot-details">
                    <span><i class="fa-solid fa-star"></i>{!spot.numReviews ? "New" : `${parseFloat(spot.avgStarRating).toFixed(1)} • `}
                        {!spot.numReviews ? " " : `${spot.numReviews} reviews`}
                    </span>
                </div>
                <div className="reviews-container">
                    <div>
                        {(hasReviewed === false && currentUser.id !== spot.ownerId) ? (
                            <button className="post-review-button">
                                Post your review
                            </button>
                        ) : null}
                    </div>
                    <div className="reviews-display">
                        {reviewsArr.map((review) => (
                            <div>
                                <div>
                                    <div className="review-owner">{review.User.firstName}</div>
                                    <div className="review-date">{review.createdAt}</div>
                                </div>
                                <div className="review">{review.review}</div>
                            </div>
                        ))}
                    </div>
                    <div>
                        {currentUser.id !== spot.ownerId && reviewsArr.length === 0 ? (
                            <p>Be the first to post a review!</p>
                        ) : null}
                    </div>

                </div>
            </div>

        </div>
    )
}

export default SpotDetails;
