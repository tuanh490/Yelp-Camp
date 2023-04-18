const express = require('express');
const multer = require('multer');
const router = express.Router();
const { storage } = require('../cloudinary')
const upload = multer({ storage })

const catchAsync = require('../utils/CatchAsync');

const campgrounds = require('../controllers/campgrounds')

const { isLoggedIn, isAuthor, validateCampground, doesCampgroundExist } = require('../middleware');

router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.createCampground));

router.get('/new', isLoggedIn, campgrounds.renderNewForm);

router.route('/:id')
    .get(doesCampgroundExist, catchAsync(campgrounds.showCampground))
    .put(doesCampgroundExist, isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(campgrounds.updateCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground))

router.get('/:id/edit', doesCampgroundExist, isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm));

module.exports = router;