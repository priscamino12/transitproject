// register.service.ts
import { TypeAcces, ModePaiement } from "../types/register";
import api from "@/config/axiosInstance";

export const getTypesAcces = async (): Promise<TypeAcces[]> => {
  const res = await api.get("/type-acces");
  console.log("Réponse API TypeAcces:", res.data); // debug
  return res.data.data; // <-- ici on prend bien le tableau
};


export const getModesPaiement = async (): Promise<ModePaiement[]> => {
  const res = await api.get("/mode-paiement");
  return res.data.data;
};


export const createEntreprise = async (payload: any) => {
  const res = await api.post("/entreprise", payload);
  console.log("📦 Réponse backend createEntreprise:", res.data);
  return res.data.data;
};


export const createAbonnement = async (payload: any) => {
  const res = await api.post("/abonnement", payload);
  return res.data.data;
};

export const createPaiement = async (payload: any) => {
  const res = await api.post("/paiement", payload);
  return res.data.data;
};

export const createEmploye = async (payload: any) => {
  const res = await api.post("/employe", payload);
  return res.data.data;
};
