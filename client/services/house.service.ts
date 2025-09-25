import api from "@/config/axiosInstance";
import { House } from "@/types/house.interface";

export const houseService = {
  getAll: async (): Promise<House[]> => {
    const [hawbRes, hblRes] = await Promise.all([api.get("/hawb"), api.get("/hbl")]);

    const airData: House[] = hawbRes.data.map((h: any) => ({
      id: h.idHAWB,
      type: "HAWB",
      numero: h.numHAWB,
      dateEmmission: h.dateEmmission,
      nbColis: h.nbColis,
      poid: h.poid,
      volume: h.volume,
      description: h.description,
      masterNumero: h.MAWB.numMAWB,
      clientExp: h.clientExp.nomClient,
      clientDest: h.clientDest.nomClient,
    }));

    const seaData: House[] = hblRes.data.map((h: any) => ({
      id: h.idHBL,
      type: "HBL",
      numero: h.numHBL,
      dateEmmission: h.dateEmmission,
      nbColis: h.nbColis,
      poid: h.poid,
      volume: h.volume,
      description: h.description,
      masterNumero: h.MBL ? h.MBL.numMBL : "Non défini",
      idMBL: h.MBL ? h.MBL.idMBL : undefined,
      clientExp: h.clientExp ? h.clientExp.nomClient : "Non défini",
      clientDest: h.clientDest ? h.clientDest.nomClient : "Non défini",
      idExpediteur: h.clientExp ? h.clientExp.idClient : undefined,
      idDestinataire: h.clientDest ? h.clientDest.idClient : undefined
    }));

    return [...airData, ...seaData].sort(
      (a, b) => new Date(a.dateEmmission).getTime() - new Date(b.dateEmmission).getTime()
    );
  },

  delete: async (house: House) => {
    return api.delete(house.type === "HAWB" ? `/hawb/${house.id}` : `/hbl/${house.id}`);
  },
};
