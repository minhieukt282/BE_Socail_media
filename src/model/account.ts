import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: 'account'})
export class Account {
    @PrimaryGeneratedColumn({type: 'bigint'})
    public readonly accountId: number
    @Column({type: 'varchar'})
    public username: string
    @Column({type: 'text'})
    public password: string
    @Column({type: "varchar", default: 'username'})
    public displayName : string
    @Column({type: "text"})
    public img : string
    @Column({type: "date"})
    public birthday : Date
    @Column({type: "varchar", default: "Hanoi"})
    public location : string
    @Column({type: "boolean", default: false})
    public status : boolean
}