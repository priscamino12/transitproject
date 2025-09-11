import { Layout } from "@/components/Layout"
import { TransactionsHeader } from "@/components/transactions/transactions-header"
import { TransactionsTable } from "@/components/transactions/transactions-table"
import { TransactionsStats } from "@/components/transactions/transactions-stats"

export default function TransactionsPage() {
  return (
    <Layout>
      <div className="flex-1 space-y-6 p-8 pt-6">
        <TransactionsHeader />
        <TransactionsStats />
        <TransactionsTable />
      </div>
    </Layout>
  )
}
