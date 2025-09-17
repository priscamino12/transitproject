"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FaSearch, FaFilter } from "react-icons/fa"
import { useState } from "react"
import { MaritimeFormModal } from "./maritime-form-modal"
import { useLanguage } from "@/contexts/LanguageContext"
import { FiPlus } from "react-icons/fi"

type TransportMaritime = {
  id: string
  numIMO: string
  nomNavire: string
  armateur: string
  dateChargement: string
  paysChargement: string
  villeChargement: string
  paysDechargement: string
  villeDechargement: string
  createdAt: string
  totalShipments: number
  totalValue: string
}

type TransportMaritimeHeaderProps = {
  onAddTransportMaritime: () => void
  searchTerm: string
  onSearchChange: (term: string) => void

}

export function MaritimeHeader({ onAddTransportMaritime, searchTerm, onSearchChange }: TransportMaritimeHeaderProps) {
  const { t } = useLanguage()

  const [transportMaritimes, setTransportMaritimes] = useState<TransportMaritime[]>([])
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [showForm, setShowForm] = useState(false)
  const [selectedTransportMaritime, setSelectedTransportMaritime] = useState<TransportMaritime | null>(null)
  const [editMode, setEditMode] = useState(false)

  const handleAddClient = () => {
    setSelectedTransportMaritime(null)
    setEditMode(false)
    setShowForm(true)
  }

  const handleSaveClient = (transportData: Partial<TransportMaritime>) => {
    if (editMode && selectedTransportMaritime) {
      // Met à jour un élément existant
      setTransportMaritimes(
        transportMaritimes.map((transportMaritime) =>
          transportMaritime.id === selectedTransportMaritime.id
            ? { ...transportMaritime, ...transportData }
            : transportMaritime
        )
      )
    } else {
      // Ajoute un nouveau transport
      const newTransportMaritime: TransportMaritime = {
        ...transportData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString().split("T")[0],
        totalShipments: 0,
        totalValue: "€0",
        numIMO: transportData.numIMO ?? "",
        nomNavire: transportData.nomNavire ?? "",
        armateur: transportData.nomNavire ?? "",
        dateChargement: transportData.dateChargement ?? "",
        paysChargement: transportData.paysChargement ?? "",
        villeChargement: transportData.villeChargement ?? "",
        paysDechargement: transportData.paysDechargement ?? "",
        villeDechargement: transportData.villeDechargement ?? "",
      }
      setTransportMaritimes([...transportMaritimes, newTransportMaritime])
    }
    setShowForm(false)
    setSelectedTransportMaritime(null)
    setEditMode(false)
  }

  // Exemple de filtrage basé sur la recherche
  const term = searchTerm.toLowerCase()
  const filteredData = transportMaritimes.filter((item) =>
    item.numIMO.toLowerCase().includes(term) ||
    item.nomNavire.toLowerCase().includes(term) ||
    item.armateur.toLowerCase().includes(term) ||
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
            <h1 className="text-3xl font-bold text-foreground">Transport Maritimes</h1>
            <p className="text-muted-foreground">Gérez vos transports et leurs informations</p>
          </div>
          <Button onClick={onAddTransportMaritime} className="flex items-center space-x-2">
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
        <MaritimeFormModal
          transportMaritime={selectedTransportMaritime}
          isEdit={editMode}
          onSave={handleSaveClient}
          onCancel={() => setShowForm(false)}
        />
      )}
    </>
  )
}
