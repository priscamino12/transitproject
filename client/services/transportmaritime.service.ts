import api from "@/config/axiosInstance"
import { TransportMaritime } from "@/types/transportmaritime.interface"

class TransportMaritimeService {
  async getAll(): Promise<TransportMaritime[]> {
    const response = await api.get("/transMaritime/")
    return response.data
  }

  async getById(id: number): Promise<TransportMaritime> {
    const response = await api.get(`/transMaritime/${id}`)
    return response.data
  }

  async create(data: Omit<TransportMaritime, "idTransMaritime">): Promise<TransportMaritime> {
    const response = await api.post("/transMaritime/", data)
    return response.data
  }

  async update(id: number, data: Partial<TransportMaritime>): Promise<TransportMaritime> {
    const response = await api.put(`/transMaritime/${id}`, data)
    return response.data
  }

  async delete(id: number): Promise<void> {
    await api.delete(`/transMaritime/${id}`)
  }
}

export const transportMaritimeService = new TransportMaritimeService()
