import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: 'post'})
export class Post {
    @PrimaryGeneratedColumn({type: 'bigint'})
    public readonly postId: number
    @Column({type: 'bigint'})
    public accountId: number
    @Column({type: 'text'})
    public img: string
    @Column({type: "text"})
    public content : string
    @Column({type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
    public timeUpdate: string
    @Column({type: "varchar", default: "public"})
    public status : string
}