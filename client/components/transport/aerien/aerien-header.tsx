"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FaPlus, FaSearch, FaFilter, FaPlane } from "react-icons/fa"
import { useState } from "react"
import { AerienFormModal } from "./aerien-form-modal"

export function AerienHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <FaPlane className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Transport Aérien</h2>
            <p className="text-muted-foreground">Gestion des expéditions par voie aérienne</p>
          </div>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <FaPlus className="mr-2 h-4 w-4" />
          Nouvelle Expédition
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input placeholder="Rechercher une expédition..." className="pl-10" />
        </div>
        <Button variant="outline">
          <FaFilter className="mr-2 h-4 w-4" />
          Filtres
        </Button>
      </div>

      <AerienFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
