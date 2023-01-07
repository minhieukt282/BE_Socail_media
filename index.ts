import express from 'express'
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import cors from "cors";
import {router} from "./src/router/router";
import {Server} from "socket.io"
import {SocketService} from "./src/service/socket-Service"

const app = express()
app.use(express.json())
app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
app.use(cookieParser());
app.use(fileUpload({
    createParentPath: true
}));
app.use('', router)

//==================================SOCKET IO==================================
const io = new Server({
    cors: {
        origin: "http://localhost:3000"
    }
})
const socketService = new SocketService()

io.on("connection", (socket) => {
    socket.on('online', async (data) => {
        await socketService.createSocket(data.accountId, socket.id)
    })

    socket.on('refresh', async (data) => {
        console.log("socket id:", socket.id, "account id:", data.accountId)
        await socketService.updateSocket(data.accountId, socket.id)
    })

    socket.on('liked', async (data) => {
        const socketId = await socketService.findSocket(+data.accountReceiver)
        if (data.accountSent !== data.accountReceiver && socketId != null) {
            io.to(`${socketId.socketId}`).emit("getNotification", {
                message: `${data.displayName} liked your status`
            });
        }
    })

    socket.on('commented', async (data) => {
        const socketId = await socketService.findSocket(+data.accountReceiver)
        if (data.accountSent !== data.accountReceiver && socketId != null) {
            io.to(`${socketId.socketId}`).emit("getNotification", {
                message: `${data.displayName} commented on your status`
            });
        }
    })

    socket.on('acceptFriend', async (data) => {
        const socketId = await socketService.findSocket(+data.accountReceiver)
        if(socketId != null){
            io.to(`${socketId.socketId}`).emit("getNotification", {
                message: `${data.displayName} has accepted your friend request`
            });
        }
    })

    socket.on('addFriends', async (data) => {
        const socketId = await socketService.findSocket(+data.accountReceiver)
        if(socketId != null){
            io.to(`${socketId.socketId}`).emit("getNotification", {
                message: `${data.displayName} sent a friend request`
            });
        }
    })

    socket.on("offline", async (data) => {
        await socketService.deleteSocket(data.accountId)
    });
    socket.on("disconnect", ()=>{

    })
});

const PORT_SOCKET = 5000
io.listen(PORT_SOCKET);

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server is running ${PORT}`)
})