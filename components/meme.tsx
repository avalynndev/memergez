import Image from "next/image";
import {
  Annu,
  AnnuBody,
  AnnuContent,
  AnnuDescription,
  AnnuFooter,
  AnnuHeader,
  AnnuTitle,
  AnnuTrigger,
} from "@/components/ui/annu";
import { Card, CardContent } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";

interface Meme {
  id: string;
  name: string;
  url: string;
  width: number;
  height: number;
  box_count: number;
}

const MemeGenerator: React.FC = () => {
  const [inputs, setInputs] = useState<{ [key: string]: string[] }>({});
  const [memes, setMemes] = useState<Meme[]>([]);
  const [generatedMemes, setGeneratedMemes] = useState<{
    [key: string]: string | null;
  }>({});

  useEffect(() => {
    async function fetchMemes() {
      try {
        const response = await fetch("https://api.imgflip.com/get_memes", {
          next: { revalidate: 21600 },
        });
        const data = await response.json();
        if (data.success) {
          setMemes(data.data.memes);
        } else {
          console.error("Failed to fetch memes");
        }
      } catch (error) {
        console.error("Error fetching memes:", error);
      }
    }

    fetchMemes();
  }, []);

  const handleInputChange = (memeId: string, index: number, value: string) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      [memeId]: prevInputs[memeId]
        ? prevInputs[memeId].map((input, i) => (i === index ? value : input))
        : Array(memes.find((m) => m.id === memeId)?.box_count || 0)
            .fill("")
            .map((input, i) => (i === index ? value : input)),
    }));
  };

  const handleSubmit = async (memeId: string) => {
    const selectedMeme = memes.find((m) => m.id === memeId);
    if (!selectedMeme || !inputs[memeId]) return;

    const formData = new URLSearchParams();
    formData.append("template_id", memeId);
    formData.append("username", "clutchgodfrfr");
    formData.append("password", "$KzdWSUV-z6SUqD");

    inputs[memeId].forEach((text, index) => {
      formData.append(`boxes[${index}][text]`, text);
    });

    try {
      const response = await fetch("https://api.imgflip.com/caption_image", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (data.success) {
        setGeneratedMemes((prevMemes) => ({
          ...prevMemes,
          [memeId]: data.data.url,
        }));
      } else {
        console.error("Failed to generate meme");
      }
    } catch (error) {
      console.error("Error generating meme:", error);
    }
  };

  return (
    <div className="container gap-6 pb-8 flex items-center flex-col ">
      <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {memes.map((item) => (
          <Annu key={item.id}>
            <AnnuTrigger asChild>
              <div className="relative group cursor-pointer">
                <div className="aspect-[3/4] bg-muted text-muted relative w-full h-auto min-h-[240px] max-h-[400px] flex items-center justify-center overflow-hidden rounded-lg border shadow-sm">
                  <Image
                    fill
                    className="object-cover"
                    loading="lazy"
                    sizes="100%"
                    alt={item.name}
                    src={item.url}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-60 transition-opacity flex items-center justify-center text-white text-center text-sm px-2">
                    <span className="font-semibold">{item.name}</span>
                  </div>
                </div>
              </div>
            </AnnuTrigger>
            <AnnuContent>
              <AnnuHeader>
                <AnnuTitle>{item.name}</AnnuTitle>
                <AnnuDescription>
                  Generate a new meme using this template
                </AnnuDescription>
              </AnnuHeader>
              <AnnuBody className="space-y-4 pb-4 text-center text-sm sm:pb-0 sm:text-left">
                <div>
                  {Array.from({ length: item.box_count }).map((_, index) => (
                    <Input
                      key={index}
                      type="text"
                      className="border p-2 rounded w-full mb-2"
                      placeholder={`Text for box ${index + 1}`}
                      value={inputs[item.id]?.[index] || ""}
                      onChange={(e) =>
                        handleInputChange(item.id, index, e.target.value)
                      }
                    />
                  ))}
                </div>
                <Button
                  className="pb-2 px-4 rounded-xl"
                  onClick={() => handleSubmit(item.id)}
                >
                  Generate Meme
                </Button>
                {generatedMemes[item.id] && (
                  <div className="w-full max-w-md mt-6">
                    <img
                      className="h-46 object-cover rounded-xl transition-all"
                      width={generatedMemes[item.width]!}
                      height={generatedMemes[item.height]!}
                      src={generatedMemes[item.id]!}
                      alt="Generated Meme"
                      id={`meme-${item.id}`}
                    />
                    <Link
                      href={generatedMemes[item.id] || ""}
                      className="mt-2 inline-block"
                    >
                      <Button
                        variant="outline"
                        className="pb-2 px-4 rounded-xl"
                      >
                        Download Meme
                      </Button>
                    </Link>
                  </div>
                )}
              </AnnuBody>
              <AnnuFooter>
                <span className="text-sm text-muted-foreground ml-4">
                  Crafted with ❤️
                </span>
              </AnnuFooter>
            </AnnuContent>
          </Annu>
        ))}
      </div>
    </div>
  );
};

export default MemeGenerator;
