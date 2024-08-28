import { NextResponse } from "next/server";
import { Memer } from "memer.ts-canvas";

export async function POST(req: Request) {
  try {
    const { text, option }: { text: string; option: string } = await req.json();

    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    const memer = new Memer();
    let base64Image;

    if (option === "vr") {
      base64Image = await memer.vr(text, false);
    } else if (option === "trash") {
      base64Image = await memer.trash(text, false);
    } else if (option === "dab") {
      base64Image = await memer.dab(text, false);
    } else if (option === "disability") {
      base64Image = await memer.disability(text, false);
    } else if (option === "door") {
      base64Image = await memer.door(text, false);
    } else if (option === "egg") {
      base64Image = await memer.egg(text, false);
    } else if (option === "excuseme") {
      base64Image = await memer.excuseme(text, false);
    } else if (option === "failure") {
      base64Image = await memer.failure(text, false);
    } else if (option === "hitler") {
      base64Image = await memer.hitler(text, false);
    } else if (option === "humanity") {
      base64Image = await memer.humanity(text, false);
    } else if (option === "idelete") {
      base64Image = await memer.idelete(text, false);
    } else if (option === "jail") {
      base64Image = await memer.jail(text, false);
    } else if (option === "roblox") {
      base64Image = await memer.roblox(text, false);
    } else if (option === "satan") {
      base64Image = await memer.satan(text, false);
    } else if (option === "stonks") {
      base64Image = await memer.stonks(text, false);
    } else {
      return NextResponse.json(
        { error: "Invalid meme option" },
        { status: 400 }
      );
    }

    return NextResponse.json({ meme: base64Image });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to generate meme, you might have entered an unsupported image type." },
      { status: 500 }
    );
  }
}
