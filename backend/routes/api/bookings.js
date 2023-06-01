const express = require('express')
const { requireAuth } = require('../../utils/auth');
const { User, Spot, SpotImage, Review, Booking } = require('../../db/models');
const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


const validateBooking = [
    check("startDate")
      .exists({ checkFalsy: true })
      .withMessage("Please provide a valid startDate"),
    check("endDate")
      .exists({ checkFalsy: true })
      .withMessage("Please provide a valid endDate"),
    handleValidationErrors,
  ];

//Get all of the Current User's Bookings
router.get('/current', requireAuth, async (req, res, next) => {
    const { user } = req;
    const bookings = await Booking.findAll({
        where: {
            userId: user.id,
        },
        include: {
            model: Spot,
            attributes: {
                exclude: ['createAt', 'updateAt', 'description'],
            }
        }
    })

    let Bookings = [];
    for (let booking of bookings) {
        let pojoBooking = booking.toJSON();
        // console.log(pojoBooking);
        const previewImg = await SpotImage.findOne({
            where: {
                spotId: pojoBooking.Spot.id,
            }
        })

        if (previewImg) {
            pojoBooking.Spot.previewImage = previewImg.url;
        } else {
            pojoBooking.Spot.previewImage = 'not available'
        }

        Bookings.push(pojoBooking)
    }

    return res.json({ Bookings })
})


//Edit a booking
router.put('/:bookingId', requireAuth, validateBooking,async (req, res, next) => {
    const bookingId = req.params.bookingId;
    const { user } = req;
    const { startDate, endDate } = req.body;
    const currentDate = new Date().getTime(); //to deal with edit booking in the past
    const newStartDate = new Date(startDate).getTime(); //convert to a comparable values
    const newEndDate = new Date(endDate).getTime();

    const booking = await Booking.findByPk(bookingId); //find the booking that want to edit

    if (!booking) {
        res.status(404);
        return res.json({
            "message": "Booking couldn't be found",
            "statusCode": 404
        })
    }

    if (booking.endDate.getTime() <= currentDate) {
        res.status(403);
        res.json({
            "message": "Past bookings can't be modified",
            "statusCode": 403
        })
    }

    const spotBookings = await Booking.findAll({ //find all bookings from the linked spot
        where: {
            spotId: booking.spotId,
        }
    })


    if (user.id === booking.userId) {
        if (newEndDate <= currentDate || newStartDate <= currentDate) {
            res.status(403);
            return res.json({
                "message": "Can't change booking to the past",
                "statusCode": 403
            })
        }

        if (newEndDate <= newStartDate) {
            res.status(400);
            res.json({
                "message": "Validation error",
                "statusCode": 400,
                "errors": {
                    "endDate": "endDate cannot be on or before startDate"
                }
            })
        }

        for (let spotBooking of spotBookings) {
            const startDateSpot = spotBooking.startDate.getTime();
            const endDateSpot = spotBooking.endDate.getTime();

            if (newStartDate >= startDateSpot && newStartDate <= endDateSpot) {
                res.status(403);
                return res.json({
                    "message": "Sorry, this spot is already booked for the specified dates",
                    "statusCode": 403,
                    "errors": {
                        "startDate": "Start date conflicts with an existing booking"
                    }
                })
            }

            if (newEndDate >= startDateSpot && newEndDate <= endDateSpot) {
                res.status(403);
                return res.json({
                    "message": "Sorry, this spot is already booked for the specified dates",
                    "statusCode": 403,
                    "errors": {
                        "endDate": "End date conflicts with an existing booking"
                    }
                })
            }
            await booking.update(
                {
                    startDate,
                    endDate
                }
            )
            return res.json(booking);
        }
    } else if (user.id !== booking.userId) {
        res.status(400)
        return res.json({
            "message": "Forbidden",
            "statusCode": 400
        })
    }

})

// Delete a booking
router.delete('/:bookingId', requireAuth, async (req, res, next) => {
    const bookingId = req.params.bookingId;
    const booking = await Booking.findByPk(bookingId);
    const { user } = req;
    const currentDate = new Date().getTime();

    if (!booking) {
        res.status(404);
        return res.json({
            "message": "Booking couldn't be found",
            "statusCode": 404
        })
    }

    const spot = await Spot.findOne({
        where: {
            id: booking.spotId
        }
    })

    if (user.id === booking.userId || user.id === spot.ownerId) {

        if (currentDate >= booking.startDate.getTime()) {
            res.status(403);
            return res.json({
                "message": "Bookings that have already started can't be deleted",
                "statusCode": 403
            })
        }

        await booking.destroy();
        return res.json({
            "message": "Successfully deleted",
            "statusCode": 200
        })
    } else {
        res.status(403)
        return res.json({
            "message": "You do not have permission to delete this booking.",
            "statusCode": 403
        })
    }
});



module.exports = router;
