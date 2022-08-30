const { response } = require('express');
const Product = require('../Models/product')

exports.createProduct = async(req,res)=>{
    
    const {filename} = req.file;
    const {productName,productDesc,productPrice,productCategory,productQty} = req.body
    let newProduct = new Product()
    newProduct.fileName = filename;
    newProduct.productName = productName
    newProduct.productDesc = productDesc
    newProduct.productPrice = productPrice
    newProduct.productCategory = productCategory
    newProduct.productQty = productQty

    try{
        const response = await newProduct.save()
        res.status(201).json({
            successMessage:`${response.productName} created`,
            response
        })
    }catch(err){
        res.status(401).json({
            errorMessage:`Failed to create product`,
            err
        })
    }
} 