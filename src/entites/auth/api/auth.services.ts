import { ApiClient } from "../../../shared/api/instances";
import type { LoginResponse } from "../auth.types";
import type { LoginRequestDto } from "./dto/login.dto";

export const login = async (payload: LoginRequestDto) => {
  const data: LoginResponse = await ApiClient.post("api/v1/login", {
    json: payload,
  }).json();

  return data;
};
