"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { FaUsers, FaShippingFast, FaFileInvoice, FaChartLine, FaArrowUp, FaArrowDown } from "react-icons/fa";
import { getTotalExpeditions, getExpeditionsOnYear } from "@/services/ashboardService";

export function DashboardStats() {
  const [expedition, setExpedition] = useState(0);
  const [expeditionMaritime, setExpeditionMaritime] = useState(0);
  const [expeditionAerienne, setExpeditionAerienne] = useState(0);
  const [expeditionOnYear, setExpeditionOnYear] = useState(0);

  useEffect(() => {
    async function fetchStats() {
      const total = await getTotalExpeditions();
      setExpedition(total);

      const { total: onYear, maritime, aerienne } = await getExpeditionsOnYear();
      setExpeditionOnYear(onYear);
      setExpeditionMaritime(maritime);
      setExpeditionAerienne(aerienne);
    }

    fetchStats();
  }, []);

  const stats = [
    {
      title: "Total expéditions",
      value: expedition,
      change: "+12%",
      description: "par rapport au mois dernier",
      changeType: "positive",
      icon: FaShippingFast,
    },
    {
      title: "Expéditions maritimes",
      value: expeditionMaritime,
      change: "-3%",
      description: "cette année",
      changeType: "negative",
      icon: FaFileInvoice,
    },
    {
      title: "Expéditions aériennes",
      value: expeditionAerienne,
      change: "+5%",
      description: "cette année",
      changeType: "positive",
      icon: FaChartLine,
    },
    {
      title: "Expéditions cette année",
      value: expeditionOnYear,
      change: "+8%",
      description: "comparé à l'an dernier",
      changeType: "positive",
      icon: FaUsers,
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
