const express = require('express')
const { requireAuth } = require('../../utils/auth');
const { User, Spot, SpotImage, Review, } = require('../../db/models');
const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

router.get('/', async(req, res, next) => {
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

    const avgRatings = sumOfRating/numberOfRating;
    pojoSpot.avgRating = avgRatings;

    const previewImg = await SpotImage.findOne({
      where: {
        spotId: spot.id,
      }
    })

    pojoSpot.previewImage = previewImg.url;

    payLoad.push(pojoSpot)
  }

  res.json({Spots: payLoad})
});

router.get('/current', requireAuth, async (req, res, next) => {
  const id = req.user.id
  console.log(req);
  const spots = await Spot.findAll({
    where: {
      ownerId: id,
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

    const avgRatings = sumOfRating/numberOfRating;
    pojoSpot.avgRating = avgRatings;

    const previewImg = await SpotImage.findOne({
      where: {
        spotId: spot.id,
      }
    })

    pojoSpot.previewImage = previewImg.url;

    payLoad.push(pojoSpot)
  }

  res.json({Spots: payLoad})
})

router.get('/:spotId', async (req, res, next) => {
  const id = req.params.spotId;

  const spot = await Spot.findByPk(id, {

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
  if (!spot) {
    res.status(404);
    return res.json(
      {
        "message": "Spot couldn't be found",
        "statusCode": 404
      }
    )
  }

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

    pojoSpot.avgStarRating = sumOfRating/numberOfRating;


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


    pojoSpot.Owner = await User.findByPk(id, {
      attributes: [
        'id',
        'firstName',
        'lastName',
      ]
    })

  res.json(pojoSpot)
})



module.exports = router;
