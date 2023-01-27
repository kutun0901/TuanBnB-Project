const express = require('express')
const { requireAuth } = require('../../utils/auth');
const { User, Spot, SpotImage, Review, Booking, ReviewImage } = require('../../db/models');
const router = express.Router();


const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


const validateReview = [
    check('review')
      .notEmpty({checkFalsy: true})
      .withMessage('Review text is required'),
    check('stars')
      .notEmpty({checkFalsy: true})
      .isFloat({min: 1, max: 5})
      .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
  ]

//Get all Reviews by a Spot's id
router.get('/current', requireAuth, async (req, res, next) => {
    const { user } = req;
    const reviews = await Review.findAll({
        where: {
            userId: user.id,
        },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: Spot,
                attributes: {
                    exclude: ['description', 'createdAt', 'updatedAt'],
                }
            },
            {
                model: ReviewImage,
                attributes: ['id', 'url']
            }
        ]
    })

    let currentReviews = [];
    for (let review of reviews) {
        let pojoReview = review.toJSON();

        const previewImg = await SpotImage.findOne({
            where: {
                spotId: pojoReview.spotId,
            }
        })

        if (previewImg) {
            pojoReview.Spot.previewImage = previewImg.url;
        } else {
            pojoReview.Spot.previewImage = 'not available'
        }

        currentReviews.push(pojoReview)
    }

    return res.json({ Reviews: currentReviews })
})


//Add an Image to a Review based on the Review's id
router.post('/:reviewId/images', requireAuth, async (req, res, next) => {
    const reviewId = req.params.reviewId;
    const { url } = req.body;
    const { user } = req;

    const review = await Review.findByPk(reviewId);

    if (!review) {
        res.status(404);
        return res.json({
            "message": "Review couldn't be found",
            "statusCode": 404
        })
    }

    const reviewImages = await ReviewImage.findAll({
        where: {
            reviewId: reviewId
        }
    })

    if (reviewImages.length >= 10) {
        res.status(403);
        return res.json({
            "message": "Maximum number of images for this resource was reached",
            "statusCode": 403
        })
    }

    if (reviewImages.length < 10 && user.id === review.userId) {
        const newReviewImg = await ReviewImage.create({
            reviewId: reviewId,
            url,
        })

        return res.json({
            id: newReviewImg.id,
            url: newReviewImg.url
            });
    } else if (reviewImages.length < 10 && user.id !== review.userId){
        res.status(403);
        return res.json({
            "message": "Forbidden",
            "statusCode": 403
        })
    }
})

//Edit a Review
router.put('/:reviewId', requireAuth, validateReview, async(req, res, next) => {
    const {user} = req;
    const reviewId = req.params.reviewId;
    const {review, stars} = req.body;

    const editingReview = await Review.findByPk(reviewId)

    if (!editingReview){
        res.status(404);
        return res.json({
            "message": "Review couldn't be found",
            "statusCode": 404
          })
    }

    if (user.id === editingReview.userId) {
        await editingReview.update({
            review,
            stars,
        })

        return res.json(editingReview);
    } else {
        res.status(403);
        return res.json({
            "message": "Forbidden",
            "statusCode": 403
        })
    }
})

//delete a review
router.delete('/:reviewId', requireAuth, async(req, res, next) => {
    const {user} = req;
    const reviewId = req.params.reviewId;

    const targetReview = await Review.findByPk(reviewId);

    if (!targetReview) {
        res.status(404);
        return res.json({
            "message": "Review couldn't be found",
            "statusCode": 404
          })
    }

    if (user.id === targetReview.userId) {
        await targetReview.destroy();
        return res.json({
            "message": "Successfully deleted",
            "statusCode": 200
          })
    } else {
        res.status(403);
        return res.json({
            "message": "Forbidden",
            "statusCode": 403
        })
    }
})

module.exports = router;
