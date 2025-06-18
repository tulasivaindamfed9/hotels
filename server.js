// importing express and storing it in app
const express = require("express");
const app = express();

// importing mongodb server
const db = require("./db");
// you can see the output or the database which is connected in mongodb compass in your pc


// importing passport from auth.js file
const passport=require('./auth')

// importing body-parser after installing it
const bodyParser = require("body-parser");
app.use(bodyParser.json()); //req.body

const PORT=process.env.PORT ||3000

// MIDDLE WARE function
const logRequest=(req,res,next)=>{
  console.log(`[ ${new Date().toLocaleString()} ] Request made to url: ${req.originalUrl}`)
  next(); //move on to the next phase(fun)
}

app.use(logRequest)




// now our logic for authentication is ready. now we initialize passport to use in routes
app.use(passport.initialize())
const localAuthMiddleware=passport.authenticate("local", {session:false}) //now use this auth in whichever route you need like /,/person,/menu


// creating default serrver page with /
app.get("/",localAuthMiddleware,function (req, res) {
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
app.use('/person' ,personRouter)
app.use('/menu',menuRouter)

require('dotenv').config()

// our server is active at port 3000 ie at adress http://localhost:3000
app.listen(PORT,()=>{
  console.log('Listening to port')
});
