import api from "@/config/axiosInstance";
import { Master } from "@/types/master.interface";

export const masterService = {
  getAll: async (): Promise<Master[]> => {
    const [mawbRes, mblRes] = await Promise.all([api.get("/mawb"), api.get("/mbl")]);

    const airData: Master[] = mawbRes.data
      .filter((m: any) => m.TransAerienne)
      .map((m: any) => ({
        id: m.idMAWB,
        type: "MAWB",
        numero: m.numMAWB,
        dateEmission: m.dateEmission,
        dateArrivePrevue: m.dateArrivePrevue,
        transportName: m.TransAerienne.nomCompagnie,
        transportInfo: m.TransAerienne,
      }));

    const seaData: Master[] = mblRes.data
      .filter((m: any) => m.TransMaritime)
      .map((m: any) => ({
        id: m.idMBL,
        type: "MBL",
        numero: m.numMBL,
        dateEmission: m.dateEmission,
        dateArrivePrevue: m.dateArrivePrevue,
        transportName: m.TransMaritime.nomNavire,
        transportInfo: m.TransMaritime,
      }));

    return [...airData, ...seaData].sort(
      (a, b) => new Date(a.dateEmission).getTime() - new Date(b.dateEmission).getTime()
    );
  },

  delete: async (master: Master) => {
    return api.delete(master.type === "MAWB" ? `/mawb/${master.id}` : `/mbl/${master.id}`);
  },
};
