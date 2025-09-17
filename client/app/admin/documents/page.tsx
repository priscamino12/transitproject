"use client"

import { useState } from "react"
import { Layout } from "@/components/admin/Layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  FiFolder,
  FiSearch,
  FiDownload,
  FiEye,
  FiMoreVertical,
  FiFileText,
  FiNavigation,
  FiAnchor,
  FiCalendar,
} from "react-icons/fi"
import { useLanguage } from "@/contexts/LanguageContext"

const mockDocuments = [
  {
    id: "1",
    type: "MAWB",
    number: "MAWB-20240115-001",
    client: "ABC Corp",
    origin: "Paris CDG",
    destination: "New York JFK",
    createdDate: "2024-01-15",
    status: "Généré",
    transportMode: "aerial",
    value: "€25,000",
  },
  {
    id: "2",
    type: "MBL",
    number: "MBL-20240114-023",
    client: "XYZ Ltd",
    origin: "Le Havre",
    destination: "Shanghai",
    createdDate: "2024-01-14",
    status: "Généré",
    transportMode: "maritime",
    value: "€45,000",
  },
  {
    id: "3",
    type: "HAWB",
    number: "HAWB-20240113-045",
    client: "Global Inc",
    origin: "Londres LHR",
    destination: "Tokyo NRT",
    createdDate: "2024-01-13",
    status: "Envoyé",
    transportMode: "aerial",
    value: "€18,500",
  },
  {
    id: "4",
    type: "HBL",
    number: "HBL-20240112-067",
    client: "Trade Co",
    origin: "Rotterdam",
    destination: "Los Angeles",
    createdDate: "2024-01-12",
    status: "Brouillon",
    transportMode: "maritime",
    value: "€32,000",
  },
]

