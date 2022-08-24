exports.createCategoryController=(req,res,next)=>{
    console.log(req.user)
    res.status(201).json({
        successMessage:"data created"
    })
}