import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: "message"})
export class Message {
    @PrimaryGeneratedColumn({type: 'bigint'})
    public readonly messageId: number
    @Column({type: 'bigint'})
    public roomId: number
    @Column({type: 'bigint'})
    public accountId: number
    @Column({type: 'text'})
    public message: string
    @Column({type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
    public timeSent: string
}
