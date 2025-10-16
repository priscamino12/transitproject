"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Employe } from "./type/employe";
import { createEmploye, updateEmploye, EmployeInput } from "./service/employe.service";

type EmployeFormProps = {
  employe: Employe | null;
  isEdit: boolean;
  onSave: (employe: Employe) => void;
  onCancel: () => void;
};

export function EmployeForm({ employe, isEdit, onSave, onCancel }: EmployeFormProps) {
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [role, setRole] = useState("employe"); // par défaut "employe"
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (employe) {
      setNom(employe.nomEmploye);
      setEmail(employe.emailEmploye);
      setRole(employe.role);
      setMotDePasse(""); // ne pas pré-remplir le mot de passe
    } else {
      setNom("");
      setEmail("");
      setMotDePasse("");
      setRole("employe");
    }
  }, [employe]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Définir idEntreprise par défaut si ce n'est pas modifiable
    const entrepriseId = employe?.idEntreprise || 1;

    const employeData: EmployeInput = {
      nomEmploye: nom,
      emailEmploye: email,
      role: role,
      motDePasse: motDePasse || "", // obligatoire dans le type
      idEntreprise: entrepriseId,
    };

    try {
      if (isEdit && employe) {
        const updated = await updateEmploye(employe.idEmploye, employeData);
        onSave(updated);
      } else {
        const created = await createEmploye(employeData);
        onSave(created);
      }
    } catch (error) {
      console.error("Erreur lors de l'enregistrement de l'employé :", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">{isEdit ? "Modifier Employé" : "Ajouter Employé"}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Nom</label>
            <Input value={nom} onChange={(e) => setNom(e.target.value)} required />
          </div>
          <div>
            <label className="block mb-1">Email</label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <label className="block mb-1">{isEdit ? "Nouveau mot de passe (optionnel)" : "Mot de passe"}</label>
            <Input
              type="password"
              value={motDePasse}
              onChange={(e) => setMotDePasse(e.target.value)}
              required={!isEdit}
            />
          </div>
          <div>
            <label className="block mb-1">Rôle</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border border-gray-300 rounded px-2 py-1"
            >
              <option value="superAdmin">Super Admin</option>
              <option value="admin">Admin</option>
              <option value="employe">Employé</option>
            </select>
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Annuler
            </Button>
            <Button type="submit" disabled={loading}>
              {isEdit ? "Modifier" : "Créer"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
