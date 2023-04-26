import { csrfFetch } from "./csrf";


const GET_SPOT_BOOKINGS = 'bookings/GET_SPOT_BOOKINGS'
const GET_USER_BOOKINGS = 'bookings/GET_USER_BOOKINGS'
const CREATE_BOOKING = 'bookings/CREATE_BOOKING'
const DELETE_BOOKING = 'bookings/DELETE_BOOKING'
const UPDATE_BOOKING = 'bookings/UPDATE_BOOKING'

const getSpotBookings = (bookings) => {
    return {
        type: GET_SPOT_BOOKINGS,
        bookings
    }
}

const getUserBookings = (bookings) => {
    return {
        type: GET_USER_BOOKINGS,
        bookings
    }
}

const createBooking = (booking) => {
    return {
        type: CREATE_BOOKING,
        booking
    }
}

const deleteBooking = (id) => {
    return {
        type: DELETE_BOOKING,
        id
    }
}

const updateBooking = (booking) => {
    return {
        type: UPDATE_BOOKING,
        booking
    }
}

export const getSpotBookingsThunk = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/bookings`);

    if (response.ok) {
        const data = await response.json();
        dispatch(getSpotBookings(data.Bookings));
        return data;
    }
}

export const getUserBookingsThunk = () => async (dispatch) => {
    const response = await csrfFetch(`/api/bookings/current`)

    if (response.ok) {
        const data = await response.json();
        dispatch(getUserBookings(data.Bookings))
        return data;
    }
}

export const createBookingThunk = (booking, spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/bookings`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(booking)
    })

    if (response.ok) {
        const data = await response.json();
        dispatch(createBooking(data));
        return data;
    }
}

export const updateBookingThunk = (booking, id) => async (dispatch) => {
    const response = await csrfFetch(`/api/bookings/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(booking)
    })

    if (response.ok) {
        const data = await response.json();
        dispatch(updateBooking(data))
        return data;
    }
}

export const deleteBookingThunk = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/bookings/${id}`, {
        method: "DELETE"
    })

    if (response.ok) {
        dispatch(deleteBooking(reviewId));
    }
}


const initialState = { spotBookings: {}, userBookings: {} };

const bookingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SPOT_BOOKINGS:
            const spotBookings = {};
            action.bookings.forEach((booking) => {
                spotBookings[booking.id] = booking;
            });
            return { ...state, spotBookings };
        case GET_USER_BOOKINGS:
            const userBookings = {};
            action.bookings.forEach((booking) => {
                userBookings[booking.id] = booking;
            });
            return { ...state, userBookings };
        case CREATE_BOOKING:
            return {
                ...state,
                spotBookings: {
                    ...state.spotBookings,
                    [action.booking.id]: action.booking,
                },
                userBookings: {
                    ...state.userBookings,
                    [action.booking.id]: action.booking,
                },
            };
        case DELETE_BOOKING:
            const newSpotBookings = { ...state.spotBookings };
            const newUserBookings = { ...state.userBookings };
            delete newSpotBookings[action.id];
            delete newUserBookings[action.id];
            return { ...state, spotBookings: newSpotBookings, userBookings: newUserBookings };
        case UPDATE_BOOKING:
            return {
                ...state,
                spotBookings: {
                    ...state.spotBookings,
                    [action.booking.id]: action.booking,
                },
                userBookings: {
                    ...state.userBookings,
                    [action.booking.id]: action.booking,
                },
            };
        default:
            return state;
    }
};

export default bookingsReducer;
