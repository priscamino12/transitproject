"use client"

import { useState, useEffect } from "react"
import { Layout } from "@/components/admin/Layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FiDownload, FiSearch, FiArrowLeft } from "react-icons/fi"
import { Document, DocumentType } from "@/types/document"
import { fetchDocuments } from "@/services/documentService"
import DocumentGenerator from "./DocumentGenerator"

export default function DocumentsPage() {
  const [hblDocuments, setHblDocuments] = useState<Document[]>([])
  const [hawbDocuments, setHawbDocuments] = useState<Document[]>([])
  const [mblDocuments, setMblDocuments] = useState<Document[]>([])
  const [mawbDocuments, setMawbDocuments] = useState<Document[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null)
  const [selectedType, setSelectedType] = useState<DocumentType>("HBL")

  useEffect(() => {
    const load = async () => {
      const data = await fetchDocuments()
      setHblDocuments(data.hbl)
      setHawbDocuments(data.hawb)
      setMblDocuments(data.mbl)
      setMawbDocuments(data.mawb)
    }
    load()
  }, [])

  const filterDocuments = (documents: Document[]) => {
    if (!searchTerm) return documents
    return documents.filter((doc) =>
      (doc.numHBL || doc.numHAWB || doc.numMBL || doc.numMAWB)
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
  }

  const DocumentTable = ({ documents, type }: { documents: Document[]; type: DocumentType }) => {
    const filteredDocs = filterDocuments(documents)
    if (filteredDocs.length === 0) return <p className="text-center py-4">Aucun document trouvé.</p>

    return (
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
            {filteredDocs.map((doc) => {
              const transport = doc.MBL?.TransMaritime || doc.MAWB?.TransAerienne
              const origine = transport ? `${transport.villeChargement || ""}, ${transport.paysChargement || ""}` : ""
              const destination = transport ? `${transport.villeDechargement || ""}, ${transport.paysDechargement || ""}` : ""
              const transportNom = transport ? transport.nomCompagnie || transport.armateur || transport.numVol || transport.numIMO : "—"

              return (
                <TableRow key={doc.idHBL || doc.idHAWB || doc.idMBL || doc.idMAWB} className="hover:bg-gray-50">
                  <TableCell>{doc.numHBL || doc.numHAWB || doc.numMBL || doc.numMAWB}</TableCell>
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
                    <TableCell>{new Date(doc.dateEmission || doc.dateEmmission || "").toLocaleDateString("fr-FR")}</TableCell>
                  )}
                  {(type === "MBL" || type === "MAWB") && (
                    <TableCell>{new Date(doc.dateEmission || doc.dateEmmission || "").toLocaleDateString("fr-FR")}</TableCell>
                  )}
                  {(type === "MBL" || type === "MAWB") && (
                    <TableCell>{doc.dateArrivePrevue ? new Date(doc.dateArrivePrevue).toLocaleDateString("fr-FR") : ""}</TableCell>
                  )}
                  <TableCell>
                    <Button
                      variant="outline"
                      size="icon"
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
  }

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

              <TabsContent value="HBL"><DocumentTable documents={hblDocuments} type="HBL" /></TabsContent>
              <TabsContent value="HAWB"><DocumentTable documents={hawbDocuments} type="HAWB" /></TabsContent>
              <TabsContent value="MBL"><DocumentTable documents={mblDocuments} type="MBL" /></TabsContent>
              <TabsContent value="MAWB"><DocumentTable documents={mawbDocuments} type="MAWB" /></TabsContent>
            </Tabs>
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
