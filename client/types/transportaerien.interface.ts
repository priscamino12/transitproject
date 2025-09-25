export interface TransportAerien {
  idTransAerienne: number
  numVol: string
  nomCompagnie: string
  dateChargement: string
  paysChargement: string
  villeChargement: string
  paysDechargement: string
  villeDechargement: string
  statut: "En vol" | "Programmé" | "Arrivé" | "Retardé" | string
  createdAt?: string
  updatedAt?: string
}
