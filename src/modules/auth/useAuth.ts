import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type AuthState = {
  isLoggedIn: boolean;
  accessToken: string;
  refreshToken: string;
  login: ({
    accessToken,
    refreshToken,
  }: {
    accessToken: string;
    refreshToken: string;
  }) => void;
  logout: () => void;
};

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      isLoggedIn: false,
      accessToken: "",
      refreshToken: "",
      login: ({ accessToken, refreshToken }) =>
        set({ accessToken, refreshToken, isLoggedIn: true }),
      logout: () =>
        set({ accessToken: "", refreshToken: "", isLoggedIn: false }),
    }),
    { name: "auth-state", storage: createJSONStorage(() => localStorage) }
  )
);

// export const useAuth = create<AuthState>((set, get) => ({
//   isLoggedIn: false,
//   accessToken: "",
//   refreshToken: "",
//   login: ({ accessToken, refreshToken }) =>
//     set({ accessToken, refreshToken, isLoggedIn: true }),
//   logout: () => set({ accessToken: "", refreshToken: "", isLoggedIn: false }),
// }));
