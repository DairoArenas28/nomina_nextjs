import { Column, Entity, PrimaryGeneratedColumn} from 'typeorm'


@Entity()
export class Nomina {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    period: string

    @Column('decimal', { precision: 10, scale: 2, nullable: true })
    accrual: number

    @Column('decimal', { precision: 10, scale: 2, nullable: true })
    deducted: number

    @Column('decimal', { precision: 10, scale: 2, nullable: true })
    total: number

    
    
}
