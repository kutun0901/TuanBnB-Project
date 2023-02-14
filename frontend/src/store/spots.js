import { csrfFetch } from "./csrf";

const LOAD_SPOTS = 'spots/LOAD_SPOTS'
const LOAD_SINGLE_SPOT = 'spots/LOAD_SINGLE_SPOT'

//actions
export const loadSpots = (spots) => ({
    type: LOAD_SPOTS,
    spots
})

export const loadSpot = (spot) => ({
    type: LOAD_SINGLE_SPOT,
    spot
})

///thunks
export const loadAllSpots = () => async (dispatch) => {
    const res = await csrfFetch(`/api/spots`);

    if (res.ok) {
        const spots = await res.json();
        dispatch(loadSpots(spots))
    }
}

export const loadSingleSpot = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`)

    if (res.ok) {
        const spot = await res.json();
        console.log(spot);
        dispatch(loadSpot(spot))
    }

}

const initialState = {allSpots: {}, singleSpot: {}}

//reducer
const spotReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_SPOTS:
            const allSpots = {}
            action.spots.Spots.map(spot=>{
                allSpots[spot.id] = spot
            })
            return {...state, allSpots: allSpots}
        case LOAD_SINGLE_SPOT:
            return {...state, singleSpot: {...action.spot}}
        default:
            return state
    }
}

export default spotReducer;
