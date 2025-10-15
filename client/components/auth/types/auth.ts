export interface LoginDto {
  email: string;
  password: string;
}

export interface UserInfo {
  id: number;
  nom: string;
  email: string;
  role: string;
  type: string;
  entreprise?: {
    idEntreprise: number;
    nomEntreprise: string;
    logoEntreprise?: string;
  }
}
export interface User {
  id: number;
  nom: string;
  email: string;
  role: string;
  type: string;
  entreprise: {
    idEntreprise: number;
    nomEntreprise: string;
    logoEntreprise?: string | null;
  } | null

}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    userInfo: UserInfo;
  };
}






