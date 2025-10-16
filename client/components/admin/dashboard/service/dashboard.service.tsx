// dashboardService.ts
import api from "@/config/axiosInstance";
import { Entreprise, Paiement } from "../type/dashboardtype";

export const getTotalEntreprises = async (): Promise<number> => {
  try {
    const res = await api.get("/entreprise");
    return res.data.data.length;
  } catch (error) {
    console.error("Erreur récupération entreprises:", error);
    return 0;
  }
};

export const getAbonnementsActifs = async (): Promise<number> => {
  try {
    const res = await api.get("/abonnement");
    const actifs = res.data.data.filter((abo: any) => {
      const now = new Date();
      return new Date(abo.dateDebut) <= now && new Date(abo.dateFin) >= now;
    });
    return actifs.length;
  } catch (error) {
    console.error("Erreur récupération abonnements:", error);
    return 0;
  }
};

export const getRevenusTotaux = async (): Promise<number> => {
  try {
    const res = await api.get("/paiement");
    const total = res.data.data.reduce((acc: number, paiement: Paiement) => acc + paiement.montant, 0);
    return total;
  } catch (error) {
    console.error("Erreur récupération revenus:", error);
    return 0;
  }
};
