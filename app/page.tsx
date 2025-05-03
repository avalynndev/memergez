"use client";
import MemeGenerator from "@/components/meme";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

const MemePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 space-y-8">
      <section className="space-y-6 py-12 sm:py-20 lg:py-24">
        <div className="container flex max-w-screen-md flex-col items-center gap-5 text-center">
          <h1 className="font-satoshi text-[40px] font-black leading-[1.15] tracking-tight sm:text-5xl md:text-6xl md:leading-[1.15]">
            Generate Your <span className="text-primary">Perfect Meme</span>{" "}
            Now.
          </h1>
          <p className="max-w-2xl text-balance text-muted-foreground sm:text-lg">
            I created this site so you can easily create and share memes for
            fun, humor, or just to express yourself. Get started below!
          </p>
          <div className="flex justify-center space-x-2">
            <Link
              href="/memer"
              prefetch={true}
              className={"group hover:scale-[1.025]"}
            >
              <Button className="rounded-xl">
                Explore Memer.ts
                <ArrowRightIcon className="pl-1 size-4 group-hover:translate-x-1 duration-200 transition-transform" />
              </Button>
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </section>
      <MemeGenerator />
    </div>
  );
};

export default MemePage;
