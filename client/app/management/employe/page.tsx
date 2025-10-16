"use client";

import { Layout } from "@/components/admin/Layout";
import { EmployeTable } from "@/components/admin/employe/employe-table";
import { EmployeHeader } from "@/components/admin/employe/employe-header";
import { useState } from "react";
import { EmployeForm } from "@/components/admin/employe/employe-form-modal";
import { ProtectedAdmin } from "@/app/protectedAdmin";
import { Employe } from "@/components/admin/employe/type/employe";

export default function EmployesPage() {
  const [showForm, setShowForm] = useState(false);
  const [selectedEmploye, setSelectedEmploye] = useState<Employe | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [tableKey, setTableKey] = useState(0);

  const handleAddEmploye = () => {
    setSelectedEmploye(null);
    setEditMode(false);
    setShowForm(true);
  };

  const handleEditEmploye = (employe: Employe) => {
    setSelectedEmploye(employe);
    setEditMode(true);
    setShowForm(true);
  };

  const handleSaveEmploye = (data: Employe) => {
    setShowForm(false);
    setSelectedEmploye(null);
    setEditMode(false);
    // forcer re-render du tableau pour récupérer la nouvelle liste
    setTableKey(prev => prev + 1);
  };

  const handleCancel = () => {
    setShowForm(false);
    setSelectedEmploye(null);
    setEditMode(false);
  };

  return (
    <ProtectedAdmin>
      <Layout>
        <div className="flex-1 space-y-6 p-8 pt-6">
          {!showForm ? (
            <>
              <EmployeHeader onAddEmploye={handleAddEmploye} />
              <EmployeTable key={tableKey} onEditEmploye={handleEditEmploye} />
            </>
          ) : (
            <EmployeForm
              employe={selectedEmploye}
              isEdit={editMode}
              onSave={handleSaveEmploye}
              onCancel={handleCancel}
            />
          )}
        </div>
      </Layout>
    </ProtectedAdmin>
  );
}
