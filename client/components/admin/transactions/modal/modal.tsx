"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
};

export function Modal({ open, onClose, title, children }: ModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 animate-fade-in">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</DialogTitle>
        </DialogHeader>

        <div className="mt-4 text-gray-700  dark:text-gray-300">{children}</div>

        <div className="mt-6 flex justify-end gap-3">
          <DialogClose asChild>
            <Button variant="outline" className="bg-red-400 hover:bg-red-500 hover:text-white text-white transition-colors">
              Fermer
            </Button>
          </DialogClose>
          
        </div>
      </DialogContent>
    </Dialog>
  );
}
