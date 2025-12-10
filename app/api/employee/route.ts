import { Employee } from "@/src/entities/Employee";
import { getDataSource } from "@/src/lib/typeorm";
import { EmployeeResponseSchema } from "@/src/types/employee.type";
import { NextRequest, NextResponse } from "next/server";

const db = await getDataSource();
const employeeRepo = db.getRepository(Employee);
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
    const employees = await employeeRepo.find();
    // Validación con Zod
    const parsed = EmployeeResponseSchema.parse(employees);
    //console.log(parsed)
    return NextResponse.json(parsed);
}

export async function POST(req: Request) {
    try {
        
        const body = await req.json()

        const employee = employeeRepo.create(body)

        const saved = await employeeRepo.save(employee)

        return NextResponse.json({ data: saved, message: "JSON replaced successfully" });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}