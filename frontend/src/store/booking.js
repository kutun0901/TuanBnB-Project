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
    const response = await csrfFetch()
}
