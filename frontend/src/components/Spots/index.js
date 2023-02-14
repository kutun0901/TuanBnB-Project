import { loadAllSpots } from "../../store/spots";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import './spots.css'
import { Link } from "react-router-dom"
import SpotDetails from "../SpotDetails";

function Spots() {
    const dispatch = useDispatch();
    const spots = useSelector(state => state.spots.allSpots)


    useEffect(() => {
        dispatch(loadAllSpots())
    }, [dispatch])


    const allSpotArr = Object.values(spots)
    // console.log(allSpotArr);

    return (
        <>
            <div className="spots-container">
                {allSpotArr.map(spot => {
                    return (
                        <div className="single-spot">
                            <Link to={`/spots/${spot.id}`} key={`spot.id`}>
                                <div className="img-container" >
                                    <img src={spot.previewImage}
                                        alt="preview-img" />
                                </div>
                            </Link>
                            <div className="spot-info">
                                <div>{spot.city}, {spot.state}</div>
                                <div><i class="fa-solid fa-star"></i> {spot.avgRating.toFixed(1)}</div>
                            </div>
                            <div className="spot-info">{`$${spot.price} night`}</div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default Spots;
