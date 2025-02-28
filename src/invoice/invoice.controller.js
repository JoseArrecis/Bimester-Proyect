import Invoice from '../invoice/invoice.model.js'
import User from '../user/user.controller.js'
import Product from '../product/product.controller.js'

export const addInvoice = async(req, res)=>{
    try {
        const { name, userId, productId, totalAmount, date } = req.body

        if (!name || !userId || !productId || !totalAmount || !date){
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

        const existingProduct = await Product.findOne({name})
        if(existingProduct){
            return res.status(400).send(
                {
                    success: false,
                    message: 'Product already exists'
                }
            )
        }
        
        
        const invoice = new Invoice (
            {
                name,
                user: userId,
                product: productId,
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