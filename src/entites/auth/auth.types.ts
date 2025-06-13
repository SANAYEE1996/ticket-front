import type { AppResponse } from "../../shared/consts/types";

export type TokenData = {
  accessToken: string;
  refreshToken?: string;
};

export type UserInfo = {
  userId: string | null;
  vanCode: string | null;
  token: string | null;
};

export type LoginResponse = AppResponse<TokenData>;
