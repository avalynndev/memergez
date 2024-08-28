"use client";
import MemeGenerator from "@/components/meme";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"; 
import Link from "next/link";
import { useState } from "react";
import { ArrowRightIcon } from "@radix-ui/react-icons";

const MemePage = () => {
  const [text, setText] = useState("");
  const [meme, setMeme] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [option, setOption] = useState("trash"); 

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/meme`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text, option }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.meme) {
          setMeme(`data:image/png;base64,${data.meme}`);
        } else {
          setError("Failed to generate meme. Please try again.");
        }
      } else {
        setError(data.error || "Failed to generate meme.");
      }
    } catch (error) {
      setError("An error occurred while generating the meme.");
      console.error("An error occurred:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 space-y-8">
      <main className="flex h-screen items-center justify-center">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <h1 className="text-5xl md:text-6xl">Generate Meme</h1>
          <div className="flex gap-2">
            <ThemeToggle />

            <Link
              href={"/meme"}
              target="_blank"
              className={cn(buttonVariants({ variant: "ghost" }))}
            >
              <span>More Memes</span>
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Link>
          </div>
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md border rounded-lg shadow-lg p-6 space-y-4"
          >
            <Input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter your text/avatar URL"
              required
              className="w-full p-3 rounded-lg"
            />

            <Select
              value={option}
              onValueChange={(value: any) => setOption(value)}
            >
              <SelectTrigger className="w-full  p-3 rounded-lg">
                <SelectValue placeholder="Select option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="trash">Trash</SelectItem>
                <SelectItem value="vr">VR</SelectItem>
                <SelectItem value="dab">Dab</SelectItem>
                <SelectItem value="disability">Disability</SelectItem>
                <SelectItem value="door">Door</SelectItem>
                <SelectItem value="egg">Egg</SelectItem>
                <SelectItem value="excuseme">Excuse Me</SelectItem>
                <SelectItem value="failure">Failure</SelectItem>
                <SelectItem value="hitler">Hitler</SelectItem>
                <SelectItem value="humanity">Humanity</SelectItem>
                <SelectItem value="idelete">Delete</SelectItem>
                <SelectItem value="jail">Jail</SelectItem>
                <SelectItem value="roblox">Roblox</SelectItem>
                <SelectItem value="satan">Satan</SelectItem>
                <SelectItem value="stonks">Stonks</SelectItem>
              </SelectContent>
            </Select>

            <Button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 rounded-lg font-semibold ${
                loading ? "cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Generating..." : "Generate Meme"}
            </Button>
          </form>

          {error && <p className="text-center text-red-500">{error}</p>}

          {meme && (
            <div className="w-full max-w-md mt-6">
              <img
                src={meme}
                alt="Generated Meme"
                className="border rounded-lg shadow-lg w-full"
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default MemePage;
