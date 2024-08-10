import { NextResponse } from "next/server";
import { createCanvas, loadImage } from "canvas";
import { wrapText } from "@/lib/meme"; 

async function vr(text: string): Promise<string> {
  if (!text) throw new Error("You are missing the Text");
  if (typeof text !== "string") throw new TypeError("Text must be a string");
  if (text.length > 75)
    throw new RangeError("Text length must be less than 75 characters");

  try {
    const canvas = createCanvas(680, 670);
    const ctx = canvas.getContext("2d");
    const imgResponse = await fetch(
      "https://raw.githubusercontent.com/DankMemer/imgen/master/assets/vr/vr.bmp"
    );

    if (!imgResponse.ok) {
      throw new Error("Failed to fetch the image");
    }

    const imgBuffer = await imgResponse.arrayBuffer();
    const image = await loadImage(Buffer.from(imgBuffer));

    ctx.drawImage(image, 0, 0, 680, 670);
    ctx.font = "16px Poppins";
    ctx.fillStyle = "#000000";

    const maxWidth = 155;
    const lineHeight = 30;
    wrapText(ctx, text, 80, 485, maxWidth, lineHeight);

    // Return the base64-encoded image
    return canvas.toDataURL("image/png").split(",")[1];
  } catch (error) {
    throw new Error(
      `Failed to generate VR image: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}

export async function POST(req: Request) {
  try {
    const { text }: { text: string } = await req.json();

    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    const base64Image = await vr(text);
    return NextResponse.json({ meme: base64Image });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to generate meme" },
      { status: 500 }
    );
  }
}
