"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FaEdit, FaTrash, FaEye, FaShip } from "react-icons/fa"

const expeditions = [
  {
    id: "MSC001",
    compagnie: "MSC",
    navire: "MSC Seaside",
    origine: "Le Havre",
    destination: "Shanghai",
    dateDepart: "2024-01-15",
    dateArrivee: "2024-02-10",
    statut: "En mer",
    client: "Global Trade Co",
    conteneurs: "45 FCL",
    poids: "850 T",
  },
  {
    id: "CMA002",
    compagnie: "CMA CGM",
    navire: "CMA CGM Marco Polo",
    origine: "Marseille",
    destination: "Casablanca",
    dateDepart: "2024-01-22",
    dateArrivee: "2024-01-25",
    statut: "Programmé",
    client: "Import Export Ltd",
    conteneurs: "28 FCL",
    poids: "620 T",
  },
  {
    id: "MAE003",
    compagnie: "Maersk",
    navire: "Maersk Alabama",
    origine: "Rotterdam",
    destination: "Le Havre",
    dateDepart: "2024-01-18",
    dateArrivee: "2024-01-20",
    statut: "Arrivé",
    client: "Société ABC",
    conteneurs: "67 FCL",
    poids: "1200 T",
  },
]

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

export function MaritimeTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Expéditions Maritimes ({expeditions.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Navire</TableHead>
              <TableHead>Route</TableHead>
              <TableHead>Dates</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Cargo</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {expeditions.map((expedition) => (
              <TableRow key={expedition.id}>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <FaShip className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">{expedition.navire}</div>
                      <div className="text-sm text-muted-foreground">{expedition.compagnie}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{expedition.origine}</div>
                    <div className="text-sm text-muted-foreground">→ {expedition.destination}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <div className="text-sm">Départ: {expedition.dateDepart}</div>
                    <div className="text-sm text-muted-foreground">Arrivée: {expedition.dateArrivee}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="font-medium">{expedition.client}</div>
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{expedition.conteneurs}</div>
                    <div className="text-sm text-muted-foreground">{expedition.poids}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(expedition.statut)}>{expedition.statut}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <Button variant="ghost" size="sm">
                      <FaEye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <FaEdit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                      <FaTrash className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
