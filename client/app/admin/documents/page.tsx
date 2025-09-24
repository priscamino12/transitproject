"use client"

import { useState, useEffect } from "react"
import { Layout } from "@/components/admin/Layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FiDownload, FiSearch, FiArrowLeft } from "react-icons/fi"
import api from "@/app/axiosInstance"

interface DocumentGeneratorProps {
  documentData: any
  type: string
  onClose: () => void
}
function DocumentGenerator({ documentData, type, onClose }: DocumentGeneratorProps) {
  const [formData, setFormData] = useState({ ...documentData })
  const isAerial = type === "MAWB" || type === "HAWB"

  const handleDownloadPDF = () => {
    api
      .post(`/api/${type.toLowerCase()}/generate-pdf`, formData, { responseType: "blob" })
      .then((res) => {
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
      })
      .catch((err) => console.error("Erreur téléchargement PDF :", err))
  }

  const transport =
    formData.MBL?.TransMaritime || formData.MAWB?.TransAerienne

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
                    value={new Date(formData.dateEmission || formData.dateEmmission).toISOString().split("T")[0]}
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
                    value={
                      transport
                        ? transport.nomCompagnie || transport.armateur || transport.numVol || transport.numIMO
                        : ""
                    }
                    readOnly
                    className="w-full border px-2 py-1 rounded"
                  />
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
            <Button
              variant="outline"
              size="icon"
              onClick={() => window.open(`http://localhost:3001/${type.toLowerCase()}/${documentData.idHBL || documentData.idHAWB}/facture`, "_blank")}

            >
              <FiDownload className="w-5 h-5" />
            </Button>

          </div>
        </div>
      </div>
    </div>
  )
}

