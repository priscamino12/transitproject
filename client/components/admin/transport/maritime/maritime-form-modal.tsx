"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import api from "@/app/axiosInstance"
import Swal from "sweetalert2"
import { FiArrowLeft, FiSave, FiX } from "react-icons/fi"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface MaritimeFormModalProps {
  transportMaritime?: any
  isEdit?: boolean
  onSave: (data: any) => void
  onCancel: () => void
  currentUserId?: number // 👈 pour fournir l’ID de l’utilisateur courant
}

export function MaritimeFormModal({
  transportMaritime,
  isEdit = false,
  onSave,
  onCancel,
  currentUserId = 1, // valeur par défaut pour tester
}: MaritimeFormModalProps) {
  const [formData, setFormData] = useState({
    nomNavire: "",
    numIMO: "",
    armateur: "",
    paysChargement: "",
    villeChargement: "",
    dateChargement: "",
    paysDechargement: "",
    villeDechargement: "",
    creerPar: currentUserId,
  })

  useEffect(() => {
    if (isEdit && transportMaritime) {
      setFormData({
        nomNavire: transportMaritime.nomNavire || "",
        armateur: transportMaritime.armateur || "",
        numIMO: transportMaritime.numIMO || "",
        paysChargement: transportMaritime.paysChargement || "",
        villeChargement: transportMaritime.villeChargement || "",
        dateChargement: transportMaritime.dateChargement
          ? transportMaritime.dateChargement.slice(0, 10)
          : "",
        paysDechargement: transportMaritime.paysDechargement || "",
        villeDechargement: transportMaritime.villeDechargement || "",
        creerPar: transportMaritime.creerPar || currentUserId,
      })
    }
  }, [isEdit, transportMaritime, currentUserId])

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const payload = {
        ...formData,
        // Assure le bon format pour Sequelize DATE
        dateChargement: new Date(formData.dateChargement),
      }

      let responseData
      if (isEdit && transportMaritime?.idTransMaritime) {
        await api.put(`/transMaritime/${transportMaritime.idTransMaritime}`, payload)
        Swal.fire({
          icon: "success",
          title: "Modifié!",
          text: "Transport maritime modifié.",
          timer: 2000,
          showConfirmButton: false,
        })
        responseData = { ...transportMaritime, ...payload }
      } else {
        const res = await api.post("/transMaritime/", payload)
        Swal.fire({
          icon: "success",
          title: "Ajouté!",
          text: "Transport maritime ajouté.",
          timer: 2000,
          showConfirmButton: false,
        })
        responseData = res.data
      }
      onSave(responseData)
    } catch (err: any) {
      console.error(err.response?.data || err) // 👈 debug
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: err.response?.data?.error || err.message || "Une erreur est survenue",
      })
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" onClick={onCancel}>
          <FiArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">
            {isEdit ? "Modifier le Transport" : "Nouveau Transport"}
          </h1>
          <p className="text-muted-foreground">
            {isEdit
              ? "Modifiez les informations du transport maritime"
              : "Ajoutez un nouveau transport maritime"}
          </p>
        </div>
      </div>

      {/* Formulaire */}
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Informations du Transport</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* numIMO et Compagnie */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="numIMO">Numéro du bateau *</Label>
                <Input
                  id="numIMO"
                  value={formData.numIMO}
                  onChange={(e) => handleChange("numIMO", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="nomNavire">Nom de navire *</Label>
                <Input
                  id="nomNavire"
                  value={formData.nomNavire}
                  onChange={(e) => handleChange("nomNavire", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="nomNavire">Nom d'agent *</Label>
                <Input
                  id="armateur"
                  value={formData.armateur}
                  onChange={(e) => handleChange("armateur", e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Date */}
            <div>
              <Label htmlFor="dateChargement">Date de départ *</Label>
              <Input
                id="dateChargement"
                type="date"
                value={formData.dateChargement}
                onChange={(e) => handleChange("dateChargement", e.target.value)}
                required
              />
            </div>

            {/* Lieu de chargement */}
            <div>
              <Label>Lieu de chargement *</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                <Input
                  placeholder="Pays"
                  value={formData.paysChargement}
                  onChange={(e) => handleChange("paysChargement", e.target.value)}
                  required
                />
                <Input
                  placeholder="Ville"
                  value={formData.villeChargement}
                  onChange={(e) => handleChange("villeChargement", e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Lieu de déchargement */}
            <div>
              <Label>Lieu de déchargement *</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                <Input
                  placeholder="Pays"
                  value={formData.paysDechargement}
                  onChange={(e) => handleChange("paysDechargement", e.target.value)}
                  required
                />
                <Input
                  placeholder="Ville"
                  value={formData.villeDechargement}
                  onChange={(e) => handleChange("villeDechargement", e.target.value)}
                />
              </div>
            </div>

            {/* Boutons */}
            <div className="flex justify-end space-x-4 pt-4">
              <Button type="button" variant="outline" onClick={onCancel}>
                <FiX className="w-4 h-4 mr-2" /> Annuler
              </Button>
              <Button type="submit">
                <FiSave className="w-4 h-4 mr-2" />
                {isEdit ? "Mettre à jour" : "Créer le transport"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}
