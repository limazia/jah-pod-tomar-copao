import { getDayColor, getStatusText, isAllowedToDrink } from "./get-status";

interface StatusProps {
  setIsReleased(isReleased: boolean): void;
  setStatus(status: { text: string; bg: string }): void;
}

export function getStatus({ setIsReleased, setStatus }: StatusProps) {
  const currentTime = new Date();
  const day = currentTime.getDay();
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const text = getStatusText(day, hours, minutes);
  const bg = getDayColor(day);

  setIsReleased(isAllowedToDrink(day, hours));
  setStatus({ text, bg });
}
