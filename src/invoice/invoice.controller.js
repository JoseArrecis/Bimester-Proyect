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

export const getInvoiceByUser = async(req, res)=>{
    try {
        const { userId } = req.params
        
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).send(
                { 
                    success: false, 
                    message: "Invalid userId" 
                }
            )
        }

        const invoices = await Invoice.find({ user: userId })

        if (!invoices.length) {
            return res.status(404).send(
                { 
                    success: false,
                    message: "No invoices found for this user" 
                }
            )
        }

        res.status(200).send(
            { 
                success: true, 
                message: 'Invoice found correctly',
                invoices 
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

export const getinvoiceDetails = async(req, res)=>{
    try {
        const { invoiceId } = req.params

        const invoice = await Invoice.findById(invoiceId).populate('items.product', 'name price description').populate('user', 'name surname username')

        if (!invoice){
            return res.status(404).send(
                {
                    success: false,
                    message: 'Invoice not found'
                }
            )
        }

        return res.status(200).send(
            {
                success: true,
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

export const updateInvoice = async(req, res)=>{
    try {
        const { invoiceId } = req.params
        const { items, totalAmount } = req.body

        const invoice = await Invoice.findById(invoiceId)

        if(!invoice){
            return res.status(404).send(
                {
                    success: false,
                    message: 'Invoice not found'
                }
            )
        }

        for (let item of items){
            const product = await Product.findById(item.product)

            if(!product){
                return res.status(404).send(
                    {
                        success: false,
                        message: `Product with id ${item.product} not found`
                    }
                )
            }

            if (product.stock < item.quantity){
                return res.status(400).send(
                    {
                        success: false,
                        message: `Not enough stock for product ${product.name}`
                    }
                )
            }
        }

        invoice.items = items
        invoice.totalAmount = totalAmount
        await invoice.save()

        return res.status(200).send(
            {
                success: true, 
                message: 'Invoice updated succesfully',
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

export const deleteInvoice = async(req, res)=>{
    try {
        const { invoiceId } = req.params

        const invoice = await Invoice.findById(invoiceId)
        if(!invoice){
            return res.status(404).send(
                {
                    success: false,
                    message: 'Invoice not found'
                }
            )
        }

        await invoice.deleteOne()
        return res.status(200).send(
            {
                success: true,
                message: 'Invoice deleted succesfully'
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