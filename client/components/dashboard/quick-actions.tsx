import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { FaPlus, FaUsers, FaShippingFast, FaFileInvoice } from "react-icons/fa"

export function QuickActions() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>
          <FaPlus className="mr-2 h-4 w-4" />
          Actions Rapides
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem>
          <FaUsers className="mr-2 h-4 w-4" />
          Nouveau Client
        </DropdownMenuItem>
        <DropdownMenuItem>
          <FaShippingFast className="mr-2 h-4 w-4" />
          Nouvelle Expédition
        </DropdownMenuItem>
        <DropdownMenuItem>
          <FaFileInvoice className="mr-2 h-4 w-4" />
          Nouvelle Transaction
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
