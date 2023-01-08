import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: "notification"})
export class Notification {
    @PrimaryGeneratedColumn({type: 'bigint'})
    public readonly notificationId: number
    @Column({type: 'varchar'})
    public displayName: string
    @Column({type: 'bigint'})
    public accountSent: number
    @Column({type: 'bigint'})
    public accountReceiver: number
    @Column({type: 'bigint'})
    public postId: number
    @Column({type: 'text'})
    public content: string
    @Column({type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
    public time: string
    @Column({type: "varchar"})
    public type: string
}
