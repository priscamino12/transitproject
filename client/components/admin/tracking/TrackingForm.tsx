"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FiArrowLeft, FiSave, FiX, FiPackage } from "react-icons/fi";
import Swal from "sweetalert2";
import { HouseTabs } from "../transactions/house/house";
import api from "@/config/axiosInstance";

interface TrackingFormProps {
  onSave?: (data: any) => void;
  onCancel: () => void;
  onEditHouse: (house: any) => void;
}

export function TrackingForm({ onCancel, onEditHouse }: TrackingFormProps) {
  const [formData, setFormData] = useState({
    trackingCode: "",
    suiviType: "HBL", // nouveau champ pour décider HBL ou HAWB
    status: "Validation",
    dateEtape: "",
    description: "",
    commentaire: "",
  });

  const token = localStorage.getItem("token");
  const statuses = [
    "Validation",
    "Préparation",
    "Douane",
    "Expédition",
    "Arrivé au port d'arrivé",
    "Livraison",
  ];

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const endpoint = formData.suiviType === "HBL" ? "/suiviHBL" : "/suiviHAWB";

      const bodyData =
        formData.suiviType === "HBL"
          ? {
            numHBL: formData.trackingCode,
            etape: formData.status,
            dateEtape: formData.dateEtape,
            status: formData.status,
            commentaire: formData.commentaire,
            creerPar: 1,
          }
          : {
            numHAWB: formData.trackingCode,
            etape: formData.status,
            dateEtape: formData.dateEtape,
            status: formData.status,
            commentaire: formData.commentaire,
            creerPar: 1, // remplacer par l'ID de l'utilisateur connecté
          };


      console.log("Envoi au serveur :", bodyData);

      const res = await api.post(
        endpoint,
        bodyData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
      console.log("Succès :", res.data);
      Swal.fire({
        icon: "success",
        title: "Ajout réussi",
        text: "Le suivi a été ajouté avec succès !",
      });

      // Réinitialiser le formulaire
      setFormData({
        trackingCode: "",
        suiviType: "HBL",
        status: "Validation",
        dateEtape: "",
        description: "",
        commentaire: "",
      });
    } catch (error: any) {
      console.error("Erreur inattendue :", error.response || error);

      Swal.fire({
        icon: "error",
        title: "Erreur inattendue",
        text:
          error.response?.data?.error ||
          error.message ||
          "Vérifiez la console pour plus de détails.",
      });
    }
  };


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
              <h1 className="text-3xl font-bold text-foreground">
                Ajouter un Suivi
              </h1>
              <p className="text-muted-foreground">
                Créez une nouvelle entrée de suivi de colis
              </p>
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
                    <Label htmlFor="suiviType">Type de suivi *</Label>
                    <Select
                      value={formData.suiviType}
                      onValueChange={(v) => handleChange("suiviType", v)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="HBL">HBL</SelectItem>
                        <SelectItem value="HAWB">HAWB</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="trackingCode">Code de suivi</Label>
                    <Input
                      id="trackingCode"
                      value={formData.trackingCode}
                      onChange={(e) =>
                        handleChange("trackingCode", e.target.value)
                      }
                      placeholder="Numéro suivi"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dateEtape">Date Étape</Label>
                    <Input
                      id="dateEtape"
                      type="date"
                      value={formData.dateEtape}
                      onChange={(e) =>
                        handleChange("dateEtape", e.target.value)
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="status">Étape *</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(v) => handleChange("status", v)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {statuses.map((s, index) => (
                          <SelectItem key={`${s}-${index}`} value={s}>
                            {s}
                          </SelectItem>
                        ))}

                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  id="commentaire"
                  value={formData.commentaire}
                  onChange={(e) =>
                    handleChange("commentaire", e.target.value)
                  }
                  placeholder="Description ou commentaire..."
                  rows={3}
                />
              </CardContent>
            </Card>

            <div className="flex flex-col space-y-2">
              <Button type="submit" className="w-full">
                <FiSave className="w-4 h-4 mr-2" />
                Créer le suivi
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                className="w-full bg-transparent"
              >
                <FiX className="w-4 h-4 mr-2" />
                Annuler
              </Button>
            </div>
          </div>
        </div>
      </form>

      <Card className="space-y-2">
        <CardHeader>
          <CardTitle>Codes de suivi disponibles</CardTitle>
        </CardHeader>
        <CardContent>
          <HouseTabs onEditHouse={onEditHouse} />
        </CardContent>
      </Card>
    </div>
  );
}
