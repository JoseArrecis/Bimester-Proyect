import Cart from './cart.model.js'
import Product from '../product/product.model.js'
import User from '../user/user.model.js'
import mongoose from 'mongoose'

export const addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ success: false, message: 'Invalid user or product ID' });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        const totalAmount = product.price * quantity;
        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            cart = new Cart({ user: userId, items: [], totalAmount: 0, date: new Date() });
        }

        const existingItem = cart.items.find(item => item.product.toString() === productId);

        if (existingItem) {
            existingItem.quantity += quantity;
            existingItem.totalAmount += totalAmount;
        } else {
            cart.items.push({ product: productId, quantity, totalAmount });
        }

        cart.totalAmount = cart.items.reduce((sum, item) => sum + item.totalAmount, 0);
        await cart.save();

        res.status(200).json({ success: true, message: 'Product added to cart', cart });

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
