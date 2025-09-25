import api from "@/config/axiosInstance";

export async function getTotalExpeditions(): Promise<number> {
  try {
    const maritime = await api.get("/hbl/count/all/");
    const aerienne = await api.get("/hawb/count/all/");
    return maritime.data + aerienne.data;
  } catch (error) {
    console.error("Erreur lors du calcul du total des expéditions :", error);
    return 0;
  }
}

export async function getExpeditionsOnYear(): Promise<{
  total: number;
  maritime: number;
  aerienne: number;
}> {
  try {
    const maritime = await api.get("/hbl/count/onYear/");
    const aerienne = await api.get("/hawb/count/onYear/");
    return {
      total: maritime.data + aerienne.data,
      maritime: maritime.data,
      aerienne: aerienne.data,
    };
  } catch (error) {
    console.error("Erreur lors du calcul des expéditions de l'année :", error);
    return { total: 0, maritime: 0, aerienne: 0 };
  }
}
