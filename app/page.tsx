"use client";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import Meme from "@/lib/meme";

const memer = new Meme();

export default function Home() {
  const [text, setText] = useState("");
  const [meme, setMeme] = useState<string | null>(null);

  const handleGenerateMeme = async () => {
    try {
      const text = "Your meme text here";
      const imageBuffer = await memer.vr(text);
      setMeme(imageBuffer);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Head>
        <title>Meme Generator</title>
      </Head>
      <h1>Meme Generator</h1>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleGenerateMeme}>Generate Meme</button>
      {meme && (
        <Image
          alt={""}
          src={`data:image/jpeg;base64,${meme}`}
          width={400}
          height={400}
        />
      )}
    </div>
  );
}
