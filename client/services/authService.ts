import api from "@/config/axiosInstance";
import { Employee, LoginData } from "@/types/employee";

interface LoginResponse {
  data: Employee;
}

export async function loginEmployee(data: LoginData): Promise<Employee> {
  const res = await api.post<LoginResponse>("/auth/login", data);
  return res.data.data;
}
