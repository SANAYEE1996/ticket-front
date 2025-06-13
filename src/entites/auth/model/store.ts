import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import type { AuthState, AuthStore } from "./models";
import { immer } from "zustand/middleware/immer";

export const defaultInitState: AuthState = {
  token: null,
};

export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      immer((set) => ({
        ...defaultInitState,
        updateToken: (payload: string) =>
          set(
            {
              token: payload,
            },
            false,
            "update/token"
          ),
        resetAuthStore: () => {
          set(defaultInitState, false);
        },
      })),
      {
        name: "auth-storage",
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);
