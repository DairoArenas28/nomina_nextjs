import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Employee } from "./Employee";
import { Nomina } from "./Nomina";
import { NominaState } from "./enums";

@Entity()
export class NominaEnc {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    code: string

    @Column('decimal', { precision: 10, scale: 2 })
    hoursWorked: number

    @Column({
        type: "enum",
        enum: NominaState,
        default: NominaState.GENERADO
    })
    state: string

    @Column('decimal', { precision: 10, scale: 2, nullable: true })
    accrual: number

    @Column('decimal', { precision: 10, scale: 2, nullable: true })
    deducted: number

    @Column('decimal', { precision: 10, scale: 2, nullable: true })
    total: number

    @ManyToOne(() => Nomina)
    @JoinColumn({name: "nomina_id"})
    nomina: Nomina

    @ManyToOne(() => Employee, {onDelete: "SET NULL"})
    @JoinColumn({ name: "employee_id" })
    employee: Employee

}