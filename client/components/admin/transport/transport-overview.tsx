import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FaPlane, FaShip, FaArrowRight } from "react-icons/fa"
import Link from "next/link"

const transportStats = [
  {
    type: "Aérien",
    icon: FaPlane,
    href: "/transport/aerien",
    stats: {
      active: 45,
      enCours: 28,
      termine: 156,
      revenus: "€1.2M",
    },
    description: "Gestion des expéditions par voie aérienne",
  },
  {
    type: "Maritime",
    icon: FaShip,
    href: "/transport/maritime",
    stats: {
      active: 32,
      enCours: 18,
      termine: 89,
      revenus: "€2.8M",
    },
    description: "Gestion des expéditions par voie maritime",
  },
]

export function TransportOverview() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {transportStats.map((transport, index) => (
        <Card key={index} className="relative overflow-hidden">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <transport.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-xl">Transport {transport.type}</CardTitle>
                  <CardDescription>{transport.description}</CardDescription>
                </div>
              </div>
              <Link href={transport.href}>
                <Button variant="outline" size="sm">
                  <FaArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Expéditions actives</span>
                  <span className="font-semibold">{transport.stats.active}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">En cours</span>
                  <span className="font-semibold text-blue-600">{transport.stats.enCours}</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Terminées</span>
                  <span className="font-semibold text-green-600">{transport.stats.termine}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Revenus</span>
                  <span className="font-semibold text-primary">{transport.stats.revenus}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t">
              <Link href={transport.href}>
                <Button className="w-full">
                  Gérer {transport.type}
                  <FaArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
