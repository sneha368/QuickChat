import express from 'express';
import { checkAuth,signup,login,updateProfile } from '../controller/userController';
import { protectRoute } from '../middleware/auth';
const userRouter=express.Router();


userRouter.post('/signup',signup);
userRouter.post('/login',login);
userRouter.put('/updateProfile',protectRoute,updateProfile);
userRouter.get('/check',protectRoute,checkAuth);

export default userRouter;