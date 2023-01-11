import {DataSource} from "typeorm";
import {Account} from "./model/account";
import {Comment} from "./model/comment";
import {LikePost} from "./model/like-post";
import {Post} from "./model/post";
import {Notification} from "./model/notification";
import {Relationship} from "./model/relationship";
import {Socket} from "./model/socket";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "127.0.0.1",
    port: 3306,
    username: "root",
    password: "123456",
    database: "social_media",
    synchronize: true,
    entities: [
        Account,
        Comment,
        LikePost,
        Post,
        Notification,
        Relationship,
        Socket,
    ],
})
