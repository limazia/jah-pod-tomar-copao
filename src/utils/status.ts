// utils/status.ts

type DayKey = "WEEKDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY";

const DRINK_TIMES: Record<DayKey, { START: number; END: number }> = {
  WEEKDAY: { START: 0, END: 0 }, // No drinking allowed
  THURSDAY: { START: 0, END: 23 }, // Drinking allowed all day
  FRIDAY: { START: 11, END: 6 }, // Drinking allowed from 11:00 to 6:00 next day
  SATURDAY: { START: 11, END: 6 }, // Drinking allowed from 11:00 to 6:00 next day
  SUNDAY: { START: 12, END: 24 }, // Drinking allowed from 12:00 to 00:00
};

const statusTexts: Record<DayKey, string[]> = {
  WEEKDAY: [
    "Ainda não pode beber! 🚫🍺",
    "Aguenta firme, logo chega o dia de beber! ✋🍻",
    "Segunda, terça e quarta são dias de foco! 📅🔒",
  ],
  THURSDAY: [
    "Pode tomar umas de leve! 🍻",
    "Quinta-feira, aquecimento pro fim de semana! 🔥🍺",
    "Quinta liberada, mas com moderação! 🍺✨",
  ],
  FRIDAY: [
    "Sextou, pode beber à vontade! 🍺🎉",
    "Hoje é dia de festa, liberação total! 🎉🥂",
    "Sexta-feira, a noite é nossa! 🍹🌟",
  ],
  SATURDAY: [
    "Sabadou, liberação total! 🍹🥳",
    "Hoje pode tudo, aproveite! 🍸🎊",
    "Sábado é dia de diversão, pode beber! 🍺🌴",
  ],
  SUNDAY: [
    "Domingo de ressaca garantida! 🍷😌",
    "Aproveite o domingo, mas cuidado com a segunda! 🌞🍻",
    "Domingo pode beber, mas sem exageros! 🍺🚀",
  ],
};

export const dayColors: Record<DayKey, string> = {
  //WEEKDAY: "bg-red-500",
  //THURSDAY: "bg-yellow-500",
  //FRIDAY: "bg-green-600",
  //SATURDAY: "bg-green-600",
  //SUNDAY: "bg-green-300",
  WEEKDAY: "#ef4444",
  THURSDAY: "#eab308",
  FRIDAY: "#16a34a",
  SATURDAY: "#16a34a",
  SUNDAY: "#86efac",
};

const getRandomText = (texts: string[]) => {
  const randomIndex = Math.floor(Math.random() * texts.length);
  return texts[randomIndex];
};

export const getDayColor = (day: number): string => {
  switch (day) {
    case 0: // Sunday
      return dayColors.SUNDAY;
    case 4: // Thursday
      return dayColors.THURSDAY;
    case 5: // Friday
      return dayColors.FRIDAY;
    case 6: // Saturday
      return dayColors.SATURDAY;
    default: // Monday, Tuesday, Wednesday
      return dayColors.WEEKDAY;
  }
};

export const isAllowedToDrink = (day: number, hours: number): boolean => {
  const { START, END } = DRINK_TIMES[getDayKey(day)];
  if (START === 0 && END === 0) {
    return false; // No drinking allowed
  }
  return hours >= START || hours < END;
};

const getDayKey = (day: number): DayKey => {
  switch (day) {
    case 0: // Sunday
      return "SUNDAY";
    case 1: // Monday
    case 2: // Tuesday
    case 3: // Wednesday
      return "WEEKDAY";
    case 4: // Thursday
      return "THURSDAY";
    case 5: // Friday
      return "FRIDAY";
    case 6: // Saturday
      return "SATURDAY";
    default:
      return "WEEKDAY"; // Default to WEEKDAY for Monday to Wednesday
  }
};

export const getStatusText = (
  day: number,
  hours: number,
  minutes: number
): string => {
  const key = getDayKey(day);
  const texts = statusTexts[key];
  return getRandomText(texts);
};
