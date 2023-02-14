import { loadSingleSpot } from "../../store/spots";
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react";
import { useParams } from "react-router-dom"
import placeHolderImg from '../../image/image-coming-soon-placeholder.png'


function SpotDetails() {
    const dispatch = useDispatch();
    const { spotId } = useParams();

    const spot = useSelector(state => state.spots.singleSpot)

    useEffect(() => {
        dispatch(loadSingleSpot(spotId))
    }, [dispatch])

    if (!spot) return null;

    return (
        <>
            <h1>{spot.name}</h1>
            <span>{spot.city}, {spot.state}, {spot.country}</span>
            <div className="img-container">
                {(spot.SpotImages ? spot.SpotImages.slice(0, 5) : placeHolderImg).map((image) => (
                    <img key={image.id} alt="preview-image" src={image.url} />
                ))}
            </div>
            <div>
                <div>
                    <h3>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h3>
                    <p>{spot.description}</p>
                    <p>Details</p>
                </div>
                <div>
                    <div>
                        <div>${spot.price} night</div>
                        <div><span><i class="fa-solid fa-star"></i>{spot.avgStarRating.toFixed(1)}</span><span> {spot.numReviews ? spot.numReviews : 0} reviews</span></div>
                    </div>
                    <button>Reserve</button>
                </div>
            </div>
            <div>

            </div>
            <div>
                review component
            </div>
        </>
    )
}
export default SpotDetails;