export default function DocumentsPage() {
  const [hblDocuments, setHblDocuments] = useState<any[]>([])
  const [hawbDocuments, setHawbDocuments] = useState<any[]>([])
  const [mblDocuments, setMblDocuments] = useState<any[]>([])
  const [mawbDocuments, setMawbDocuments] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDoc, setSelectedDoc] = useState<any | null>(null)
  const [selectedType, setSelectedType] = useState<string>("")

  useEffect(() => {
    fetchDocuments()
  }, [])

  const fetchDocuments = async () => {
    try {
      const [hblRes, hawbRes, mblRes, mawbRes] = await Promise.all([
        api.get("/hbl"),
        api.get("/hawb"),
        api.get("/mbl"),
        api.get("/mawb"),
      ])
      setHblDocuments(hblRes.data)
      setHawbDocuments(hawbRes.data)
      setMblDocuments(mblRes.data)
      setMawbDocuments(mawbRes.data)
    } catch (error) {
      console.error("Erreur lors du chargement des documents :", error)
    }
  }

  const filterDocuments = (documents: any[]) => {
    if (!searchTerm) return documents
    return documents.filter((doc) =>
      (doc.numHBL || doc.numHAWB || doc.numMBL || doc.numMAWB)
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
  }

  const DocumentTable = ({ documents, type }: { documents: any[]; type: string }) => (
    <div className="overflow-x-auto">
      <Table className="min-w-full">
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead>Numéro</TableHead>

            {(type === "HBL" || type === "HAWB") && <TableHead>Client Expéditeur</TableHead>}
            {(type === "HBL" || type === "HAWB") && <TableHead>Client Destinataire</TableHead>}
            {(type === "HBL" || type === "HAWB") && <TableHead>Poids</TableHead>}
            {(type === "HBL" || type === "HAWB") && <TableHead>Volume</TableHead>}
            {(type === "HBL" || type === "HAWB") && <TableHead>Nombre de colis</TableHead>}
            {(type === "HBL" || type === "HAWB") && <TableHead>Description</TableHead>}

            <TableHead>Transport</TableHead>

            {(type === "HBL" || type === "HAWB") && <TableHead>Origine</TableHead>}
            {(type === "HBL" || type === "HAWB") && <TableHead>Destination</TableHead>}

            {(type === "HBL" || type === "HAWB") && <TableHead>Date</TableHead>}
            {(type === "MBL" || type === "MAWB") && <TableHead>Date Emission</TableHead>}
            {(type === "MBL" || type === "MAWB") && <TableHead>Date Arrivée</TableHead>}

            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filterDocuments(documents).map((doc) => {
            const transport =
              doc.MBL?.TransMaritime || doc.MAWB?.TransAerienne; // pour tous types

            const origine = transport
              ? `${transport.villeChargement || ""}, ${transport.paysChargement || ""}`
              : "";

            const destination = transport
              ? `${transport.villeDechargement || ""}, ${transport.paysDechargement || ""}`
              : "";

            const transportNom =
              transport
                ? transport.nomCompagnie || transport.armateur || transport.numVol || transport.numIMO
                : "—";

            return (
              <TableRow key={doc.idHBL || doc.idHAWB || doc.idMBL || doc.idMAWB} className="hover:bg-gray-50">
                <TableCell className="font-medium">{doc.numHBL || doc.numHAWB || doc.numMBL || doc.numMAWB}</TableCell>

                {(type === "HBL" || type === "HAWB") && <TableCell>{doc.clientExp?.nomClient || ""}</TableCell>}
                {(type === "HBL" || type === "HAWB") && <TableCell>{doc.clientDest?.nomClient || ""}</TableCell>}
                {(type === "HBL" || type === "HAWB") && <TableCell>{doc.poid || ""}</TableCell>}
                {(type === "HBL" || type === "HAWB") && <TableCell>{doc.volume || ""}</TableCell>}
                {(type === "HBL" || type === "HAWB") && <TableCell>{doc.nbColis || ""}</TableCell>}
                {(type === "HBL" || type === "HAWB") && <TableCell>{doc.description || ""}</TableCell>}

                <TableCell>{transportNom}</TableCell>

                {(type === "HBL" || type === "HAWB") && <TableCell>{origine}</TableCell>}
                {(type === "HBL" || type === "HAWB") && <TableCell>{destination}</TableCell>}

                {(type === "HBL" || type === "HAWB") && (
                  <TableCell>{new Date(doc.dateEmission || doc.dateEmmission).toLocaleDateString("fr-FR")}</TableCell>
                )}
                {(type === "MBL" || type === "MAWB") && (
                  <TableCell>{new Date(doc.dateEmission || doc.dateEmmission).toLocaleDateString("fr-FR")}</TableCell>
                )}
                {(type === "MBL" || type === "MAWB") && (
                  <TableCell>{doc.dateArrivePrevue ? new Date(doc.dateArrivePrevue).toLocaleDateString("fr-FR") : ""}</TableCell>
                )}

                <TableCell>
                  <Button
                    variant="outline"
                    size="icon"
                    className="text-blue-600 hover:bg-blue-50"
                    onClick={() => {
                      setSelectedDoc(doc)
                      setSelectedType(type)
                    }}
                  >
                    <FiDownload className="w-5 h-5" />
                  </Button>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )


  return (
    <Layout>
      <div className="space-y-6">
        <Card className="shadow-lg border border-gray-200">
          <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <CardTitle className="text-2xl font-semibold">Documents de Transport</CardTitle>
            <div className="relative w-full md:w-1/3">
              <input
                type="text"
                placeholder="Rechercher par numéro..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FiSearch className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="HBL" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4 bg-gray-50 rounded-lg p-1">
                <TabsTrigger value="HBL" className="text-sm font-medium">HBL</TabsTrigger>
                <TabsTrigger value="HAWB" className="text-sm font-medium">HAWB</TabsTrigger>
                <TabsTrigger value="MBL" className="text-sm font-medium">MBL</TabsTrigger>
                <TabsTrigger value="MAWB" className="text-sm font-medium">MAWB</TabsTrigger>
              </TabsList>

              <TabsContent value="HBL">
                <DocumentTable documents={hblDocuments} type="HBL" />
              </TabsContent>
              <TabsContent value="HAWB">
                <DocumentTable documents={hawbDocuments} type="HAWB" />
              </TabsContent>
              <TabsContent value="MBL">
                <DocumentTable documents={mblDocuments} type="MBL" />
              </TabsContent>
              <TabsContent value="MAWB">
                <DocumentTable documents={mawbDocuments} type="MAWB" />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {selectedDoc && (
        <DocumentGenerator documentData={selectedDoc} type={selectedType} onClose={() => setSelectedDoc(null)} />
      )}
    </Layout>
  )
}
