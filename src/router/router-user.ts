import {Router} from "express";
import userController from "../controller/user-controller";
import {auth} from "../middleware/auth";

export const routerUser = Router()
routerUser.use(auth)
routerUser.get('/friends/lists/:accountId', userController.showFriends)
routerUser.post('/friends', userController.makeFriend)
routerUser.get('/friends/:accountRes', userController.waitingFriends)
routerUser.patch('/friends/:relationshipId', userController.acceptFriend)
routerUser.delete('/friends/:relationshipId', userController.declineFriend)
routerUser.delete('/friends/:accountReq/:accountRes', userController.unfriend)
routerUser.get('/relationships', userController.showRelationship)

routerUser.post('/posts', userController.createPost);
routerUser.get('/posts', userController.showPost);
routerUser.patch('/posts/:postId', userController.updatePost);
routerUser.delete('/posts/:postId', userController.deletePost);

routerUser.post('/notification', userController.createNotification);
routerUser.get('/notification', userController.showNotification);
routerUser.delete('/notification/:accountSent/:postId/:type', userController.deleteNotification);

routerUser.post('/likes', userController.createLike)
// routerUser.get('/likes', userController.showLike)
// routerUser.get('/likes/numbers', userController.showCountLike)
routerUser.delete('/likes/:accountId/:postPostId', userController.deleteLike)

routerUser.post('/comments', userController.createComment)
routerUser.delete('/comments/:accountId/:postPostId/:commentId', userController.deleteComment)

routerUser.get('/accounts/:accountId', userController.showAccount)

routerUser.get('/search/:search', userController.search)

routerUser.post('/messages', userController.createMessage)
routerUser.get('/messages', userController.showMessage)







