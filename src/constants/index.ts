import { Bank, BankAccountType, CalculationBase, CalculationType, ConceptCategory, ConceptType, ContractType, ContributionType, DocumentType, JobPosition, NominaState, OvertimeType } from "../enums";



export const NominaStateLabel: Record<NominaState, string> = {
    [NominaState.GENERATED]: "Generado",
    [NominaState.NOT_GENERATED]: "No Generado",
    [NominaState.LIQUIDATED]: "Liquidado",
    [NominaState.PAID]: "Pagado",
}

/**Concept */

export const ConceptTypeLabel: Record<ConceptType, string> = {
    [ConceptType.ACCRUAL]: 'DEVENGADO',           // Devengado
    [ConceptType.DEDUCTION]: 'DEDUCIÓN',       // De    ducción         // Aporte patronal
}

export const ContributionTypeLabel: Record<ContributionType, string> = {
    [ContributionType.EMPLOYEE]: 'Aporte del empleado',
    [ContributionType.EMPLOYER]: 'Aporte patronal',
};

export const ConceptCategoryLabel: Record<ConceptCategory, string> = {
    [ConceptCategory.SALARY] : 'Salario',          // Salario básico
    [ConceptCategory.HEALTH] : 'Salud',          // Salud
    [ConceptCategory.PENSION] : 'Pensión',        // Pensión
    [ConceptCategory.TRANSPORT] : 'Transporte',    // Auxilio transporte
    [ConceptCategory.OVERTIME] : 'Horas extras',      // Horas extra
    [ConceptCategory.BONUS] : 'Bonificaciones',            // Bonificaciones
    [ConceptCategory.LOAN] : 'Préstamos',              // Préstamos
    [ConceptCategory.OTHER] : 'Otros'
}

export const CalculationTypeLabel: Record<CalculationType, string> = {
    [CalculationType.FIXED]: 'Valor fijo',
    [CalculationType.PERCENTAGE]: 'Porcentaje',
    [CalculationType.UNIT]: 'Unidad (horas / días)',
    [CalculationType.FORMULA]: 'Fórmula avanzada'
};

export const CalculationBaseLabel: Record<CalculationBase, string> = {
    [CalculationBase.BASIC_SALARY]: 'Salario básico',
    [CalculationBase.TOTAL_EARNINGS]: 'Total devengado',
    [CalculationBase.SALARY_EARNINGS]: 'Devengado salarial',
    [CalculationBase.HOUR_VALUE]: 'Valor hora',
    [CalculationBase.DAYS_WORKED]: 'Días trabajados'
};

export const OvertimeTypeLabel: Record<OvertimeType, string> = {
    DIURNAL : 'Diurna',             // 25%
    NOCTURNAL : 'Nocturna',         // 75%
    DIURNAL_FESTIVE : 'Diurna (domingo / festivo)', // 75%
    NOCTURNAL_FESTIVE : 'Nocturna (domingo / festivo)' // 110%
}
/** Employee */

export const DocumentTypeLabel: Record<DocumentType, string> = {
    [DocumentType.CC]: 'Cédula de Ciudadanía',
    [DocumentType.TI]: 'Tarjeta de Identidad',
    [DocumentType.CE]: 'Cédula de Extranjería',
    [DocumentType.PP]: 'Pasaporte',
    [DocumentType.PEP]: 'Permiso Especial de Permanencia',
    [DocumentType.NIT]: 'Número de Identificación Tributaria',
};


export const ContractTypeLabel: Record<ContractType, string> = {
    [ContractType.INDEF]: 'Contrato a término indefinido',
    [ContractType.FIXED]: 'Contrato a término fijo',
    [ContractType.WORK_LABOR]: 'Contrato por obra o labor',
    [ContractType.SERVICE]: 'Contrato de prestación de servicios',
    [ContractType.APPRENTICE]: 'Contrato de aprendizaje',
    [ContractType.TEMPORARY]: 'Contrato temporal',
}

export const JobPositionLabel: Record<JobPosition, string> = {
    [JobPosition.GENERAL_MANAGER]: 'Gerente General',
    [JobPosition.ADMIN_MANAGER]: 'Gerente Administrativo',
    [JobPosition.FINANCE_MANAGER]: 'Gerente Financiero',
    [JobPosition.HR_MANAGER]: 'Gerente de Talento Humano',

    [JobPosition.SUPERVISOR]: 'Supervisor',
    [JobPosition.COORDINATOR]: 'Coordinador',
    [JobPosition.ANALYST]: 'Analista',
    [JobPosition.ASSISTANT]: 'Asistente',

    [JobPosition.ACCOUNTANT]: 'Contador',
    [JobPosition.TREASURER]: 'Tesorero',
    [JobPosition.PAYROLL_OFFICER]: 'Auxiliar de Nómina',

    [JobPosition.SYSTEMS_ENGINEER]: 'Ingeniero de Sistemas',
    [JobPosition.DEVELOPER]: 'Desarrollador',
    [JobPosition.IT_SUPPORT]: 'Soporte Técnico',

    [JobPosition.SALES_MANAGER]: 'Jefe de Ventas',
    [JobPosition.SALES_ADVISOR]: 'Asesor Comercial',

    [JobPosition.OPERATIONS_MANAGER]: 'Jefe de Operaciones',
    [JobPosition.LOGISTICS_COORDINATOR]: 'Coordinador Logístico',

    [JobPosition.OPERATOR]: 'Operario',
    [JobPosition.TECHNICIAN]: 'Técnico',
    [JobPosition.MAINTENANCE]: 'Mantenimiento'
};

export const BankLabel: Record<Bank, string> = {
    [Bank.BANCOLOMBIA]: 'Bancolombia',
    [Bank.BANCO_DE_BOGOTA]: 'Banco de Bogotá',
    [Bank.DAVIVIENDA]: 'Davivienda',
    [Bank.BBVA]: 'BBVA Colombia',
    [Bank.BANCO_POPULAR]: 'Banco Popular',
    [Bank.BANCO_DE_OCCIDENTE]: 'Banco de Occidente',
    [Bank.BANCO_AGRARIO]: 'Banco Agrario de Colombia',
    [Bank.SCOTIABANK_COLPATRIA]: 'Scotiabank Colpatria',
    [Bank.ITAU]: 'Itaú',
    [Bank.GNB_SUDAMERIS]: 'GNB Sudameris',
    [Bank.BANCO_AV_VILLAS]: 'Banco AV Villas',
    [Bank.BANCO_FALABELLA]: 'Banco Falabella',
    [Bank.BANCO_PICHINCHA]: 'Banco Pichincha',
    [Bank.BANCO_CAJA_SOCIAL]: 'Banco Caja Social',
    [Bank.BANCO_W]: 'Banco W',
    [Bank.BANCO_SERFINANZA]: 'Banco Serfinanza'
};


export const BankAccountTypeLabel: Record<BankAccountType, string> = {
    [BankAccountType.SAVINGS]: 'Cuenta de Ahorros',
    [BankAccountType.CHECKING]: 'Cuenta Corriente',
    [BankAccountType.PAYROLL]: 'Cuenta de Nómina',
    [BankAccountType.JOINT]: 'Cuenta Conjunta',
    [BankAccountType.DIGITAL]: 'Cuenta Digital',
    [BankAccountType.TRUST]: 'Cuenta Fiduciaria'
};