import { Nomina } from "@/src/entities/Nomina";
import { getDataSource } from "@/src/lib/typeorm";
import { NextResponse } from "next/server"




export async function POST(
    request: Request,
    context: { params: Promise<{ id: string }> }
) {
    const db = await getDataSource()
    const nominaRepo = db.getRepository(Nomina)

    const { id } = await context.params;

    console.log(id);

    return NextResponse.json({ id });
}