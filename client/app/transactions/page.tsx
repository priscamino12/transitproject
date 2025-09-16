"use client"
import { Layout } from "@/components/Layout"
import { TransactionsTable } from "@/components/transactions/transactions-table"
import { TransactionsStats } from "@/components/transactions/transactions-stats"
import { TransactionsHeader } from "@/components/transactions/transactions-header"
import { useState } from "react"
import { TransactionFormModal } from "@/components/transactions/transaction-form-modal"

export default function TransactionsPage() {
 const [searchTerm, setSearchTerm] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [selectedTransport, setSelectedTransport] = useState<any>(null);
  const [editMode, setEditMode] = useState(false)
  const [tableKey, setTableKey] = useState(0) // force un re-render après ajout/édition

  const handleAddTransaction = () => {
    setSelectedTransport(null)
    setEditMode(false)
    setShowForm(true)
  }

  const handleEditTransaction = (transport: any) => {
    setSelectedTransport(transport)
    setEditMode(true)
    setShowForm(true)
  }

  const handleSaveTransaction = (data: any) => {
    setShowForm(false)
    setSelectedTransport(null)
    setEditMode(false)
    // Re-rend le tableau pour récupérer la nouvelle liste
    setTableKey(prev => prev + 1)
  }

  const handleCancel = () => {
    setShowForm(false)
    setSelectedTransport(null)
    setEditMode(false)
  }

  return (
   <Layout>
         <div className="flex-1 space-y-6 p-8 pt-6">
           {!showForm ? (
             <>
               <TransactionsHeader
                 searchTerm={searchTerm}
                 onSearchChange={setSearchTerm}
                 onAddTransaction={handleAddTransaction} />
   
               <TransactionsTable
                 key={tableKey}
                 /* searchTerm={searchTerm}
                 onEditTransaction={handleEditTransaction} */ 
                 />
   
             </>
           ) : (
             <TransactionFormModal
                transaction={selectedTransport}
               isEdit={editMode} 
               onSave={handleSaveTransaction}
               onCancel={handleCancel}
             />
           )}
         </div>
       </Layout>
  )
}
