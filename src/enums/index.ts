export enum NominaState {
    GENERATED = 'GENERATED',
    NOT_GENERATED = 'NOT_GENERATED',
    LIQUIDATED = 'LIQUIDATED',
    PAID = 'PAID',
}

/**Concept */

// enums/ConceptType.ts
export enum ConceptType {
    ACCRUAL = 'ACCRUAL',     // Devengado
    DEDUCTION = 'DEDUCTION' // Deducción
}

export enum ContributionType {
    EMPLOYEE = 'EMPLOYEE',
    EMPLOYER = 'EMPLOYER'
}

export enum ConceptCategory {
    SALARY = 'SALARY',          // Salario básico
    HEALTH = 'HEALTH',          // Salud
    PENSION = 'PENSION',        // Pensión
    TRANSPORT = 'TRANSPORT',    // Auxilio transporte
    OVERTIME = 'OVERTIME',      // Horas extra
    BONUS = 'BONUS',            // Bonificaciones
    LOAN = 'LOAN',              // Préstamos
    OTHER = 'OTHER'
}

// enums/CalculationType.ts
export enum CalculationType {
    FIXED = 'FIXED',               // Valor fijo
    PERCENTAGE = 'PERCENTAGE',     // Porcentaje
    UNIT = 'UNIT',                 // Horas, días
    FORMULA = 'FORMULA'            // Avanzado
}

export enum CalculationBase {
    BASIC_SALARY = 'BASIC_SALARY',
    TOTAL_EARNINGS = 'TOTAL_EARNINGS',
    SALARY_EARNINGS = 'SALARY_EARNINGS',
    HOUR_VALUE = 'HOUR_VALUE',
    DAYS_WORKED = 'DAYS_WORKED'
}

export enum OvertimeType {
    DIURNAL = 'DIURNAL',             // 25%
    NOCTURNAL = 'NOCTURNAL',         // 75%
    DIURNAL_FESTIVE = 'DIURNAL_FESTIVE', // 75%
    NOCTURNAL_FESTIVE = 'NOCTURNAL_FESTIVE' // 110%
}
/** Employee */

export enum DocumentType {
    CC = 'CC',
    TI = 'TI',
    CE = 'CE',
    PP = 'PP',
    PEP = 'PEP',
    NIT = 'NIT'
}

export enum ContractType {
    INDEF = 'Contrato a término indefinido',
    FIXED = 'Contrato a término fijo',
    WORK_LABOR = 'Contrato por obra o labor',
    SERVICE = 'Contrato de prestación de servicios',
    APPRENTICE = 'Contrato de aprendizaje',
    TEMPORARY = 'Contrato temporal'
}

export enum JobPosition {
    GENERAL_MANAGER = 'GENERAL_MANAGER',
    ADMIN_MANAGER = 'ADMIN_MANAGER',
    FINANCE_MANAGER = 'FINANCE_MANAGER',
    HR_MANAGER = 'HR_MANAGER',

    SUPERVISOR = 'SUPERVISOR',
    COORDINATOR = 'COORDINATOR',
    ANALYST = 'ANALYST',
    ASSISTANT = 'ASSISTANT',

    ACCOUNTANT = 'ACCOUNTANT',
    TREASURER = 'TREASURER',
    PAYROLL_OFFICER = 'PAYROLL_OFFICER',

    SYSTEMS_ENGINEER = 'SYSTEMS_ENGINEER',
    DEVELOPER = 'DEVELOPER',
    IT_SUPPORT = 'IT_SUPPORT',

    SALES_MANAGER = 'SALES_MANAGER',
    SALES_ADVISOR = 'SALES_ADVISOR',

    OPERATIONS_MANAGER = 'OPERATIONS_MANAGER',
    LOGISTICS_COORDINATOR = 'LOGISTICS_COORDINATOR',

    OPERATOR = 'OPERATOR',
    TECHNICIAN = 'TECHNICIAN',
    MAINTENANCE = 'MAINTENANCE'
}

// enums/Bank.ts
export enum Bank {
    BANCOLOMBIA = 'BANCOLOMBIA',
    BANCO_DE_BOGOTA = 'BANCO_DE_BOGOTA',
    DAVIVIENDA = 'DAVIVIENDA',
    BBVA = 'BBVA',
    BANCO_POPULAR = 'BANCO_POPULAR',
    BANCO_DE_OCCIDENTE = 'BANCO_DE_OCCIDENTE',
    BANCO_AGRARIO = 'BANCO_AGRARIO',
    SCOTIABANK_COLPATRIA = 'SCOTIABANK_COLPATRIA',
    ITAU = 'ITAU',
    GNB_SUDAMERIS = 'GNB_SUDAMERIS',
    BANCO_AV_VILLAS = 'BANCO_AV_VILLAS',
    BANCO_FALABELLA = 'BANCO_FALABELLA',
    BANCO_PICHINCHA = 'BANCO_PICHINCHA',
    BANCO_CAJA_SOCIAL = 'BANCO_CAJA_SOCIAL',
    BANCO_W = 'BANCO_W',
    BANCO_SERFINANZA = 'BANCO_SERFINANZA'
}



// enums/BankAccountType.ts
export enum BankAccountType {
    SAVINGS = 'SAVINGS',
    CHECKING = 'CHECKING',
    PAYROLL = 'PAYROLL',
    JOINT = 'JOINT',
    DIGITAL = 'DIGITAL',
    TRUST = 'TRUST'
}

