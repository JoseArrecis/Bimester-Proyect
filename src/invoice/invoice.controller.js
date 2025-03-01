import mongoose from "mongoose"
import Invoice from './invoice.model.js'
import User from '../user/user.model.js'
import Product from '../product/product.model.js'

export const addInvoice = async(req, res)=>{
    try {
        const { userId, items } = req.body

        if (!mongoose.Types.ObjectId.isValid(userId)){
            return res.status(400).send(
                {
                    success: false,
                    message: 'Invalid user ID'
                }
            )
        }

        const user = await User.findById(userId)
        if(!user){
            return res.status(404).send(
                {
                    success: false,
                    message: 'User not found'
                }
            )
        }

        let totalAmount = 0
        const invoiceItems = []

        for (let i = 0; i < items.length; i++) {
            const { productId, quantity } = items[i];

            if (!mongoose.Types.ObjectId.isValid(productId)) {
                return res.status(400).send({ success: false, message: 'Invalid product ID' })
            }

            const product = await Product.findById(productId)
            if (!product) {
                return res.status(404).send({ success: false, message: `Product with ID ${productId} not found` })
            }

            if (product.stock < quantity) {
                return res.status(400).send({ success: false, message: `Not enough stock for product ${productId}` })
            }

            const itemTotalAmount = product.price * quantity
            totalAmount += itemTotalAmount

            invoiceItems.push({ product: productId, quantity, totalAmount: itemTotalAmount })

            product.stock -= quantity
            await product.save()
        }

        const invoice = new Invoice(
            {
                user: userId,
                items: invoiceItems,
                totalAmount,
                date: new Date()
            }
        )

        await invoice.save()

        res.status(201).send(
            {
                success: true,
                message: 'Invoice create succesfully',
                invoice
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