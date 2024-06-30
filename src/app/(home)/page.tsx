"use client";

import { useEffect } from "react";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";

import { cn } from "@/utils/cn";
import { getStatus } from "@/utils/status";
import { useStore } from "@/stores/useStore";

import { Section } from "@/components/section";

export default function Home() {
  const { width, height } = useWindowSize();

  const [isReleased, status, setIsReleased, setStatus] = useStore((state) => [
    state.isReleased,
    state.status,
    state.setIsReleased,
    state.setStatus,
  ]);

  useEffect(() => {
    async function fetchStatus() {
      await getStatus({ setIsReleased, setStatus });
    }

    fetchStatus();
  }, []);

  function handlePlay() {
    const audio = new Audio("latinha.mp3");

    audio.play();
  }

  return (
    <main className={cn(status?.bg)}>
      {isReleased && <Confetti width={width} height={height} />}

      <Section
        className={cn(
          "h-screen flex justify-center items-center flex-col relative"
        )}
      >
        <div className="flex flex-col items-center text-center">
          <span className="text-3xl sm:text-5xl md:text-6xl text-white font-light tracking-tighter mb-2 sm:mb-4 md:mb-6">
            JÁ TÁ PODENDO <br />
          </span>
          <span
            className="font-bold text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-white cursor-pointer trasition duration-200 ease-linear hover:scale-[1.03] hover:text-white/80"
            onClick={handlePlay}
          >
            TOMAR COPÃO?
          </span>
          <span className="text-2xl sm:text-2xl md:text-4xl font-bold mt-2 sm:mt-4 md:mt-6 max-w-screen-lg">
            {status?.text}
          </span>
        </div>
      </Section>
    </main>
  );
}
