// types.ts
export interface Entreprise {
  idEntreprise: number;
  nomEntreprise: string;
  logoEntreprise: string;
  adresseEntreprise: string;
  nif: string;
  statJuridique: string;
  statusAbonnement: string;
  dateDebutAbonnement: string;
  typeAcces: { id: number; nom: string };
  paiements: Paiement[];
}

export interface Paiement {
  id: number;
  montant: number;
  datePaiement: string;
  entrepriseId: number;
}

export interface DashboardStatsType {
  title: string;
  value: string | number;
  change: string;
  description: string;
  changeType: "positive" | "negative";
  icon: any;
}
