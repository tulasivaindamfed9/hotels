// importin mongoose
const mongoose=require('mongoose')

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
    }
})

// our schema is ready, now to want to define model to crud operations
const person=mongoose.model('person',personSchema)
module.exports=person