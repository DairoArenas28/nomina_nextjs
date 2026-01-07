import { Config } from "@/src/entities/Config";
import { getDataSource } from "@/src/lib/typeorm";

export async function GET() {
    const db = await getDataSource()
    const configRepo = db.getRepository(Config);
    const [firstRecord] = await configRepo.find({
        order: { id: "ASC" },
        take: 1,
    });

    return new Response(JSON.stringify(firstRecord), { status: 200 });
}

export async function PUT(req: Request) {

    const db = await getDataSource()
    const configRepo = db.getRepository(Config);

    const data = await req.json();

    const [firstRecord] = await configRepo.find({
        order: { id: "ASC" },
        take: 1,
    });

    if (!firstRecord) {
        const newConfig = configRepo.create(data);
        await configRepo.save(newConfig);
    } else {
        const updatedConfig = configRepo.merge(firstRecord, data);
        await configRepo.save(updatedConfig);
    }

    return new Response(JSON.stringify({ message: "Configuración actualizada correctamente" }), { status: 200 });
}
