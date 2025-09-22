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
    idDestinataire: ""
  });

  const [mawbs, setMawbs] = useState<{ idMAWB: number; numMAWB: string }[]>([]);
  const [clients, setClients] = useState<{ idClient: number; nomClient: string }[]>([]);

  // Charger MAWB et clients
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [mawbRes, clientsRes] = await Promise.all([
          api.get("/mawb"),
          api.get("/client")
        ]);
        setMawbs(mawbRes.data);
        setClients(clientsRes.data);
      } catch (err) {
        console.error("Erreur lors du chargement :", err);
      }
    };
    fetchData();
  }, []);


  useEffect(() => {
    if (initialData) {
      console.log("InitialData HAWB reçu :", initialData);

      // Trouver l'ID correspondant au nom du clientExp et clientDest
      const expId =
        clients.find((c) => c.nomClient === initialData.clientExp)?.idClient || "";
      const destId =
        clients.find((c) => c.nomClient === initialData.clientDest)?.idClient || "";

      setForm({
        numHAWB: initialData.numHAWB || initialData.numero || "",
        idMAWB: initialData.idMAWB || initialData.masterNumero || "",
        dateEmmission: formatDate(initialData.dateEmmission),
        description: initialData.description || "",
        nbColis: initialData.nbColis?.toString() || "",
        poid: initialData.poid?.toString() || "",
        volume: initialData.volume?.toString() || "",
        idExpediteur: initialData.idExpediteur || expId,
        idDestinataire: initialData.idDestinataire || destId
      });
    }
  }, [initialData, clients]);

  const handleChange = (key: string, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Field
        label="Numéro HAWB"
        value={form.numHAWB}
        onChange={(v) => handleChange("numHAWB", v)}
      />
      <Field
        label="Date Émission"
        type="date"
        value={form.dateEmmission}
        onChange={(v) => handleChange("dateEmmission", v)}
      />

      {/* Sélecteur MAWB */}
      <div className="flex flex-col">
        <Label className="mb-1 text-card-foreground">MAWB</Label>
        <select
          className="border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-blue-300 bg-input text-foreground"
          required
          value={
            mawbs.some(m => m.idMAWB.toString() === form.idMAWB)
              ? form.idMAWB
              : mawbs.find(m => m.numMAWB === form.idMAWB)?.idMAWB || ""
          }
          onChange={(e) => handleChange("idMAWB", e.target.value)}
        >
          <option value="">-- Sélectionnez MAWB --</option>
          {mawbs.map(m => (
            <option key={m.idMAWB} value={m.idMAWB}>
              {m.numMAWB}
            </option>
          ))}
        </select>

      </div>

      <Field
        label="Description"
        value={form.description}
        onChange={(v) => handleChange("description", v)}
      />
      <Field
        label="Poids"
        value={form.poid}
        onChange={(v) => handleChange("poid", v)}
      />
      <Field
        label="Nombre Colis"
        value={form.nbColis}
        onChange={(v) => handleChange("nbColis", v)}
      />
      <Field
        label="Volume"
        value={form.volume}
        onChange={(v) => handleChange("volume", v)}
      />

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
        <Button
          variant="outline"
          className="px-8"
          type="button"
          onClick={onCancel}
        >
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
  type = "text"
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
