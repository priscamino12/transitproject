"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FaEdit, FaTrash, FaEye, FaPlane, FaShip, FaDownload } from "react-icons/fa"

const transactions = [
  {
    id: "MAWB-2024-001",
    type: "MAWB",
    numero: "125-87654321",
    client: "Société ABC",
    origine: "CDG - Paris",
    destination: "JFK - New York",
    transporteur: "Air France",
    dateCreation: "2024-01-20",
    statut: "Actif",
    poids: "2.5 T",
    valeur: "€15,000",
    pieces: 45,
  },
  {
    id: "HAWB-2024-002",
    type: "HAWB",
    numero: "PL-AWB-001234",
    client: "Tech Solutions",
    origine: "CDG - Paris",
    destination: "NRT - Tokyo",
    transporteur: "Lufthansa",
    dateCreation: "2024-01-19",
    statut: "En cours",
    poids: "1.8 T",
    valeur: "€22,000",
    pieces: 32,
  },
  {
    id: "MBL-2024-003",
    type: "MBL",
    numero: "MSCU1234567",
    client: "Global Trade Co",
    origine: "Le Havre",
    destination: "Shanghai",
    transporteur: "MSC",
    dateCreation: "2024-01-18",
    statut: "Actif",
    poids: "850 T",
    valeur: "€180,000",
    pieces: 45,
  },
  {
    id: "HBL-2024-004",
    type: "HBL",
    numero: "PL-BL-005678",
    client: "Import Export Ltd",
    origine: "Marseille",
    destination: "Casablanca",
    transporteur: "CMA CGM",
    dateCreation: "2024-01-17",
    statut: "Terminé",
    poids: "620 T",
    valeur: "€95,000",
    pieces: 28,
  },
]

const getTypeIcon = (type: string) => {
  if (type === "MAWB" || type === "HAWB") {
    return FaPlane
  }
  return FaShip
}

const getTypeColor = (type: string) => {
  switch (type) {
    case "MAWB":
      return "bg-blue-600"
    case "HAWB":
      return "bg-blue-500"
    case "MBL":
      return "bg-teal-600"
    case "HBL":
      return "bg-teal-500"
    default:
      return "bg-gray-500"
  }
}

const getStatusColor = (statut: string) => {
  switch (statut) {
    case "Actif":
      return "bg-green-500"
    case "En cours":
      return "bg-blue-500"
    case "Terminé":
      return "bg-gray-500"
    case "Annulé":
      return "bg-red-500"
    default:
      return "bg-gray-500"
  }
}

export function TransactionsTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Liste des Transactions ({transactions.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Document</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Route</TableHead>
              <TableHead>Transporteur</TableHead>
              <TableHead>Cargo</TableHead>
              <TableHead>Valeur</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => {
              const TypeIcon = getTypeIcon(transaction.type)
              return (
                <TableRow key={transaction.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <TypeIcon className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{transaction.numero}</span>
                          <Badge className={getTypeColor(transaction.type)}>{transaction.type}</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">{transaction.dateCreation}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{transaction.client}</div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{transaction.origine}</div>
                      <div className="text-sm text-muted-foreground">→ {transaction.destination}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{transaction.transporteur}</div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{transaction.poids}</div>
                      <div className="text-sm text-muted-foreground">{transaction.pieces} pièces</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-green-600">{transaction.valeur}</div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(transaction.statut)}>{transaction.statut}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Button variant="ghost" size="sm" title="Télécharger PDF">
                        <FaDownload className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" title="Voir détails">
                        <FaEye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" title="Modifier">
                        <FaEdit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700" title="Supprimer">
                        <FaTrash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
