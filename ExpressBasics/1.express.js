const express = require('express');
let app = express();


app.get('/',(req,res)=>{
    res.status(200).send('In Homepage')
})
const port = 5000;

app.listen(port,()=>{
    console.log("started!!")
})