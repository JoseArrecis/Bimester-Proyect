import Cart from './cart.model.js'
import Product from '../product/product.model.js'
import User from '../user/user.model.js'
import mongoose from 'mongoose'

export const addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body

        if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).send({ success: false, message: 'Invalid user or product ID' })
        }

        const product = await Product.findById(productId)
        if (!product) {
            return res.status(404).send({ success: false, message: 'Product not found' })
        }

        const totalAmount = product.price * quantity
        let cart = await Cart.findOne({ user: userId })

        if (!cart) {
            cart = new Cart({ user: userId, items: [], totalAmount: 0, date: new Date() })
        }

        const existingItem = cart.items.find(item => item.product.toString() === productId)

        if (existingItem) {
            existingItem.quantity += quantity
            existingItem.totalAmount += totalAmount
        } else {
            cart.items.push({ product: productId, quantity, totalAmount })
        }

        cart.totalAmount = cart.items.reduce((sum, item) => sum + item.totalAmount, 0)
        await cart.save()

        res.status(200).send(
            { 
                success: true, 
                message: 'Product added to cart', 
                cart 
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

export const getCart = async(req, res)=>{
    try {
        const { userId } = req.params

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).send(
                { 
                    success: false, 
                    message: 'Invalid user ID' 
                }
            )
        }

        const cart = await Cart.findOne({ user: userId }).populate('items.product', 'name price')

        if (!cart) {
            return res.status(404).send(
                { 
                    success: false, 
                    message: 'Cart not found' 
                }
            )
        }

        res.status(200).send(
            { 
                success: true, 
                cart 
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

export const updateCartItem = async(req, res)=>{
    try {
        const { userId, productId, quantity } = req.body

        if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(productId)){
            return res.status(400).send(
                {
                    success: false,
                    message: 'Invalid user or product Id'
                }     
            )
        }

        const cart = await Cart.findOne({ user: userId })

        if(!cart){
            return res.status(404).send(
                {
                    success: false,
                    message: 'Cart not found'
                }
            )
        }

        const item = cart.items.find(item => item.product.toString() === productId)
        if (!item) {
            return res.status(404).send(
                { 
                    success: false, 
                    message: 'Product not found in cart' 
                }
            )
        }

        item.quantity = quantity;
        item.totalAmount = item.quantity * (await Product.findById(productId)).price

        cart.totalAmount = cart.items.reduce((sum, item) => sum + item.totalAmount, 0)
        await cart.save()

        res.status(200).send(
            { 
                success: true, 
                message: 'Cart updated', 
                cart 
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

export const deleteCartItem = async (req, res) => {
    try {
        const { cartId } = req.params

        if (!mongoose.Types.ObjectId.isValid(cartId)) {
            return res.status(400).send(
                {
                    success: false,
                    message: "Invalid cart ID"
                }
            )
        }

        const cart = await Cart.findByIdAndDelete(cartId);
        
        if (!cart) {
            return res.status(404).send(
                {
                    success: false,
                    message: 'Cart not found'
                }
            )
        }

        return res.status(200).send(
            {
                success: true,
                message: 'Cart deleted successfully',
                cart
            }
        )
    } catch (err) {
        console.error(err);
        return res.status(500).send(
            {
                success: false,
                message: "General error",
                err
            }
        )
    }
}

export const clearCart = async (req, res) => {
    try {
        const { cartId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(cartId)) {
            return res.status(400).json(
                {
                    success: false,
                    message: 'Invalid cart ID'
                }
            )
        }

        const cart = await Cart.findById(cartId);
        if (!cart) {
            return res.status(404).send(
                {
                    success: false,
                    message: 'Cart not found'
                }
            )
        }

        cart.items = [];
        cart.totalAmount = 0

        await cart.save();

        return res.status(200).send(
            {
                success: true,
                message: 'Cart cleared successfully',
                cart
            }
            
        )
    } catch (err) {
        console.error(err);
        return res.status(500).send(
            {
                success: false,
                message: "General error",
                err
            }
        )
    }
}