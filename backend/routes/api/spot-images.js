const express = require('express')
const { requireAuth } = require('../../utils/auth');
const { User, Spot, SpotImage, Review, Booking } = require('../../db/models');
const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


//delete a spot image
router.delete('/:imageId', requireAuth, async (req, res, next) => {
    const imgId = req.params.imageId;
    const { user } = req;

    const selectedImage = await SpotImage.findByPk(imgId)

    if (!selectedImage) {
        res.status(404);
        return res.json({
            "message": "Spot Image couldn't be found",
            "statusCode": 404
        })
    }

    const spot = await Spot.findByPk(selectedImage.spotId)

    if (user.id === spot.ownerId) {
        await selectedImage.destroy();
        return res.json({
            "message": "Successfully deleted",
            "statusCode": 200
          })
    } else {
        res.status(403);
        return res.json({
            "message": "authorization required",
            "statusCode": 403
        })
    }
})

module.exports = router;
