import mongoose, { model, Schema } from "mongoose"

const productSchema = Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            unique: true
        },
        description: {
            type: String,
            required: [true, 'Description is required']
        },
        price: {
            type: Number,
            min: [0, 'Price most over 0'],
            required: [true, 'Price is required']
        }, 
        stock: {
            type: Number,
            required: true
          },
          sold: {
            type: Number,
            default: 0
          },
          category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            required: [true, 'Category is required']
          },
        status: {
            type: Boolean,
            default: true
        }
    }
)

export default model('Product', productSchema)