import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { CalculationBase, CalculationType, ConceptCategory, ConceptType, OvertimeType } from "../enums";

@Entity()
export class Concept {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50, unique: true })
    code: string;

    @Column({ length: 150 })
    description: string;

    @Column({ type: 'enum', enum: ConceptType })
    type: ConceptType;

    @Column({ type: 'enum', enum: ConceptCategory })
    category: ConceptCategory;

    @Column({ type: 'enum', enum: CalculationType })
    calculationType: CalculationType;

    @Column({ type: 'enum', enum: CalculationBase, nullable: true })
    calculationBase: CalculationBase;

    // 🔥 porcentaje aplicado
    @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
    percentage?: number;

    // 🔥 solo para horas extra
    @Column({ type: 'enum', enum: OvertimeType, nullable: true })
    overtimeType?: OvertimeType;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
    value: number;

    @Column({ default: false })
    editable: boolean;

    @Column({ default: true })
    active: boolean;
}

