"use client"

import { use, useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FiArrowLeft, FiSave, FiX } from "react-icons/fi"
import Swal from "sweetalert2"
import PhoneInput from "react-phone-input-2"
import 'react-phone-input-2/lib/style.css'
import { Client } from "@/types/client"
import { createClient, updateClient } from "@/services/client.service"

interface ClientFormProps {
  client?: Client
  isEdit?: boolean
  onSave: (data: Client) => void
  onCancel: () => void
}

export function ClientForm({ client, isEdit = false, onSave, onCancel }: ClientFormProps) {


  const [formData, setFormData] = useState<Client>({
    idClient: client?.idClient || 0,
    nomClient: client?.nomClient || "",
    emailClient: client?.emailClient || "",
    telClient: client?.telClient || "",
    CINClient: client?.CINClient || "",
    adresseClient: client?.adresseClient || ""
  })

  const handleChange = (field: keyof Client, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation manuelle
    if (!formData.nomClient || !formData.emailClient || !formData.telClient || !formData.CINClient || !formData.adresseClient) {
      Swal.fire({ icon: "error", title: "Erreur", text: "Tous les champs sont requis !" });
      return;
    }

    try {
      let responseData: Client;

      if (isEdit && client?.idClient) {
        // Si édition
        responseData = await updateClient(client.idClient, formData);
        Swal.fire({ icon: "success", title: "Modifié!", text: "Le client a été modifié.", timer: 2000, showConfirmButton: false });
      } else {
        // Si création
        responseData = await createClient(formData);  // ← C’est ici que tu mets ta ligne
        Swal.fire({ icon: "success", title: "Ajouté!", text: "Le client a été ajouté.", timer: 2000, showConfirmButton: false });
      }

      onSave(responseData); // transmet les données au parent
    } catch (err: any) {
      Swal.fire({ icon: "error", title: "Erreur", text: err.response?.data?.error || err.message });
    }
  };



  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" onClick={onCancel}>
          <FiArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">{isEdit ? "Modifier le Client" : "Nouveau Client"}</h1>
          <p className="text-muted-foreground">
            {isEdit ? "Modifiez les informations du client" : "Ajoutez un nouveau client"}
          </p>
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
                <Input value={formData.nomClient} onChange={e => handleChange("nomClient", e.target.value)} required />
              </div>
              <div>
                <Label>Email *</Label>
                <Input type="email" value={formData.emailClient} onChange={e => handleChange("emailClient", e.target.value)} required />
              </div>
              <div>
                <Label>Téléphone *</Label>
                <PhoneInput
                  country="fr"
                  value={formData.telClient}
                  onChange={phone => handleChange("telClient", phone)}
                  inputProps={{ required: true }}
                  enableSearch
                  specialLabel=""
                />
              </div>
              <div>
                <Label>CIN *</Label>
                <Input value={formData.CINClient} onChange={e => handleChange("CINClient", e.target.value)} required />
              </div>
            </div>
            <div>
              <Label>Adresse *</Label>
              <Textarea value={formData.adresseClient} onChange={e => handleChange("adresseClient", e.target.value)} required />
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
