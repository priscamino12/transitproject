"use client"

import { useState, useEffect } from "react"
import { Layout } from "@/components/admin/Layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FiDownload, FiSearch, FiArrowLeft, FiEye, FiSave } from "react-icons/fi"
import api from "@/config/axiosInstance"

interface DocumentGeneratorProps {
  documentData: any
  type: string
  onClose: () => void
}

function DocumentGenerator({ documentData, type, onClose }: DocumentGeneratorProps) {
  const [formData, setFormData] = useState({ ...documentData })
  const isAerial = type === "MAWB" || type === "HAWB"

  const handleDownloadPDF = () => {
    // Ici tu appelles ton backend pour générer le PDF
    api
      .post(`/api/${type.toLowerCase()}/generate-pdf`, formData, { responseType: "blob" })
      .then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]))
        const link = document.createElement("a")
        link.href = url
        link.setAttribute("download", `${formData.numHBL || formData.numHAWB || formData.numMBL || formData.numMAWB}.pdf`)
        document.body.appendChild(link)
        link.click()
        link.remove()
        onClose()
      })
      .catch((err) => console.error("Erreur téléchargement PDF :", err))
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
                    value={new Date(formData.dateEmmission).toISOString().split("T")[0]}
                    readOnly
                    className="w-full border px-2 py-1 rounded"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Clients</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div>
                <label className="block text-sm font-medium">Expéditeur</label>
                <input
                  value={formData.clientExp?.nomClient || ""}
                  readOnly
                  className="w-full border px-2 py-1 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Destinataire</label>
                <input
                  value={formData.clientDest?.nomClient || ""}
                  readOnly
                  className="w-full border px-2 py-1 rounded"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Transport & Marchandise</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">Origine</label>
                  <input value={formData.origin || ""} readOnly className="w-full border px-2 py-1 rounded" />
                </div>
                <div>
                  <label className="block text-sm font-medium">Destination</label>
                  <input value={formData.destination || ""} readOnly className="w-full border px-2 py-1 rounded" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium">Description</label>
                <textarea
                  value={formData.description || ""}
                  readOnly
                  className="w-full border px-2 py-1 rounded"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-2">
            <Button onClick={handleDownloadPDF} className="bg-blue-600 text-white hover:bg-blue-700">
              <FiDownload className="w-4 h-4 mr-2" />
              Télécharger PDF
            </Button>
            <Button variant="outline" onClick={onClose}>
              Annuler
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDoc, setSelectedDoc] = useState<any | null>(null)
  const [selectedType, setSelectedType] = useState<string>("HBL")

  useEffect(() => {
    api.get("/hbl").then((res) => setDocuments(res.data))
  }, [])

  const filteredDocuments = documents.filter((doc) =>
    (doc.numHBL || "").toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Layout>
      <div className="space-y-6">
        <Card>
          <CardHeader className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <CardTitle className="text-xl font-bold">Documents de Transport</CardTitle>
            <div className="relative w-full md:w-1/3">
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
              />
              <FiSearch className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Numéro</TableHead>
                  <TableHead>Expéditeur</TableHead>
                  <TableHead>Destinataire</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDocuments.map((doc) => (
                  <TableRow key={doc.idHBL}>
                    <TableCell>{doc.numHBL}</TableCell>
                    <TableCell>{doc.clientExp?.nomClient}</TableCell>
                    <TableCell>{doc.clientDest?.nomClient}</TableCell>
                    <TableCell>{new Date(doc.dateEmmission).toLocaleDateString("fr-FR")}</TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          setSelectedDoc(doc)
                          setSelectedType("HBL")
                        }}
                      >
                        <FiDownload className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {selectedDoc && (
        <DocumentGenerator
          documentData={selectedDoc}
          type={selectedType}
          onClose={() => setSelectedDoc(null)}
        />
      )}
    </Layout>
  )
}
