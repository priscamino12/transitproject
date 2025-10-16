import api from "@/config/axiosInstance";
import { Employe } from "../type/employe";

// Nouveau type pour la création/mise à jour côté frontend
export type EmployeInput = Omit<Employe, "idEmploye" | "entreprise"> & { motDePasse?: string };

interface EmployeResponse<T = Employe | Employe[]> {
  success: boolean;
  message: string;
  data: T;
}

// Récupérer tous les employés
export async function getEmployes(): Promise<EmployeResponse<Employe[]>> {
  const res = await api.get<EmployeResponse<Employe[]>>("/employe");
  return res.data;
}

// Récupérer un employé par id
export async function getEmployeById(id: number): Promise<Employe> {
  const res = await api.get<EmployeResponse<Employe>>(`/employe/${id}`);
  return res.data.data;
}

// Créer un employé
export async function createEmploye(data: EmployeInput): Promise<Employe> {
  const res = await api.post<EmployeResponse<Employe>>("/employe", data);
  return res.data.data;
}

// Mettre à jour un employé
export async function updateEmploye(id: number, data: EmployeInput): Promise<Employe> {
  const res = await api.put<EmployeResponse<Employe>>(`/employe/${id}`, data);
  return res.data.data;
}

// Supprimer un employé
export async function deleteEmploye(id: number): Promise<void> {
  await api.delete(`/employe/${id}`);
}
