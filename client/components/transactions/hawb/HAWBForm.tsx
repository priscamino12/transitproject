"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type Props = { onSubmit: (data: any) => void }

export function HAWBForm({ onSubmit }: Props) {
  const [form, setForm] = useState({
    numHAWB: "",
    idTransport: "",
    idMAWB : "",
    dateEmission: "",
    description :"",
    nbColis: "",
    poid: "",
    volume: "",
    idExpediteur: "",
    idDestinataire: "",
    creerPar: "",
  })

  const handleChange = (key: string, value: string) =>
    setForm({ ...form, [key]: value })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(form)
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Field label="Numéro HAWB" value={form.numHAWB} onChange={(v) => handleChange("numHAWB", v)} />
      <Field label="Date Émission" type="date" value={form.dateEmission} onChange={(v) => handleChange("dateEmission", v)} />
      <Field label="MAWB" value={form.idMAWB} onChange={(v) => handleChange("idMAWB", v)} />
      <Field label="Description" value={form.description} onChange={(v) => handleChange("description", v)} />
      <Field label="Poids" value={form.poid} onChange={(v) => handleChange("poid", v)} />
      <Field label="Nombre colis" value={form.nbColis} onChange={(v) => handleChange("nbColis", v)} />
      <Field label="Volume" value={form.volume} onChange={(v) => handleChange("volume", v)} />
      <Field label="Client Expediteur" value={form.idExpediteur} onChange={(v) => handleChange("idExpediteur", v)} />
      <Field label="Client Destinataire" value={form.idDestinataire} onChange={(v) => handleChange("idDestinataire", v)} />
      <div className="md:col-span-2 flex justify-end space-x-4 mt-4">
        <Button type="submit" className="px-8">Créer HAWB</Button>
        <Button variant="outline" className="px-8" onClick={() => console.log("Annuler")}>Annuler</Button>
      </div>
    </form>
  )
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
