import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUserSpotThunk, removeSpotThunk } from '../../store/spots'
import { Link, useHistory } from "react-router-dom";
import DeleteSpotModal from "../DeleteSpotModal";
import OpenModalButton from "../OpenModalButton";

function UserSpot() {
    const dispatch = useDispatch();
    // const history = useHistory();
    const spots = useSelector(state => state.spots.userSpots)

    useEffect(() => {
        dispatch(loadUserSpotThunk())
    }, [dispatch])

    // const handleDelete = async (e, spotId) => {
    //     e.preventDefault()
    //     dispatch(removeSpotThunk(parseInt(spotId)))
    //     history.push(`/spots/current`)
    // }

    if (!spots || Object.keys(spots).length === 0) return null;

    const allSpotArr = Object.values(spots);
    // console.log(allSpotArr)

    return (
        <>
            <div>
                <h1>Manage Spots</h1>
                <Link to='/spots/new'>
                    <button className='create-spot-button'>Create a New Spot</button>
                </Link>
            </div>
            <div className="spots-container">
                {allSpotArr.map(spot => {
                    return (
                        <div key={spot.id} className="single-spot">
                            <Link to={`/spots/${spot.id}`} >
                                <div className="img-container" >
                                    <img src={spot.previewImage}
                                        alt="preview-img" />
                                </div>
                                <div className="spot-info">
                                    <div>{spot.city}, {spot.state}</div>
                                    <div><i className="fa-solid fa-star"></i>{spot.avgRating !== null && !isNaN(parseFloat(spot.avgRating))
                                        ? (parseFloat(spot.avgRating).toFixed(1)) : "New"}</div>
                                </div>
                                <div className="Update-container">
                                    <div className="spot-info">{`$${spot.price} night`}</div>
                                    <div>
                                        <Link to={`/spots/${spot.id}/edit`}>
                                            <button className='update-button'>
                                                Update
                                            </button>
                                        </Link>
                                        <OpenModalButton modalComponent={<DeleteSpotModal spot={spot} />} buttonText="Delete" />
                                    </div>
                                </div>
                            </Link>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default UserSpot;
