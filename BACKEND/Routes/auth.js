const express  = require('express');
const router = express.Router()
const {signupValidator,signinValidator,validationResult} = require('../Middlewares/validator')
const {signupController} = require('../Controllers/signupController')
const {signinController} = require('../Controllers/signinController')

router.post('/signup',signupValidator,validationResult,signupController);
router.post('/signin',signinValidator,validationResult,signinController)

module.exports = router  