import { Request, Response } from "express";
import User from "../models/User";

export class UserController {
    static async getUsers(req: Request, res: Response) {
        try {
            const users = await User.findAll();
            res.status(200).json({
                message: "Users fetched",
                users,
                status: "success",
            });
        } catch (error) {
            console.log(error);
        }
    }
    static async createUser(req: Request, res: Response) {
        try {
            const user = new User(req.body);
            await user.save();
            res.status(201).json({
                message: "User created",
                user,
                status: "success",
            });
        } catch (error) {
            console.log(error);
        }
    }
    static async getUser(req: Request, res: Response) {
        try {
            const user = await User.findByPk(req.params.id);
            res.status(200).json({
                message: "User fetched",
                user,
                status: "success",
            });
        } catch (error) {
            console.log(error);
        }
    }
    static async updateUser(req: Request, res: Response) {
        try {
            const user = await User.findByPk(req.params.id);
            await user.update(req.body);
            res.status(200).json({
                message: "User updated",
                user,
                status: "success",
            });
        } catch (error) {
            console.log(error);
        }
    }
    static async deleteUser(req: Request, res: Response) {
        try {
            const user = await User.findByPk(req.params.id);
            await user.destroy();
            res.status(200).json({
                message: "User deleted",
                status: "success",
            });
        } catch (error) {
            console.log(error);
        }
    }

}
