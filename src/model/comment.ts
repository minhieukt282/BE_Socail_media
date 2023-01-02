import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: 'comment'})
export class Comment {
    @PrimaryGeneratedColumn({type: 'bigint'})
    public readonly commentId: number
    @Column({type: 'bigint'})
    public postId: number
    @Column({type: 'bigint'})
    public accountId: number
    @Column({type: "text"})
    public content: string
    @Column({type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
    public timeUpdate: string
}