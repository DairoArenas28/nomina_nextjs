import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { PayrollSchemeEnc } from "./PayrollSchemeEnc";
import { Concept } from "./Concept";

@Entity()
export class PayrollSchemeDet {

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => PayrollSchemeEnc)
    @JoinColumn({ name: "payrollSchemeEnc_id" })
    payrollSchemeEnc: PayrollSchemeEnc


    @ManyToOne(() => Concept)
    @JoinColumn({ name: "concept_id" })
    concept: Concept
}

