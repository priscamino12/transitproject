"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FaPlus, FaSearch, FaFilter, FaFileInvoice } from "react-icons/fa"
import { useState } from "react"
import { TransactionFormModal } from "./transaction-form-modal"

type Transaction = {
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

type TransactionHeaderProps = {
  onAddTransaction: () => void
  searchTerm: string
  onSearchChange: (term: string) => void

}

export function TransactionsHeader({ onAddTransaction, searchTerm, onSearchChange }: TransactionHeaderProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [selectedType, setSelectedType] = useState("all")
  const [showForm, setShowForm] = useState(false)
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)

  const [editMode, setEditMode] = useState(false)
  const handleAddClient = () => {
    setSelectedTransaction(null)
    setEditMode(false)
    setShowForm(true)
  }

  const handleSaveClient = (transportData: Partial<Transaction>) => {
    if (editMode && selectedTransaction) {
      // Met à jour un élément existant
      setTransactions(
        transactions.map((transaction) =>
          transaction.id === selectedTransaction.id
            ? { ...transaction, ...transportData }
            : transaction
        )
      )
    } else {
      // Ajoute un nouveau transport
      const newTransaction: Transaction = {
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
      setTransactions([...transactions, newTransaction])
    }
    setShowForm(false)
    setSelectedTransaction(null)
    setEditMode(false)
  }

  // Exemple de filtrage basé sur la recherche
  const term = searchTerm.toLowerCase()
  const filteredData = transactions.filter((item) =>
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
        <Button onClick={onAddTransaction}>
          <FaPlus className="mr-2 h-4 w-4" />
          Nouvelle Transaction
        </Button>
      </div>


      {showForm && (
        <TransactionFormModal
          transaction={selectedTransaction}
          isEdit={editMode}
          onSave={handleSaveClient}
          onCancel={() => setShowForm(false)}

        />
      )}


    </>
  )
}
