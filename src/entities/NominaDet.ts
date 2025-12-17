import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { NominaEnc } from "./NominaEnc";
import { Concept } from "./Concept";



@Entity()
export class NominaDet {

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => NominaEnc)
    @JoinColumn({name: "nominaEnc_id"})
    nominaEnc: NominaEnc

    @ManyToOne(() => Concept)
    @JoinColumn({name: "concept_id"})
    concept: Concept
}