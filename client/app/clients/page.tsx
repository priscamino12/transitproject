"use client";

import { Layout } from "@/components/Layout";
import { ClientsTable } from "@/components/clients/clients-table";
import { ClientsHeader } from "@/components/clients/clients-header";
import { useState } from "react";
import { ClientForm } from "@/components/clients/client-form-modal";
import api from "@/app/axiosInstance";

export default function ClientsPage() {
  const [showForm, setShowForm] = useState(false);
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [editMode, setEditMode] = useState(false);

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

  const handleSaveClient = async (data: any) => {
    try {
      if (editMode && selectedClient) {
        await api.put(`/client/${selectedClient.idClient}`, data);
      } else {
        await api.post("/client/", data);
      }
      setShowForm(false);
      setSelectedClient(null);
      setEditMode(false);
    } catch (error) {
      console.error("Erreur lors de l'ajout/modification :", error);
    }
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
            <ClientsTable onEditClient={handleEditClient} />
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
