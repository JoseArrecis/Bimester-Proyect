import Invoice from '../invoice/invoice.model.js'
import User from '../user/user.model.js'
import Product from '../product/product.model.js'

export const addInvoice = async(req, res)=>{
    try {
        const { userId, productId, quantity, totalAmount, date } = req.body

        if (!userId || !productId || !quantity || !totalAmount || !date){
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
        
        const invoice = new Invoice (
            {
                user: userId,
                product: productId,
                quantity,
                totalAmount,
                date
            }
        )
        await invoice.save()

        return res.status(201).send(
            {
                success: true,
                message: 'Invoice create succesfully'
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

