import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Post} from "./post";

@Entity({name: "like_post"})
export class LikePost {
    @PrimaryGeneratedColumn({type: 'bigint'})
    public readonly likeId: number
    @Column({type: 'bigint'})
    public accountId: number
    @Column({type: 'varchar'})
    public displayName: string

    @ManyToOne(() => Post, (post) => post.likes)
    post: Post
}
