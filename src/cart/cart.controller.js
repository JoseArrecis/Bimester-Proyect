

export const addProductToCart = async(req, res)=>{
    try {
        const { userId, productId, quantity } = req.body

        if(!userId || !productId || !quantity){
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