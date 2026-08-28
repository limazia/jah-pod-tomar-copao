"use client";

import { useSyncExternalStore } from "react";

function subscribe(onStoreChange: () => void) {
  window.addEventListener("resize", onStoreChange);

  return () => window.removeEventListener("resize", onStoreChange);
}

export function useWindowSize() {
  const width = useSyncExternalStore(
    subscribe,
    () => window.innerWidth,
    () => 0
  );
  const height = useSyncExternalStore(
    subscribe,
    () => window.innerHeight,
    () => 0
  );

  return { width, height };
}
