"use client"

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import api from "@/app/axiosInstance"; 
import { jwtDecode } from 'jwt-decode';

type Props = { onSubmit: (data: any) => void };

export function MAWBForm({ onSubmit }: Props) {
  const [form, setForm] = useState({
    numMAWB: "",
    idTransport: "",
    dateEmission: "",
    dateArrivePrevue: "",
    creerPar: "",
  });
    const token = localStorage.getItem("token");
if (token) {
  const decoded: any = jwtDecode(token);
  console.log("Contenu du token :", decoded);
}

  const [transports, setTransports] = useState<{ idTransAerienne: number; nomCompagnie: string; numVol: string }[]>([]);

  // Récupérer les transports existants depuis l'API
  useEffect(() => {
    const fetchTransports = async () => {
      try {
        const res = await api.get("/transAerienne/");
        setTransports(res.data); // Assure-toi que ton backend renvoie un tableau
      } catch (err) {
        console.error("Erreur lors du chargement des transports :", err);
      }
    };

    fetchTransports();
  }, []);

  const handleChange = (key: string, value: string) =>
    setForm({ ...form, [key]: value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Field label="Numéro MAWB" value={form.numMAWB} onChange={(v) => handleChange("numMAWB", v)} />
      
      {/* Champ select pour les transports */}
      <div className="flex flex-col">
        <Label className="mb-1 text-card-foreground">Transport Aérien</Label>
        <select
          value={form.idTransport}
          onChange={(e) => handleChange("idTransport", e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-blue-300 bg-input text-foreground"
          required
        >
          <option value="">-- Sélectionnez un transport --</option>
          {transports.map((t) => (
            <option key={t.idTransAerienne} value={t.idTransAerienne}>
              {t.nomCompagnie} - {t.numVol}
            </option>
          ))}
        </select>
      </div>

      <Field label="Date Émission" type="date" value={form.dateEmission} onChange={(v) => handleChange("dateEmission", v)} />
      <Field label="Date Arrivée Prévue" type="date" value={form.dateArrivePrevue} onChange={(v) => handleChange("dateArrivePrevue", v)} />

      <div className="md:col-span-2 flex justify-end space-x-4 mt-4">
        <Button type="submit" className="px-8">Créer MAWB</Button>
        <Button variant="outline" className="px-8" onClick={() => console.log("Annuler")}>Annuler</Button>
      </div>
    </form>
  );
}

// Champ texte générique
function Field({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <div className="flex flex-col">
      <Label className="mb-1 text-card-foreground">{label}</Label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-blue-300 bg-input text-foreground"
        required
      />
    </div>
  );
}
