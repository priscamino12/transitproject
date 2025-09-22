"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import api from "@/app/axiosInstance";

type Props = {
  onSubmit: (data: any) => void;
  initialData?: any;
  onCancel: () => void;
};

export function HAWBForm({ onSubmit, initialData, onCancel }: Props) {
  const formatDate = (dateStr?: string) => (dateStr ? dateStr.split("T")[0] : "");

  const [form, setForm] = useState({
    numHAWB: "",
    idMAWB: "",
    dateEmmission: "",
    description: "",
    nbColis: "",
    poid: "",
    volume: "",
    idExpediteur: "",
    idDestinataire: "",
  });

  const [mawbs, setMawbs] = useState<{ idMAWB: number; numMAWB: string }[]>([]);
  const [clients, setClients] = useState<{ idClient: number; nomClient: string }[]>([]);

  // Remplir le formulaire en mode édition
  useEffect(() => {
  if (initialData) {
    console.log("InitialData HAWB reçu :", initialData);
    setForm({
      numHAWB: initialData.numHAWB || "",
      idMAWB: initialData.idMAWB || initialData.MAWB?.idMAWB || "",
      dateEmmission: formatDate(initialData.dateEmmission),
      description: initialData.description || "",
      nbColis: initialData.nbColis?.toString() || "",
      poid: initialData.poid?.toString() || "",
      volume: initialData.volume?.toString() || "",
      idExpediteur: initialData.idExpediteur || initialData.clientExp?.idClient || "", // ✅ Expéditeur
      idDestinataire: initialData.idDestinataire || initialData.clientDest?.idClient || "" // ✅ Destinataire
    });
  }
}, [initialData]);


  // Charger MAWB et clients
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [mawbRes, clientsRes] = await Promise.all([api.get("/mawb"), api.get("/client")]);
        setMawbs(mawbRes.data);
        setClients(clientsRes.data);
      } catch (err) {
        console.error("Erreur lors du chargement :", err);
      }
    };
    fetchData();
  }, []);

  const handleChange = (key: string, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Field label="Numéro HAWB" value={form.numHAWB} onChange={(v) => handleChange("numHAWB", v)} />
      <Field label="Date Émission" type="date" value={form.dateEmmission} onChange={(v) => handleChange("dateEmmission", v)} />

      {/* Sélecteur MAWB */}
      <div className="flex flex-col">
        <Label className="mb-1 text-card-foreground">MAWB</Label>
        <select
          value={form.idMAWB}
          onChange={(e) => handleChange("idMAWB", e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-blue-300 bg-input text-foreground"
          required
        >
          <option value="">-- Sélectionnez un MAWB --</option>
          {mawbs.map((m) => (
            <option key={m.idMAWB} value={m.idMAWB}>
              {m.numMAWB}
            </option>
          ))}
        </select>
      </div>

      <Field label="Description" value={form.description} onChange={(v) => handleChange("description", v)} />
      <Field label="Poids" value={form.poid} onChange={(v) => handleChange("poid", v)} />
      <Field label="Nombre Colis" value={form.nbColis} onChange={(v) => handleChange("nbColis", v)} />
      <Field label="Volume" value={form.volume} onChange={(v) => handleChange("volume", v)} />

      {/* Expéditeur */}
      <div className="flex flex-col">
        <Label className="mb-1 text-card-foreground">Client Expéditeur</Label>
        <select
          value={form.idExpediteur}
          onChange={(e) => handleChange("idExpediteur", e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-blue-300 bg-input text-foreground"
          required
        >
          <option value="">-- Sélectionnez un client --</option>
          {clients.map((c) => (
            <option key={c.idClient} value={c.idClient}>
              {c.nomClient}
            </option>
          ))}
        </select>
      </div>

      {/* Destinataire */}
      <div className="flex flex-col">
        <Label className="mb-1 text-card-foreground">Client Destinataire</Label>
        <select
          value={form.idDestinataire}
          onChange={(e) => handleChange("idDestinataire", e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-blue-300 bg-input text-foreground"
          required
        >
          <option value="">-- Sélectionnez un client --</option>
          {clients.map((c) => (
            <option key={c.idClient} value={c.idClient}>
              {c.nomClient}
            </option>
          ))}
        </select>
      </div>

      <div className="md:col-span-2 flex justify-end space-x-4 mt-4">
        <Button type="submit" className="px-8">
          {initialData ? "Modifier HAWB" : "Créer HAWB"}
        </Button>
        <Button variant="outline" className="px-8" type="button" onClick={onCancel}>
          Annuler
        </Button>
      </div>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
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
  );
}
