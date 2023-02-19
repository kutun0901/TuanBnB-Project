import { loadAllSpots } from "../../store/spots";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import './spots.css'
import { Link } from "react-router-dom"


function Spots() {
    const dispatch = useDispatch();
    const spots = useSelector(state => state.spots.allSpots)
    // const [isLoaded, setIsLoaded] = useState(false);

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
                        <div className="single-spot" key={spot.id}>
                            <Link to={`/spots/${spot.id}`}>
                                <div className="img-container" >
                                    <img src={spot.previewImage}
                                        alt="preview-img" />
                                </div>
                                <div className="spot-info">
                                    <div>{spot.city}, {spot.state}</div>
                                    <div><i className="fa-solid fa-star"></i>{spot.avgRating !== null && !isNaN(parseFloat(spot.avgRating))
                                        ? (parseFloat(spot.avgRating).toFixed(1)) : "New"}
                                    </div>
                                </div>
                                <div className="spot-info">{`$${Number.parseFloat(spot.price).toFixed(2)} night`}</div>
                            </Link>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default Spots;
