const express = require('express')
const router = express.Router()
const authenticator = require('../Middlewares/authenticator')
const categoryController = require('../Controllers/categoryController')

router.post('/',(req,res)=>{
    console.log('inside category routes ')
    console.log(req.body)
    console.log(req.cookies)
})


module.exports = router;