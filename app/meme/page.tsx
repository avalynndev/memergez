"use client";
import MemeGenerator from "@/components/meme";
import { ThemeToggle } from "@/components/theme-toggle";
const MemePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 space-y-8">
      <header className="text-3xl flex items-center space-x-4">
        <h1>Generate Meme</h1>
        <ThemeToggle />
      </header>
      <MemeGenerator />
    </div>
  );
};

export default MemePage;
