import mongoose, { model, Schema } from "mongoose"

const invoiceSchema = Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'User is required']
        },
        
    }
)

export default model('Invoice', invoiceSchema)