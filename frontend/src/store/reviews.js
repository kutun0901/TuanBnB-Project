import { csrfFetch } from "./csrf";


const LOAD_SPOT_REVIEW = "reviews/LOAD_SPOT_REVIEW";
const LOAD_USER_REVIEWS = 'reviews/LOAD_USER_REVIEWS'
const DELETE_REVIEW = "reviews/DELETE_REVIEW"
const ADD_REVIEW = "reviews/ADD_REVIEW"
const UPDATE_REVIEW = 'reviews/UPDATE_REVIEW'


const loadSpotReviews = (reviews) => {
    return {
        type: LOAD_SPOT_REVIEW,
        reviews
    }
}

const loadUserReviews = (reviews) => {
    return {
        type: LOAD_USER_REVIEWS,
        reviews
    }
}


const deleteReview = (id) => {
    return {
        type: DELETE_REVIEW,
        id
    }
}

const addReview = (review) => {
    return {
        type: ADD_REVIEW,
        review
    }
}

const updateReview = (review) => {
    return {
        type: UPDATE_REVIEW,
        review
    }
}

export const loadSpotReviewsThunk = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);

    if (response.ok) {
        const data = await response.json();
        dispatch(loadSpotReviews(data.Reviews));
        // console.log("aaaa", data.Reviews);
        return data;
    }
}

export const loadUserReviewsThunk = () => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/current`);

    if (response.ok) {
        const data = await response.json();
        dispatch(loadUserReviews(data.Reviews))
        return data;
    }
}

export const updateReviewThunk = (review) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${review.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(review)
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(updateReview(data))
        return data;
    }
}


export const deleteReviewThunk = (reviewId) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: "DELETE",
    });

    if (response.ok) {
        dispatch(deleteReview(reviewId));
    }
};

export const addReviewThunk = (review, spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(review),
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(addReview(data));
        return data;
    }
}

const initialState = { spotReview: {}, userReviews: {} }
const reviewsReducer = (state = initialState, action) => {
    let newState = {}
    switch (action.type) {
        case LOAD_SPOT_REVIEW:
            const resObj = {}
            action.reviews.forEach(review => {
                resObj[review.id] = review;
            })
            return { ...state, spotReview: resObj }

        case LOAD_USER_REVIEWS:
            const res = {};
            action.reviews.forEach(review => {
                res[review.id] = review;
            })
            return { ...state, userReviews: res }

        case UPDATE_REVIEW:
            newState = { ...state };
            newState.spotReview[action.review.id] = action.review;
            newState.userReviews[action.review.id] = action.review;
            return { ...newState };

        case DELETE_REVIEW:
            newState = { ...state }
            delete newState.spotReview[action.id]
            return { ...state, ...newState.spotReview }

        case ADD_REVIEW:
            newState = { ...state };
            newState.spotReview[action.review.id] = action.review;
            return newState;

        default:
            return state;
    }
}

export default reviewsReducer;
