import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: "socket"})
export class Socket {
    @PrimaryGeneratedColumn({type: 'bigint'})
    public readonly id: number
    @Column({type: 'bigint'})
    public accountId: number
    @Column({type: 'text'})
    public socketId: string
}
