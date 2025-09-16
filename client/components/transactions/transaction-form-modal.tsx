"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter } from "next/navigation"
import { MAWBForm } from "./mawb/MAWBForm"
import { HAWBForm } from "./hawb/HAWBForm"
import { MBLForm } from "./mbl/MBLForm"
import { HBLForm } from "./hbl/HBLForm"
import { FiArrowLeft } from "react-icons/fi"

interface TransactionFormProps{
  transaction?: any
  isEdit?: boolean
  onSave: (data: any) => void
  onCancel: () => void
}

export function TransactionFormModal({ transaction, isEdit = false, onSave, onCancel }: TransactionFormProps) {
  const [selectedType, setSelectedType] = useState("MAWB")
  const router = useRouter()

  const handleSubmit = (data: any) => {
    console.log("Nouvelle transaction:", selectedType, data)
    router.push("/transactions")
  }

  return (
    <div className="p-8 min-h-screen bg-background">
      
      <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="icon" 
                 onClick={onCancel}>
                  <FiArrowLeft className="w-4 h-4" />
                </Button>
                <div>
                  <h1 className="text-3xl font-bold text-foreground">{isEdit ? "Modifier le transaction" : "Nouveau transaction"}</h1>
                  <p className="text-muted-foreground">
                    {isEdit ? "Modifiez les informations du transaction" : "Ajoutez un nouveau transaction à votre base"}
                  </p>
                </div>
              </div>
            </div>

      <div className="bg-card shadow-xl rounded-2xl p-6 mx-auto w-full max-w-7xl">
        <Tabs value={selectedType} onValueChange={setSelectedType}>
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="MAWB">MAWB</TabsTrigger>
            <TabsTrigger value="HAWB">HAWB</TabsTrigger>
            <TabsTrigger value="MBL">MBL</TabsTrigger>
            <TabsTrigger value="HBL">HBL</TabsTrigger>
          </TabsList>

          {selectedType === "MAWB" && <MAWBForm onSubmit={handleSubmit} />}
          {selectedType === "HAWB" && <HAWBForm onSubmit={handleSubmit} />}
          {selectedType === "MBL" && <MBLForm onSubmit={handleSubmit} />}
          {selectedType === "HBL" && <HBLForm onSubmit={handleSubmit} />}
        </Tabs>
      </div>
    </div>
  )
}
