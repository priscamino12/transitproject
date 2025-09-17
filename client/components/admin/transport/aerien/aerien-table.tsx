"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FaEdit, FaTrash, FaEye, FaPlane } from "react-icons/fa"
import { useEffect, useState } from "react"
import api from "@/app/axiosInstance"
import { DeleteConfirmModal } from "@/components/admin/clients/delete-confirm-modal"


interface TransAerienTableProps {
   searchTerm: string
  onEditTransportAerien: (transportAerien: any) => void;
}
const getStatusColor = (statut: string) => {
  switch (statut) {
    case "En vol":
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
export function AerienTable({ onEditTransportAerien, searchTerm }: TransAerienTableProps) {


  const [transportAeriens, setTransportAeriens] = useState<any[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [transportAerienToDelete, setTransportAerienToDelete] = useState<any | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const allTransAerienne = async () => {
    try {
      const response = await api.get("/transAerienne/");
      setTransportAeriens(response.data);
      // console.log(response.data);
    } catch (error) {
      console.error("Erreur de récuperation de données transport aérien", error);
    }
  };


  useEffect(() => {
    allTransAerienne();
  }, []);

  const filteredData = transportAeriens.filter((item) =>
    [
      item.numVol,
      item.nomCompagnie,
      item.dateChargement,
      item.paysChargement,
      item.villeChargement,
      item.paysDechargement,
      item.villeDechargement,
    ]
      .filter(Boolean)
      .some((field) => field.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleDelete = (transportAerien: any) => {
    setTransportAerienToDelete(transportAerien);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (transportAerienToDelete) {
      try {
        await api.delete(`/transAerienne/${transportAerienToDelete.idTransAerienne}`);
        setIsDeleteModalOpen(false);
        setTransportAerienToDelete(null);
        allTransAerienne();
      } catch (error) {
        console.error("Erreur de suppression :", error);
      }
    }
  };



  return (
    <Card>
      <CardHeader>
        <CardTitle>Transport Aériennes ({transportAeriens.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Vol</TableHead>
              <TableHead>Compagnie</TableHead>
              <TableHead>Date Chargement</TableHead>
              <TableHead>Chargement</TableHead>
              <TableHead>Dechargement</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentData.map((transportAerien) => (
              <TableRow key={transportAerien.id}>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <FaPlane className="h-4 w-4 text-primary" />
                    </div>
                    <div className="font-medium">{transportAerien.numVol}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="font-medium">{transportAerien.nomCompagnie} </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">{transportAerien.dateChargement}</div>
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">Pays: {transportAerien.paysChargement}</div>
                    <div className="text-sm text-muted-foreground">Ville: {transportAerien.villeChargement}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">Pays: {transportAerien.paysDechargement}</div>
                    <div className="text-sm text-muted-foreground">Ville: {transportAerien.villeDechargement}</div>
                  </div>
                </TableCell>

                <TableCell>
                  <Badge className={getStatusColor(transportAerien.statut)}>{transportAerien.statut}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => onEditTransportAerien(transportAerien)}>
                      <FaEdit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(transportAerien)}
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
          clientName={transportAerienToDelete?.nomCompagnie || ""}
        />


      </CardContent>
    </Card>
  )
}
