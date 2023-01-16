import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {LikePost} from "./like-post";
import {Account} from "./account";
import {Comment} from "./comment";

@Entity({name: "post"})
export class Post {
    @PrimaryGeneratedColumn({type: 'bigint'})
    public readonly postId: number
    @Column({type: 'text'})
    public img: string
    @Column({type: "text"})
    public content: string
    @Column({type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
    public timeUpdate: string
    @Column({type: "varchar", default: "public"})
    public status: string

    @ManyToOne(() => Account, (account) => account.posts)
    account: Account

    @OneToMany(() => LikePost, (like) => like.post)
    likes: LikePost[]

    @OneToMany(() => Comment, (comment) => comment.post)
    comments: Comment[]
}
