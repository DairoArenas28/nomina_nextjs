import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ConceptType } from "./enums";


@Entity()
export class Concept {
    @PrimaryGeneratedColumn()
    id: number

    @Column('varchar')
    code: string

    @Column('varchar')
    description: string

    @Column({type: 'enum', enum: ConceptType})
    type: string

    @Column('varchar')
    value: string
}