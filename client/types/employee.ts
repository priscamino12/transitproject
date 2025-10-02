export interface Employee {
  idEmploye: number;
  nomEmploye: string;
  emailEmploye: string;
  role: string; // "admin" ou autre
  idEntreprise: number;
  token?: string; // si ton API retourne un token JWT
}
export interface LoginData {
  email: string;
  password: string;
}

