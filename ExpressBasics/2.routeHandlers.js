const express = require('express');
const fs = require('fs');

let app = express();

//Middleware - add the req body to the req obj
app.use(express.json());
let movies = JSON.parse(fs.readFileSync('./Data/movies.json'))

//Route Handler Functions

//Get Method
const getAllMovies = (req, res) => {
    res.status(200).json({
        status: "sucess",
        count: movies.length,
        data:{movies: movies}
    })
}

//Get Method with ID(route parameter)
const getAMovie = (req,res)=>{
    const id = req.params.id * 1
    let movie = movies.find((el)=> el.id === id)
    if(!movie){
      return  res.status(404).json({
            status:"failed",
            data:"movie not found for this id"
        })
    }
    res.status(200).json({
        status:"sucess",
        data:{movie}
    })
}

//Post Method
const createMovie = (req,res)=>{
    const newId = movies[movies.length - 1].id + 1;
    const newMovie = Object.assign({id:newId},req.body);
    movies.push(newMovie);
   fs.writeFileSync('./Data/movies.json', JSON.stringify(movies),(err)=>{
    res.status(201).json({
        status:"sucess",
        data:{
            movies: newMovie
        }
    })

   })
    res.send("created")
}

//Patch Method
const updateMovie = (req,res)=>{
    let id = req.params.id * 1 // we are going to get the ID value which the user has typed in the URL and multiplying with 1 we converting string to numeric
    let movieToUpdate = movies.find(el=>el.id === id)
    if(!movieToUpdate){
        return  res.status(404).json({
              status:"failed",
              data:"movie not found for this id"
          })
      }
    const index = movies.indexOf(movieToUpdate)
    Object.assign(movieToUpdate,req.body)
    movies[index] = movieToUpdate;
    fs.writeFile('./Data/movies.json', JSON.stringify(movies),(err)=>{
        res.status(200).json({
            status:"sucess",
            data:{
                movies: movieToUpdate
            }
        })
    
       })
}

//Delete Method
const deleteMovie = (req,res)=>{
    const id = req.params.id * 1;
    const movieToDelete = movies.find(el=>el.id === id)
    if(!movieToDelete){
        return  res.status(404).json({
              status:"failed",
              data:"movie not found for this id" +id+ "to delete"
          })
      }
    const index = movies.indexOf(movieToDelete);
  
    movies.splice(index,1)
    fs.writeFile('./Data/movies.json', JSON.stringify(movies),(err)=>{
        res.status(204).json({
            status:"sucess",
            data:{
                movies: null
            }
        })
    })
}


//can use this method separately too 
// app.get('/api/v1/movies', getAllMovies)
// app.get('/api/v1/movies/:id',getAMovie)
// app.post('/api/v1/movies',createMovie)
// app.patch('/api/v1/movies/:id',updateMovie)
// app.delete('/api/v1/movies/:id',deleteMovie)

//can use this method when we have common api end point
app.route('/api/v1/movies')
.get(getAllMovies)
.post(createMovie);

app.route('/api/v1/movies/:id')
.get(getAMovie)
.patch(updateMovie).delete(deleteMovie)

const port = 8000;

app.listen(port, () => {
    console.log("started!!")
})