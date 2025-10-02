"use client"

import { Layout } from "@/components/admin/Layout"
import { AerienHeader } from "@/components/admin/transport/aerien/aerien-header"
import { AerienTable } from "@/components/admin/transport/aerien/aerien-table"
import { AerienStats } from "@/components/admin/transport/aerien/aerien-stats"
import { useState } from "react"
import { AerienFormModal } from "@/components/admin/transport/aerien/aerien-form-modal"



export default function AerienPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [selectedTransport, setSelectedTransport] = useState<any>(null);
  const [editMode, setEditMode] = useState(false)
  const [tableKey, setTableKey] = useState(0) // force un re-render après ajout/édition

  const handleAddTransportAerien = () => {
    setSelectedTransport(null)
    setEditMode(false)
    setShowForm(true)
  }

  const handleEditTransportAerien = (transport: any) => {
    setSelectedTransport(transport)
    setEditMode(true)
    setShowForm(true)
  }

  const handleSaveTransportAerien = (data: any) => {
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
            <AerienHeader
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              onAddTransportAerien={handleAddTransportAerien} />

            <AerienTable
              key={tableKey}
              searchTerm={searchTerm}
              onEditTransportAerien={handleEditTransportAerien} />

          </>
        ) : (
          <AerienFormModal
            transportAerien={selectedTransport}
            isEdit={editMode}
            onSave={handleSaveTransportAerien}
            onCancel={handleCancel}
          />
        )}
      </div>
    </Layout>
  )
}
