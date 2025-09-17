"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Layout } from "@/components/admin/Layout"
import { FaPlus, FaSearch, FaFilter } from "react-icons/fa"
import { useState } from "react"
import { ClientForm } from "./client-form-modal"
import { FiPlus } from "react-icons/fi"
import { useLanguage } from "@/contexts/LanguageContext"


const mockClients = [
  {
    id: "1",
    name: "ABC Corporation",
    email: "contact@abc-corp.com",
    phone: "+33 1 23 45 67 89",
    address: "123 Rue de la Paix, 75001 Paris, France",
    type: "Entreprise",
    status: "Actif",
    createdAt: "2024-01-15",
    totalShipments: 45,
    totalValue: "€125,000",
  },
  {
    id: "2",
    name: "XYZ Limited",
    email: "info@xyz-ltd.com",
    phone: "+44 20 7123 4567",
    address: "456 Oxford Street, London W1A 0AA, UK",
    type: "Entreprise",
    status: "Actif",
    createdAt: "2024-01-10",
    totalShipments: 32,
    totalValue: "€89,500",
  },
  {
    id: "3",
    name: "Global Trade Inc",
    email: "sales@globaltrade.com",
    phone: "+1 555 123 4567",
    address: "789 Broadway, New York, NY 10003, USA",
    type: "Entreprise",
    status: "Inactif",
    createdAt: "2024-01-05",
    totalShipments: 18,
    totalValue: "€45,200",
  },
  {
    id: "4",
    name: "Maritime Solutions",
    email: "contact@maritime-sol.com",
    phone: "+49 40 123 456 789",
    address: "Hafenstraße 12, 20459 Hamburg, Germany",
    type: "Particulier",
    status: "Actif",
    createdAt: "2024-01-20",
    totalShipments: 67,
    totalValue: "€198,750",
  },
]

type ClientsHeaderProps = {
  onAddClient: () => void
}

export function ClientsHeader({ onAddClient }: ClientsHeaderProps) {
  const { t } = useLanguage()
  const [clients, setClients] = useState(mockClients)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [showForm, setShowForm] = useState(false)
  const [selectedClient, setSelectedClient] = useState<any>(null)
  const [editMode, setEditMode] = useState(false)

  const handleAddClient = () => {
    setSelectedClient(null)
    setEditMode(false)
    setShowForm(true)
  }

 const handleSaveClient: (data: any) => void = (clientData) => {
  if (editMode && selectedClient) {
    setClients(clients.map((client) => (client.id === selectedClient.id ? { ...client, ...clientData } : client)))
  } else {
    const newClient = {
      ...clientData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split("T")[0],
      totalShipments: 0,
      totalValue: "€0",
    }
    setClients([...clients, newClient])
  }
  setShowForm(false)
  setSelectedClient(null)
  setEditMode(false)
}


  return (
    <>
      <div className="space-y-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Clients</h1>
            <p className="text-muted-foreground">Gérez vos clients et leurs informations</p>
          </div>
          <Button onClick={onAddClient} className="flex items-center space-x-2">
            <FiPlus className="w-4 h-4" />
            <span>Nouveau Client</span>
          </Button>
        </div>

        
      </div>

      {/* 👉 Ici rendu conditionnel du formulaire */}
      {showForm && (
        <ClientForm
          client={selectedClient}
          isEdit={editMode}
          onSave={handleSaveClient}
          onCancel={() => setShowForm(false)}
        />
      )}
    </>
  )
}
