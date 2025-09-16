"use client";

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FiArrowLeft, FiSave, FiX } from "react-icons/fi"
import api from "@/app/axiosInstance"
import Swal from "sweetalert2"

interface ClientFormProps {
  client?: any
  isEdit?: boolean
  onSave: (data: any) => void   // <- transmettre les données au parent
  onCancel: () => void
}

export function ClientForm({ client, isEdit = false, onSave, onCancel }: ClientFormProps) {
  const idEmploye = 1 // remplacer par l’ID connecté si besoin

  const [formData, setFormData] = useState({
    nomClient: client?.nomClient || "",
    emailClient: client?.emailClient || "",
    telClient: client?.telClient || "",
    CINClient: client?.CINClient || "",
    adresseClient: client?.adresseClient || "",
    notes: client?.notes || "",
    creerPar: client?.creerPar || idEmploye,
    modifierPar: idEmploye,
  })

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      let responseData;
      if (isEdit && client?.idClient) {
        const res = await api.put(`/client/${client.idClient}`, formData)
        Swal.fire({ icon: "success", title: "Modifié!", text: "Le client a été modifié.", timer: 2000, showConfirmButton: false })
        responseData = { ...client, ...formData }
      } else {
        const res = await api.post("/client/", formData)
        Swal.fire({ icon: "success", title: "Ajouté!", text: "Le client a été ajouté.", timer: 2000, showConfirmButton: false })
        responseData = res.data
      }

      onSave(responseData) // ← transmet les données au parent
    } catch (err: any) {
      Swal.fire({ icon: "error", title: "Erreur", text: err.response?.data?.error || err.message })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={onCancel}>
            <FiArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">{isEdit ? "Modifier le Client" : "Nouveau Client"}</h1>
            <p className="text-muted-foreground">
              {isEdit ? "Modifiez les informations du client" : "Ajoutez un nouveau client à votre base"}
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Informations du Client</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label>Nom du client *</Label>
                <Input value={formData.nomClient} onChange={(e) => handleChange("nomClient", e.target.value)} required />
              </div>
              <div>
                <Label>Email *</Label>
                <Input type="email" value={formData.emailClient} onChange={(e) => handleChange("emailClient", e.target.value)} required />
              </div>
              <div>
                <Label>Téléphone *</Label>
                <Input value={formData.telClient} onChange={(e) => handleChange("telClient", e.target.value)} required />
              </div>
              <div>
                <Label>CIN *</Label>
                <Input value={formData.CINClient} onChange={(e) => handleChange("CINClient", e.target.value)} required />
              </div>
            </div>
            <div>
              <Label>Adresse *</Label>
              <Textarea value={formData.adresseClient} onChange={(e) => handleChange("adresseClient", e.target.value)} required />
            </div>
            <div>
              <Label>Notes</Label>
              <Textarea value={formData.notes} onChange={(e) => handleChange("notes", e.target.value)} />
            </div>
            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline" onClick={onCancel}>
                <FiX className="w-4 h-4 mr-2" /> Annuler
              </Button>
              <Button type="submit">
                <FiSave className="w-4 h-4 mr-2" />
                {isEdit ? "Mettre à jour" : "Créer le client"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}
