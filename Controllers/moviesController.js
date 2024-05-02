const fs = require('fs')

let movies = JSON.parse(fs.readFileSync('./Data/movies.json'))

exports.checkId = (req,res,next,value)=>{
    console.log(value,"in value")
    let movie = movies.find((el) => el.id === value * 1)
    if (!movie) {
        return res.status(404).json({
            status: "failed",
            data: "movie not found for this id"
        })
    }
    next()
}

//Chaining Middleware
exports.validateBody = (req, res, next) => {
    if(!req.body.name || !req.body.release){
        return res.status(400).json({
            status: 'fail',
            message: 'Not a valid movie data'
        });
    }
    next();
}




//Route Handler Functions

//Get Method
exports.getAllMovies = (req, res) => {
    res.status(200).json({
        status: "sucess",
        requestedAt: req.requestedAt,
        count: movies.length,
        data: { movies: movies }
    })
}

//Get Method with ID(route parameter)
exports.getAMovie = (req, res) => {
    const id = req.params.id * 1
    let movie = movies.find((el) => el.id === id)
    // if (!movie) {
    //     return res.status(404).json({
    //         status: "failed",
    //         data: "movie not found for this id"
    //     })
    // }
    res.status(200).json({
        status: "sucess",
        data: { movie }
    })
}

//Post Method
exports.createMovie = (req, res) => {
    //console.log(req.body);
    const newId = movies[movies.length - 1].id + 1;
    const newMovie = Object.assign({id: newId}, req.body)
    movies.push(newMovie);
    fs.writeFile('./Data/movies.json', JSON.stringify(movies), (err) => {
        res.status(201).json({
            status: "success",
            data: {
                movie: newMovie
            }
        })
    })
    //res.send('Created');
}


//Patch Method
exports.updateMovie = (req, res) => {
    let id = req.params.id * 1 // we are going to get the ID value which the user has typed in the URL and multiplying with 1 we converting string to numeric
    let movieToUpdate = movies.find(el => el.id === id)
    // if (!movieToUpdate) {
    //     return res.status(404).json({
    //         status: "failed",
    //         data: "movie not found for this id"
    //     })
    // }
    const index = movies.indexOf(movieToUpdate)
    Object.assign(movieToUpdate, req.body)
    movies[index] = movieToUpdate;
    fs.writeFile('./Data/movies.json', JSON.stringify(movies), (err) => {
        res.status(200).json({
            status: "sucess",
            data: {
                movies: movieToUpdate
            }
        })

    })
}

//Delete Method
exports.deleteMovie = (req, res) => {
    const id = req.params.id * 1;
    const movieToDelete = movies.find(el => el.id === id)
    // if (!movieToDelete) {
    //     return res.status(404).json({
    //         status: "failed",
    //         data: "movie not found for this id" + id + "to delete"
    //     })
    // }
    const index = movies.indexOf(movieToDelete);

    movies.splice(index, 1)
    fs.writeFile('./Data/movies.json', JSON.stringify(movies), (err) => {
        res.status(204).json({
            status: "sucess",
            data: {
                movies: null
            }
        })
    })
}
