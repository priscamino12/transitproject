"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaSearch } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { EmployeForm } from "./employe-form-modal";
import { Employe } from "./type/employe";
import { getEmployes } from "./service/employe.service";

type EmployeHeaderProps = {
  onAddEmploye?: () => void; // optionnel si tu veux passer depuis parent
  onEditEmploye?: (employe: Employe) => void;
};

export function EmployeHeader({ onAddEmploye, onEditEmploye }: EmployeHeaderProps) {
  const { t } = useLanguage();
  const [employes, setEmployes] = useState<Employe[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [selectedEmploye, setSelectedEmploye] = useState<Employe | null>(null);
  const [editMode, setEditMode] = useState(false);

  // Charger les employés depuis le backend
  useEffect(() => {
    fetchEmployes();
  }, []);

  const fetchEmployes = async () => {
  try {
    const res = await getEmployes(); // res = { success, message, data }
    if (res.success && res.data) {
      setEmployes(res.data); // data est bien un Employe[]
    } else {
      setEmployes([]); // rien à afficher
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des employés :", error);
    setEmployes([]);
  }
};


  const handleAddClick = () => {
    setSelectedEmploye(null);
    setEditMode(false);
    setShowForm(true);
    onAddEmploye?.();
  };

  const handleEditClick = (employe: Employe) => {
    setSelectedEmploye(employe);
    setEditMode(true);
    setShowForm(true);
    onEditEmploye?.(employe);
  };

  const handleSaveEmploye = (employeData: Employe) => {
    if (editMode && selectedEmploye) {
      setEmployes(
        employes.map((e) =>
          e.idEmploye === selectedEmploye.idEmploye ? { ...e, ...employeData } : e
        )
      );
    } else {
      const newEmploye: Employe = {
        ...employeData,
        idEmploye: Date.now(), // temporaire, backend retournera l'id réel
        idEntreprise: employeData.idEntreprise || 1, // valeur par défaut si nécessaire
      };
      setEmployes([...employes, newEmploye]);
    }
    setShowForm(false);
    setSelectedEmploye(null);
    setEditMode(false);
  };

  // Filtrer les employés selon le search
  const filteredEmployes = employes.filter((e) =>
    e.nomEmploye.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="space-y-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Employés</h1>
            <p className="text-muted-foreground">Gérez vos employés et leurs informations</p>
          </div>
          <Button onClick={handleAddClick} className="flex items-center space-x-2">
            <FiPlus className="w-4 h-4" />
            <span>Nouveau Employé</span>
          </Button>
        </div>

        {/* Barre de recherche */}
        <div className="relative w-full md:w-1/2 mb-4">
          <Input
            placeholder="Rechercher un employé..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
        </div>
      </div>

      {/* Formulaire */}
      {showForm && (
        <EmployeForm
          employe={selectedEmploye}
          isEdit={editMode}
          onSave={handleSaveEmploye}
          onCancel={() => setShowForm(false)}
        />
      )}

      {/* Liste simplifiée pour démo */}
      <div className="mt-6 space-y-2">
        {filteredEmployes.map((e) => (
          <div
            key={e.idEmploye}
            className="p-4 border rounded flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{e.nomEmploye}</p>
              <p className="text-sm text-muted-foreground">{e.emailEmploye}</p>
            </div>
            <Button size="sm" onClick={() => handleEditClick(e)}>
              Éditer
            </Button>
          </div>
        ))}
      </div>
    </>
  );
}
