import User from '../user/user.model.js'
import { checkPassword, encrypt } from '../../utils/encrypt.js'
import { generateJwt } from '../../utils/jwt.js'
import argon2 from "argon2"
import jwt from 'jsonwebtoken'

export const test = (req, res)=>{
    console.log('test is running')
    return res.send({message: 'Test is running'})
}

export const register = async (req, res) => {
    try {
        let data = req.body;

        if (data.role && data.role === "ADMIN") {
            return res.status(403).send({
                success: false,
                message: "You cannot register as an ADMIN"
            });
        }

        let user = new User(data);
        user.password = await encrypt(user.password);
        user.role = "CLIENT"; // Forzar que solo se registren como CLIENT

        await user.save();
        return res.send({ message: `Registered successfully, you can log in with username: ${user.username}` });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'General error registering user', err });
    }
};

export const login = async(req, res)=>{
    try{
        //Capturar los datos (body)
        let { userLoggin, password} = req.body
        //Validar que el usuario exista
        let user = await User.findOne(
            {
                $or: [ //Subfunción OR | espera un arreglo [  ] de búsquedas
                    {email: userLoggin},
                    {username: userLoggin },
                ]
            }
        ) //findOne({username}) = ({username: username})
        //Verificar que la contraseña coincida
        if(user && checkPassword(user.password, password)){
            let loggedUser = { //No puede ir data sensible
                uid: user._id,
                name: user.name,
                username: user.username,
                role: user.role
            }
            //PENDIENTE: generar el Token
            let token = await generateJwt(loggedUser)
            //Responder al usuario
            return res.send(
                {
                    message: `Welcome ${user.name}`,
                    loggedUser,
                    token
                }
            )
        }
        return res.status(400).send({message: 'Wrong email or password'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'General error with login function'})
    }
}