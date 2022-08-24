const { check, validationResult } = require('express-validator')


exports.signupValidator = [
    check('username').not().isEmpty().trim().withMessage('username cant be empty'),
    check('email').isEmail().normalizeEmail().withMessage('Email cant be empty'),
    check('password').isLength({ min: 6 }).withMessage('Password should be min of 6 characters')
];

exports.signinValidator=[
    check('email').isEmail().normalizeEmail().withMessage('Email cant be empty'),
    check('password').isLength({ min: 6 }).withMessage('Password should be min of 6 characters')
]

exports.validationResult = (req, res, next) => {
    const result = validationResult(req);
    const hasErrors = !result.isEmpty();
    if (hasErrors) {
        return res.status(404).json({
            errorMessage: result.array()[0].msg
        })   
    }
    next()
    
}