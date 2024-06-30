"use client";

import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";

import { getDayColor, getStatusText, isAllowedToDrink } from "@/utils/status";

type StatusType = {
  text: string | undefined;
  bg: string;
};

export default function Home() {
  const { width, height } = useWindowSize();

  const [isReleased, setIsReleased] = useState(false);
  const [status, setStatus] = useState<StatusType>();

  useEffect(() => {
    getStatus();
  }, []);

  function getStatus() {
    const currentTime = new Date();
    const day = currentTime.getDay();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();

    const text = getStatusText(day, hours, minutes);
    const bg = getDayColor(day);

    setIsReleased(isAllowedToDrink(day, hours));

    setStatus({ text, bg });
  }

  function handlePlay() {
    const audio = new Audio("latinha.mp3");
    audio.play();
  }

  return (
    <div
      className={status?.bg}
      style={{
        background: status?.bg,
      }}
    >
      {isReleased && <Confetti width={width} height={height} />}

      <section className="container mx-auto px-8 h-screen flex justify-center items-center flex-col relative">
        <div className="flex flex-col items-center text-center">
          <span className="text-3xl sm:text-5xl md:text-6xl text-white font-light tracking-tighter mb-2 sm:mb-4 md:mb-6">
            JÁ TÁ PODENDO <br />
          </span>
          <span
            className="font-bold text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-white cursor-pointer transition duration-200 ease-linear hover:scale-[1.03] hover:text-white/80"
            onClick={handlePlay}
          >
            TOMAR COPÃO?
          </span>
          <span className="text-2xl sm:text-2xl md:text-4xl font-bold mt-2 sm:mt-4 md:mt-6 max-w-screen-lg">
            {status?.text}
          </span>
        </div>
      </section>
    </div>
  );
}
