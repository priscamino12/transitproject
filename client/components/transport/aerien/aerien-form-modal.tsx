"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface AerienFormModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AerienFormModal({ isOpen, onClose }: AerienFormModalProps) {
  const [formData, setFormData] = useState({
    compagnie: "",
    vol: "",
    origine: "",
    destination: "",
    dateDepart: "",
    heureDepart: "",
    dateArrivee: "",
    heureArrivee: "",
    client: "",
    poids: "",
    pieces: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Nouvelle expédition aérienne:", formData)
    onClose()
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Nouvelle Expédition Aérienne</DialogTitle>
          <DialogDescription>
            Créez une nouvelle expédition par voie aérienne en remplissant les informations ci-dessous.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="compagnie">Compagnie Aérienne *</Label>
              <Select value={formData.compagnie} onValueChange={(value) => handleChange("compagnie", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une compagnie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="air-france">Air France</SelectItem>
                  <SelectItem value="lufthansa">Lufthansa</SelectItem>
                  <SelectItem value="british-airways">British Airways</SelectItem>
                  <SelectItem value="emirates">Emirates</SelectItem>
                  <SelectItem value="qatar">Qatar Airways</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="vol">Numéro de Vol *</Label>
              <Input
                id="vol"
                value={formData.vol}
                onChange={(e) => handleChange("vol", e.target.value)}
                placeholder="AF1234"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="origine">Aéroport d'Origine *</Label>
              <Input
                id="origine"
                value={formData.origine}
                onChange={(e) => handleChange("origine", e.target.value)}
                placeholder="CDG - Paris"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="destination">Aéroport de Destination *</Label>
              <Input
                id="destination"
                value={formData.destination}
                onChange={(e) => handleChange("destination", e.target.value)}
                placeholder="JFK - New York"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dateDepart">Date Départ *</Label>
              <Input
                id="dateDepart"
                type="date"
                value={formData.dateDepart}
                onChange={(e) => handleChange("dateDepart", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="heureDepart">Heure Départ *</Label>
              <Input
                id="heureDepart"
                type="time"
                value={formData.heureDepart}
                onChange={(e) => handleChange("heureDepart", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateArrivee">Date Arrivée *</Label>
              <Input
                id="dateArrivee"
                type="date"
                value={formData.dateArrivee}
                onChange={(e) => handleChange("dateArrivee", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="heureArrivee">Heure Arrivée *</Label>
              <Input
                id="heureArrivee"
                type="time"
                value={formData.heureArrivee}
                onChange={(e) => handleChange("heureArrivee", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="client">Client *</Label>
              <Select value={formData.client} onValueChange={(value) => handleChange("client", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un client" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="societe-abc">Société ABC</SelectItem>
                  <SelectItem value="tech-solutions">Tech Solutions</SelectItem>
                  <SelectItem value="import-export">Import Export Ltd</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="poids">Poids Total (T) *</Label>
              <Input
                id="poids"
                type="number"
                step="0.1"
                value={formData.poids}
                onChange={(e) => handleChange("poids", e.target.value)}
                placeholder="2.5"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pieces">Nombre de Pièces *</Label>
              <Input
                id="pieces"
                type="number"
                value={formData.pieces}
                onChange={(e) => handleChange("pieces", e.target.value)}
                placeholder="45"
                required
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit">Créer l'Expédition</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
