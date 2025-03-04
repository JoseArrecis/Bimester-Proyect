import mongoose, { model, Schema } from "mongoose"

const cartSchema = Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'User is required']
        },
        items: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                    requierd: [true, 'Product is required']
                },
                quantity: {
                    type: Number,
                    required: [true, 'Quantity is required']
                },
                totalAmount: {
                    type: Number,
                    required: [true, 'Total amount is required']
                }
            }
        ],
        totalAmount: {
            type: Number,
            required: [true, 'Total amount is required']
        }
    }
)
    
export default model('Cart', cartSchema)