import { NextResponse } from "next/server";
import { Memer } from "memer.ts"

export async function POST(req: Request) {
  try {
    const { text }: { text: string } = await req.json();

    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }
    const memer = new Memer(true);

    const base64Image = await memer.vr(text, false);
    return NextResponse.json({ meme: base64Image });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to generate meme" },
      { status: 500 }
    );
  }
}
