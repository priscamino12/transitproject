import api from "@/config/axiosInstance"
import { Document } from "@/types/document"

export const fetchDocuments = async (): Promise<{
  hbl: Document[]
  hawb: Document[]
  mbl: Document[]
  mawb: Document[]
}> => {
  try {
    const [hblRes, hawbRes, mblRes, mawbRes] = await Promise.all([
      api.get("/hbl"),
      api.get("/hawb"),
      api.get("/mbl"),
      api.get("/mawb"),
    ])
    return {
      hbl: hblRes.data,
      hawb: hawbRes.data,
      mbl: mblRes.data,
      mawb: mawbRes.data,
    }
  } catch (error) {
    console.error("Erreur lors du chargement des documents :", error)
    return { hbl: [], hawb: [], mbl: [], mawb: [] }
  }
}
