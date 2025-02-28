import mongoose, { model, Schema } from 'mongoose'

const categorySchema = Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            unique: true,
        },
        description: {
            type: String,
            required: [true, 'Description is required']
        },
        status: {
            type: Boolean,
            default: true
        }
    },
    { timesStamps: true }
)

export default model('Category', categorySchema)