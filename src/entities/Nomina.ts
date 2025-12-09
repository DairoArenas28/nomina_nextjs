import { Entity, PrimaryGeneratedColumn} from 'typeorm'


@Entity()
export class Nomina {

    @PrimaryGeneratedColumn()
    id: number
    
}
