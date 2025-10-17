"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FaEdit, FaSearch, FaTrash } from "react-icons/fa";
import { DeleteConfirmModal } from "./delet-confirm-modal";
import { Input } from "../../ui/input";
import { Employe } from "./type/employe";
import { getEmployes, deleteEmploye } from "./service/employe.service";

interface EmployeTableProps {
    onEditEmploye: (employe: Employe) => void;
}

export function EmployeTable({ onEditEmploye }: EmployeTableProps) {
    const [employes, setEmployes] = useState<Employe[]>([]);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [employeToDelete, setEmployeToDelete] = useState<Employe | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Charger les employés depuis l’API
    useEffect(() => {
        getEmployes()
            .then((res) => {
                if (res.success && res.data) setEmployes(res.data);
            })
            .catch(console.error);
    }, []);


    // Filtrer les employés par nom / email / rôle / entreprise
    const filteredData = employes.filter(
        (item) =>
            item.nomEmploye.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.emailEmploye.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.entreprise?.nomEntreprise.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber);

    // Ouvrir la modale de suppression
    const handleDeleteClick = (employe: Employe) => {
        setEmployeToDelete(employe);
        setIsDeleteModalOpen(true);
    };

    // Confirmer suppression
    const confirmDelete = async () => {
        if (employeToDelete) {
            try {
                await deleteEmploye(employeToDelete.idEmploye);
                setEmployes((prev) => prev.filter((e) => e.idEmploye !== employeToDelete.idEmploye));
                setIsDeleteModalOpen(false);
                setEmployeToDelete(null);
            } catch (error) {
                console.error("Erreur de suppression :", error);
            }
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Liste des Employés ({employes.length})</CardTitle>
            </CardHeader>
            <CardContent>
                {/* Barre de recherche */}
                <div className="flex flex-col md:flex-row items-center md:space-x-4 space-y-2 md:space-y-0 w-full mb-4">
                    <div className="relative flex-1 w-full">
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                        <Input
                            placeholder="Rechercher employé..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 w-full"
                        />
                    </div>
                </div>

                {/* Tableau */}
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nom</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Rôle</TableHead>
                            <TableHead>Entreprise</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {currentData.map((employe) => (
                            <TableRow key={employe.idEmploye}>
                                <TableCell>{employe.nomEmploye}</TableCell>
                                <TableCell>{employe.emailEmploye}</TableCell>
                                <TableCell>{employe.role || "—"}</TableCell>
                                <TableCell>{employe.entreprise?.nomEntreprise || "—"}</TableCell>
                                <TableCell className="text-right">
                                    <div className="flex items-center justify-end space-x-2">
                                        <Button variant="ghost" size="sm" onClick={() => onEditEmploye(employe)}>
                                            <FaEdit className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleDeleteClick(employe)}
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

                {/* Pagination */}
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

                {/* Modal de confirmation */}
                <DeleteConfirmModal
                    isOpen={isDeleteModalOpen}
                    onClose={() => setIsDeleteModalOpen(false)}
                    onConfirm={confirmDelete}
                    clientName={employeToDelete?.nomEmploye || ""}
                />
            </CardContent>
        </Card>
    );
}
