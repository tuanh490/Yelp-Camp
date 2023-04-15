const express = require('express');
const router = express.Router();

const catchAsync = require('../utils/CatchAsync');

const campgrounds = require('../controllers/campgrounds')

const { isLoggedIn, isAuthor, validateCampground, doesCampgroundExist } = require('../middleware');

router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, validateCampground, catchAsync(campgrounds.createCampground));

router.get('/new', isLoggedIn, campgrounds.renderNewForm);

router.route('/:id')
    .get(doesCampgroundExist, catchAsync(campgrounds.showCampground))
    .put(doesCampgroundExist, isLoggedIn, isAuthor, validateCampground, catchAsync(campgrounds.updateCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground))

router.get('/:id/edit', doesCampgroundExist, isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm));

module.exports = router;