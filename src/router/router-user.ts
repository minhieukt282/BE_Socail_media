import {Router} from "express";
import userController from "../controller/user-controller";
import {auth} from "../middleware/auth";

export const routerUser = Router()
// routerUser.use(auth)
routerUser.post('/posts', userController.createPost);
routerUser.get('/posts', userController.showPost);
routerUser.patch('/posts/:postId', userController.updatePost);
routerUser.delete('/posts/:postId', userController.deletePost);

