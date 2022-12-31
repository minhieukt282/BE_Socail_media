import {Router} from "express";
import userController from "../controller/user-controller";
import {auth} from "../middleware/auth";

export const routerUser = Router()
routerUser.use(auth)
routerUser.get('/friends', userController.showFriends)
routerUser.post('/friends', userController.makeFriend)
routerUser.get('/friends/:accountRes', userController.waitingFriends)
routerUser.patch('/friends/:relationshipId', userController.acceptFriend)
routerUser.delete('/friends/:relationshipId', userController.declineFriend)

routerUser.post('/posts', userController.createPost);
routerUser.get('/posts', userController.showPost);
routerUser.patch('/posts/:postId', userController.updatePost);
routerUser.delete('/posts/:postId', userController.deletePost);

routerUser.post('/notification', userController.createNotification);
routerUser.get('/notification', userController.showNotification);
routerUser.delete('/notification/:accountSent/:contentId/:type', userController.deleteNotification);



