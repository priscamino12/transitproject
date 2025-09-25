// src/services/transportaerien.service.ts
import api from "@/config/axiosInstance"
import { TransportAerien } from "@/types/transportaerien.interface"

class TransportAerienService {
  // Récupérer tous les transports
  async getAll(): Promise<TransportAerien[]> {
    const response = await api.get("/transAerienne/")
    return response.data
  }

  // Récupérer par ID
  async getById(id: number): Promise<TransportAerien> {
    const response = await api.get(`/transAerienne/${id}`)
    return response.data
  }

  // Créer un nouveau transport
  async create(data: Omit<TransportAerien, "idTransAerienne">): Promise<TransportAerien> {
    const response = await api.post("/transAerienne/", data)
    return response.data
  }

  // Mettre à jour un transport existant
  async update(id: number, data: Partial<TransportAerien>): Promise<TransportAerien> {
    const response = await api.put(`/transAerienne/${id}`, data)
    return response.data
  }

  // Supprimer un transport
  async delete(id: number): Promise<void> {
    await api.delete(`/transAerienne/${id}`)
  }
}

export const transportAerienService = new TransportAerienService()
