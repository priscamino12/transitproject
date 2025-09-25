export type MasterType = "MAWB" | "MBL";

export interface Master {
  id: number;
  type: MasterType;
  numero: string;
  dateEmission: string;
  dateArrivePrevue: string;
  transportName: string;
  transportInfo: any;
}
