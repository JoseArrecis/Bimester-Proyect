import Product from "./product.model.js"
import Category from '../category/category.model.js'

export const addProduct = async(req, res)=>{
    try{
        const { name, description, price, stock, sold, categoryId } = req.body

        const existingProduct = await Product.findOne({name})
        if(existingProduct){
            return res.status(400).send(
                {
                    success: false,
                    message: 'Product already exists'
                }
            )
        }

        if(!name || !description || !price || !stock || !sold || !categoryId){
            return res.status(400).send(
                {
                    success: false,
                    message: 'All fields are required'
                }
            )
        }

        const existingCategory = await Category.findOne({ name });
                if (existingCategory) {
                    return res.status(400).send({
                        success: false,
                        message: 'Category already exists',
                    })
        }

        const product = new Product(
            {
                name,
                description,
                price,
                stock,
                sold,
                category: categoryId
            }
        )

        await product.save()

        return res.status(201).send(
            {
                success: true,
                message: 'Product created successfully' 
            }
        )

    }catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: "General error",
                err
            }
        )
    }
}

export const getAllProducts = async(req, res)=>{
    try {
        const product = await Product.find().populate('category', 'name')
        return res.send(
            {
                success: true,
                total: product.length,
                product
            }
        )
    }catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error when retrieving categories',
                err,
            }
        )
    }
}