import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Post} from "./post";

@Entity({name: "comment"})
export class Comment {
    @PrimaryGeneratedColumn({type: 'bigint'})
    public readonly commentId: number
    @Column({type: 'bigint'})
    public accountId: number
    @Column({type: 'varchar'})
    public displayName: string
    @Column({type: "text"})
    public img: string
    @Column({type: "text"})
    public comment: string
    @Column({type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
    public timeUpdate: string

    @ManyToOne(() => Post, (post) => post.comments)
    post: Post
}
