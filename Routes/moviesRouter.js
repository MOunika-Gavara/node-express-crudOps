const express = require('express');
const moviesController = require('./../Controllers/moviesController')

//to create separate route for each file we can use express.Router
const router = express.Router();// returns middleware

router.param('id', moviesController.checkId)

router.route('/')
    .get(moviesController.getAllMovies)
    .post(moviesController.validateBody,moviesController.createMovie);

router.route('/:id')
    .get(moviesController.getAMovie)
    .patch(moviesController.updateMovie)
    .delete(moviesController.deleteMovie)

module.exports = router;