"use client";

import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";

import { getStatusText, isAllowedToDrink } from "@/utils/status";
import { cn } from "@/utils/cn";

type StatusType = {
  text: string;
  bg: string;
};

export default function Home() {
  const { width, height } = useWindowSize();

  const [isReleased, setIsReleased] = useState(false);
  const [status, setStatus] = useState<StatusType>();
  const [isPlaying, setIsPlaying] = useState(false);

  const dayColors: Record<number, string> & { default: string } = {
    0: "bg-gradient-to-b from-yellow-500 via-yellow-600 to-yellow-700", // Sunday
    4: "bg-gradient-to-b from-blue-500 via-blue-600 to-blue-700", // Thursday
    5: "bg-gradient-to-b from-green-500 via-green-600 to-green-700", // Friday
    6: "bg-gradient-to-b from-green-500 via-green-600 to-green-700", // Saturday
    default: "bg-gradient-to-b from-red-400 via-red-500 to-red-600", // Weekdays (Monday to Wednesday)
  };

  useEffect(() => {
    getStatus();
  }, []);

  function getStatus() {
    const currentTime = new Date();
    const day = currentTime.getDay();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();

    const text = getStatusText(day, hours, minutes);
    const bg = dayColors[day] || dayColors.default;

    setIsReleased(isAllowedToDrink(day, hours));
    setStatus({ text, bg });
  }

  const handlePlay = () => {
    if (!isPlaying) {
      const audio = new Audio("latinha.mp3");

      setIsPlaying(true);

      audio.addEventListener("ended", () => {
        setIsPlaying(false);
      });

      audio.play();
    }
  };

  return (
    <div className={cn("h-screen", status?.bg)}>
      {isReleased && <Confetti width={width} height={height} />}

      <section className="container select-none mx-auto px-8 flex justify-center items-center h-full">
        <div className="flex flex-col items-center text-center">
          <span className="text-3xl sm:text-5xl md:text-6xl text-white font-light tracking-tighter mb-2 sm:mb-4 md:mb-6">
            JÁ TÁ PODENDO <br />
          </span>
          <span
            className="font-bold text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-white cursor-pointer transition duration-200 ease-linear hover:scale-[1.03] hover:text-white/90"
            onClick={handlePlay}
          >
            TOMAR COPÃO?
          </span>
          <span className="text-2xl sm:text-2xl md:text-4xl font-bold mt-2 sm:mt-4 md:mt-6 max-w-screen-lg text-white">
            {status?.text}
          </span>
        </div>
      </section>
    </div>
  );
}
