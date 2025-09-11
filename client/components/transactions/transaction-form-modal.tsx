"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface TransactionFormModalProps {
  isOpen: boolean
  onClose: () => void
}

export function TransactionFormModal({ isOpen, onClose }: TransactionFormModalProps) {
  const [selectedType, setSelectedType] = useState("MAWB")
  const [formData, setFormData] = useState({
    // Données communes
    client: "",
    origine: "",
    destination: "",
    transporteur: "",
    poids: "",
    pieces: "",
    valeur: "",
    description: "",
    // Données spécifiques aérien
    vol: "",
    dateVol: "",
    heureVol: "",
    // Données spécifiques maritime
    navire: "",
    dateDepart: "",
    dateArrivee: "",
    conteneurs: "",
    typeConteneur: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Nouvelle transaction:", { type: selectedType, ...formData })
    onClose()
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const renderAerienFields = () => (
    <>
      <div className="grid grid-cols-3 gap-4">
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
        <div className="space-y-2">
          <Label htmlFor="dateVol">Date de Vol *</Label>
          <Input
            id="dateVol"
            type="date"
            value={formData.dateVol}
            onChange={(e) => handleChange("dateVol", e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="heureVol">Heure de Vol *</Label>
          <Input
            id="heureVol"
            type="time"
            value={formData.heureVol}
            onChange={(e) => handleChange("heureVol", e.target.value)}
            required
          />
        </div>
      </div>
    </>
  )

  const renderMaritimeFields = () => (
    <>
      <div className="grid grid-cols-2 gap-4">
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
        <div className="space-y-2">
          <Label htmlFor="typeConteneur">Type de Conteneur *</Label>
          <Select value={formData.typeConteneur} onValueChange={(value) => handleChange("typeConteneur", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner le type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fcl">FCL (Full Container Load)</SelectItem>
              <SelectItem value="lcl">LCL (Less Container Load)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="conteneurs">Nombre de Conteneurs *</Label>
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
          <Label htmlFor="dateArrivee">Date d'Arrivée *</Label>
          <Input
            id="dateArrivee"
            type="date"
            value={formData.dateArrivee}
            onChange={(e) => handleChange("dateArrivee", e.target.value)}
            required
          />
        </div>
      </div>
    </>
  )

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Nouvelle Transaction</DialogTitle>
          <DialogDescription>Créez un nouveau document de transport (MAWB, HAWB, MBL, HBL)</DialogDescription>
        </DialogHeader>

        <Tabs value={selectedType} onValueChange={setSelectedType} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="MAWB">MAWB</TabsTrigger>
            <TabsTrigger value="HAWB">HAWB</TabsTrigger>
            <TabsTrigger value="MBL">MBL</TabsTrigger>
            <TabsTrigger value="HBL">HBL</TabsTrigger>
          </TabsList>

          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            {/* Champs communs */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="client">Client *</Label>
                <Select value={formData.client} onValueChange={(value) => handleChange("client", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un client" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="societe-abc">Société ABC</SelectItem>
                    <SelectItem value="tech-solutions">Tech Solutions</SelectItem>
                    <SelectItem value="global-trade">Global Trade Co</SelectItem>
                    <SelectItem value="import-export">Import Export Ltd</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="transporteur">Transporteur *</Label>
                <Select value={formData.transporteur} onValueChange={(value) => handleChange("transporteur", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un transporteur" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedType === "MAWB" || selectedType === "HAWB" ? (
                      <>
                        <SelectItem value="air-france">Air France</SelectItem>
                        <SelectItem value="lufthansa">Lufthansa</SelectItem>
                        <SelectItem value="british-airways">British Airways</SelectItem>
                        <SelectItem value="emirates">Emirates</SelectItem>
                      </>
                    ) : (
                      <>
                        <SelectItem value="msc">MSC</SelectItem>
                        <SelectItem value="cma-cgm">CMA CGM</SelectItem>
                        <SelectItem value="maersk">Maersk</SelectItem>
                        <SelectItem value="cosco">COSCO</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="origine">Origine *</Label>
                <Input
                  id="origine"
                  value={formData.origine}
                  onChange={(e) => handleChange("origine", e.target.value)}
                  placeholder={selectedType === "MAWB" || selectedType === "HAWB" ? "CDG - Paris" : "Le Havre"}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="destination">Destination *</Label>
                <Input
                  id="destination"
                  value={formData.destination}
                  onChange={(e) => handleChange("destination", e.target.value)}
                  placeholder={selectedType === "MAWB" || selectedType === "HAWB" ? "JFK - New York" : "Shanghai"}
                  required
                />
              </div>
            </div>

            {/* Champs spécifiques selon le type */}
            {(selectedType === "MAWB" || selectedType === "HAWB") && renderAerienFields()}
            {(selectedType === "MBL" || selectedType === "HBL") && renderMaritimeFields()}

            <div className="grid grid-cols-3 gap-4">
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
              <div className="space-y-2">
                <Label htmlFor="valeur">Valeur (€) *</Label>
                <Input
                  id="valeur"
                  type="number"
                  value={formData.valeur}
                  onChange={(e) => handleChange("valeur", e.target.value)}
                  placeholder="15000"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description de la Marchandise</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="Description détaillée de la marchandise..."
                rows={3}
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Annuler
              </Button>
              <Button type="submit">Créer la Transaction {selectedType}</Button>
            </DialogFooter>
          </form>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
