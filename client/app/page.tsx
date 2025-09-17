import { redirect } from "next/navigation";

export default function HomePage() {
  redirect("/auth"); // redirige automatiquement vers la page publique
}
/* 
export default function HomePage() {
  return (
    <Layout>
      <div className="flex-1 space-y-6 p-8 pt-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Tableau de bord</h2>
            <p className="text-muted-foreground">Aperçu de vos activités de transit international</p>
          </div>
          <QuickActions />
        </div>

        <DashboardStats />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
          <div className="col-span-4">
            <PerformanceChart />
          </div>
          <div className="col-span-3">
            <ShipmentStatus />
          </div>
        </div>

        <RecentTransactions />
      </div>
    </Layout>
  )
}
 */