// importin mongoose
const mongoose=require('mongoose')
// import bcrypt
const bcrypt=require('bcrypt')
const { has } = require('lodash')

// now defining the person schema(the structure of person details eg:age, name, profession, salary etc)
const personSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
    },
    work:{
        type:String,
        enum:['chef','waiter','manager'],
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    address:{
        type:String,
        
    },
    salary:{
        type:Number,
        required:true
    },
    // we store username and password to authenticate
    userName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

// defing 'pre' middleware fun for bcrypt(password hash)
personSchema.pre('save',async function(next){
    const person=this //for every person entering

    // Hash the password only if the user is new or user modifying password
    if(!person.isModified('password')) return next()
  try{
//    hash password generation using salt
 const salt=await bcrypt.genSalt(10) //generate salt pass of length 10

//  hash password
const hashPassword=await bcrypt.hash(person.password, salt) 

// new password with hash included is saved to password provided by user
 person.password=hashPassword
 next()

  }catch(error){
return next(error)
  }
})

// comparing the user provided password with stored password using compare fun. fun name is comparePassword
personSchema.methods.comparePassword= async function(candidatePassword){
    try{
    //   use bcrypt to compare the provided password with hashed password
    // existing password ---> kfjsdf3223rvsjfs -----> extract salt
    // extract salt + new hased password === existing password
    const isMatch= await bcrypt.compare(candidatePassword, this.password)
    return isMatch;
    }catch(error){
        throw error
    }
}

// our schema is ready, now to want to define model to crud operations
const person=mongoose.model('person',personSchema)
module.exports=person