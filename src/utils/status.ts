export type DayKey = "WEEKDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY";

export interface DrinkStatus {
  key: DayKey;
  text: string;
  released: boolean;
}

export const TIME_ZONE = "America/Sao_Paulo";

const DAYS = {
  WEEKDAY: {
    released: false,
    texts: [
      "Ainda não pode beber! 🚫🍺",
      "Aguenta firme, logo chega o dia de beber! ✋🍻",
      "Segunda, terça e quarta são dias de foco! 📅🔒",
    ],
  },
  THURSDAY: {
    released: true,
    texts: [
      "Pode tomar umas de leve! 🍻",
      "Quinta-feira, aquecimento pro fim de semana! 🔥🍺",
      "Quinta liberada, mas com moderação! 🍺✨",
    ],
  },
  FRIDAY: {
    released: true,
    texts: [
      "Sextou, pode beber à vontade! 🍺🎉",
      "Hoje é dia de festa, liberação total! 🎉🥂",
      "Sexta-feira, a noite é nossa! 🍹🌟",
    ],
  },
  SATURDAY: {
    released: true,
    texts: [
      "Sabadou, liberação total! 🍹🥳",
      "Hoje pode tudo, aproveite! 🍸🎊",
      "Sábado é dia de diversão, pode beber! 🍺🌴",
    ],
  },
  SUNDAY: {
    released: true,
    texts: [
      "Domingo de ressaca garantida! 🍷😌",
      "Aproveite o domingo, mas cuidado com a segunda! 🌞🍻",
      "Domingo pode beber, mas sem exageros! 🍺🚀",
    ],
  },
} satisfies Record<DayKey, { released: boolean; texts: string[] }>;

const DAY_BY_WEEKDAY: Record<string, DayKey> = {
  Sun: "SUNDAY",
  Mon: "WEEKDAY",
  Tue: "WEEKDAY",
  Wed: "WEEKDAY",
  Thu: "THURSDAY",
  Fri: "FRIDAY",
  Sat: "SATURDAY",
};

const weekdayFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: TIME_ZONE,
  weekday: "short",
});

export function getDrinkStatus(now: Date = new Date()): DrinkStatus {
  const key = DAY_BY_WEEKDAY[weekdayFormatter.format(now)];
  const { released, texts } = DAYS[key];

  return {
    key,
    released,
    text: texts[Math.floor(Math.random() * texts.length)],
  };
}
