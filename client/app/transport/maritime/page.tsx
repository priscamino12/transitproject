import { Layout } from "@/components/Layout"
import { MaritimeHeader } from "@/components/transport/maritime/maritime-header"
import { MaritimeTable } from "@/components/transport/maritime/maritime-table"
import { MaritimeStats } from "@/components/transport/maritime/maritime-stats"

export default function MaritimePage() {
  return (
    <Layout>
      <div className="flex-1 space-y-6 p-8 pt-6">
        <MaritimeHeader />
        <MaritimeStats />
        <MaritimeTable />
      </div>
    </Layout>
  )
}
