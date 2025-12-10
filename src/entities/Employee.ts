import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

@Entity()
export class Employee {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    name: string;

    @Column()
    age: number;

    @Column({ length: 10 })
    documentType: string;

    @Column({ length: 20 })
    documentNumber: string;

    @Column({ length: 100 })
    country: string;

    @Column({ length: 200 })
    address: string;

    @Column({ length: 20 })
    phone: string;

    @Column({ length: 150 })
    email: string;

    @Column({ type: "date" })
    hireDate: Date;

    @Column({ length: 50 })
    contractType: string;

    @Column({ length: 100 })
    position: string;

    @Column({ type: "decimal", precision: 12, scale: 2 })
    salary: number;

    @Column({ length: 50 })
    eps: string;

    @Column({ length: 50 })
    pension: string;

    @Column({ length: 50 })
    arl: string;

    @Column({ length: 100 })
    bank: string;

    @Column({ length: 50 })
    accountType: string;

    @Column({ length: 30 })
    accountNumber: string;
    
}
