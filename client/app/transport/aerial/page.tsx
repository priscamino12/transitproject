import { Layout } from "@/components/Layout"
import { AerienHeader } from "@/components/transport/aerien/aerien-header"
import { AerienTable } from "@/components/transport/aerien/aerien-table"
import { AerienStats } from "@/components/transport/aerien/aerien-stats"

export default function AerienPage() {
  return (
    <Layout>
      <div className="flex-1 space-y-6 p-8 pt-6">
        <AerienHeader />
        <AerienStats />
        <AerienTable />
      </div>
    </Layout>
  )
}
