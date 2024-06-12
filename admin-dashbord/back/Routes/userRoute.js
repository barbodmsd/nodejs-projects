import express from "express";
import {
    getAllUsers,
    getUserById,
    login,
    register
} from "../Controllers/userControl.js";
const userRoute = express.Router();

userRoute.route("").get(getAllUsers).post(login)
userRoute.route("/:id").get(getUserById)
userRoute.route('/register').post(register)
export default userRoute;
