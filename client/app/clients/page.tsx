"use client";

import { Layout } from "@/components/Layout";
import { ClientsTable } from "@/components/clients/clients-table";
import { ClientsHeader } from "@/components/clients/clients-header";
import { useState } from "react";
import { ClientForm } from "@/components/clients/client-form-modal";

export default function ClientsPage() {
  const [showForm, setShowForm] = useState(false);
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [editMode, setEditMode] = useState(false);
  const [tableKey, setTableKey] = useState(0); // ← clé pour forcer re-render

  const handleAddClient = () => {
    setSelectedClient(null);
    setEditMode(false);
    setShowForm(true);
  };

  const handleEditClient = (client: any) => {
    setSelectedClient(client);
    setEditMode(true);
    setShowForm(true);
  };

  const handleSaveClient = (data: any) => {
    setShowForm(false);
    setSelectedClient(null);
    setEditMode(false);

    // forcer re-render du tableau pour récupérer la nouvelle liste
    setTableKey(prev => prev + 1);
  };

  const handleCancel = () => {
    setShowForm(false);
    setSelectedClient(null);
    setEditMode(false);
  };

  return (
    <Layout>
      <div className="flex-1 space-y-6 p-8 pt-6">
        {!showForm ? (
          <>
            <ClientsHeader onAddClient={handleAddClient} />
            <ClientsTable key={tableKey} onEditClient={handleEditClient} />
          </>
        ) : (
          <ClientForm
            client={selectedClient}
            isEdit={editMode}
            onSave={handleSaveClient}
            onCancel={handleCancel}
          />
        )}
      </div>
    </Layout>
  );
}
