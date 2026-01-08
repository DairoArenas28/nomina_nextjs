export enum NominaState {
    GENERADO = "Generado",
    NOTGENERADO = "No Generado",
    LIQUIDADO = "Liquidado",
    PAGADO = "Pagado",
}

/**Concept */

export enum ConceptType {
    ACCRUAL = 'DEVENGADO',           // Devengado
    DEDUCTION = 'DEDUCIÓN',       // Deducción
    EMPLOYER = 'APORTE PATRONAL'          // Aporte patronal
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
/** Employee */

export enum DocumentType {
    CC = 'Cédula de Ciudadanía',
    TI = 'Tarjeta de Identidad',
    CE = 'Cédula de Extranjería',
    PP = 'Pasaporte',
    PEP = 'Permiso Especial de Permanencia',
    NIT = 'Número de Identificación Tributaria'
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
    GENERAL_MANAGER = 'Gerente General',
    ADMIN_MANAGER = 'Gerente Administrativo',
    FINANCE_MANAGER = 'Gerente Financiero',
    HR_MANAGER = 'Gerente de Talento Humano',

    SUPERVISOR = 'Supervisor',
    COORDINATOR = 'Coordinador',
    ANALYST = 'Analista',
    ASSISTANT = 'Asistente',

    ACCOUNTANT = 'Contador',
    TREASURER = 'Tesorero',
    PAYROLL_OFFICER = 'Auxiliar de Nómina',

    SYSTEMS_ENGINEER = 'Ingeniero de Sistemas',
    DEVELOPER = 'Desarrollador',
    IT_SUPPORT = 'Soporte Técnico',

    SALES_MANAGER = 'Jefe de Ventas',
    SALES_ADVISOR = 'Asesor Comercial',

    OPERATIONS_MANAGER = 'Jefe de Operaciones',
    LOGISTICS_COORDINATOR = 'Coordinador Logístico',

    OPERATOR = 'Operario',
    TECHNICIAN = 'Técnico',
    MAINTENANCE = 'Mantenimiento'
}

export enum Bank {
    BANCOLOMBIA = 'Bancolombia',
    BANCO_DE_BOGOTA = 'Banco de Bogotá',
    DAVIVIENDA = 'Davivienda',
    BBVA = 'BBVA Colombia',
    BANCO_POPULAR = 'Banco Popular',
    BANCO_DE_OCCIDENTE = 'Banco de Occidente',
    BANCO_AGRARIO = 'Banco Agrario de Colombia',
    SCOTIABANK_COLPATRIA = 'Scotiabank Colpatria',
    ITAU = 'Itaú',
    GNB_SUDAMERIS = 'GNB Sudameris',
    BANCO_AV_VILLAS = 'Banco AV Villas',
    BANCO_FALABELLA = 'Banco Falabella',
    BANCO_PICHINCHA = 'Banco Pichincha',
    BANCO_CAJA_SOCIAL = 'Banco Caja Social',
    BANCO_W = 'Banco W',
    BANCO_SERFINANZA = 'Banco Serfinanza'
}


export enum BankAccountType {
    SAVINGS = 'Cuenta de Ahorros',
    CHECKING = 'Cuenta Corriente',
    PAYROLL = 'Cuenta de Nómina',
    JOINT = 'Cuenta Conjunta',
    DIGITAL = 'Cuenta Digital',
    TRUST = 'Cuenta Fiduciaria'
}

