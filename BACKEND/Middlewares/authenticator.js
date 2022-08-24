exports.authenticateJWT = (req,res,next)=>{
    console.log("inside authenticator")
    const token = req.cookies
    console.log(token)
    next()
}