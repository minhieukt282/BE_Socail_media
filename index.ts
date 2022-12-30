import express from 'express'
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import cors from "cors";
import {router} from "./src/router/router";
import {Server} from "socket.io"
import {LoginService} from "./src/service/login-service";

const app = express()
const io = new Server({
    cors: {
        origin: "http://localhost:3000"
    }
})
app.use(express.json())
app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
app.use(cookieParser());
app.use(fileUpload({
    createParentPath: true
}));
app.use('', router)

//==================================SOCKET IO===============

const service = new LoginService()

io.on("connection", (socket) => {
    socket.on('online', async (data) => {
        await service.createSocket(data.accountId, socket.id)
    })

    socket.on('refresh', async (data) => {
        console.log("socket id:", socket.id, data)
        await service.updateSocket(data.accountId, socket.id)
    })

    socket.on('liked', async (data) => {
        const socketId = await service.findSocket(+data.accountReceiver)
        if (data.accountSent !== data.accountReceiver) {
            io.to(`${socketId.socketId}`).emit("getNotification", {
                message: `${data.displayName} like status`
            });
        }
    })

    socket.on("disconnect", async () => {

    });
});
io.listen(5000);


const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server is running ${PORT}`)
})