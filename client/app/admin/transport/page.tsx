
import { Layout } from "@/components/admin/Layout"
import { TransportOverview } from "@/components/admin/transport/transport-overview"
import { ProtectedAdmin } from "@/app/protectedAdmin"

export default function TransportPage() {
  return (
    <ProtectedAdmin>
    <Layout>
      <div className="flex-1 space-y-6 p-8 pt-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Gestion des Transports</h2>
            <p className="text-muted-foreground">Gérez vos opérations de transport aérien et maritime</p>
          </div>
        </div>
        <TransportOverview />
      </div>
    </Layout>
    </ProtectedAdmin>
  )
}
