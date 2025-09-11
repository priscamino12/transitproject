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

interface MaritimeFormModalProps {
  isOpen: boolean
  onClose: () => void
}

export function MaritimeFormModal({ isOpen, onClose }: MaritimeFormModalProps) {
  const [formData, setFormData] = useState({
    compagnie: "",
    navire: "",
    origine: "",
    destination: "",
    dateDepart: "",
    dateArrivee: "",
    client: "",
    conteneurs: "",
    poids: "",
    typeConteneur: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Nouvelle expédition maritime:", formData)
    onClose()
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Nouvelle Expédition Maritime</DialogTitle>
          <DialogDescription>
            Créez une nouvelle expédition par voie maritime en remplissant les informations ci-dessous.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="compagnie">Compagnie Maritime *</Label>
              <Select value={formData.compagnie} onValueChange={(value) => handleChange("compagnie", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une compagnie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="msc">MSC</SelectItem>
                  <SelectItem value="cma-cgm">CMA CGM</SelectItem>
                  <SelectItem value="maersk">Maersk</SelectItem>
                  <SelectItem value="cosco">COSCO</SelectItem>
                  <SelectItem value="hapag-lloyd">Hapag-Lloyd</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="navire">Nom du Navire *</Label>
              <Input
                id="navire"
                value={formData.navire}
                onChange={(e) => handleChange("navire", e.target.value)}
                placeholder="MSC Seaside"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="origine">Port d'Origine *</Label>
              <Input
                id="origine"
                value={formData.origine}
                onChange={(e) => handleChange("origine", e.target.value)}
                placeholder="Le Havre"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="destination">Port de Destination *</Label>
              <Input
                id="destination"
                value={formData.destination}
                onChange={(e) => handleChange("destination", e.target.value)}
                placeholder="Shanghai"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dateDepart">Date de Départ *</Label>
              <Input
                id="dateDepart"
                type="date"
                value={formData.dateDepart}
                onChange={(e) => handleChange("dateDepart", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateArrivee">Date d'Arrivée Prévue *</Label>
              <Input
                id="dateArrivee"
                type="date"
                value={formData.dateArrivee}
                onChange={(e) => handleChange("dateArrivee", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="client">Client *</Label>
              <Select value={formData.client} onValueChange={(value) => handleChange("client", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="societe-abc">Société ABC</SelectItem>
                  <SelectItem value="global-trade">Global Trade Co</SelectItem>
                  <SelectItem value="import-export">Import Export Ltd</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="typeConteneur">Type Conteneur *</Label>
              <Select value={formData.typeConteneur} onValueChange={(value) => handleChange("typeConteneur", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fcl">FCL (Full Container Load)</SelectItem>
                  <SelectItem value="lcl">LCL (Less Container Load)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="conteneurs">Nombre Conteneurs *</Label>
              <Input
                id="conteneurs"
                type="number"
                value={formData.conteneurs}
                onChange={(e) => handleChange("conteneurs", e.target.value)}
                placeholder="45"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="poids">Poids Total (T) *</Label>
              <Input
                id="poids"
                type="number"
                step="0.1"
                value={formData.poids}
                onChange={(e) => handleChange("poids", e.target.value)}
                placeholder="850"
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
