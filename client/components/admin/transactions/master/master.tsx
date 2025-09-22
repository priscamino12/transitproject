"use client";

import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FaPlane, FaShip, FaEye, FaEdit, FaTrash, FaDownload, FaSearch, FaFilter } from "react-icons/fa";
import api from "@/app/axiosInstance";
import { Modal } from "../modal/modal";
import { Input } from "@/components/ui/input";
import { DeleteConfirmModal } from "../../clients/delete-confirm-modal";

type Master = {
  id: number;
  type: "MAWB" | "MBL";
  numero: string;
  dateEmission: string;
  dateArrivePrevue: string;
  transportName: string;
  transportInfo: any;
};
interface MastersTableProps {
  onEditMaster: (master: any) => void;
}

export function MastersTable({ onEditMaster }: MastersTableProps) {
  const [masters, setMasters] = useState<Master[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [masterToDelete, setMasterToDelete] = useState<Master | null>(null);

  const [selectedMaster, setSelectedMaster] = useState<Master | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [searchTerm, setSearchTerm] = useState("");
  const openModal = (master: Master) => {
    setSelectedMaster(master);
    setIsModalOpen(true);
  };

  const fetchMasters = async () => {
    try {
      const [mawbRes, mblRes] = await Promise.all([api.get("/mawb"), api.get("/mbl")]);

      const airData = mawbRes.data
        .filter((m: any) => m.TransAerienne)
        .map((m: any) => ({
          id: m.idMAWB,
          type: "MAWB" as const,
          numero: m.numMAWB,
          dateEmission: m.dateEmission,
          dateArrivePrevue: m.dateArrivePrevue,
          transportName: m.TransAerienne.nomCompagnie,
          transportInfo: m.TransAerienne,
        }));

      const seaData = mblRes.data
        .filter((m: any) => m.TransMaritime)
        .map((m: any) => ({
          id: m.idMBL,
          type: "MBL" as const,
          numero: m.numMBL,
          dateEmission: m.dateEmission,
          dateArrivePrevue: m.dateArrivePrevue,
          transportName: m.TransMaritime.nomNavire,
          transportInfo: m.TransMaritime,
        }));

      setMasters([...airData, ...seaData].sort((a, b) => new Date(a.dateEmission).getTime() - new Date(b.dateEmission).getTime()));
    } catch (error) {
      console.error("Erreur de chargement :", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMasters();
  }, []);

  const getTransportIcon = (type: "MAWB" | "MBL") =>
    type === "MBL" ? <FaShip className="text-blue-600 w-4 h-4" /> : <FaPlane className="text-teal-600 w-4 h-4" />;

  const handleDelete = (master: Master) => {
    setMasterToDelete(master);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!masterToDelete) return;
    try {
      await api.delete(masterToDelete.type === "MAWB" ? `/mawb/${masterToDelete.id}` : `/mbl/${masterToDelete.id}`);
      setIsDeleteModalOpen(false);
      setMasterToDelete(null);
      fetchMasters();
    } catch (error) {
      console.error("Erreur de suppression :", error);
    }
  };


  if (loading) return <div className="p-4">Chargement des données...</div>;

  const filteredData = masters.filter(
    (item) =>
      item.numero?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.transportName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber);

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
              <TableHead>Date arrivée prévue</TableHead>
              <TableHead>Détails transport</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentData.map((m) => (
              <TableRow key={`${m.type}-${m.id}`}>
                <TableCell className="whitespace-nowrap flex items-center space-x-2">
                  {getTransportIcon(m.type)}
                  <span className="font-medium">{m.numero}</span>
                  <span className="text-xs md:text-sm bg-gray-200 px-1 rounded">{m.type}</span>
                </TableCell>
                <TableCell>{m.transportName}</TableCell>
                <TableCell>{new Date(m.dateEmission).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(m.dateArrivePrevue).toLocaleDateString()}</TableCell>
                <TableCell>
                  {m.type === "MBL" ? (
                    <>
                      Navire: {m.transportInfo.nomNavire || "—"} <br />
                      {m.transportInfo.villeChargement || "—"} → {m.transportInfo.villeDechargement || "—"}
                    </>
                  ) : (
                    <>
                      Vol: {m.transportInfo.numVol || "—"} ({m.transportInfo.nomCompagnie || "—"}) <br />
                      {m.transportInfo.villeChargement || "—"} → {m.transportInfo.villeDechargement || "—"}
                    </>
                  )}
                </TableCell>
                <TableCell className="text-right space-x-1">
                  <Button variant="ghost" size="sm" title="Télécharger PDF"><FaDownload className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="sm" title="Voir détails" onClick={() => openModal(m)}>
                    <FaEye className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    title="Modifier"
                    onClick={() => onEditMaster(m)}
                  >
                    <FaEdit className="w-4 h-4" />
                  </Button>

                  <Button variant="ghost" onClick={() => handleDelete(m)} size="sm" className="text-red-600 hover:text-red-700" title="Supprimer"><FaTrash className="w-4 h-4" /></Button>
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
      {selectedMaster && (
        <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)} title={`Détails du master ${selectedMaster.numero}`}>
          <div className="space-y-2 text-sm">
            <div><strong>Type:</strong> {selectedMaster.type}</div>
            <div><strong>Numéro:</strong> {selectedMaster.numero}</div>
            <div><strong>Transport:</strong> {selectedMaster.transportName}</div>
            <div><strong>Date émission:</strong> {new Date(selectedMaster.dateEmission).toLocaleDateString()}</div>
            <div><strong>Date arrivée prévue:</strong> {new Date(selectedMaster.dateArrivePrevue).toLocaleDateString()}</div>
            <div><strong>Détails transport:</strong>
              {selectedMaster.type === "MBL" ? (
                <>
                  <div>Navire: {selectedMaster.transportInfo.nomNavire || "—"}</div>
                  <div>{selectedMaster.transportInfo.villeChargement || "—"} → {selectedMaster.transportInfo.villeDechargement || "—"}</div>
                </>
              ) : (
                <>
                  <div>Vol: {selectedMaster.transportInfo.numVol || "—"} ({selectedMaster.transportInfo.nomCompagnie || "—"})</div>
                  <div>{selectedMaster.transportInfo.villeChargement || "—"} → {selectedMaster.transportInfo.villeDechargement || "—"}</div>
                </>
              )}
            </div>
          </div>
        </Modal>
      )}

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        clientName={masterToDelete?.numero || ""}
      />

    </>
  );
}