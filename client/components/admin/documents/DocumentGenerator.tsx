"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { FiArrowLeft, FiDownload, FiEye, FiSave, FiNavigation, FiAnchor } from "react-icons/fi"

interface DocumentGeneratorProps {
  type: "MAWB" | "HAWB" | "MBL" | "HBL"
  onBack: () => void
  onSave: (data: any) => void
}

export function DocumentGenerator({ type, onBack, onSave }: DocumentGeneratorProps) {
  const [formData, setFormData] = useState({
    // Document info
    documentNumber: "",
    issueDate: new Date().toISOString().split("T")[0],

    // Client info
    shipper: "",
    shipperAddress: "",
    consignee: "",
    consigneeAddress: "",

    // Transport info
    origin: "",
    destination: "",
    departureDate: "",
    arrivalDate: "",

    // Cargo info
    description: "",
    weight: "",
    dimensions: "",
    pieces: "",

    // Financial info
    freightCharges: "",
    insuranceCharges: "",
    customsCharges: "",
    otherCharges: "",
    totalAmount: "",
    currency: "EUR",

    // Additional info
    specialInstructions: "",
    terms: "",
  })

  const isAerial = type === "MAWB" || type === "HAWB"

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value }

      // Auto-calculate total amount
      if (["freightCharges", "insuranceCharges", "customsCharges", "otherCharges"].includes(field)) {
        const freight = Number.parseFloat(updated.freightCharges) || 0
        const insurance = Number.parseFloat(updated.insuranceCharges) || 0
        const customs = Number.parseFloat(updated.customsCharges) || 0
        const other = Number.parseFloat(updated.otherCharges) || 0
        updated.totalAmount = (freight + insurance + customs + other).toFixed(2)
      }

      return updated
    })
  }

  const handleGenerateDocument = () => {
    // Generate document number if not provided
    if (!formData.documentNumber) {
      const date = new Date()
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, "0")
      const day = String(date.getDate()).padStart(2, "0")
      const random = Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, "0")
      formData.documentNumber = `${type}-${year}${month}${day}-${random}`
    }

    onSave({ ...formData, type, transportMode: isAerial ? "aerial" : "maritime" })
  }

  const handlePreview = () => {
    console.log("Aperçu du document:", formData)
    // In a real app, this would open a preview modal
  }

  const handleDownloadPDF = () => {
    console.log("Téléchargement PDF:", formData)
    // In a real app, this would generate and download the PDF
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <FiArrowLeft className="w-4 h-4" />
          </Button>
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${isAerial ? "bg-blue-500" : "bg-teal-500"}`}>
              {isAerial ? <FiNavigation className="w-5 h-5 text-white" /> : <FiAnchor className="w-5 h-5 text-white" />}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Générer Facture {type}</h1>
              <p className="text-muted-foreground">
                Créez une nouvelle facture pour le transport {isAerial ? "aérien" : "maritime"}
              </p>
            </div>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handlePreview}>
            <FiEye className="w-4 h-4 mr-2" />
            Aperçu
          </Button>
          <Button variant="outline" onClick={handleDownloadPDF}>
            <FiDownload className="w-4 h-4 mr-2" />
            Télécharger PDF
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Document Information */}
          <Card>
            <CardHeader>
              <CardTitle>Informations du Document</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="documentNumber">Numéro de document</Label>
                  <Input
                    id="documentNumber"
                    value={formData.documentNumber}
                    onChange={(e) => handleChange("documentNumber", e.target.value)}
                    placeholder="Auto-généré si vide"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="issueDate">Date d'émission</Label>
                  <Input
                    id="issueDate"
                    type="date"
                    value={formData.issueDate}
                    onChange={(e) => handleChange("issueDate", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Client Information */}
          <Card>
            <CardHeader>
              <CardTitle>Informations Client</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Expéditeur</h4>
                  <div className="space-y-2">
                    <Label htmlFor="shipper">Nom de l'expéditeur *</Label>
                    <Input
                      id="shipper"
                      value={formData.shipper}
                      onChange={(e) => handleChange("shipper", e.target.value)}
                      placeholder="Nom de l'entreprise"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="shipperAddress">Adresse de l'expéditeur</Label>
                    <Textarea
                      id="shipperAddress"
                      value={formData.shipperAddress}
                      onChange={(e) => handleChange("shipperAddress", e.target.value)}
                      placeholder="Adresse complète"
                      rows={3}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Destinataire</h4>
                  <div className="space-y-2">
                    <Label htmlFor="consignee">Nom du destinataire *</Label>
                    <Input
                      id="consignee"
                      value={formData.consignee}
                      onChange={(e) => handleChange("consignee", e.target.value)}
                      placeholder="Nom de l'entreprise"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="consigneeAddress">Adresse du destinataire</Label>
                    <Textarea
                      id="consigneeAddress"
                      value={formData.consigneeAddress}
                      onChange={(e) => handleChange("consigneeAddress", e.target.value)}
                      placeholder="Adresse complète"
                      rows={3}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Transport Information */}
          <Card>
            <CardHeader>
              <CardTitle>Informations de Transport</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="origin">Origine *</Label>
                  <Input
                    id="origin"
                    value={formData.origin}
                    onChange={(e) => handleChange("origin", e.target.value)}
                    placeholder={isAerial ? "Paris CDG" : "Le Havre"}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="destination">Destination *</Label>
                  <Input
                    id="destination"
                    value={formData.destination}
                    onChange={(e) => handleChange("destination", e.target.value)}
                    placeholder={isAerial ? "New York JFK" : "Shanghai"}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="departureDate">Date de départ</Label>
                  <Input
                    id="departureDate"
                    type="date"
                    value={formData.departureDate}
                    onChange={(e) => handleChange("departureDate", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="arrivalDate">Date d'arrivée</Label>
                  <Input
                    id="arrivalDate"
                    type="date"
                    value={formData.arrivalDate}
                    onChange={(e) => handleChange("arrivalDate", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cargo Information */}
          <Card>
            <CardHeader>
              <CardTitle>Informations de la Marchandise</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="description">Description de la marchandise *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  placeholder="Description détaillée des marchandises..."
                  rows={3}
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="weight">Poids *</Label>
                  <Input
                    id="weight"
                    value={formData.weight}
                    onChange={(e) => handleChange("weight", e.target.value)}
                    placeholder={isAerial ? "1.5 tonnes" : "15 TEU"}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dimensions">Dimensions</Label>
                  <Input
                    id="dimensions"
                    value={formData.dimensions}
                    onChange={(e) => handleChange("dimensions", e.target.value)}
                    placeholder="L x l x h (cm)"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pieces">Nombre de colis</Label>
                  <Input
                    id="pieces"
                    value={formData.pieces}
                    onChange={(e) => handleChange("pieces", e.target.value)}
                    placeholder="10"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Financial Information */}
          <Card>
            <CardHeader>
              <CardTitle>Informations Financières</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currency">Devise</Label>
                <Select value={formData.currency} onValueChange={(value) => handleChange("currency", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="GBP">GBP</SelectItem>
                    <SelectItem value="JPY">JPY</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="freightCharges">Frais de transport</Label>
                  <Input
                    id="freightCharges"
                    type="number"
                    step="0.01"
                    value={formData.freightCharges}
                    onChange={(e) => handleChange("freightCharges", e.target.value)}
                    placeholder="0.00"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="insuranceCharges">Frais d'assurance</Label>
                  <Input
                    id="insuranceCharges"
                    type="number"
                    step="0.01"
                    value={formData.insuranceCharges}
                    onChange={(e) => handleChange("insuranceCharges", e.target.value)}
                    placeholder="0.00"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="customsCharges">Frais de douane</Label>
                  <Input
                    id="customsCharges"
                    type="number"
                    step="0.01"
                    value={formData.customsCharges}
                    onChange={(e) => handleChange("customsCharges", e.target.value)}
                    placeholder="0.00"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="otherCharges">Autres frais</Label>
                  <Input
                    id="otherCharges"
                    type="number"
                    step="0.01"
                    value={formData.otherCharges}
                    onChange={(e) => handleChange("otherCharges", e.target.value)}
                    placeholder="0.00"
                  />
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="totalAmount">Montant total</Label>
                  <Input
                    id="totalAmount"
                    value={formData.totalAmount}
                    readOnly
                    className="font-bold text-lg bg-muted"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Information */}
          <Card>
            <CardHeader>
              <CardTitle>Informations Supplémentaires</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="specialInstructions">Instructions spéciales</Label>
                <Textarea
                  id="specialInstructions"
                  value={formData.specialInstructions}
                  onChange={(e) => handleChange("specialInstructions", e.target.value)}
                  placeholder="Instructions de manutention, température, etc..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="terms">Conditions générales</Label>
                <Textarea
                  id="terms"
                  value={formData.terms}
                  onChange={(e) => handleChange("terms", e.target.value)}
                  placeholder="Conditions de paiement et de livraison..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col space-y-2">
            <Button onClick={handleGenerateDocument} className="w-full">
              <FiSave className="w-4 h-4 mr-2" />
              Générer le Document
            </Button>
            <Button variant="outline" onClick={onBack} className="w-full bg-transparent">
              Annuler
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
