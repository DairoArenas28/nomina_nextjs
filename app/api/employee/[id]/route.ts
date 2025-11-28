import { Employee } from "@/src/types/employee.type";
import { readFile, writeFile } from "fs/promises";
import path from "path";

const filePath = path.join(process.cwd(),"public", "data.json");

export async function DELETE(req: Request,  context: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await context.params;  // ← IMPORTANTE
        console.log(id)
        const file = await readFile(filePath, "utf-8");
        const json: { data: Employee[] } = JSON.parse(file);

        if (!Array.isArray(json.data)) {
            throw new Error("El archivo JSON no contiene 'data' como un array.");
        }

        const newData = json.data.filter((item) => item.id !== Number(id));

        await writeFile(
            filePath,
            JSON.stringify({ data: newData }, null, 2),
            "utf-8"
        );

        return new Response(JSON.stringify({ ok: true }), { status: 200 });
    } catch (e) {
        console.error("ERROR DELETE:", e);
        return new Response(JSON.stringify({ error: "Error al eliminar" }), { status: 500 });
    }
}
