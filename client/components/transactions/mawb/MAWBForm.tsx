"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type Props = { onSubmit: (data: any) => void }

export function MAWBForm({ onSubmit }: Props) {
  const [form, setForm] = useState({
    numMAWB: "",
    idTransport: "",
    dateEmission: "",
    dateArrivePrevue: "",
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
      <Field label="Numéro MAWB" value={form.numMAWB} onChange={(v) => handleChange("numMAWB", v)} />
      <Field label="ID Transport" value={form.idTransport} onChange={(v) => handleChange("idTransport", v)} />
      <Field label="Date Émission" type="date" value={form.dateEmission} onChange={(v) => handleChange("dateEmission", v)} />
      <Field label="Date Arrivée Prévue" type="date" value={form.dateArrivePrevue} onChange={(v) => handleChange("dateArrivePrevue", v)} />

      <div className="md:col-span-2 flex justify-end space-x-4 mt-4">
        <Button type="submit" className="px-8">Créer MAWB</Button>
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
