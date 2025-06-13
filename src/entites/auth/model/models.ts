export interface AuthState {
  token: string | null;
}
export interface AuthActions {
  updateToken: (token: string) => void;
  resetAuthStore: () => void;
}

export type AuthStore = AuthState & AuthActions;
