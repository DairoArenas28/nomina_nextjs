import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { PayrollSchemeEnc } from "./PayrollSchemeEnc";
import { Concept } from "./Concept";

@Entity()
export class PayrollSchemeDet {

    @PrimaryGeneratedColumn()
    id: number

    @Column('decimal', {precision: 10, scale: 2})
    value: number

    @Column('decimal', {precision: 10, scale: 2})
    hours: number

    @ManyToOne(() => PayrollSchemeEnc)
    @JoinColumn({ name: "payrollSchemeEnc_id" })
    payrollSchemeEnc: PayrollSchemeEnc


    @ManyToOne(() => Concept)
    @JoinColumn({ name: "concept_id" })
    concept: Concept
}

