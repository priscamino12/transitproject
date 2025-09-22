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

export function HBLForm({ onSubmit, initialData, onCancel }: Props) {
  const formatDate = (dateStr?: string) => (dateStr ? dateStr.split("T")[0] : "");

  const [form, setForm] = useState({
    numHBL: "",
    idMBL: "",
    dateEmmission: "",
    description: "",
    nbColis: "",
    poid: "",
    volume: "",
    idExpediteur: "",
    idDestinataire: ""
  });

  const [mbls, setMbls] = useState<{ idMBL: number; numMBL: string }[]>([]);
  const [clients, setClients] = useState<{ idClient: number; nomClient: string }[]>([]);

  // Charger MBL et clients
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [mblRes, clientsRes] = await Promise.all([
          api.get("/mbl"),
          api.get("/client")
        ]);
        setMbls(mblRes.data);
        setClients(clientsRes.data);
      } catch (err) {
        console.error("Erreur lors du chargement :", err);
      }
    };
    fetchData();
  }, []);

  // Pré-remplir le formulaire lors de la modification
  useEffect(() => {
    if (initialData) {
      console.log("InitialData HBL reçu :", initialData);
      const expId =
        clients.find((c) => c.nomClient === initialData.clientExp)?.idClient || "";
      const destId =
        clients.find((c) => c.nomClient === initialData.clientDest)?.idClient || "";
      setForm({
        numHBL: initialData.numHBL || initialData.numero || "",
        idMBL: initialData.idMBL?.toString() || initialData.houseNumero || "",
        dateEmmission: formatDate(initialData.dateEmmission),
        description: initialData.description || "",
        nbColis: initialData.nbColis?.toString() || "",
        poid: initialData.poid?.toString() || "",
        volume: initialData.volume?.toString() || "",
        idExpediteur: initialData.idExpediteur?.toString() || "",
        idDestinataire: initialData.idDestinataire?.toString() || ""
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
        label="Numéro HBL"
        value={form.numHBL}
        onChange={(v) => handleChange("numHBL", v)}
      />
      <Field
        label="Date Émission"
        type="date"
        value={form.dateEmmission}
        onChange={(v) => handleChange("dateEmmission", v)}
      />

      {/* Sélecteur MBL */}
      <div className="flex flex-col">
        <Label className="mb-1 text-card-foreground">MBL</Label>
        <select
          className="border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-blue-300 bg-input text-foreground"
          required
          value={form.idMBL}
          onChange={(e) => handleChange("idMBL", e.target.value)}
        >
          <option value="">-- Sélectionnez MBL --</option>
          {mbls.map((m) => (
            <option key={m.idMBL} value={m.idMBL}>
              {m.numMBL}
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
          {initialData ? "Modifier HBL" : "Créer HBL"}
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
