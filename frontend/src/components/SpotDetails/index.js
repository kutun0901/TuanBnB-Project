import { loadSingleSpotThunk } from "../../store/spots";
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react";
import { useParams } from "react-router-dom"
import "./spotDetails.css"

function SpotDetails() {
    const dispatch = useDispatch();
    const { spotId } = useParams();

    const spot = useSelector(state => state.spots.singleSpot)
    console.log(spot)

    useEffect(() => {
        dispatch(loadSingleSpotThunk(spotId))
    }, [dispatch, spotId])

    if (Object.keys(spot).length === 0) return null;

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
                            <div><span><i class="fa-solid fa-star"></i>{typeof spot.avgStarRating === "number" ? spot.avgStarRating.toFixed(1) : 0}</span><span> {spot.numReviews ? spot.numReviews : 0} reviews</span></div>
                        </div>
                        <button>Reserve</button>
                    </div>
                </div>
                <div>

                </div>
                <div>
                    review component
                </div>
            </div>
        )
    }

export default SpotDetails;
