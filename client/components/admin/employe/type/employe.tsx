export interface Employe {
  idEmploye: number;
  nomEmploye: string;
  emailEmploye: string;
  motDePasse: string;
  role: string;
  idEntreprise: number;
  entreprise: {
    idEntreprise: number;
    nomEntreprise: string;
  };
}
