type DayKey = "WEEKDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY";

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

const getRandomText = (texts: string[]) => {
  const randomIndex = Math.floor(Math.random() * texts.length);

  return texts[randomIndex];
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

export const isAllowedToDrink = (day: number): boolean => {
  const allowedDays = [0, 4, 5, 6];
  
  return allowedDays.includes(day);
};

export const getStatusText = (day: number): string => {
  const key = getDayKey(day);
  const texts = statusTexts[key];

  return getRandomText(texts);
};
