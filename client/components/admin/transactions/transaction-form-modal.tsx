"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import { MAWBForm } from "./mawb/MAWBForm";
import { HAWBForm } from "./hawb/HAWBForm";
import { MBLForm } from "./mbl/MBLForm";
import { HBLForm } from "./hbl/HBLForm";
import { FiArrowLeft } from "react-icons/fi";
import api from "@/app/axiosInstance";
import Swal from "sweetalert2";
import { jwtDecode } from "jwt-decode";

interface TransactionFormProps {
  transaction?: any;
  isEdit?: boolean;
  onSave: () => void;
  onCancel: () => void;
}

export function TransactionFormModal({ transaction, isEdit = false, onSave, onCancel }: TransactionFormProps) {
  const router = useRouter();

  // Initialiser l'onglet selon le type de transaction si en modification
  const getInitialType = () => {
    if (!isEdit || !transaction) return "MAWB";
    if (transaction.type === "MBL") return "MBL";
    if (transaction.type === "HAWB") return "HAWB";
    if (transaction.type === "HBL") return "HBL";
    return "MAWB";
  };

  const [selectedType, setSelectedType] = useState(getInitialType());

  // Fonctions de soumission
  const handleSubmitMAWB = async (data: any) => {
    const token = localStorage.getItem("token");
    const decoded: any = jwtDecode(token!);
    const creerPar = decoded.id;

    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    try {
      if (isEdit && transaction) {
        await api.put(`/mawb/${transaction.id}`, data);
        Swal.fire({ icon: "success", title: "Modifié !", text: "MAWB modifié avec succès." });
      } else {
        await api.post("/mawb", { ...data, creerPar, modifierPar: creerPar });
        Swal.fire({ icon: "success", title: "Ajouté !", text: "MAWB créé avec succès." });
      }
      onSave();
    } catch (err: any) {
      Swal.fire({ icon: "error", title: "Erreur", text: err.response?.data?.message || "Une erreur est survenue." });
    }
  };

  const handleSubmitMBL = async (data: any) => {
    const token = localStorage.getItem("token");
    const decoded: any = jwtDecode(token!);
    const creerPar = decoded.id;

    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    try {
      if (isEdit && transaction) {
        await api.put(`/mbl/${transaction.id}`, data);
        Swal.fire({ icon: "success", title: "Modifié !", text: "MBL modifié avec succès." });
      } else {
        await api.post("/mbl", { ...data, creerPar, modifierPar: creerPar });
        Swal.fire({ icon: "success", title: "Ajouté !", text: "MBL créé avec succès." });
      }
      onSave();
    } catch (err: any) {
      Swal.fire({ icon: "error", title: "Erreur", text: err.response?.data?.message || "Une erreur est survenue." });
    }
  };

  const handleSubmitHAWB = async (data: any) => {
    const token = localStorage.getItem("token");
    const decoded: any = jwtDecode(token!);
    const creerPar = decoded.id;

    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    try {
      if (isEdit && transaction) {
        await api.put(`/hawb/${transaction.id}`, data);
        Swal.fire({ icon: "success", title: "Modifié !", text: "HAWB modifié avec succès." });
      } else {
        await api.post("/hawb", { ...data, creerPar, modifierPar: creerPar });
        Swal.fire({ icon: "success", title: "Ajouté !", text: "HAWB créé avec succès." });
      }
      onSave();
    } catch (err: any) {
      Swal.fire({ icon: "error", title: "Erreur", text: err.response?.data?.message || "Une erreur est survenue." });
    }
  };

   const handleSubmitHBL = async (data: any) => {
    const token = localStorage.getItem("token");
    const decoded: any = jwtDecode(token!);
    const creerPar = decoded.id;

    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    try {
      if (isEdit && transaction) {
        await api.put(`/hbl/${transaction.id}`, data);
        Swal.fire({ icon: "success", title: "Modifié !", text: "HBL modifié avec succès." });
      } else {
        await api.post("/hbl", { ...data, creerPar, modifierPar: creerPar });
        Swal.fire({ icon: "success", title: "Ajouté !", text: "HBL créé avec succès." });
      }
      onSave();
    } catch (err: any) {
      Swal.fire({ icon: "error", title: "Erreur", text: err.response?.data?.message || "Une erreur est survenue." });
    }
  };



  return (
    <div className="p-8 min-h-screen bg-background">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={onCancel}>
            <FiArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">{isEdit ? "Modifier la transaction" : "Nouvelle transaction"}</h1>
            <p className="text-muted-foreground">{isEdit ? "Modifiez les informations de la transaction" : "Ajoutez une nouvelle transaction à votre base"}</p>
          </div>
        </div>
      </div>

      <div className="bg-card shadow-xl rounded-2xl p-6 mx-auto w-full max-w-7xl">
        <Tabs value={selectedType} onValueChange={setSelectedType}>
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="MAWB">MAWB</TabsTrigger>
            <TabsTrigger value="HAWB">HAWB</TabsTrigger>
            <TabsTrigger value="MBL">MBL</TabsTrigger>
            <TabsTrigger value="HBL">HBL</TabsTrigger>
          </TabsList>

          {selectedType === "MAWB" && 
          <MAWBForm 
          onCancel={onCancel}
          onSubmit={handleSubmitMAWB}
          initialData={transaction}
          />}

          {selectedType === "HAWB" && (
            <HAWBForm
              onCancel={onCancel}
              onSubmit={handleSubmitHAWB}
              initialData={transaction}
            />
          )}

          {selectedType === "MBL" && 
          <MBLForm
          onSubmit={handleSubmitMBL}
          onCancel={onCancel}
          initialData={transaction} 
          />}

          {selectedType === "HBL" && 
          <HBLForm
          onCancel={onCancel}
          onSubmit={handleSubmitHBL}
          initialData={transaction} 
          />}
        </Tabs>
      </div>
    </div>
  );
}
