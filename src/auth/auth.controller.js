import User from '../user/user.model.js'
import Invoice from '../invoice/invoice.model.js'
import { checkPassword, encrypt } from '../../utils/encrypt.js'
import { generateJwt } from '../../utils/jwt.js'

export const register = async (req, res) => {
    try {
        let data = req.body
        let user = new User(data)
        user.password = await encrypt(user.password)
        user.role = data.role || "CLIENT"

        await user.save()
        return res.send({ message: `Registered successfully, you can log in with username: ${user.username}` })
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            { 
                message: 'General error registering user',
                err 
            }
        )
    }
}

export const login = async(req, res)=>{
    try{
        let { userLoggin, password} = req.body
        let user = await User.findOne(
            {
                $or: [ 
                    {email: userLoggin},
                    {username: userLoggin },
                ]
            }
        )

        if(user && checkPassword(user.password, password)){
            let loggedUser = { 
                uid: user._id,
                name: user.name,
                username: user.username,
                role: user.role
            }
            const getHistory = await Invoice.find({ user: user._id })
                .populate("items.product", "name price quantity")
                .exec()
            let token = await generateJwt(loggedUser)
            return res.send(
                {
                    message: `Welcome ${user.name}`,
                    loggedUser,
                    token,
                    getHistory
                }
            )
        }
        return res.status(400).send({message: 'Wrong email or password'})
    }catch(err){
        console.error(err)
        return res.status(500).send(
            {
                message: 'General error with login function'
            }
        )
    }
}