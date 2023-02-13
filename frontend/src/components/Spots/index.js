import { loadAllSpots } from "../../store/spots";
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import SpotCard from "./SpotCard";

function Spots() {
    const dispatch = useDispatch();
    const spots = useSelector(state => state.spots)


    useEffect(() => {
    dispatch(loadAllSpots())
    }, [dispatch])


    const allSpotArr = Object.values(spots)

    return (
        <div>
            {allSpotArr.map(spot => <div><SpotCard spot={spot} key={spot.id} /></div> )}
        </div>
    )
}

export default Spots;
