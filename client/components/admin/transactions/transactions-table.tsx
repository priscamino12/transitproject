"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MastersTable } from "./master/master";
import { HouseTabs } from "./house/house";

export function TransactionsTable() {
  const [filterType, setFilterType] = useState<"Master" | "House">("Master");

  return (
    <Card>
      <CardHeader>
        <CardTitle>{filterType === "Master" ? "Documents Master" : "Documents House"}</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Filtres */}
        <div className="flex items-center space-x-3 mb-4">
          {["Master", "House"].map(opt => (
            <Button
            
              key={opt}
              variant={filterType === opt ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterType(opt as any)}
            >
              {opt}
            </Button>
          ))}
        </div>

        {/* Affichage du tableau selon l'onglet */}
        {filterType === "Master" ? <MastersTable /> : <HouseTabs />}
      </CardContent>
    </Card>
  );
}
