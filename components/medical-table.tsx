"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingDown, Calculator, Calendar } from "lucide-react";

const medicationData = [
  { month: 1, m5mg: 4790, m5mgStar: 26100 },
  { month: 2, m5mg: 18390, m5mgStar: 0 },
  { month: 3, m5mg: 0, m5mgStar: 0 },
  { month: 4, m5mg: 0, m5mgStar: 0 },
  { month: 5, m5mg: 18390, m5mgStar: 0 },
  { month: 6, m5mg: 0, m5mgStar: 0 },
  { month: 7, m5mg: 0, m5mgStar: 0 },
  { month: 8, m5mg: 18390, m5mgStar: 0 },
  { month: 9, m5mg: 0, m5mgStar: 26100 },
  { month: 10, m5mg: 0, m5mgStar: 0 },
  { month: 11, m5mg: 18390, m5mgStar: 0 },
  { month: 12, m5mg: 0, m5mgStar: 0 },
  { month: 13, m5mg: 0, m5mgStar: 0 },
  { month: 14, m5mg: 18390, m5mgStar: 0 },
  { month: 15, m5mg: 0, m5mgStar: 0 },
  { month: 16, m5mg: 0, m5mgStar: 0 },
];

export function MedicalTable() {
  console.log("MedicalTable rendering with data:", medicationData);
  
  const totalM5mg = medicationData.reduce((sum, item) => sum + item.m5mg, 0);
  const totalM5mgStar = medicationData.reduce((sum, item) => sum + item.m5mgStar, 0);
  const savings = totalM5mg - totalM5mgStar;
  const savingsPercentage = ((savings / totalM5mg) * 100).toFixed(1);
  
  // Výpočet celkového aplikovaného množství
  // První měsíc: 4 * 2.5mg = 10mg, další měsíce: 4 * 5mg = 20mg/měsíc
  const totalAppliedMg = 10 + (15 * 20); // 310mg celkem za 16 měsíců

  console.log("Calculated totals:", { totalM5mg, totalM5mgStar, savings, savingsPercentage, totalAppliedMg });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('cs-CZ', {
      style: 'currency',
      currency: 'CZK',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg border-0 bg-white">
      <CardHeader className="bg-gradient-to-r from-medical-blue to-medical-green text-white">
        <div className="flex items-center gap-3">
          <Calendar className="h-6 w-6" />
          <CardTitle className="text-xl font-semibold">
            Analýza nákladů na medikaci M 5mg (16 měsíců)
          </CardTitle>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <TrendingDown className="h-4 w-4" />
          <span className="text-sm opacity-90">Efekt -16% váhy</span>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-medical-blue/20">
                <th className="text-left p-4 font-semibold text-medical-blue">Měsíc</th>
                <th className="text-right p-4 font-semibold text-medical-blue">
                  M 5mg [měsíční náklad v Kč]
                </th>
                <th className="text-right p-4 font-semibold text-medical-green">
                  M 5mg * [měsíční náklad v Kč]
                </th>
              </tr>
            </thead>
            <tbody>
              {medicationData.map((item, index) => (
                <tr 
                  key={item.month}
                  className={`border-b border-gray-100 hover:bg-medical-lightgray/50 transition-colors ${
                    index % 2 === 0 ? 'bg-gray-50/30' : 'bg-white'
                  }`}
                >
                  <td className="p-4 font-medium text-gray-700">{item.month}</td>
                  <td className="p-4 text-right font-mono">
                    {item.m5mg > 0 ? (
                      <span className="text-medical-blue font-semibold">
                        {formatCurrency(item.m5mg)}
                      </span>
                    ) : (
                      <span className="text-gray-400">0,00 Kč</span>
                    )}
                  </td>
                  <td className="p-4 text-right font-mono">
                    {item.m5mgStar > 0 ? (
                      <span className="text-medical-green font-semibold">
                        {formatCurrency(item.m5mgStar)}
                      </span>
                    ) : (
                      <span className="text-gray-400">0,00 Kč</span>
                    )}
                  </td>
                </tr>
              ))}
              <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-t-2 border-gray-300">
                <td className="p-4 font-bold text-gray-800 flex items-center gap-2">
                  <Calculator className="h-4 w-4" />
                  CELKEM
                </td>
                <td className="p-4 text-right font-bold text-medical-blue text-lg">
                  {formatCurrency(totalM5mg)}
                </td>
                <td className="p-4 text-right font-bold text-medical-green text-lg">
                  {formatCurrency(totalM5mgStar)}
                </td>
              </tr>
              <tr className="bg-gradient-to-r from-blue-50 to-green-50 border-t border-gray-200">
                <td className="p-4 font-semibold text-gray-700 text-sm">
                  Celkem aplikováno za 16 měsíců
                </td>
                <td className="p-4 text-right font-semibold text-medical-blue text-sm" colSpan={2}>
                  {totalAppliedMg} mg
                  <div className="text-xs text-gray-500 mt-1">
                    (1. měsíc: 4×2.5mg = 10mg + dalších 15 měsíců: 4×5mg = 300mg)
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="p-6 bg-gradient-to-r from-medical-lightgray to-white border-t">
          <div className="flex flex-wrap gap-4 justify-center">
            <Badge variant="outline" className="px-4 py-2 text-base border-medical-green text-medical-green">
              Úspora: {formatCurrency(savings)}
            </Badge>
            <Badge variant="outline" className="px-4 py-2 text-base border-medical-orange text-medical-orange">
              Úspora: {savingsPercentage}%
            </Badge>
          </div>
          <p className="text-xs text-gray-600 mt-4 text-center italic">
            * M 5mg při aplikaci z pera M 3x 10mg a využití "zlatky"
          </p>
        </div>
      </CardContent>
    </Card>
  );
}