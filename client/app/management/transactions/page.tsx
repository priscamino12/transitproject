"use client"
import { Layout } from "@/components/admin/Layout"
import { TransactionsTable } from "@/components/admin/transactions/transactions-table"
import { TransactionsStats } from "@/components/admin/transactions/transactions-stats"
import { TransactionsHeader } from "@/components/admin/transactions/transactions-header"
import { useState } from "react"
import { TransactionFormModal } from "@/components/admin/transactions/transaction-form-modal"
import { ProtectedAdmin } from "@/app/protectedAdmin"

export default function TransactionsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null)
  const [editMode, setEditMode] = useState(false)
  const [tableKey, setTableKey] = useState(0) // force un re-render après ajout/édition

  const handleAddTransaction = () => {
    setSelectedTransaction(null)
    setEditMode(false)
    setShowForm(true)
  }

  const handleEditTransaction = (transaction: any) => {
    setSelectedTransaction(transaction)
    setEditMode(true)
    setShowForm(true)
  }

  const handleSaveTransaction = (data: any) => {
    setShowForm(false)
    setSelectedTransaction(null)
    setEditMode(false)
    setTableKey(prev => prev + 1) // rafraîchit le tableau
  }

  const handleCancel = () => {
    setShowForm(false)
    setSelectedTransaction(null)
    setEditMode(false)
  }

  return (
    <ProtectedAdmin>
      <Layout>
        <div className="flex-1 space-y-6 p-8 pt-6">
          {!showForm ? (
            <>
              <TransactionsHeader
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                onAddTransaction={handleAddTransaction}
              />

              <TransactionsTable
                key={tableKey}
                onEditMaster={(master) => {
                  setSelectedTransaction(master);
                  setEditMode(true);
                  setShowForm(true);
                }}
                onEditHouse={(house) => {
                  setSelectedTransaction(house);
                  setEditMode(true);
                  setShowForm(true);
                }}
              />



            </>
          ) : (
            <TransactionFormModal
              transaction={selectedTransaction}
              isEdit={editMode}
              onSave={handleSaveTransaction}
              onCancel={handleCancel}
            />
          )}
        </div>
      </Layout>
    </ProtectedAdmin>
  )
}
