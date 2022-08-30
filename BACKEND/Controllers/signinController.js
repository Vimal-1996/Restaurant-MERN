const users = require('../Models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { jwtExpire, jwtSecret } = require('../config/keys')

exports.signinController = async (req, res, next) => {
    const { email, password } = req.body
    
    await users.findOne({ email }, (err, databaseResponse) => {
        if (err) {
            res.status(404).json({
                errorMessage: 'error in finding database'
            })
        }
        if (!databaseResponse) {
            res.status(401).json({
                errorMessage: "User doesnot exists"
            })
        }
        if (databaseResponse) {
            // console.log(databaseResponse)
            bcrypt.compare(password, databaseResponse.password, (err, passwordmatched) => {
                if (err) {
                    res.status(404).json({
                        errorMessage: 'wrong password entered'
                    })
                }
                if (!passwordmatched) {
                    res.status(404).json({
                        errorMessage: 'wrong password entered'
                    })
                }
                if (passwordmatched) {
                    let payload = {
                        user: {
                            _id: databaseResponse._id
                        }
                    }
                    jwt.sign(payload,jwtSecret,{ expiresIn: '1h' },(err,token)=>{
                        if (err) {
                            res.status(404).json({
                                errorMessage: 'wrong password entered'
                            })
                        }
                        if(token){
                            const {_id,username,email,role} = databaseResponse
                            res.status(201).json({
                                token:token,
                                user:{_id,username,email,role}
                            })
                        }
                    })
                }
            })

        }
    }).clone().catch(function (err) { console.log(err) })
}