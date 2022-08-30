const express = require('express')
const router = express.Router()
const authenticatorJWT = require('../Middlewares/authenticator')
const productController = require('../Controllers/productController')
const uploads =  require('../Middlewares/multer')
router.post('/',authenticatorJWT.authenticateJWT,uploads.single('productImage'),productController.createProduct)



module.exports = router