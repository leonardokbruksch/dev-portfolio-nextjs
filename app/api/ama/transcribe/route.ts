/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import OpenAI, { toFile } from "openai";

export const runtime = "nodejs";

const MODEL = "gpt-4o-transcribe";

export async function POST(req: NextRequest) {
    try {
        const form = await req.formData();
        const file = form.get("file");
        if (!(file instanceof File)) return NextResponse.json({ error: "no file" }, { status: 400 });

        const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
        const ofile = await toFile(new Uint8Array(await file.arrayBuffer()), file.name || "speech.webm", {
            type: file.type || "audio/webm",
        });

        const tr = await client.audio.transcriptions.create({ file: ofile, model: MODEL, response_format: "text" });
        const text = typeof tr === "string" ? tr : (tr as any).text ?? "";
        return NextResponse.json({ text });
    } catch {
        return NextResponse.json({ error: "transcribe_failed" }, { status: 500 });
    }
}
