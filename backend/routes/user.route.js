import express from 'express';
import { login, logout, register, updateProfile } from '../controllers/user.controller.js';
import isAuthenticated from '../middleware/isAuthenticated.js';


const userRouter =  express.Router();

userRouter.route('/register').post(register);
userRouter.route('/login').post(login);
userRouter.route('/profile/update').post(isAuthenticated, updateProfile);
userRouter.route('/logout').get(isAuthenticated, logout);

export default userRouter;