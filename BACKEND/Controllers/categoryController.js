const Category = require('../Models/category')

exports.createCategory = async (req, res, next) => {
    const { category } = req.body
    const categoryExists = await Category.findOne({category})
    if(categoryExists){
        return res.status(401).json({
            errorMessage:`${category} already exists`
        })
    }
    try {
        let newCategory = new Category()
        newCategory.category = category
        newCategory = await newCategory.save()
        res.status(200).json({
            successMessage: `${newCategory.category} was created`
        })
        next()
    } catch (err) {
        console.log('model creatioon error', err)
    }
}

exports.getCategories = async(req,res,next)=>{
    try{
        const response = await Category.find({})
        res.status(200).json({
            categories:response
        })
    }catch(err){
        console.log('category read all error',err)
        res.status(500).json({
            errorMessage:'please try again later'

        })
    }
}