import { Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm'


@Entity()
export class Nomina {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    period: string

    @Column('decimal', { precision: 10, scale: 2 })
    accrual: number

    @Column('decimal', { precision: 10, scale: 2 })
    deducted: number

    
    
}
