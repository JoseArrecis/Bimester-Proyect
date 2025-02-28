import Cart from './cart.model.js'
import Product from '../product/product.model.js'
import User from '../user/user.model.js'

export const addProductToCart = async(req, res)=>{
    try {
        const { userId, productId, quantity } = req.body

        if(!userId || !productId || !quantity){
            return res.status(400).send(
                {
                    success: false,
                    message: 'All fields are required'
                }
            )
        }
        
        const userExists = await User.findById(userId)
        if(!userExists){
            return res.status(404).send(
                {
                    success: false,
                    message: 'User not found'
                }
            )
        }
        
        const existingProduct = await Product.findById(productId)
        if(!existingProduct){
            return res.status(400).send(
                {
                    success: false,
                    message: 'Product not found'
                }
            )
        }

        const cart = new Cart(
            {
                user: userId,
                product: productId,
                quantity
            }
        )

        await cart.save()

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