import { Concept } from "@/src/entities/Concept";
import { getDataSource } from "@/src/lib/typeorm";
import { ConceptResponseSchema } from "@/src/types/concept.type";
import {  } from "@/src/types/employee.type";
import {  NextResponse } from "next/server";

const db = await getDataSource();
const conceptRepo = db.getRepository(Concept);
/*export async function GET(request: NextRequest) {
    try {
        const content = await fs.readFileSync(filePath, "utf-8")
        const json = JSON.parse(content)
        return NextResponse.json( json )
    } catch (error) {
        return NextResponse.json({ error }, { status: 404 })
    }
}*/
export async function GET() {
    const concepts = await conceptRepo.find();
    // Validación con Zod
    const parsed = ConceptResponseSchema.parse(concepts);
    //console.log(parsed)
    return NextResponse.json(parsed);
}

export async function POST(req: Request) {
    try {
        
        const body = await req.json()

        const concept = conceptRepo.create(body)

        const saved = await conceptRepo.save(concept)

        return NextResponse.json({ data: saved, message: "JSON replaced successfully" });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}