export default function DocumentsPage() {
  const { t } = useLanguage()
  const [documents, setDocuments] = useState(mockDocuments)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.destination.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || doc.status === statusFilter
    const matchesType = typeFilter === "all" || doc.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  const aerialDocuments = filteredDocuments.filter((doc) => doc.transportMode === "aerial")
  const maritimeDocuments = filteredDocuments.filter((doc) => doc.transportMode === "maritime")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Généré":
        return "bg-green-500"
      case "Envoyé":
        return "bg-blue-500"
      case "Brouillon":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  const handleDownloadPDF = (document: any) => {
    // Simulate PDF download
    console.log(`Téléchargement du PDF pour ${document.number}`)
    // In a real app, this would generate and download the PDF
  }

  const handlePreviewDocument = (document: any) => {
    // Simulate document preview
    console.log(`Aperçu du document ${document.number}`)
    // In a real app, this would open a preview modal
  }

  const handleGenerateDocument = (type: string) => {
    // Simulate document generation
    console.log(`Génération d'un nouveau document ${type}`)
    // In a real app, this would open a form to create a new document
  }

  const DocumentTable = ({ documents }: { documents: any[] }) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Document</TableHead>
          <TableHead>Client</TableHead>
          <TableHead>Route</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Valeur</TableHead>
          <TableHead>Statut</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {documents.map((document) => (
          <TableRow key={document.id}>
            <TableCell>
              <div className="flex items-center space-x-2">
                {document.transportMode === "aerial" ? (
                  <FiNavigation className="w-4 h-4 text-blue-500" />
                ) : (
                  <FiAnchor className="w-4 h-4 text-teal-500" />
                )}
                <div>
                  <p className="font-medium">{document.number}</p>
                  <p className="text-xs text-muted-foreground">{document.type}</p>
                </div>
              </div>
            </TableCell>
            <TableCell>{document.client}</TableCell>
            <TableCell>
              <div className="text-sm">
                <div>{document.origin}</div>
                <div className="text-muted-foreground">→ {document.destination}</div>
              </div>
            </TableCell>
            <TableCell>{new Date(document.createdDate).toLocaleDateString("fr-FR")}</TableCell>
            <TableCell className="font-medium">{document.value}</TableCell>
            <TableCell>
              <Badge className={`${getStatusColor(document.status)} text-white`}>{document.status}</Badge>
            </TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <FiMoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handlePreviewDocument(document)}>
                    <FiEye className="mr-2 h-4 w-4" />
                    Aperçu
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleDownloadPDF(document)}>
                    <FiDownload className="mr-2 h-4 w-4" />
                    Télécharger PDF
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-500 rounded-lg">
              <FiFolder className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">{t("documents")}</h1>
              <p className="text-muted-foreground">Gérez et exportez vos documents de transport</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Documents</p>
                  <p className="text-2xl font-bold">{documents.length}</p>
                </div>
                <FiFileText className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Documents Aériens</p>
                  <p className="text-2xl font-bold">{documents.filter((d) => d.transportMode === "aerial").length}</p>
                </div>
                <FiNavigation className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Documents Maritimes</p>
                  <p className="text-2xl font-bold">{documents.filter((d) => d.transportMode === "maritime").length}</p>
                </div>
                <FiAnchor className="w-8 h-8 text-teal-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Ce Mois</p>
                  <p className="text-2xl font-bold">
                    {
                      documents.filter((d) => {
                        const docDate = new Date(d.createdDate)
                        const now = new Date()
                        return docDate.getMonth() === now.getMonth() && docDate.getFullYear() === now.getFullYear()
                      }).length
                    }
                  </p>
                </div>
                <FiCalendar className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardHeader>
            <CardTitle>Documents de Transport</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Rechercher par numéro, client, origine ou destination..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filtrer par statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="Généré">Généré</SelectItem>
                  <SelectItem value="Envoyé">Envoyé</SelectItem>
                  <SelectItem value="Brouillon">Brouillon</SelectItem>
                </SelectContent>
              </Select>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filtrer par type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les types</SelectItem>
                  <SelectItem value="MAWB">MAWB</SelectItem>
                  <SelectItem value="HAWB">HAWB</SelectItem>
                  <SelectItem value="MBL">MBL</SelectItem>
                  <SelectItem value="HBL">HBL</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Tabs defaultValue="all" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">Tous les Documents</TabsTrigger>
                <TabsTrigger value="aerial" className="flex items-center space-x-2">
                  <FiNavigation className="w-4 h-4" />
                  <span>Documents Aériens</span>
                </TabsTrigger>
                <TabsTrigger value="maritime" className="flex items-center space-x-2">
                  <FiAnchor className="w-4 h-4" />
                  <span>Documents Maritimes</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-muted-foreground">{filteredDocuments.length} document(s) trouvé(s)</p>
                    <div className="flex space-x-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button>
                            <FiFileText className="w-4 h-4 mr-2" />
                            Nouveau Document
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleGenerateDocument("MAWB")}>
                            <FiNavigation className="mr-2 h-4 w-4" />
                            Facture MAWB
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleGenerateDocument("HAWB")}>
                            <FiNavigation className="mr-2 h-4 w-4" />
                            Facture HAWB
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleGenerateDocument("MBL")}>
                            <FiAnchor className="mr-2 h-4 w-4" />
                            Facture MBL
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleGenerateDocument("HBL")}>
                            <FiAnchor className="mr-2 h-4 w-4" />
                            Facture HBL
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  <DocumentTable documents={filteredDocuments} />
                </div>
              </TabsContent>

              <TabsContent value="aerial">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-muted-foreground">
                      {aerialDocuments.length} document(s) aérien(s) trouvé(s)
                    </p>
                    <div className="flex space-x-2">
                      <Button onClick={() => handleGenerateDocument("MAWB")}>
                        <FiFileText className="w-4 h-4 mr-2" />
                        Nouvelle Facture MAWB
                      </Button>
                      <Button variant="outline" onClick={() => handleGenerateDocument("HAWB")}>
                        <FiFileText className="w-4 h-4 mr-2" />
                        Nouvelle Facture HAWB
                      </Button>
                    </div>
                  </div>
                  <DocumentTable documents={aerialDocuments} />
                </div>
              </TabsContent>

              <TabsContent value="maritime">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-muted-foreground">
                      {maritimeDocuments.length} document(s) maritime(s) trouvé(s)
                    </p>
                    <div className="flex space-x-2">
                      <Button onClick={() => handleGenerateDocument("MBL")}>
                        <FiFileText className="w-4 h-4 mr-2" />
                        Nouvelle Facture MBL
                      </Button>
                      <Button variant="outline" onClick={() => handleGenerateDocument("HBL")}>
                        <FiFileText className="w-4 h-4 mr-2" />
                        Nouvelle Facture HBL
                      </Button>
                    </div>
                  </div>
                  <DocumentTable documents={maritimeDocuments} />
                </div>
              </TabsContent>
            </Tabs>

            {filteredDocuments.length === 0 && (
              <div className="text-center py-8">
                <FiFileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Aucun document trouvé</p>
                <p className="text-sm text-muted-foreground">
                  Essayez de modifier vos critères de recherche ou créez un nouveau document
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}
