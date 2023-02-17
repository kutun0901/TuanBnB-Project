import { csrfFetch } from "./csrf";


const LOAD_SPOT_REVIEW = "reviews/LOAD_SPOT_REVIEW";


const loadSpotReviews = (reviews) => {
    return {
        type: LOAD_SPOT_REVIEW,
        reviews
    }
}


export const loadSpotReviewsThunk = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);

    if (response.ok) {
        const data = await response.json();
        dispatch(loadSpotReviews(data.Reviews));
        // console.log("aaaa", data.Reviews);
    }
}

const initialState = {spotReview: {}}
const reviewsReducer = (state = initialState, action) => {
    let newState = {...state};
    switch (action.type) {
        case LOAD_SPOT_REVIEW:
            const resObj = {}
            action.reviews.forEach(review => {
                resObj[review.id] = review;
            })
            return {...newState, spotReview: resObj}
        default:
            return state;
    }
}

export default reviewsReducer;
