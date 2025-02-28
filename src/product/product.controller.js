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

export const getProductById = async(req, res)=>{
    try {
        const { id } = req.params
        const product = await Product.findById(id).populate('category', 'name')
        
        if(!product){
            return res.status(404).send(
               {
                    success: false,
                    message: 'Product not found'
               } 
            )
        }

        return res.send(
            {
                success: true,
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

export const updateProduct = async(req, res)=>{
    try {
        const { id } = req.params
        const { name, description, price, stock, sold, categoryId } = req.body

        const product = await Product.findById(id)
        if(!product){
            return res.status(404).send(
                {
                    success: false,
                    message: 'Product not found'
                }
            )
        }

        const updateProduct = await Product.findByIdAndUpdate(
            id,
            { name, description, price, stock, sold, categoryId },
            { new: true, runValidators: true } 
        )

        return res.send(
            {
                success: true,
                message: 'Product updated succesfully',
                product: updateProduct
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

export const getOutProducts = async(req, res)=>{
    try {
        const products = await Product.find({ stock: { $lte: 0 } })
        res.json(products)
    }catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error when retrieving categories',
                err
            }
        )
    }
}

export const getBestProducts = async(req, res)=>{
    try {
        const products = await Product.find().sort({ sold: -1 }).limit(5)
        res.json(products)
    }catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error when retrieving categories',
                err
            }
        )
    }
}

export const deleteProduct = async(req, res)=>{
    try {
        const { id } = req.params

        const product = await Product.findById(id)
        if(!product){
            return res.status(404).send(
                {
                    success: false,
                    message: 'Product not found'
                }
            )
        }

        await product.deleteOne()
        return res.send(
            {
                success: true,
                message: 'Product deleted succesfully'
            }
        )

    }catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error when retrieving categories',
                err
            }
        )
    }
}