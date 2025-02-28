import mongoose from 'mongoose';
import Category from './category.model.js'
import { validationResult } from 'express-validator'

export const addCategory = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Validation error',
            errors: errors.array(),
        })
    }

    try {
        const { name, description } = req.body

        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            return res.status(400).send({
                success: false,
                message: 'Category already exists',
            })
        }

        const category = new Category({
            name,
            description,
        })

        await category.save()

        return res.status(201).send({
            success: true,
            message: 'Category created successfully',
            category,
        })
    } catch (err) {
        console.error(err);
        return res.status(500).send({
            success: false,
            message: 'General error when adding category',
            err,
        })
    }
}

export const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find()

        if (categories.length === 0) {
            return res.status(404).send({
                success: false,
                message: 'No categories found',
            });
        }

        return res.status(200).send({
            success: true,
            message: 'Categories retrieved successfully',
            total: categories.length,
            categories
        })
    } catch (err) {
        console.error(err);
        return res.status(500).send({
            success: false,
            message: 'General error when retrieving categories',
            err,
        })
    }
}

export const update = async(req, res)=>{
    const { id } = req.params
    const data = req.body
    try{
        const updateCategory = await Category.findByIdAndUpdate(
            id,
            data,
            {new: true}
        )
        if(!updateCategory) return res.status(404).send(
            {
                success: false,
                message: 'Category not found, not updated'
            }
        )
        return res.send(
            {
                success: true,
                message: 'Category updated succesfully',
                updateCategory
            }
        )
    }catch (err) {
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

export const deleteOne = async (req, res) => {
    try {
        const categoryId = req.params.id

        if (!mongoose.Types.ObjectId.isValid(categoryId)) {
            return res.status(400).send(
                {
                    success: false,
                    message: "Invalid category ID",
                }
            )
        }

        const category = await Category.findById(categoryId)
        if (!category) {
            return res.status(404).send(
                {
                    success: false,
                    message: "Category not found",
                }
            )
        }

        category.status = false
        await category.save()

        return res.send(
            {
                success: true,
                message: "Category deactivated",
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
