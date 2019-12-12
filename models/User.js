const moongoose = require('mongoose')
const Schema = moongoose.Schema


const UserSchema = new Schema ({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
    }, 
date:{
    type:Date,
    default:Date.now
},
    
})

//this creates and also exports the model for the given schema
module.exports = User = moongoose.model('users',UserSchema)