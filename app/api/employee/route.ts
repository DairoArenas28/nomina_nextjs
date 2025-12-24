import { Employee } from "@/src/entities/Employee";
import { PayrollSchemeEnc } from "@/src/entities/PayrollSchemeEnc";
import { getDataSource } from "@/src/lib/typeorm";
import { EmployeeGetResponseSchema, EmployeeResponseSchema } from "@/src/types/employee.type";
import { NextRequest, NextResponse } from "next/server";

const db = await getDataSource();
const employeeRepo = db.getRepository(Employee);
const payrollSchemeEncRepo = db.getRepository(PayrollSchemeEnc);
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
    const employees = await employeeRepo
        .createQueryBuilder("emp")
        .leftJoin("emp.payrollSchemeEnc", "ps")
        .select([
            "emp.id AS id",
            "emp.name AS name",
            "emp.age AS age",
            "emp.documentType AS documentType",
            "emp.documentNumber AS documentNumber",
            "emp.country AS country",
            "emp.address AS address",
            "emp.phone AS phone",
            "emp.email AS email",
            "emp.hireDate AS hireDate",
            "emp.contractType AS contractType",
            "emp.position AS position",
            "emp.salary AS salary",
            "emp.eps AS eps",
            "emp.pension AS pension",
            "emp.arl AS arl",
            "emp.bank AS bank",
            "emp.accountType AS accountType",
            "emp.accountNumber AS accountNumber",
            "ps.id AS payrollSchemeEnc_id",
            "ps.description AS payrollSchemeEncDescription",
        ])
        .orderBy("emp.name", "ASC")
        .getRawMany();
    const employeesMapped = employees.map(item => ({
        id: item.id,
        name: item.name,
        age: item.age,
        documentType: item.documenttype, // OJO la propiedad es lowercase
        documentNumber: item.documentnumber,
        country: item.country,
        address: item.address,
        phone: item.phone,
        email: item.email,
        hireDate: item.hiredate,
        contractType: item.contracttype,
        position: item.position,
        salary: item.salary,
        eps: item.eps,
        pension: item.pension,
        arl: item.arl,
        bank: item.bank,
        accountType: item.accounttype,
        accountNumber: item.accountnumber,
        payrollSchemeEnc_id: item.payrollschemeenc_id,
        payrollSchemeEncDescription: item.payrollschemeencdescription
    }));
    // Validación con Zod
    const parsed = EmployeeGetResponseSchema.parse(employeesMapped);
    //console.log(parsed)
    return NextResponse.json(parsed);
}

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const payrollSchemeEnc = await payrollSchemeEncRepo.findOneBy({
            id: body.payrollSchemeEnc_id
        });

        if (!payrollSchemeEnc) {
            return NextResponse.json(
                { error: "PayrollSchemeEnc not found" },
                { status: 404 }
            );
        }

        const employee = employeeRepo.create({
            ...body,
            valueDaySalary: body.salary / payrollSchemeEnc.workingDaysPerMonth,
            valueHoursSalary: body.salary / payrollSchemeEnc.totalHoursPeriod,
            payrollSchemeEnc
        });

        const saved = await employeeRepo.save(employee);

        return NextResponse.json({
            data: saved,
            message: "Employee created successfully"
        });

    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}