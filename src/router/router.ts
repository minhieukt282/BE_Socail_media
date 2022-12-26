import {Router} from "express";
import {routerUser} from "./router-user";
import {routerLogin} from "./router-login";

export const router = Router()
router.use('/', routerLogin)
router.use('/', routerUser)
