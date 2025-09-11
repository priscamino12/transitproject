"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FaEdit, FaTrash, FaEye, FaPlane } from "react-icons/fa"

const expeditions = [
  {
    id: "AF001",
    compagnie: "Air France",
    vol: "AF1234",
    origine: "CDG - Paris",
    destination: "JFK - New York",
    dateDepart: "2024-01-20 14:30",
    dateArrivee: "2024-01-20 18:45",
    statut: "En vol",
    client: "Société ABC",
    poids: "2.5 T",
    pieces: 45,
  },
  {
    id: "LH002",
    compagnie: "Lufthansa",
    vol: "LH456",
    origine: "CDG - Paris",
    destination: "NRT - Tokyo",
    dateDepart: "2024-01-21 10:15",
    dateArrivee: "2024-01-22 06:30",
    statut: "Programmé",
    client: "Tech Solutions",
    poids: "1.8 T",
    pieces: 32,
  },
  {
    id: "BA003",
    compagnie: "British Airways",
    vol: "BA789",
    origine: "LHR - Londres",
    destination: "CDG - Paris",
    dateDepart: "2024-01-19 16:20",
    dateArrivee: "2024-01-19 18:45",
    statut: "Arrivé",
    client: "Import Export Ltd",
    poids: "3.2 T",
    pieces: 67,
  },
]

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

export function AerienTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Expéditions Aériennes ({expeditions.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Vol</TableHead>
              <TableHead>Route</TableHead>
              <TableHead>Horaires</TableHead>
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
                      <FaPlane className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">{expedition.vol}</div>
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
                    <div className="font-medium">{expedition.poids}</div>
                    <div className="text-sm text-muted-foreground">{expedition.pieces} pièces</div>
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
