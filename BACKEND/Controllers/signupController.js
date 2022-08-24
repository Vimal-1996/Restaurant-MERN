const users = require('../Models/user')
const bcrypt = require('bcrypt')

exports.signupController = async (req, res, next) => {
    console.log(req.body)
    await users.findOne({ email: req.body.email }, (err, results) => {
        if (err) {
            console.log("error in finding user", err)
            res.status(404).json({
                errorMessage: err
            })
        } else {
            if (results) {
                console.log("inside else block")
                res.status(401).json({
                    errorMessage:"User already exists"
                })
            } else {
                // console.log("no results to show")
                bcrypt.genSalt(10,(err,salt)=>{
                    bcrypt.hash(req.body.password,salt,(err,hashedPassword)=>{
                        const newUser = new users({
                            username:req.body.username,
                            email:req.body.email,
                            password:hashedPassword
                        })
                        newUser.save((err,newUserCreated)=>{
                            console.log("new user created")
                            res.status(201).json({
                                successMessage:"User Successfully created"
                            })
                        })
                    })
                })
            }
        }
    })

}