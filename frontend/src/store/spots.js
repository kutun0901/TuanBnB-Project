import { csrfFetch } from "./csrf";

const LOAD_SPOTS = 'spots/LOAD'


//actions
export const loadSpots = (spots) => ({
    type: LOAD_SPOTS,
    spots
})

///thunks
export const loadAllSpots = () => async (dispatch) => {
    const res = await csrfFetch(`/api/spots`);

    if (res.ok) {
        const spots = await res.json();
        dispatch(loadSpots(spots))
    }
}

const initialState = {}

//reducer
const spotReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_SPOTS:
            return {
                ...state,
                spots: action.spots.Spots
            };
        default:
            return state
    }
}

export default spotReducer;
