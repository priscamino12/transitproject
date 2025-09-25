"use client";

import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FaPlane, FaShip, FaEye, FaDownload, FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { DeleteConfirmModal } from "@/components/admin/clients/delete-confirm-modal";
import { Modal } from "../modal/modal";
import { Input } from "@/components/ui/input";
import { House } from "@/types/house.interface";
import { houseService } from "@/services/house.service";

interface HousesTableProps {
  onEditHouse: (house: House) => void;
}

export function HouseTabs({ onEditHouse }: HousesTableProps) {
  const [houses, setHouses] = useState<House[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedHouse, setSelectedHouse] = useState<House | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [houseToDelete, setHouseToDelete] = useState<House | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchHouses = async () => {
    setLoading(true);
    try {
      const data = await houseService.getAll();
      setHouses(data);
    } catch (error) {
      console.error("Erreur de chargement :", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHouses();
  }, []);

  const openModal = (house: House) => {
    setSelectedHouse(house);
    setIsModalOpen(true);
  };

  const handleDelete = (house: House) => {
    setHouseToDelete(house);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!houseToDelete) return;
    try {
      await houseService.delete(houseToDelete);
      setIsDeleteModalOpen(false);
      setHouseToDelete(null);
      fetchHouses();
    } catch (error) {
      console.error("Erreur de suppression :", error);
    }
  };

  if (loading) return <div className="p-4">Chargement des données...</div>;

  const filteredData = houses.filter(
    (item) =>
      item.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.clientExp.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.clientDest.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber);

  const getTransportIcon = (type: "HAWB" | "HBL") =>
    type === "HBL" ? <FaShip className="text-blue-600 w-4 h-4" /> : <FaPlane className="text-teal-600 w-4 h-4" />;

  return (
    <>
      <div className="overflow-x-auto w-full">
        <div className="flex flex-col md:flex-row items-center md:space-x-4 space-y-2 md:space-y-0 w-full">
          <div className="relative flex-1 w-full">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              placeholder="Rechercher document master..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full"
            />
          </div>
        </div>

        <Table className="min-w-[700px] md:min-w-full">
          <TableHeader>
            <TableRow>
              <TableHead>Numéro</TableHead>
              <TableHead>Transport</TableHead>
              <TableHead>Date émission</TableHead>
              <TableHead>Expéditeur → Destinataire</TableHead>
              <TableHead>Détails</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentData.map((h) => (
              <TableRow key={h.id}>
                <TableCell className="whitespace-nowrap flex items-center space-x-2">
                  {getTransportIcon(h.type)}
                  <span>{h.numero}</span>
                </TableCell>
                <TableCell>{h.masterNumero}</TableCell>
                <TableCell>{new Date(h.dateEmmission).toLocaleDateString()}</TableCell>
                <TableCell>
                  {h.clientExp} → {h.clientDest}
                </TableCell>
                <TableCell>
                  <div className="bg-gray-50 dark:bg-gray-800 p-2 rounded-md text-sm space-y-1 border border-gray-200 dark:border-gray-700">
                    <div>
                      <span className="font-medium">Colis:</span> {h.nbColis}
                    </div>
                    <div>
                      <span className="font-medium">Poids:</span> {h.poid} kg
                    </div>
                    <div>
                      <span className="font-medium">Volume:</span> {h.volume} m³
                    </div>
                    <div>
                      <span className="font-medium">Description:</span> {h.description}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right space-x-1">
                  <Button variant="ghost" size="sm" title="Télécharger PDF">
                    <FaDownload className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" title="Voir détails" onClick={() => openModal(h)}>
                    <FaEye className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" title="Modifier" onClick={() => onEditHouse(h)}>
                    <FaEdit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                    onClick={() => handleDelete(h)}
                  >
                    <FaTrash className="w-4 h-4" />
                  </Button>
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
      </div>

      {selectedHouse && (
        <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)} title={`Détails du master ${selectedHouse.numero}`}>
          <div className="space-y-6 text-sm justify-content-center">
            <div>
              <strong className="pr-24">Numéro:</strong> {selectedHouse.numero}
            </div>
            <div>
              <strong className="pr-24">Transport:</strong> {selectedHouse.masterNumero}
            </div>
            <div>
              <strong className="pr-24">Date émission:</strong> {new Date(selectedHouse.dateEmmission).toLocaleDateString()}
            </div>
            <div>
              <strong className="pr-24">Expéditeur:</strong> {selectedHouse.clientExp}
            </div>
            <div>
              <strong className="pr-24">Destinataire:</strong> {selectedHouse.clientDest}
            </div>
            <div>
              <strong className="pr-24">Colis:</strong> {selectedHouse.nbColis}
            </div>
            <div>
              <strong className="pr-24">Poids:</strong> {selectedHouse.poid} kg
            </div>
            <div>
              <strong className="pr-24">Volume:</strong> {selectedHouse.volume} m³
            </div>
            <div>
              <strong className="pr-24">Description:</strong> {selectedHouse.description}
            </div>
          </div>
        </Modal>
      )}

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        clientName={houseToDelete?.numero || ""}
      />
    </>
  );
}
