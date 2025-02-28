import mongoose, { model, Schema } from "mongoose"

const invoiceSchema = Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Invoice is required']
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: [true, 'Product is required']
        },
        quantity: {
            type: Number,
            required: [true, 'Quantity is required']
        },
        totalAmount: {
            type: Number,
            required: [true, 'Total amount is required']
        },
        date: {
            type: Date,
            required: [true, 'Date is required']
        }
    }
)

export default model('Invoice', invoiceSchema)