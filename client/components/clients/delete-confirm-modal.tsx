"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { FaExclamationTriangle } from "react-icons/fa"

interface DeleteConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  clientName: string
}

export function DeleteConfirmModal({ isOpen, onClose, onConfirm, clientName }: DeleteConfirmModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center space-x-2">
            <FaExclamationTriangle className="h-5 w-5 text-red-600" />
            <DialogTitle>Confirmer la suppression</DialogTitle>
          </div>
          <DialogDescription>
            Êtes-vous sûr de vouloir supprimer le client <strong>{clientName}</strong> ? Cette action est irréversible
            et supprimera également toutes les données associées.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Supprimer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
