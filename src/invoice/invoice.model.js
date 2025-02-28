import mongoose, { Schema } from "mongoose";

const invoiceSchema = Schema(
    {
        name: {
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
        totalAmout: {
            type: Number,
            required: [true, 'Total amount is required']
        },
        date: {
            type: Date,
            required: [true, 'Date is required']
        }
    }
)