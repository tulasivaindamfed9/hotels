// importing passport and local strategy middle ware
const passport=require('passport')
const localStrategy=require('passport-local').Strategy  //localStrategy also called username and password strategy
const person=require('./models/person')


// passport is also a middle ware fun
// passport and local strategy
passport.use(new localStrategy(async(username,password,done)=>{
  // authentication logic here
  try{
    //  console.log("Received user name and password from front end", username,password)
     const USER= await person.findOne({userName:username})
    //  if username not found from the person model return a msg
    if(!USER){
      return done(null,false,{message:'Incorrect Username '})
    }

    const isPasswordMatch=await USER.comparePassword(password); 
     //this comparePassword fun is from person.js file where password is converted to hack+salt password and compared FE password with BE stored password
    if(isPasswordMatch){
      return done(null,USER)
    }else{
      return done(null,false,{message:"Incorrect password"})
    }
  }catch(error){
     return done(error)
  }
}))

module.exports=passport