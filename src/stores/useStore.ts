import { create } from "zustand";

type StatusType = {
  text: string | undefined;
  bg: string;
};

type StoreState = {
  isReleased: boolean;
  setIsReleased: (value: boolean) => void;
  status: StatusType | undefined;
  setStatus: (status: StatusType) => void;
};

export const useStore = create<StoreState>((set) => ({
  isReleased: false,
  setIsReleased: (value) => set({ isReleased: value }),
  status: undefined,
  setStatus: (status) => set({ status }),
}));
