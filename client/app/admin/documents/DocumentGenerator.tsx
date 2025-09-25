"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FiDownload, FiArrowLeft } from "react-icons/fi"
import api from "@/config/axiosInstance"
import { Document, DocumentType } from "@/types/document"

interface DocumentGeneratorProps {
  documentData: Document
  type: DocumentType
  onClose: () => void
}

export default function DocumentGenerator({ documentData, type, onClose }: DocumentGeneratorProps) {
  const formData = { ...documentData }
  const transport = formData.MBL?.TransMaritime || formData.MAWB?.TransAerienne

  const handleDownloadPDF = async () => {
    try {
      const res = await api.post(`/api/${type.toLowerCase()}/generate-pdf`, formData, { responseType: "blob" })
      const url = window.URL.createObjectURL(new Blob([res.data]))
      const link = document.createElement("a")
      link.href = url
      link.setAttribute(
        "download",
        `${formData.numHBL || formData.numHAWB || formData.numMBL || formData.numMAWB}.pdf`
      )
      document.body.appendChild(link)
      link.click()
      link.remove()
      onClose()
    } catch (err) {
      console.error("Erreur téléchargement PDF :", err)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-5xl p-6 rounded-xl shadow-lg overflow-y-auto max-h-[90vh]">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Générer PDF {type}</h2>
          <Button variant="ghost" onClick={onClose}>
            <FiArrowLeft className="w-5 h-5" />
          </Button>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Informations du document</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">Numéro</label>
                  <input
                    value={formData.numHBL || formData.numHAWB || formData.numMBL || formData.numMAWB}
                    readOnly
                    className="w-full border px-2 py-1 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Date</label>
                  <input
                    type="date"
                    value={new Date(formData.dateEmission || formData.dateEmmission!).toISOString().split("T")[0]}
                    readOnly
                    className="w-full border px-2 py-1 rounded"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {!(formData.numMBL || formData.numMAWB) && (
            <Card>
              <CardHeader>
                <CardTitle>Clients</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <label className="block text-sm font-medium">Expéditeur</label>
                  <input value={formData.clientExp?.nomClient || ""} readOnly className="w-full border px-2 py-1 rounded" />
                </div>
                <div>
                  <label className="block text-sm font-medium">Destinataire</label>
                  <input value={formData.clientDest?.nomClient || ""} readOnly className="w-full border px-2 py-1 rounded" />
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Transport & Marchandise</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">Origine</label>
                  <input
                    value={transport ? `${transport.villeChargement}, ${transport.paysChargement}` : ""}
                    readOnly
                    className="w-full border px-2 py-1 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Destination</label>
                  <input
                    value={transport ? `${transport.villeDechargement || ""}, ${transport.paysDechargement || ""}` : ""}
                    readOnly
                    className="w-full border px-2 py-1 rounded"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium">Poids</label>
                  <input value={formData.poid || ""} readOnly className="w-full border px-2 py-1 rounded" />
                </div>
                <div>
                  <label className="block text-sm font-medium">Nb Colis</label>
                  <input value={formData.nbColis || ""} readOnly className="w-full border px-2 py-1 rounded" />
                </div>
                <div>
                  <label className="block text-sm font-medium">Transport</label>
                  <input
                    value={transport ? transport.nomCompagnie || transport.armateur || transport.numVol || transport.numIMO : ""}
                    readOnly
                    className="w-full border px-2 py-1 rounded"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium">Description</label>
                <textarea value={formData.description || ""} readOnly className="w-full border px-2 py-1 rounded" rows={3} />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() =>
                window.open(
                  `http://localhost:3001/${type.toLowerCase()}/${documentData.idHBL || documentData.idHAWB}/facture`,
                  "_blank"
                )
              }
            >
              <FiDownload className="w-5 h-5" />
            </Button>
            <Button onClick={handleDownloadPDF} className="ml-2">
              Générer PDF
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
