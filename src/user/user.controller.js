import User from "./user.model.js"
import mongoose from "mongoose"
import argon2 from 'argon2'

export const getAll = async(req, res)=>{
    try{
        const { limit = 20, skip = 0 } = req.query
        const users = await User.find()
            .skip(skip)
            .limit(limit)

        if(users.length === 0) return res.status(404).send({message: 'Users not found', success: false})
        return res.send(
            {
                success: true,
                message: 'Users found: ',
                users,
                total: users.length
            }
        )
    }catch(err){
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error', 
                err
            }
        )
    }
}

export const get = async(req, res)=>{
    try{
        const { id } = req.params
        const user = await User.findById(id)

        if(!user) return res.status(404).send(
            {
                success: false,
                message: 'User not found'
            }
        )
        return res.send(
            {
                success: true,
                message: 'User found',
                user
            }
        )
    }catch(err){
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error', 
                err
            }
        )
    }
}

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).send(
                {
                    success: false,
                    message: 'Invalid user ID'
                }
            )
        }

        const { name, surname, username, email, phone, profilePicture, role } = req.body
        const requestingUser = req.user
        const userToUpdate = await User.findById(id)

        if (!userToUpdate) {
            return res.status(404).send(
                {
                    success: false,
                    message: 'User not found'
                }
            )
        }

        if (userToUpdate.role === 'ADMIN' && role === 'CLIENT') {
            return res.status(403).send(
                {
                    success: false,
                    message: 'You cannot downgrade an ADMIN to CLIENT'
                }
            )
        }

        const updateUser = await User.findByIdAndUpdate(
            id,
            { name, surname, username, email, phone, profilePicture, role },
            { new: true }
        )

        return res.send(
            {
                success: true,
                message: 'User updated',
                updateUser
            }
        )

    } catch (err) {
        console.error(err);
        return res.status(500).send(
            {
                success: false,
                message: 'General error',
                err
            }
        )
    }
}

export const updatePassword = async (req, res) => {
    try {
        const { id } = req.params;
        const { currentPassword, newPassword } = req.body;

        if (!id || !currentPassword || !newPassword) {
            return res.status(400).send({
                success: false,
                message: "All fields are required: id, currentPassword, newPassword",
            })
        }

        const user = await User.findById(id)
        if (!user) {
            return res.status(404).send(
                { 
                    success: false, 
                    message: "User not found" 
                }
            )
        }

        const isMatch = await argon2.verify(user.password, currentPassword)
        if (!isMatch) {
            return res.status(400).send(
                { 
                    success: false, 
                    message: "Current password is incorrect" 
                }
            )
        }

        const hashedPassword = await argon2.hash(newPassword)

        user.password = hashedPassword
        await user.save()

        return res.send(
            { 
                success: true, 
                message: "Password updated successfully" 
            }
        )

    } catch (err) {
        console.error("Error in updatePassword:", err)
        return res.status(500).send({
            success: false,
            message: "General error",
            err
        })
    }
}

export const deleteOne = async (req, res) => {
    try {
        const userId = req.params.id

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).send(
                {
                    success: false,
                    message: "Invalid user ID",
                }
            )
        }

        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).send(
                {
                    success: false,
                    message: "User not found",
                }
            )
        }

        user.status = false
        await user.save()

        return res.send(
            {
                success: true,
                message: "User desactivated",
            }
        )

    } catch (err) {
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
