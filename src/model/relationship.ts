import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: 'relationship'})
export class Relationship {
    @PrimaryGeneratedColumn({type: 'bigint'})
    public readonly relationshipId: number
    @Column({type: 'bigint'})
    public accountIdOne: number
    @Column({type: 'bigint'})
    public accountIdTwo: number
    @Column({type: "boolean", default: false})
    public status : boolean
}