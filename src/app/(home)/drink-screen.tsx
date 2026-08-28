"use client";

import { useState } from "react";
import Confetti from "react-confetti";

import { useWindowSize } from "@/hooks/use-window-size";
import type { DayKey } from "@/utils/status";
import { cn } from "@/utils/cn";

const backgrounds: Record<DayKey, string> = {
  SUNDAY: "bg-linear-to-b from-yellow-500 via-yellow-600 to-yellow-700",
  WEEKDAY: "bg-linear-to-b from-red-400 via-red-500 to-red-600",
  THURSDAY: "bg-linear-to-b from-blue-500 via-blue-600 to-blue-700",
  FRIDAY: "bg-linear-to-b from-green-500 via-green-600 to-green-700",
  SATURDAY: "bg-linear-to-b from-green-500 via-green-600 to-green-700",
};

interface DrinkScreenProps {
  dayKey: DayKey;
  text: string;
  released: boolean;
}

export function DrinkScreen({ dayKey, text, released }: DrinkScreenProps) {
  const { width, height } = useWindowSize();

  const [isPlaying, setIsPlaying] = useState(false);

  async function handlePlay() {
    if (isPlaying) return;

    const audio = new Audio("/latinha.mp3");

    audio.addEventListener("ended", () => setIsPlaying(false), { once: true });
    setIsPlaying(true);

    try {
      await audio.play();
    } catch {
      // Autoplay bloqueado ou arquivo indisponível: destrava o clique de novo.
      setIsPlaying(false);
    }
  }

  return (
    <main className={cn("min-h-dvh", backgrounds[dayKey])}>
      {released && <Confetti width={width} height={height} />}

      <section className="container select-none mx-auto px-8 flex justify-center items-center min-h-dvh">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-3xl sm:text-5xl md:text-6xl text-white font-light tracking-tighter mb-2 sm:mb-4 md:mb-6">
            JÁ TÁ PODENDO
          </h1>
          <button
            type="button"
            onClick={handlePlay}
            className="font-bold text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-white cursor-pointer transition duration-200 ease-linear hover:scale-[1.03] hover:text-white/90"
          >
            TOMAR COPÃO?
          </button>
          <p className="text-2xl md:text-4xl font-bold mt-2 sm:mt-4 md:mt-6 max-w-(--breakpoint-lg) text-white">
            {text}
          </p>
        </div>
      </section>
    </main>
  );
}
