const express = require('express')
const { requireAuth } = require('../../utils/auth');
const { User, Spot, SpotImage, Review, Booking } = require('../../db/models');
const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateSpot = [
  check('address')
    .notEmpty()
    .withMessage('Street address is required'),
  check('city')
    .notEmpty()
    .withMessage('City is required'),
  check('state')
    .notEmpty()
    .withMessage('State is required.'),
  check('country')
    .notEmpty()
    .withMessage('Country is required'),
  check('lat')
    .notEmpty()
    .isNumeric()
    .withMessage('Latitude is not valid'),
  check('lng')
    .notEmpty()
    .isNumeric()
    .withMessage('Longitude is not valid'),
  check('name')
    .notEmpty()
    .isLength({ max: 50 })
    .withMessage('Name must be less than 50 characters'),
  check('description')
    .notEmpty()
    .withMessage('Description is required'),
  check('price')
    .notEmpty()
    .isNumeric()
    .withMessage('Price per day is required'),
  handleValidationErrors
];

// const validateBooking = [
//   check('startDate')
//     .notEmpty()
//     .isDate()
//     .withMessage('Please provide valid startDate'),
//   check('endDate')
//     .notEmpty()
//     .isAfter()
//     .withMessage('endDate cannot be on or before startDate'),
//   handleValidationErrors
// ]

//Get all Spots
router.get('/', async (req, res, next) => {
  const spots = await Spot.findAll({
    attributes: [
      'id',
      'ownerId',
      "address",
      "city",
      "state",
      "country",
      "lat",
      "lng",
      "name",
      "description",
      "price",
      "createdAt",
      "updatedAt",
    ]
  })

  let payLoad = [];
  for (let spot of spots) {
    let pojoSpot = spot.toJSON();
    const sumOfRating = await Review.sum('stars', {
      where: {
        spotId: spot.id,
      }
    })

    const numberOfRating = await Review.count({
      where: {
        spotId: spot.id,
      }
    })

    const avgRatings = sumOfRating / numberOfRating;
    if (avgRatings) {
      pojoSpot.avgRating = avgRatings;
    } else {
      pojoSpot.avgRating = "not available"
    }

    const previewImg = await SpotImage.findOne({
      where: {
        spotId: spot.id,
      }
    })

    if (previewImg) {
      pojoSpot.previewImage = previewImg.url;
    } else {
      pojoSpot.previewImage = 'not available'
    }

    payLoad.push(pojoSpot)
  }

  res.json({ Spots: payLoad })
});


//Get all Spots owned by the Current User
router.get('/current', requireAuth, async (req, res, next) => {
  const { user } = req;

  const spots = await Spot.findAll({
    where: {
      ownerId: user.id,
    },
    attributes: [
      'id',
      'ownerId',
      "address",
      "city",
      "state",
      "country",
      "lat",
      "lng",
      "name",
      "description",
      "price",
      "createdAt",
      "updatedAt",
    ]
  })
  let payLoad = [];
  for (let spot of spots) {
    let pojoSpot = spot.toJSON();
    const sumOfRating = await Review.sum('stars', {
      where: {
        spotId: spot.id,
      }
    })

    const numberOfRating = await Review.count({
      where: {
        spotId: spot.id,
      }
    })

    const avgRatings = sumOfRating / numberOfRating;
    if (avgRatings) {
      pojoSpot.avgRating = avgRatings;
    } else {
      pojoSpot.avgRating = "not available"
    }

    const previewImg = await SpotImage.findOne({
      where: {
        spotId: spot.id,
      }
    })

    if (previewImg) {
      pojoSpot.previewImage = previewImg.url;
    } else {
      pojoSpot.previewImage = 'not available'
    }

    payLoad.push(pojoSpot)
  }


  res.json({ Spots: payLoad })
})

//Get details of a Spot from an id
router.get('/:spotId', async (req, res, next) => {
  const spotId = req.params.spotId;

  const spot = await Spot.findByPk(spotId, {

    attributes: [
      'id',
      'ownerId',
      "address",
      "city",
      "state",
      "country",
      "lat",
      "lng",
      "name",
      "description",
      "price",
      "createdAt",
      "updatedAt",
    ]
  })

  let pojoSpot = spot.toJSON();
  const sumOfRating = await Review.sum('stars', {
    where: {
      spotId: spot.id,
    }
  })

  const numberOfRating = await Review.count({
    where: {
      spotId: spot.id,
    }
  })

  const avgRatings = sumOfRating / numberOfRating;
  if (avgRatings) {
    pojoSpot.avgStarRating = avgRatings;
  } else {
    pojoSpot.avgStarRating = "not available"
  }

  pojoSpot.spotImages = await SpotImage.findAll({
    where: {
      spotId: spot.id,
    },
    attributes: [
      'id',
      'url',
      'preview',
    ]
  })

  pojoSpot.Owner = await User.findByPk(spot.ownerId, {
    attributes: [
      'id',
      'firstName',
      'lastName',
    ]
  })

  if (!spot) {
    res.status(404);
    return res.json(
      {
        "message": "Spot couldn't be found",
        "statusCode": 404
      }
    )
  }

  res.json(pojoSpot)
})

