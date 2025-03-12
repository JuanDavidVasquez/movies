import { Request, Response } from 'express';
import Category from '../models/Category';

export class CategoryController {
    static async getCategories(req: Request, res: Response) {
        try {
        const categories = await Category.findAll()
        res.status(200).json({
            message: 'Categories fetched',
            categories,
            status: 'success'
        })
        } catch (error) {
        console.log(error)
        }
    }
    static async createCategory(req: Request, res: Response) {
        try {
        const category = new Category(req.body)
        await category.save()
        res.status(201).json({
            message: 'Category created',
            category,
            status: 'success'
        })
        } catch (error) {
        console.log(error)
        }
    }
    static async getCategory(req: Request, res: Response) {
        try {
        const category = await Category.findByPk(req.params.id)
        res.status(200).json({
            message: 'Category fetched',
            category,
            status: 'success'
        })
        } catch (error) {
        console.log(error)
        }
    }
    static async updateCategory(req: Request, res: Response) {
        try {
        const category = await Category.findByPk(req.params.id)
        await category.update(req.body)
        res.status(200).json({
            message: 'Category updated',
            category,
            status: 'success'
        })
        } catch (error) {
        console.log(error)
        }
    }
    static async deleteCategory(req: Request, res: Response) {
        try {
        const category = await Category.findByPk(req.params.id)
        await category.destroy()
        res.status(200).json({
            message: 'Category deleted',
            status: 'success'
        })
        } catch (error) {
        console.log(error)
        }
    }
    
}