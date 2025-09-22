"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import api from "@/app/axiosInstance"

type Props = {
  onSubmit: (data: any) => void
  initialData?: any;    
  onCancel: () => void;
}

export function MBLForm({ onSubmit, initialData, onCancel }: Props) {
  const formatDate = (dateStr?: string) => dateStr ? dateStr.split("T")[0] : "";

  const [form, setForm] = useState({
    numMBL: "",
    idTransport: "",
    dateEmission: "",
    dateArrivePrevue: "",
  });

  const [transports, setTransports] = useState<{ idTransMaritime: number; nomNavire: string; numIMO: string }[]>([]);

  // Initialisation du formulaire si modification
  useEffect(() => {
    if (initialData) {
      setForm({
        numMBL: initialData.numero || "",
        idTransport: "", // on laisse vide pour l'instant, sera mis à jour après fetch transports
        dateEmission: formatDate(initialData.dateEmission),
        dateArrivePrevue: formatDate(initialData.dateArrivePrevue),
      });
    }
  }, [initialData]);

  // Récupération des transports
  useEffect(() => {
    const fetchTransports = async () => {
      try {
        const res = await api.get("/transMaritime/");
        setTransports(res.data);

        // Si on est en modification, on met à jour idTransport avec la valeur correspondante
        if (initialData?.transportInfo?.idTransMaritime) {
          setForm(prev => ({ ...prev, idTransport: initialData.transportInfo.idTransMaritime }));
        }
      } catch (err) {
        console.error("Erreur lors du chargement des transports :", err);
      }
    };
    fetchTransports();
  }, [initialData]);

  const handleChange = (key: string, value: string) =>
    setForm({ ...form, [key]: value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Field label="Numéro MBL" value={form.numMBL} onChange={(v) => handleChange("numMBL", v)} />

      <div className="flex flex-col">
        <Label className="mb-1 text-card-foreground">Transport Maritime</Label>
        <select
          value={form.idTransport}
          onChange={(e) => handleChange("idTransport", e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-blue-300 bg-input text-foreground"
          required
        >
          <option value="">-- Sélectionnez un transport --</option>
          {transports.map((t) => (
            <option key={t.idTransMaritime} value={t.idTransMaritime}>
              {t.nomNavire} - {t.numIMO}
            </option>
          ))}
        </select>
      </div>

      <Field label="Date Émission" type="date" value={form.dateEmission} onChange={(v) => handleChange("dateEmission", v)} />
      <Field label="Date Arrivée Prévue" type="date" value={form.dateArrivePrevue} onChange={(v) => handleChange("dateArrivePrevue", v)} />

      <div className="md:col-span-2 flex justify-end space-x-4 mt-4">
        <Button type="submit" className="px-8">
          {initialData ? "Modifier MBL" : "Créer MBL"}
        </Button>
         <Button variant="outline" className="px-8" type="button" onClick={onCancel}>
          Annuler
        </Button>
      </div>
    </form>
  );
}

function Field({ label, value, onChange, type = "text" }: { label: string, value: string, onChange: (v: string) => void, type?: string }) {
  return (
    <div className="flex flex-col">
      <Label className="mb-1 text-card-foreground">{label}</Label>
      <Input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border-border focus:ring-ring bg-input text-foreground"
        required
      />
    </div>
  )
}
