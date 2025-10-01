import api from "@/config/axiosInstance";
import { Client } from "@/types/client";

export async function getClients(): Promise<Client[]> {
  const res = await api.get<Client[]>("/client/");
  return res.data;
}

export async function getClientById(id: number): Promise<Client> {
  const res = await api.get<Client>(`/client/${id}`);
  return res.data;
}

export async function createClient(data: Client): Promise<Client> {
  const res = await api.post<Client>("/client/", data);
  return res.data;
}

export async function updateClient(id: number, data: Client): Promise<Client> {
  const res = await api.put<Client>(`/client/${id}`, data);
  return res.data;
}

export async function deleteClient(id: number): Promise<void> {
  await api.delete(`/client/${id}`);
}

