"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FaEdit, FaFilter, FaSearch, FaTrash } from "react-icons/fa";
import { DeleteConfirmModal } from "./delete-confirm-modal";
import api from "@/app/axiosInstance";
import { Input } from "../../ui/input";

interface ClientsTableProps {
  onEditClient: (client: any) => void;
}

export function ClientsTable({ onEditClient }: ClientsTableProps) {
  const [clients, setClients] = useState<any[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [clientToDelete, setClientToDelete] = useState<any | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const allClient = async () => {
    try {
      const response = await api.get("/client/");
      setClients(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des clients :", error);
    }
  };

  useEffect(() => {
    allClient();
  }, []);

  const filteredData = clients.filter(
    (item) =>
      item.nomClient?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.CINClient?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.emailClient?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleDelete = (client: any) => {
    setClientToDelete(client);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (clientToDelete) {
      try {
        await api.delete(`/client/${clientToDelete.idClient}`);
        setIsDeleteModalOpen(false);
        setClientToDelete(null);
        allClient();
      } catch (error) {
        console.error("Erreur de suppression :", error);
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Liste des Clients ({clients.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row items-center md:space-x-4 space-y-2 md:space-y-0 w-full">
          <div className="relative flex-1 w-full">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              placeholder="Rechercher client..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full"
            />
          </div>
        </div>





        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Adresse</TableHead>
              <TableHead>Téléphone</TableHead>
              <TableHead>CNI</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentData.map((client) => (
              <TableRow key={client.idClient}>
                <TableCell>{client.nomClient}</TableCell>
                <TableCell>{client.emailClient}</TableCell>
                <TableCell>{client.adresseClient}</TableCell>
                <TableCell>{client.telClient}</TableCell>
                <TableCell>{client.CINClient}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => onEditClient(client)}>
                      <FaEdit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(client)}
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
          clientName={clientToDelete?.nomClient || ""}
        />
      </CardContent>
    </Card>
  );
}
