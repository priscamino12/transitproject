"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import api from "@/app/axiosInstance"
import Swal from "sweetalert2"

type Props = { onSubmit: (data: any) => void }
interface MBLFormModalProps {
  mblTransaction?: any
  isEdit?: boolean
  onSave: (data: any) => void
  onCancel: () => void
  currentUserId?: number
}


export function MBLForm({ mblTransaction, isEdit = false, onSave, onCancel, currentUserId = 1 }: MBLFormModalProps) {
  const [form, setForm] = useState({
    numMBL: "",
    idTransport: "",
    dateEmission: "",
    dateArrivePrevue: "",
    creerPar: "",
  })

  useEffect(() => {
    if (isEdit && mblTransaction) {
      setForm({
        numMBL: mblTransaction.numMBL || "",
        idTransport: mblTransaction.idTransport || "",
        dateEmission: mblTransaction.dateEmission
          ? mblTransaction.dateEmission.slice(0, 10)
          : "",
        dateArrivePrevue: mblTransaction.dateArrivePrevue
          ? mblTransaction.dateArrivePrevue.slice(0, 10)
          : "",
          creerPar: mblTransaction.creerPar || currentUserId,
      })
    }
  }, [isEdit, mblTransaction, currentUserId])


  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const payload = {
        ...form,
        // Assure le bon format pour Sequelize DATE
        dateEmission: new Date(form.dateEmission),
        dateArrivePrevue: new Date(form.dateArrivePrevue),
      }

      let responseData
      if (isEdit && mblTransaction?.idTransAerienne) {
        await api.put(`/transAerienne/${mblTransaction.idTransAerienne}`, payload)
        Swal.fire({
          icon: "success",
          title: "Modifié!",
          text: "Transaction maritime modifié.",
          timer: 2000,
          showConfirmButton: false,
        })
        responseData = { ...mblTransaction, ...payload }
      } else {
        const res = await api.post("/transAerienne/", payload)
        Swal.fire({
          icon: "success",
          title: "Ajouté!",
          text: "Transaction maritime ajouté.",
          timer: 2000,
          showConfirmButton: false,
        })
        responseData = res.data
      }
      onSave(responseData)
    } catch (err: any) {
      console.error(err.response?.data || err) // 👈 debug
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: err.response?.data?.error || err.message || "Une erreur est survenue",
      })
    }
  }



  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Field label="Numéro MBL" value={form.numMBL} onChange={(v) => handleChange("numMBL", v)} />
      <Field label="ID Transport" value={form.idTransport} onChange={(v) => handleChange("idTransport", v)} />
      <Field label="Date Émission" type="date" value={form.dateEmission} onChange={(v) => handleChange("dateEmission", v)} />
      <Field label="Date Arrivée Prévue" type="date" value={form.dateArrivePrevue} onChange={(v) => handleChange("dateArrivePrevue", v)} />

      <div className="md:col-span-2 flex justify-end space-x-4 mt-4">
        <Button type="submit" className="px-8">Créer MBL</Button>
        <Button variant="outline" className="px-8" onClick={onCancel}>Annuler</Button>
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