//Create a Spot
router.post('/', requireAuth, validateSpot, async (req, res, next) => {
  const { address, city, state, country, lat, lng, name, description, price } = req.body;
  const { user } = req;

  const newSpot = await Spot.create({
    ownerId: user.id,
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price
  })

  return res.json(newSpot);
})

//Add an Image to a Spot based on the Spot's id
router.post('/:spotId/images', requireAuth, async (req, res, next) => {
  const { user } = req;
  const spotId = req.params.spotId;

  const { url, preview } = req.body;

  const spot = await Spot.findByPk(spotId);

  if (spot) {
    if (user.id === spot.ownerId) {
      const img = await SpotImage.create({
        spotId,
        url,
        preview,
      })
      return res.json({
        id: img.id,
        url,
        preview,
      })
    } else {
      res.status(403)
      res.json({
        "message": "spot must belong to user"
      })
    }
  }
  else {
    res.status(404);
    return res.json(
      {
        "message": "Spot couldn't be found",
        "statusCode": 404
      }
    )
  }
})

//Edit a Spot
router.put('/:spotId', requireAuth, validateSpot, async (req, res, next) => {
  const { address, city, state, country, lat, lng, name, description, price } = req.body;
  const { user } = req;
  const spotId = req.params.spotId;

  const spot = await Spot.findByPk(spotId);
  if (spot) {
    if (user.id === spot.ownerId) {
      await spot.update({
        ownerId: user.id,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
      })
      return res.json(spot)
    }
  }
  else {
    res.status(404);
    return res.json(
      {
        "message": "Spot couldn't be found",
        "statusCode": 404
      }
    )
  }
})

//delete a spot
router.delete('/:spotId', requireAuth, async (req, res, next) => {
  const { user } = req;
  const spotId = req.params.spotId;

  const spot = await Spot.findByPk(spotId);

  if (spot) {
    if (user.id = spot.ownerId) {
      await Spot.destroy();
      return res.json({
        "message": "Successfully deleted",
        "statusCode": 200
      })
    }
  } else {
    res.status(404);
    return res.json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  }
})

// Get all Bookings for a Spot based on the Spot's id
router.get('/:spotId/bookings', requireAuth, async (req, res, next) => {
  const spotId = req.params.spotId;
  const { user } = req;

  const spot = await Spot.findByPk(spotId)

  if (spot) {
    if (user.id === spot.ownerId) {
      const bookings = await Booking.findAll({
        where: {
          spotId: spotId,
        },
        include: {
          model: User,
          attributes: ['id', 'firstName', 'lastName']
        }
      })
      return res.json({ Bookings: bookings });
    } else if (user.id !== spot.ownerId) {
      const bookings = await Booking.findAll({
        where: {
          spotId: spotId
        },
        attributes: ['spotId', 'startDate', 'endDate'],
      })
      return res.json({ Bookings: bookings })
    }
  } else {
    res.status(404);
    return res.json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  }
})

//Create a Booking from a Spot based on the Spot's id
router.post('/:spotId/bookings', requireAuth, async (req, res, next) => {
  const spotId = req.params.spotId;
  const { user } = req;
  const { startDate, endDate } = req.body;

  const newStartDate = new Date(startDate).getTime();
  const newEndDate = new Date(endDate).getTime();

  const spot = await Spot.findByPk(spotId);
  const bookings = await Booking.findAll({
    where: {
      spotId: spotId,
    }
  })


  if (spot) {
    if (user.id === spot.ownerId) {
      for (let booking of bookings) {
        const startDateBooking = booking.startDate.getTime();
        const endDateBooking = booking.endDate.getTime();

        if (newStartDate >= startDateBooking && newStartDate <= endDateBooking) {
          res.status(403);
          return res.json({
            "message": "Sorry, this spot is already booked for the specified dates",
            "statusCode": 403,
            "errors": {
              "startDate": "Start date conflicts with an existing booking"
            }
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

        if (newEndDate >= startDateBooking && newEndDate <= endDateBooking) {
          res.status(403);
          return res.json({
            "message": "Sorry, this spot is already booked for the specified dates",
            "statusCode": 403,
            "errors": {
              "endDate": "End date conflicts with an existing booking"
            }
          })
        }
      }
      const newBooking = await Booking.create({
        spotId: spotId,
        userId: user.id,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      })
      return res.json(newBooking)
    } else if (user.id !== spot.ownerId) {
      res.status(400)
      return res.json({
        "message": "Authorization required",
        "statusCode": 400
      })
    }
  } else {
    res.status(404);
    return res.json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  }
})

module.exports = router;
