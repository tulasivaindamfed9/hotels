const mongoose=require('mongoose')

const menuItemSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    taste:{
        type:String,
        enum:['sweet','spicy','sour'],
        reqiured:true
    },
    is_drink:{
        type:Boolean,
        default:false
    },
    ingredients:{
        // there are so many ingredients in a dish, so use array
        type:[String] ,
        // if client doesnot send any ingredients list it show nothing
        dafault:[]
    },
    num_sales:{
        type:Number,
        default:0
    }
})

const MenuItem=mongoose.model('MenuItem',menuItemSchema)
module.exports=MenuItem