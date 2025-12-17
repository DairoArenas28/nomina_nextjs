import { NominaDet } from "@/src/entities/NominaDet";
import { NominaEnc } from "@/src/entities/NominaEnc";
import { getDataSource } from "@/src/lib/typeorm";
import { NextResponse } from "next/server";


export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {

    const { id } = await context.params;
    const db = await getDataSource()
    const nominaDetRepo = await db.getRepository(NominaDet)
    const nominaDet = await nominaDetRepo
        .createQueryBuilder("det")
        .leftJoinAndSelect("det.concept", "con")
        .where("det.nominaEnc_id = :id", { id: Number(id) })
        .orderBy("con.code", "ASC")
        .getMany();


    return NextResponse.json(nominaDet)
}