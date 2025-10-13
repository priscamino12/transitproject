import { DecodedToken } from "./types/navbar"
import {jwtDecode} from "jwt-decode"

export const AuthService = {
  getUserNameFromToken(): string | null {
    const token = localStorage.getItem("token")
    if (!token) return null
    try {
      const decoded = jwtDecode<DecodedToken>(token)
      return decoded.nom
    } catch (err) {
      console.error("Token invalide", err)
      localStorage.removeItem("token")
      return null
    }
  }
}
