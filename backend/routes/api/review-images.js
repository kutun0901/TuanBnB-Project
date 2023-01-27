const express = require('express')
const { requireAuth } = require('../../utils/auth');
const { User, Spot, SpotImage, Review, Booking, ReviewImage } = require('../../db/models');
const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

//delete a review image

router.delete('/:imageId', requireAuth, async(req, res, next) => {
    const {user} = req;
    const imgId = req.params.imageId;

    const selectedImg = await ReviewImage.findByPk(imgId)

    if (!selectedImg) {
        res.status(404);
        return res.json({
            "message": "Review Image couldn't be found",
            "statusCode": 404
        })
    }

    const review = await Review.findByPk(selectedImg.reviewId)

    if (user.id === review.userId) {
        await selectedImg.destroy();
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
