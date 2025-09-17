"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FaSearch, FaFilter } from "react-icons/fa"
import { useState } from "react"
import { AerienFormModal } from "./aerien-form-modal"
import { useLanguage } from "@/contexts/LanguageContext"
import { FiPlus } from "react-icons/fi"

type TransportAerien = {
  id: string
  numVol: string
  nomCompagnie: string
  dateChargement: string
  paysChargement: string
  villeChargement: string
  paysDechargement: string
  villeDechargement: string
  createdAt: string
  totalShipments: number
  totalValue: string
}

type TransportAerienHeaderProps = {
  onAddTransportAerien: () => void
  searchTerm: string
  onSearchChange: (term: string) => void

}

export function AerienHeader({ onAddTransportAerien, searchTerm, onSearchChange }: TransportAerienHeaderProps) {
  const { t } = useLanguage()

  const [transportAeriens, setTransportAeriens] = useState<TransportAerien[]>([])
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [showForm, setShowForm] = useState(false)
  const [selectedTransportAerien, setSelectedTransportAerien] = useState<TransportAerien | null>(null)
  const [editMode, setEditMode] = useState(false)

  const handleAddClient = () => {
    setSelectedTransportAerien(null)
    setEditMode(false)
    setShowForm(true)
  }

  const handleSaveClient = (transportData: Partial<TransportAerien>) => {
    if (editMode && selectedTransportAerien) {
      // Met à jour un élément existant
      setTransportAeriens(
        transportAeriens.map((transportAerien) =>
          transportAerien.id === selectedTransportAerien.id
            ? { ...transportAerien, ...transportData }
            : transportAerien
        )
      )
    } else {
      // Ajoute un nouveau transport
      const newTransportAerien: TransportAerien = {
        ...transportData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString().split("T")[0],
        totalShipments: 0,
        totalValue: "€0",
        numVol: transportData.numVol ?? "",
        nomCompagnie: transportData.nomCompagnie ?? "",
        dateChargement: transportData.dateChargement ?? "",
        paysChargement: transportData.paysChargement ?? "",
        villeChargement: transportData.villeChargement ?? "",
        paysDechargement: transportData.paysDechargement ?? "",
        villeDechargement: transportData.villeDechargement ?? "",
      }
      setTransportAeriens([...transportAeriens, newTransportAerien])
    }
    setShowForm(false)
    setSelectedTransportAerien(null)
    setEditMode(false)
  }

  // Exemple de filtrage basé sur la recherche
  const term = searchTerm.toLowerCase()
  const filteredData = transportAeriens.filter((item) =>
    item.numVol.toLowerCase().includes(term) ||
    item.nomCompagnie.toLowerCase().includes(term) ||
    item.dateChargement.toLowerCase().includes(term) ||
    item.paysChargement.toLowerCase().includes(term) ||
    item.villeChargement.toLowerCase().includes(term) ||
    item.paysDechargement.toLowerCase().includes(term) ||
    item.villeDechargement.toLowerCase().includes(term)
  )

  return (
    <>
      <div className="space-y-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Transport Aérienne</h1>
            <p className="text-muted-foreground">Gérez vos transports et leurs informations</p>
          </div>
          <Button onClick={onAddTransportAerien} className="flex items-center space-x-2">
            <FiPlus className="w-4 h-4" />
            <span>Nouveau Transport</span>
          </Button>
        </div>
      </div>

     <div className="flex flex-col md:flex-row items-center md:space-x-4 space-y-2 md:space-y-0 w-full">
          <div className="relative flex-1 w-full">
         <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
          <Input
            placeholder="Rechercher une transport..."
            className="pl-10 w-full"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>
      {showForm && (
        <AerienFormModal
          transportAerien={selectedTransportAerien}
          isEdit={editMode}
          onSave={handleSaveClient}
          onCancel={() => setShowForm(false)}
        />
      )}
    </>
  )
}
