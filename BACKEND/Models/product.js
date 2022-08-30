const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const productSchema = new mongoose.Schema({
    fileName: {
        type: 'String',
        required: true
    },
    productName: {
        type: 'String',
        required: true,
        trim: true,
        maxlength: 60
    },
    productDesc: {
        type: 'String',
        required: true
    },
    productPrice: {
        type: Number,
        required: true
    },
    productCategory: {
        type: ObjectId,
        ref: 'Category'
    }, 
    productQty:{
        type:Number,
        required:true
    }
}, { timestamps: true })

const Product = mongoose.model('product', productSchema)
module.exports = Product