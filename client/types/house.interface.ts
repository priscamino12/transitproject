export type HouseType = "HAWB" | "HBL";

export interface House {
  id: number;
  type: HouseType;
  numero: string;
  dateEmmission: string;
  nbColis: number;
  poid: number;
  volume: number;
  description: string;
  masterNumero: string;
  idMBL?: number;
  clientExp: string;
  clientDest: string;
  idExpediteur?: number;
  idDestinataire?: number;
}
