import { getDrinkStatus } from "@/utils/status";

import { DrinkScreen } from "./drink-screen";

export const dynamic = "force-dynamic";

export default function Home() {
  const { key, text, released } = getDrinkStatus();

  return <DrinkScreen dayKey={key} text={text} released={released} />;
}
