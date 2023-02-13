import { csrfFetch } from "./csrf";

const LOAD_SPOTS = 'spots/LOAD_SPOTS'
const LOAD_SINGLE_SPOT = 'spots/LOAD_SINGLE_SPOT'

//actions
export const loadSpots = (spots) => ({
    type: LOAD_SPOTS,
    spots
})

export const loadSpot = (spot) => {
    type: LOAD_SINGLE_SPOT,
    spot
}

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
}

const initialState = {allSpots: {}}

//reducer
const spotReducer = (state = initialState, action) => {
    let newState = {...state}
    switch (action.type) {
        case LOAD_SPOTS:
            action.spots.Spots.map(spot=>{
                newState.allSpots[spot.id] = spot
            })
            newState = {...state, allSpots: {...newState.allSpots}}
            return newState
        default:
            return state
    }
}

export default spotReducer;
