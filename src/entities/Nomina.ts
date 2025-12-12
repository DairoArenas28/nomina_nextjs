import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { NominaEnc } from './NominaEnc'
import { NominaState } from './enums/NominaState'
@Entity()
export class Nomina {

    @PrimaryGeneratedColumn()
    id: number

    @Column('varchar')
    code: string

    @Column('varchar')
    period: string

    @Column({
        type:"enum",
        enum: NominaState,
        default: NominaState.NOTGENERADO
    })
    state: string

    @Column('decimal', { precision: 10, scale: 2, nullable: true })
    accrual: number

    @Column('decimal', { precision: 10, scale: 2, nullable: true })
    deducted: number

    @Column('decimal', { precision: 10, scale: 2, nullable: true })
    total: number

    //@OneToMany(() => NominaEnc, (nomina) => nomina.nomina)
    //nominaEnc: NominaEnc[]
}
