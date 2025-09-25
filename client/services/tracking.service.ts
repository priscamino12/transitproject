import api from "@/config/axiosInstance";
import { Tracking } from "@/types/tracking.interface";

export const trackingService = {
  getByCode: async (code: string): Promise<Tracking> => {
    const res = await api.get(`/tracking/${code}`);
    return res.data;
  },
};
