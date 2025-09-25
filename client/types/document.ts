export type DocumentType = "HBL" | "HAWB" | "MBL" | "MAWB";

export interface Client {
  nomClient: string;
}

export interface Transport {
  villeChargement?: string;
  paysChargement?: string;
  villeDechargement?: string;
  paysDechargement?: string;
  nomCompagnie?: string;
  armateur?: string;
  numVol?: string;
  numIMO?: string;
}

export interface Document {
  idHBL?: number;
  idHAWB?: number;
  idMBL?: number;
  idMAWB?: number;
  numHBL?: string;
  numHAWB?: string;
  numMBL?: string;
  numMAWB?: string;
  dateEmission?: string;
  dateEmmission?: string;
  dateArrivePrevue?: string;
  clientExp?: Client;
  clientDest?: Client;
  poid?: number;
  volume?: number;
  nbColis?: number;
  description?: string;
  MBL?: { TransMaritime: Transport };
  MAWB?: { TransAerienne: Transport };
}
