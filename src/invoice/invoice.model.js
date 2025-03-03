import mongoose, { model, Schema } from "mongoose"

const invoiceSchema = Schema(
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
                    required: [true, 'Product is required']
                },
                productName: {
                    type: String,
                    required: [true, 'Name product is required']
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
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        }
    },
    { timeStapms: true }
)

export default model('Invoice', invoiceSchema)