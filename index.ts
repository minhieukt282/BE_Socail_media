import express from 'express'
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import cors from "cors";
import {router} from "./src/router/router";
import {Server} from "socket.io"

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

io.on("connection", (socket) => {
    console.log(`User connect: ${socket.id}`)
    socket.on("join_room", (data) => {
        socket.join(data)
    })
    socket.on("send_message", (data) => {
        console.log(data)
        // socket.broadcast.emit("receive_message", data)
        if (data.id == 123456) {
            io.to(data.room).emit("receive_message", data)
        }
    })

});
io.listen(5000);


const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server is running ${PORT}`)
})