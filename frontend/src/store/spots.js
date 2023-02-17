import { csrfFetch } from "./csrf";

const LOAD_SPOTS = 'spots/LOAD_SPOTS'
const LOAD_SINGLE_SPOT = 'spots/LOAD_SINGLE_SPOT'
const LOAD_USER_SPOT = 'spots/LOAD_USER_SPOT'
const CREATE_SPOT = '/spots/CREATE_SPOT';
const ADD_IMG_SPOT = '/spots/ADD_IMG_SPOT'
const REMOVE_SPOT = 'spots/REMOVE_SPOT'
const UPDATE_SPOT = 'spots/UPDATE_SPOT'

//actions
export const loadSpots = (spots) => {
    return {
        type: LOAD_SPOTS,
        spots
    }
}

export const loadSpot = (spot) => {
   return {
       type: LOAD_SINGLE_SPOT,
       spot
   }
}

export const loadUserSpot = (userSpots) => {
    return {
        type: LOAD_USER_SPOT,
        userSpots
    }
}

export const createSpot = (spot) => {
    return {
        type: CREATE_SPOT,
        spot
    }
}

export const addImgSpot = (img) => {
    return {
        type: ADD_IMG_SPOT,
        img
    }
}

export const removeSpot = (id) => {
    return {
        type: REMOVE_SPOT,
        id
    }
}

export const updateSpot = (spot) => {
    return {
        type: UPDATE_SPOT,
        spot
    }
}


///thunks
export const loadAllSpots = () => async (dispatch) => {
    const res = await csrfFetch(`/api/spots`);

    if (res.ok) {
        const spots = await res.json();
        dispatch(loadSpots(spots))
    }
}

export const loadSingleSpotThunk = (spotId) => async (dispatch) => {

    const res = await csrfFetch(`/api/spots/${spotId}`)

    if (res.ok) {
        const spot = await res.json();
        dispatch(loadSpot(spot))
        // console.log(spot);
    }
}

export const loadUserSpotThunk = () => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/current`)

    if (res.ok) {
        const userSpots = await res.json();
        dispatch(loadUserSpot(userSpots))
    }
}

export const removeSpotThunk = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`, {
        method: "DELETE"
    })
    if (res.ok) {
        // const spot = await res.json();
        dispatch(removeSpot(spotId))
    }
}

export const createSpotThunk = (payload, imgData) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });

    if (res.ok) {
        const spot = await res.json();
        dispatch(createSpot(spot))

        for (let image of imgData) {
            const response = await csrfFetch(`/api/spots/${spot.id}/images`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(image)
            })

            if (response.ok) {
                const data = await response.json();
                dispatch(addImgSpot(data))
            }
        }
    }
}

export const updateSpotThunk = (id, payload) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${id}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    })
    if (res.ok) {
        const data = await res.json()
        // console.log(data);
        dispatch(updateSpot(data))
    }
}

// export const addImgSpotThunk = (payload, spotId) => async (dispatch) => {
//     const res = await csrfFetch(`/api/spots/${spotId}/images`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload)
//     })
//     if (res.ok) {
//         const data = await res.json();
//         dispatch(addImgSpot(data))
//     }
// }

const initialState = { allSpots: {}, singleSpot: {}, userSpots: {} }

//reducer
const spotReducer = (state = initialState, action) => {
    let newState = { ...state }
    switch (action.type) {
        case LOAD_SPOTS:
            const resObj = {}
            action.spots.Spots.forEach(spot => {
                resObj[spot.id] = spot
            })
            return { ...state, allSpots: resObj, singleSpot: {...state.singleSpot} }

        case LOAD_SINGLE_SPOT:
            return { ...state, singleSpot: action.spot }

        case LOAD_USER_SPOT:
            const userSpotsObj = {};
            action.userSpots.Spots.forEach(spot => {
                userSpotsObj[spot.id] = spot;
            });
            return { ...state, userSpots: userSpotsObj, singleSpot: {...state.singleSpot} };

        case CREATE_SPOT:
            newState = { ...state.allSpots }
            newState.allSpots[action.spot.id] = action.spot;
            return newState;

        case REMOVE_SPOT:
            delete newState.allSpots[action.id];
            delete newState.userSpots[action.id];
            return {...newState, allSpots: {...newState.allSpots}, userSpots: {...newState.userSpots}}

            // newState = { ...state }
            // delete newState.allSpots[action.id];
            // delete newState.userSpots[action.id];
            // return { ...newState.allSpots, ...newState.userSpots, ...newState.singleSpot }

        case UPDATE_SPOT:


            newState.allSpots[action.spot.id] = action.spot;
            newState.userSpots[action.spot.id] = action.spot;
            return {...newState, allSpots: {...newState.allSpots}, userSpots: {...newState.userSpots}, singleSpot: {...state.singleSpot}}

            // const updateState = {...state}
            // updateState.allSpots[action.spot.id] = action.spot;
            // updateState.userSpots[action.spot.id] = action.spot;
            // return updateState;

        default:
            return state
    }
}

export default spotReducer;
