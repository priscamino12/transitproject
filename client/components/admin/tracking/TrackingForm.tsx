"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FiArrowLeft, FiSave, FiX, FiPackage } from "react-icons/fi"

interface TrackingFormProps {
  onSave: (data: any) => void
  onCancel: () => void
}

export function TrackingForm({ onSave, onCancel }: TrackingFormProps) {
  const [formData, setFormData] = useState({
    trackingCode: "",
    client: "",
    origin: "",
    destination: "",
    weight: "",
    transportMode: "aerial",
    status: "Validation",
    currentLocation: "",
    estimatedDelivery: "",
    description: "",
    notes: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Generate tracking code if not provided
    if (!formData.trackingCode) {
      const date = new Date()
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, "0")
      const day = String(date.getDate()).padStart(2, "0")
      const random = Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, "0")
      const prefix = formData.transportMode === "aerial" ? "MAWB" : "MBL"
      formData.trackingCode = `${prefix}-${year}${month}${day}-${random}`
    }

    onSave(formData)
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const statuses = ["Validation", "Préparation", "Douane", "Expédition", "Arrivé au port d'arrivé", "Livraison"]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={onCancel}>
            <FiArrowLeft className="w-4 h-4" />
          </Button>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary rounded-lg">
              <FiPackage className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Ajouter un Suivi</h1>
              <p className="text-muted-foreground">Créez une nouvelle entrée de suivi de colis</p>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Informations du Colis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="trackingCode">Code de suivi</Label>
                    <Input
                      id="trackingCode"
                      value={formData.trackingCode}
                      onChange={(e) => handleChange("trackingCode", e.target.value)}
                      placeholder="Auto-généré si vide"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="transportMode">Mode de transport *</Label>
                    <Select
                      value={formData.transportMode}
                      onValueChange={(value) => handleChange("transportMode", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="aerial">Aérien</SelectItem>
                        <SelectItem value="maritime">Maritime</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="client">Client *</Label>
                    <Input
                      id="client"
                      value={formData.client}
                      onChange={(e) => handleChange("client", e.target.value)}
                      placeholder="Nom du client"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="weight">Poids</Label>
                    <Input
                      id="weight"
                      value={formData.weight}
                      onChange={(e) => handleChange("weight", e.target.value)}
                      placeholder={formData.transportMode === "aerial" ? "1.5 tonnes" : "15 TEU"}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="origin">Origine *</Label>
                    <Input
                      id="origin"
                      value={formData.origin}
                      onChange={(e) => handleChange("origin", e.target.value)}
                      placeholder={formData.transportMode === "aerial" ? "Paris CDG" : "Le Havre"}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="destination">Destination *</Label>
                    <Input
                      id="destination"
                      value={formData.destination}
                      onChange={(e) => handleChange("destination", e.target.value)}
                      placeholder={formData.transportMode === "aerial" ? "New York JFK" : "Shanghai"}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="currentLocation">Position actuelle</Label>
                    <Input
                      id="currentLocation"
                      value={formData.currentLocation}
                      onChange={(e) => handleChange("currentLocation", e.target.value)}
                      placeholder="Position actuelle du colis"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="estimatedDelivery">Livraison prévue</Label>
                    <Input
                      id="estimatedDelivery"
                      type="date"
                      value={formData.estimatedDelivery}
                      onChange={(e) => handleChange("estimatedDelivery", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleChange("description", e.target.value)}
                    placeholder="Description du colis et de son contenu..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Statut Actuel</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="status">Étape actuelle</Label>
                    <Select value={formData.status} onValueChange={(value) => handleChange("status", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {statuses.map((status) => (
                          <SelectItem key={status} value={status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes internes</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => handleChange("notes", e.target.value)}
                    placeholder="Notes pour l'équipe..."
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col space-y-2">
              <Button type="submit" className="w-full">
                <FiSave className="w-4 h-4 mr-2" />
                Créer le suivi
              </Button>
              <Button type="button" variant="outline" onClick={onCancel} className="w-full bg-transparent">
                <FiX className="w-4 h-4 mr-2" />
                Annuler
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
