const express = require('express');
const morgan = require('morgan');
const moviesRouter = require('./Routes/moviesRouter')

let app = express();


const logger = function (req, res, next) {
    req.requestedAt = new Date().toISOString();
    next();
}
//Middleware - add the req body to the req obj
//for two of them we are using "()" but not for logger because () just returns function where as logger returns a middleware function.
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}
app.use(express.json());
app.use(express.static('./public'))
app.use(logger)

//can use this method separately too with api end point

// app.get('/api/v1/movies', getAllMovies)
// app.get('/api/v1/movies/:id',getAMovie)
// app.post('/api/v1/movies',createMovie)
// app.patch('/api/v1/movies/:id',updateMovie)
// app.delete('/api/v1/movies/:id',deleteMovie)

//can use this method when we have common api end point

// app.route('/api/v1/movies').get(getAllMovies).post(createMovie);
// app.route('/api/v1/movies/:id').get(getAMovie).patch(updateMovie).delete(deleteMovie)
app.use('/api/v1/movies', moviesRouter)

module.exports = app;