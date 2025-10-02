"use client"

import { Layout } from "@/components/admin/Layout"
import { MaritimeHeader } from "@/components/admin/transport/maritime/maritime-header"
import { MaritimeTable } from "@/components/admin/transport/maritime/maritime-table"
import { MaritimeStats } from "@/components/admin/transport/maritime/maritime-stats"
import { useState } from "react"
import { MaritimeFormModal } from "@/components/admin/transport/maritime/maritime-form-modal"

export default function MaritimePage() {

  const [searchTerm, setSearchTerm] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [selectedTransport, setSelectedTransport] = useState<any>(null);
  const [editMode, setEditMode] = useState(false)
  const [tableKey, setTableKey] = useState(0)
  const handleAddTransportMaritime = () => {
    setSelectedTransport(null)
    setEditMode(false)
    setShowForm(true)
  }

  const handleEditTransportMaritime = (transport: any) => {
    setSelectedTransport(transport)
    setEditMode(true)
    setShowForm(true)
  }

  const handleSaveTransportMaritime = (data: any) => {
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
            <MaritimeHeader
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              onAddTransportMaritime={handleAddTransportMaritime}
            />
            <MaritimeStats />
            <MaritimeTable
              key={tableKey}
              searchTerm={searchTerm}
              onEditTransportMaritime={handleEditTransportMaritime} />
          </>
        ) : (
          <MaritimeFormModal
            transportMaritime={selectedTransport}
            isEdit={editMode}
            onSave={handleSaveTransportMaritime}
            onCancel={handleCancel}
          />
        )}

      </div>
    </Layout>
  )
}
