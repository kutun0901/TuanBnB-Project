import { loadAllSpots } from "../../store/spots";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import './spots.css'
import { Link } from "react-router-dom"


function Spots() {
    const dispatch = useDispatch();
    const spots = useSelector(state => state.spots.allSpots)


    useEffect(() => {
        dispatch(loadAllSpots())
    }, [dispatch])

    if (!spots || Object.keys(spots).length === 0) return null;

    const allSpotArr = Object.values(spots);

    return (
        <>
            <div className="spots-container">
                {allSpotArr.map(spot => {
                    return (
                        <div className="single-spot">
                            <Link to={`/spots/${spot.id}`} key={spot.id}>
                                <div className="img-container" >
                                    <img src={spot.previewImage}
                                        alt="preview-img" />
                                </div>
                            </Link>
                            <div className="spot-info">
                                <div>{spot.city}, {spot.state}</div>
                                <div><i className="fa-solid fa-star"></i> {typeof spot.avgRating === 'number' ? spot.avgRating.toFixed(1) : 0}</div>
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
