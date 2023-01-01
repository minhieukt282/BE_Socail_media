import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: 'like'})
export class Like {
    @PrimaryGeneratedColumn({type: 'bigint'})
    public readonly likeId: number
    @Column({type: 'bigint'})
    public postId: number
    @Column({type: 'bigint'})
    public accountId: number
    @Column({type: 'varchar'})
    public displayName: string
}