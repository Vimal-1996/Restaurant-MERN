const express = require('express')
const router = express.Router()

const categoryController = require('../Controllers/categoryController')
const authenticatorJWT = require('../Middlewares/authenticator')

router.post('/',authenticatorJWT.authenticateJWT,categoryController.createCategory)
router.get('/',authenticatorJWT.authenticateJWT,categoryController.getCategories)

module.exports = router;