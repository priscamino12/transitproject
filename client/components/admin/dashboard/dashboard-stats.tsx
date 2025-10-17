"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { FaUsers, FaDollarSign, FaShippingFast, FaChartLine, FaArrowUp, FaArrowDown } from "react-icons/fa";
import { getTotalEntreprises, getAbonnementsActifs, getRevenusTotaux } from "./service/dashboard.service";
import { DashboardStatsType } from "./type/dashboardtype";

export function DashboardStats() {
  const [totalEntreprises, setTotalEntreprises] = useState(0);
  const [abonnementsActifs, setAbonnementsActifs] = useState(0);
  const [revenus, setRevenus] = useState(0);
  const [totalExpeditions, setTotalExpeditions] = useState(320); // valeur manuelle pour l'instant

  useEffect(() => {
    const fetchData = async () => {
      const entreprises = await getTotalEntreprises();
      setTotalEntreprises(entreprises);

      const abonnements = await getAbonnementsActifs();
      setAbonnementsActifs(abonnements);

      const revenusTotaux = await getRevenusTotaux();
      setRevenus(revenusTotaux);
    };
    fetchData();
  }, []);

  const stats: DashboardStatsType[] = [
    {
      title: "Entreprises inscrites",
      value: totalEntreprises,
      change: "+10%",
      description: "par rapport au mois dernier",
      changeType: "positive",
      icon: FaUsers,
    },
    {
      title: "Abonnements actifs",
      value: abonnementsActifs,
      change: "-2%",
      description: "par rapport au mois dernier",
      changeType: "negative",
      icon: FaChartLine,
    },
    {
      title: "Revenus de l'application",
      value: `€${revenus.toLocaleString()}`,
      change: "+15%",
      description: "ce mois-ci",
      changeType: "positive",
      icon: FaDollarSign,
    },
    {
      title: "Expéditions cette année",
      value: totalExpeditions,
      change: "+8%",
      description: "comparé à l'an dernier",
      changeType: "positive",
      icon: FaShippingFast,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <div
                className={`flex items-center ${
                  stat.changeType === "positive" ? "text-green-600" : "text-red-600"
                }`}
              >
                {stat.changeType === "positive" ? (
                  <FaArrowUp className="h-3 w-3 mr-1" />
                ) : (
                  <FaArrowDown className="h-3 w-3 mr-1" />
                )}
                {stat.change}
              </div>
              <span>{stat.description}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
