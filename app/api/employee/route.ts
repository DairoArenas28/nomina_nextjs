

import fs from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

const filePath = path.join(process.cwd(), "public", "data.json")

export async function GET(request: NextRequest) {
    try {
        const content = await fs.readFileSync(filePath, "utf-8")
        const json = JSON.parse(content)
        return NextResponse.json( json )
    } catch (error) {
        return NextResponse.json({ error }, { status: 404 })
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        await fs.writeFileSync(filePath, JSON.stringify(body, null, 2), "utf-8");
        return NextResponse.json({ message: "JSON replaced successfully" });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}