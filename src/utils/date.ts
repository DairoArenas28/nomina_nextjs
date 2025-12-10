export function dividirMesEnRangos(year: number, month: number) {
    // month: 1 = enero, 12 = diciembre
    const primerDia = new Date(year, month - 1, 1);
    const ultimoDia = new Date(year, month, 0); // último día del mes

    const rango1 = {
        inicio: new Date(year, month - 1, 1),
        fin: new Date(year, month - 1, 15),
    };

    const rango2 = {
        inicio: new Date(year, month - 1, 16),
        fin: ultimoDia,
    };

    return { rango1, rango2 };
}

export function formatear(date: Date) {
  return date.toISOString().split("T")[0];
}


