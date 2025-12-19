import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class PayrollSchemeEnc {

    @PrimaryGeneratedColumn()
    id: number

    @Column('varchar')
    code: string

    @Column('varchar')
    description: string

    @Column('varchar')
    payFrequency: string

    @Column('decimal', {precision: 10, scale: 6})
    hoursPerDay: number

    @Column('decimal', {precision: 10, scale: 6})
    workingDaysPerWeek: number

    @Column('decimal', {precision: 10, scale: 6})
    totalHoursPeriod: number

    @Column('boolean')
    hasVacation: boolean

    @Column('boolean')
    hasBonus: boolean

    @Column('boolean')
    hasLiquidation: boolean

    
}