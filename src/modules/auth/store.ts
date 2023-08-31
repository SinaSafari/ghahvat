import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type RegisterStore = {
  phone: string;
  profileId: string;
  displayName: string;
  password: string;
  verifyPassword: string;
  setRegisterData: (key: keyof RegisterStore, value: string) => void;
};

export const useRegisterStore = create<RegisterStore>()(
  persist(
    (set, get) => ({
      phone: "",
      displayName: "",
      profileId: "",
      password: "",
      verifyPassword: "",
      setRegisterData: (key: keyof RegisterStore, value: string) => {
        return set((state) => ({ ...state, [key]: value }));
      },
    }),
    {
      name: "register-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
