"use client";
import { cn, isValidImageUrl } from "@/lib/utils";
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
import { useEffect, useState } from "react";
import { MemeOptions } from "@/lib/constants/MemeOptions";

const MemePage = () => {
  const [text, setText  ] = useState("");
  const [meme, setMeme] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [alert, setAlert] = useState<{message: string, type: "passable" | "serious"} | null>(null);
  const [option, setOption] = useState("trash");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (alert && alert.type === "serious") return;

    setLoading(true);
    setError(null);
    setAlert(null);

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

  useEffect(() => {
    if (!option || !text) {
      setError(null);
      setAlert(null);
      return;
    };

    const selectedOption = MemeOptions.find((m) => m.value === option);
    if (!selectedOption) {
      setError("Invalid meme type selected");
      return;
    }

    const is_Text_A_Valid_URL = isValidImageUrl(text);

    if (selectedOption.type === "image" && !is_Text_A_Valid_URL) {
      setAlert({
        message: "Please enter a valid image URL for this meme type",
        type: "serious"
      });
      return;
    }

    if (selectedOption.type === "text" && is_Text_A_Valid_URL) {
      setAlert({
        message: "Please enter text instead of an image URL for this meme type",
        type: "passable"
      });
      return;
    }

    setAlert(null);
    setError(null);
  }, [option, text, isValidImageUrl, MemeOptions]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 5000);

      // Clean up the timer when component unmounts or error changes
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 space-y-8">
      <main className="flex h-screen items-center justify-center">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <h1 className="font-satoshi text-[40px] font-black leading-[1.15] tracking-tight sm:text-5xl md:text-6xl md:leading-[1.15]">
            Generate a meme using
            Memer.ts
          </h1>
          <div className="flex gap-2">
            <Link
              href={"/"}
              className={cn(
                buttonVariants({ variant: "outline" }),
                "rounded-xl"
              )}
            >
              <span>home</span>
            </Link>
            <ThemeToggle />
          </div>
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md border rounded-xl shadow-lg p-6 space-y-4"
          >
            <Input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter your text/avatar URL"
              required
              className="w-full p-3 rounded-xl"
            />

            <Select
              value={option}
              onValueChange={(value: any) => setOption(value)}
            >
              <SelectTrigger className="w-full  p-3 rounded-xl">
                <SelectValue placeholder="Select option" />
              </SelectTrigger>
              <SelectContent>
                {MemeOptions.map((option)=>(
                  <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              type="submit"
              disabled={(loading || (!!alert && alert.type === "serious"))}
              className={`w-full py-3 px-4 rounded-xl font-semibold ${
                (loading || (!!alert && alert.type === "serious")) ? "cursor-not-allowed" : "cursor-pointer active:scale-[0.98] transition-all duration-[0.2s]"
              }`}
            >
              {loading ? "Generating..." : alert && alert.type === "serious" ? "Fix Error" : "Generate Meme"}
            </Button>
          </form>

          {error && <p className="text-center text-red-500">{error}</p>}
          {alert && <p className="text-center text-orange-500">{alert.message}</p>}

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
