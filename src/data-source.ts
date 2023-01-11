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
    host: "118.70.117.39",
    port: 1506,
    username: "anhnbt",
    password: "KhoaiTay@2019",
    database: "social_network",
    synchronize: false,
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
