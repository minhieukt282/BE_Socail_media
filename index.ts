import express from 'express'
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import cors from "cors";
import {router} from "./src/router/router";

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
const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server is running ${PORT}`)
})