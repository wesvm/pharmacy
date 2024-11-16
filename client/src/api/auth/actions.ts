import { apiRequest } from "../api-service";
import type { LoginSchema } from "./validations";

export const signIn = async (credentials: LoginSchema): Promise<LoginResponse> => {
  return apiRequest<LoginResponse>('/auth', {
    method: 'POST',
    body: JSON.stringify(credentials),
  }, false);
};