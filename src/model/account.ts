import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Post} from "./post";

@Entity({name: "account"})
export class Account {
    @PrimaryGeneratedColumn({type: 'bigint'})
    public readonly accountId: number
    @Column({type: 'varchar'})
    public username: string
    @Column({type: 'text'})
    public password: string
    @Column({type: "varchar", default: 'New Username'})
    public displayName: string
    @Column({type: "text"})
    public img: string
    @Column({type: "date"})
    public birthday: Date
    @Column({type: "varchar", default: "Hanoi"})
    public location: string
    @Column({type: "boolean", default: false})
    public status: boolean

    @OneToMany(() => Post, (post) => post.account)
    posts: Post[]
}
