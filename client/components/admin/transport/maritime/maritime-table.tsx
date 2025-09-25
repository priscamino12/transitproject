"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FaEdit, FaTrash, FaPlane } from "react-icons/fa"
import { useEffect, useState } from "react"
import { DeleteConfirmModal } from "@/components/admin/clients/delete-confirm-modal"
import { TransportMaritime } from "@/types/transportmaritime.interface"
import { transportMaritimeService } from "@/services/transportmaritime.service"

interface TransMaritimeTableProps {
  searchTerm: string
  onEditTransportMaritime: (transportMaritime: TransportMaritime) => void
}

const getStatusColor = (statut: string) => {
  switch (statut) {
    case "En mer":
      return "bg-blue-500"
    case "Programmé":
      return "bg-yellow-500"
    case "Arrivé":
      return "bg-green-500"
    case "Retardé":
      return "bg-red-500"
    default:
      return "bg-gray-500"
  }
}

export function MaritimeTable({ onEditTransportMaritime, searchTerm }: TransMaritimeTableProps) {
  const [transportMaritimes, setTransportMaritimes] = useState<TransportMaritime[]>([])
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedTransport, setSelectedTransport] = useState<TransportMaritime | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Récupération de tous les transports maritimes
  const fetchTransports = async () => {
    try {
      const data = await transportMaritimeService.getAll()
      setTransportMaritimes(data)
    } catch (error) {
      console.error("Erreur de récupération de données transport maritime", error)
    }
  }

  useEffect(() => {
    fetchTransports()
  }, [])

  // Filtrage selon la recherche
  const filteredData = transportMaritimes.filter((item) =>
    [
      item.numIMO,
      item.nomNavire,
      item.armateur,
      item.dateChargement,
      item.paysChargement,
      item.villeChargement,
      item.paysDechargement,
      item.villeDechargement,
    ]
      .filter(Boolean)
      .some((field) => field.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber)

  const handleDeleteClick = (transport: TransportMaritime) => {
    setSelectedTransport(transport)
    setIsDeleteModalOpen(true)
  }

  const confirmDelete = async () => {
    if (!selectedTransport) return
    try {
      await transportMaritimeService.delete(selectedTransport.idTransMaritime)
      setIsDeleteModalOpen(false)
      setSelectedTransport(null)
      fetchTransports()
    } catch (error) {
      console.error("Erreur de suppression :", error)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transport Maritimes ({transportMaritimes.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>N° IMO</TableHead>
              <TableHead>Nom navire</TableHead>
              <TableHead>Agent</TableHead>
              <TableHead>Date Chargement</TableHead>
              <TableHead>Chargement</TableHead>
              <TableHead>Dechargement</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentData.map((transport) => (
              <TableRow key={transport.idTransMaritime}>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <FaPlane className="h-4 w-4 text-primary" />
                    </div>
                    <div className="font-medium">{transport.numIMO}</div>
                  </div>
                </TableCell>
                <TableCell>{transport.nomNavire}</TableCell>
                <TableCell>{transport.armateur}</TableCell>
                <TableCell>{transport.dateChargement}</TableCell>
                <TableCell>
                  <div>
                    <div>Pays: {transport.paysChargement}</div>
                    <div className="text-sm text-muted-foreground">Ville: {transport.villeChargement}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <div>Pays: {transport.paysDechargement}</div>
                    <div className="text-sm text-muted-foreground">Ville: {transport.villeDechargement}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(transport.statut)}>{transport.statut}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => onEditTransportMaritime(transport)}>
                      <FaEdit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteClick(transport)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <FaTrash className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="mt-4 flex justify-center space-x-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <Button
              key={index}
              size="sm"
              variant={currentPage === index + 1 ? "default" : "outline"}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Button>
          ))}
        </div>

        <DeleteConfirmModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={confirmDelete}
          clientName={selectedTransport?.nomNavire || ""}
        />
      </CardContent>
    </Card>
  )
}
