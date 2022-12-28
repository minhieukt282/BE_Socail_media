import {Router} from "express";
import userController from "../controller/user-controller";
import {auth} from "../middleware/auth";

export const routerUser = Router()
routerUser.use(auth)
routerUser.get('/:accountId/friends/', userController.showFriends)
routerUser.post('/friends', userController.makeFriend)
routerUser.get('/friends/:accountRes', userController.waitingFriends)
routerUser.patch('/friends/:relationshipId', userController.acceptFriend)
routerUser.delete('/friends/:relationshipId', userController.declineFriend)
