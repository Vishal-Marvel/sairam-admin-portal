import { create } from "zustand";

interface LoaderStore {
  isOpen: boolean;
  startLoad: () => void;
  stopLoad: () => void;
}

export const useLoader = create<LoaderStore>((set) => ({
  isOpen: false,
  startLoad: () => set({ isOpen: true }),
  stopLoad: () => set({ isOpen: false }),
}));
