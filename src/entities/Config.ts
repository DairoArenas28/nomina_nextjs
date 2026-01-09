import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("config")
export class Config {

  @PrimaryGeneratedColumn()
  id: number;

  /* ===============================
     CONFIGURACIÓN BÁSICA
  =============================== */

  // Salario mínimo legal vigente
  @Column("decimal", { precision: 12, scale: 2 })
  smlv: number;

  // Requisito para auxilio (en cantidad de SMLV)
  @Column("decimal", { precision: 5, scale: 2 })
  transportNumberSalaryRequirement: number;

  // Requisito para auxilio (en cantidad de SMLV)
  @Column("decimal", { precision: 12, scale: 2 })
  transportValueSalaryRequirement: number;

  // Valor del auxilio de transporte
  @Column("decimal", { precision: 12, scale: 2 })
  transportAllowanceValue: number;

  /* ===============================
     SEGURIDAD SOCIAL
  =============================== */

  // Salud
  @Column("decimal", { precision: 5, scale: 2 })
  healthEmployeePercent: number;

  @Column("decimal", { precision: 5, scale: 2 })
  healthEmployerPercent: number;

  // Pensión
   @Column("decimal", { precision: 5, scale: 2 })
   pensionEmployeePercent: number;

  @Column("decimal", { precision: 5, scale: 2 })
  pensionEmployerPercent: number;

  // Riesgos laborales
  @Column("decimal", { precision: 5, scale: 2 })
  occupationalRiskPercent: number;

  // Base para seguridad social
  @Column("decimal", { precision: 12, scale: 2 })
  socialSecurityBase: number;

  /* ===============================
     AUDITORÍA
  =============================== */

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
