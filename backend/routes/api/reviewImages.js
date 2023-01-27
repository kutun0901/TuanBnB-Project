const express = require('express')
const { requireAuth } = require('../../utils/auth');
const { User, Spot, SpotImage, Review, Booking } = require('../../db/models');
const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');




module.exports = router;
