
const dotenv = require('dotenv')
dotenv.config({ path: './config.env' }) // the variable are read from config.env and it should happen only once and after that those env avaiable to the process.env and then the process is same for all the files
console.log(process.env)
const app = require('./app');


const port = process.env.port || 8000;

app.listen(port, () => {
    console.log("started!!")
})