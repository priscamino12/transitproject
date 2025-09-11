"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FaPlus, FaSearch, FaFilter, FaFileInvoice } from "react-icons/fa"
import { useState } from "react"
import { TransactionFormModal } from "./transaction-form-modal"

export function TransactionsHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedType, setSelectedType] = useState("all")

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <FaFileInvoice className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Gestion des Transactions</h2>
            <p className="text-muted-foreground">MAWB, HAWB, MBL, HBL - Documents de transport</p>
          </div>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <FaPlus className="mr-2 h-4 w-4" />
          Nouvelle Transaction
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input placeholder="Rechercher une transaction..." className="pl-10" />
        </div>
        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Type de document" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les types</SelectItem>
            <SelectItem value="MAWB">MAWB (Aérien Principal)</SelectItem>
            <SelectItem value="HAWB">HAWB (Aérien Détail)</SelectItem>
            <SelectItem value="MBL">MBL (Maritime Principal)</SelectItem>
            <SelectItem value="HBL">HBL (Maritime Détail)</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline">
          <FaFilter className="mr-2 h-4 w-4" />
          Filtres
        </Button>
      </div>

      <TransactionFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
