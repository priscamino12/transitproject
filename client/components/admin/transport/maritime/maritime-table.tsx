"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FaEdit, FaTrash, FaEye, FaPlane } from "react-icons/fa"
import { useEffect, useState } from "react"
import api from "@/app/axiosInstance"
import { DeleteConfirmModal } from "@/components/admin/clients/delete-confirm-modal"


interface TransMaritimeTableProps {
   searchTerm: string
  onEditTransportMaritime: (transportMaritime: any) => void;
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


  const [transportMaritimes, setTransportMaritimes] = useState<any[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [transportMaritimeToDelete, setTransportMaritimeToDelete] = useState<any | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const allTransMaritime = async () => {
    try {
      const response = await api.get("/transMaritime/");
      setTransportMaritimes(response.data);
      // console.log(response.data);
    } catch (error) {
      console.error("Erreur de récuperation de données transport maritime", error);
    }
  };


  useEffect(() => {
    allTransMaritime();
  }, []);

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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleDelete = (TransportMaritime: any) => {
    setTransportMaritimeToDelete(TransportMaritime);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (transportMaritimeToDelete) {
      try {
        await api.delete(`/transMaritime/${transportMaritimeToDelete.idTransMaritime}`);
        setIsDeleteModalOpen(false);
        setTransportMaritimeToDelete(null);
        allTransMaritime();
      } catch (error) {
        console.error("Erreur de suppression :", error);
      }
    }
  };



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
            {currentData.map((TransportMaritime) => (
              <TableRow key={TransportMaritime.id}>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <FaPlane className="h-4 w-4 text-primary" />
                    </div>
                    <div className="font-medium">{TransportMaritime.numIMO}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="font-medium">{TransportMaritime.nomNavire} </div>
                </TableCell>
                                <TableCell>
                  <div className="font-medium">{TransportMaritime.armateur} </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">{TransportMaritime.dateChargement}</div>
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">Pays: {TransportMaritime.paysChargement}</div>
                    <div className="text-sm text-muted-foreground">Ville: {TransportMaritime.villeChargement}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">Pays: {TransportMaritime.paysDechargement}</div>
                    <div className="text-sm text-muted-foreground">Ville: {TransportMaritime.villeDechargement}</div>
                  </div>
                </TableCell>

                <TableCell>
                  <Badge className={getStatusColor(TransportMaritime.statut)}>{TransportMaritime.statut}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => onEditTransportMaritime(TransportMaritime)}>
                      <FaEdit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(TransportMaritime)}
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
          clientName={transportMaritimeToDelete?.nomNavire || ""}
        />


      </CardContent>
    </Card>
  )
}
