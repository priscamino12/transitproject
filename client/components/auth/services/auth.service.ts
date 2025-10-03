import api from "@/config/axiosInstance";
import { LoginDto, LoginResponse } from "@/components/auth/types/auth";

export class AuthService {
  static async login(payload: LoginDto): Promise<LoginResponse> {
    const res = await api.post<LoginResponse>("/auth/login", payload);
    return res.data;
  }
}
