const mongoose  = require('mongoose')

const userScheme = new mongoose.Schema({
    username:{
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
    role:{
        type:Number,
        default:0
    }
},{timestamps:true})

const User = mongoose.model('User',userScheme)
module.exports = User