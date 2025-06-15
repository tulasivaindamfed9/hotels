// importing express and storing it in app
const express = require("express");
const app = express();

// importing mongodb server
const db = require("./db");
// you can see the output or the database which is connected in mongodb compass in your pc




// importing body-parser after installing it
const bodyParser = require("body-parser");
app.use(bodyParser.json()); //req.body

// creating default serrver page with /
app.get("/", function (req, res) {
  res.send("Hello World! Creating y first server with express framework");
});
// creating /dashboard
app.get("/dashboard", function (req, res) {
  res.send("Welcome to Dashboard");
});




// import routers files
const personRouter=require('./routes/personRouter')
const menuRouter=require('./routes/menuRouter')

// use the routes
app.use('/person',personRouter)
app.use('/menu',menuRouter)

require('dotenv').config()
const PORT=process.env.PORT ||3000
// our server is active at port 3000 ie at adress http://localhost:3000
app.listen(PORT,()=>{
  console.log('Listening to port')
});
