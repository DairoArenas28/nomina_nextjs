import { NextResponse } from "next/server";
import { getDataSource } from "@/src/lib/typeorm";
import { Nomina } from "@/src/entities/Nomina";
import { dividirMesEnRangos, formatear } from "@/src/utils/date";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { year, month } = body;

        // Validación fuerte
        if (
            typeof year !== "string" ||
            typeof month !== "string" ||
            Number(month) < 1 || Number(month) > 12
        ) {
            return NextResponse.json(
                { error: "year debe ser número y month debe estar entre 1 y 12" },
                { status: 400 }
            );
        }

        const db = await getDataSource();
        const nominaRepo = db.getRepository(Nomina);

        const { rango1, rango2 } = dividirMesEnRangos(Number(year), Number(month));

        const period1 = `${formatear(rango1.inicio)} - ${formatear(rango1.fin)}`;
        const period2 = `${formatear(rango2.inicio)} - ${formatear(rango2.fin)}`;

        // Evitar duplicados
        const existentes = await nominaRepo.find({
            where: [{ period: period1 }, { period: period2 }]
        });

        if (existentes.length > 0) {
            return NextResponse.json(
                { error: "Los periodos ya existen en la base de datos" },
                { status: 409 }
            );
        }

        const nominaPrimeraQuincena = nominaRepo.create({ period: period1 });
        const nominaSegundaQuincena = nominaRepo.create({ period: period2 });

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
            { error: "Error interno en el servidor" },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const db = await getDataSource();
        const nominaRepo = db.getRepository(Nomina);
        const nominas = await nominaRepo.find();
        return NextResponse.json(nominas, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Error interno en el servidor" },
            { status: 500 }
        );
    }
}
