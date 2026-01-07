export enum NominaState {
    GENERADO = "Generado",
    NOTGENERADO = "No Generado",
    LIQUIDADO = "Liquidado",
    PAGADO = "Pagado",
}

export enum ConceptType {
    ACCRUAL = 'ACCRUAL',           // Devengado
    DEDUCTION = 'DEDUCTION',       // Deducción
    EMPLOYER = 'EMPLOYER'          // Aporte patronal
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