import { NextResponse } from "next/server";
import { getDataSource } from "@/src/lib/typeorm";
import { Nomina } from "@/src/entities/Nomina";
import { dividirMesEnRangos, formatear } from "@/src/utils/date";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { year, month } = body.data;

        if (!year || !month) {
            return NextResponse.json(
                { error: "Los campos year y month son obligatorios" },
                { status: 400 }
            );
        }

        // Conectar DB
        const db = await getDataSource();
        const nominaRepo = db.getRepository(Nomina);

        // Dividir en rangos
        const { rango1, rango2 } = dividirMesEnRangos(year, month);

        // Registro 1 (1 al 15)
        const nominaPrimeraQuincena = nominaRepo.create({
            period: `${formatear(rango1.inicio)} - ${formatear(rango1.fin)}`// opcional → puedes usarlo para diferenciar
        });

        // Registro 2 (16 al fin)
        const nominaSegundaQuincena = nominaRepo.create({
            period: `${formatear(rango2.inicio)} - ${formatear(rango2.fin)}`
        });

        // Guardar ambos en DB
        await nominaRepo.save([nominaPrimeraQuincena, nominaSegundaQuincena]);

        return NextResponse.json(
            {
                message: "Rangos creados correctamente",
                rangos: { rango1, rango2 },
            },
            { status: 201 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Error en el servidor" },
            { status: 500 }
        );
    }
}
