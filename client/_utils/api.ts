import api from "@/app/axiosInstance";

export async function apiRequest(path: string, method: "GET"|"POST"|"PUT"|"DELETE", data?: any) {
  const response = await api.request({
    url: path,
    method,
    data,
  });
  return response.data;
}
