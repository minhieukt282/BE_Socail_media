import {Router} from "express";
import loginController from "../controller/login-controller";
import {auth} from "../middleware/auth";

export const routerLogin = Router()
routerLogin.post('/login', loginController.login)
routerLogin.post('/register', loginController.register)
routerLogin.use(auth)
routerLogin.post('/logout', loginController.logout)