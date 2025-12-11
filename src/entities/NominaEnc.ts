import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum NominaState {
    GENERADO = "Generado",
    LIQUIDADO = "Liquidado",
    PAGADO = "Pagado",
}

@Entity()
export class NominaEnc {

    @PrimaryGeneratedColumn()
    id: number

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

}