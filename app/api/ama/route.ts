/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { cvContext } from "@/lib/ama/profile";

export const runtime = "nodejs";

const systemIntro = `
You are the personal AI for a developer portfolio site. Answer questions about Leo, his skills, experience, projects, and general engineering topics. Use the provided CV/context as primary ground truth. If unsure, say you’re unsure. Keep answers clear and helpful.
`;

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const userMessage: string = body?.message ?? "";
        const extraContext: string = (body?.extraContext ?? "").trim();
        if (!userMessage) return NextResponse.json({ error: "Empty message" }, { status: 400 });

        const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
        const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
            { role: "system", content: systemIntro },
            { role: "system", content: `CV/Context:\n${cvContext}${extraContext ? `\nExtra:\n${extraContext}` : ""}` },
            { role: "user", content: userMessage }
        ];

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            temperature: 0.2,
            messages
        });

        const reply = completion.choices?.[0]?.message?.content ?? "";
        return NextResponse.json({ reply });
    } catch (e: any) {
        return NextResponse.json({ error: "Failed to generate response" }, { status: 500 });
    }
}
