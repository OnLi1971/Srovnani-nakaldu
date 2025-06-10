"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { TrendingUp, BarChart3 } from "lucide-react";

const rawMedicationData = [
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

// Create cumulative data for trend chart
const createCumulativeData = (data: typeof rawMedicationData) => {
  let cumulativeM5mg = 0;
  let cumulativeM5mgStar = 0;
  
  return data.map(item => {
    cumulativeM5mg += item.m5mg;
    cumulativeM5mgStar += item.m5mgStar;
    
    return {
      month: item.month,
      m5mg: item.m5mg, // Keep original for bar chart
      m5mgStar: item.m5mgStar, // Keep original for bar chart
      cumulativeM5mg,
      cumulativeM5mgStar,
    };
  });
};

const medicationData = createCumulativeData(rawMedicationData);

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
        <p className="font-semibold text-gray-800">{`Měsíc ${label}`}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color }} className="font-medium">
            {`${entry.name}: ${new Intl.NumberFormat('cs-CZ', {
              style: 'currency',
              currency: 'CZK',
              minimumFractionDigits: 2,
            }).format(entry.value)}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function MedicalChart() {
  console.log("MedicalChart rendering with data:", medicationData);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full max-w-6xl mx-auto">
      {/* Line Chart */}
      <Card className="shadow-lg border-0 bg-white">
        <CardHeader className="bg-gradient-to-r from-medical-blue to-medical-green text-white">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-5 w-5" />
            <CardTitle className="text-lg font-semibold">
              Kumulativní trend nákladů v čase
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={medicationData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="month" 
                stroke="#6b7280"
                fontSize={12}
                tickLine={false}
              />
              <YAxis 
                stroke="#6b7280"
                fontSize={12}
                tickLine={false}
                tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="cumulativeM5mg"
                stroke="#2563eb"
                strokeWidth={3}
                dot={{ fill: "#2563eb", strokeWidth: 2, r: 4 }}
                name="M 5mg (kumulativně)"
                connectNulls={true}
              />
              <Line
                type="monotone"
                dataKey="cumulativeM5mgStar"
                stroke="#10b981"
                strokeWidth={3}
                dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                name="M 5mg * (kumulativně)"
                connectNulls={true}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Bar Chart */}
      <Card className="shadow-lg border-0 bg-white">
        <CardHeader className="bg-gradient-to-r from-medical-green to-medical-orange text-white">
          <div className="flex items-center gap-3">
            <BarChart3 className="h-5 w-5" />
            <CardTitle className="text-lg font-semibold">
              Srovnání nákladů
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={medicationData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="month" 
                stroke="#6b7280"
                fontSize={12}
                tickLine={false}
              />
              <YAxis 
                stroke="#6b7280"
                fontSize={12}
                tickLine={false}
                tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar 
                dataKey="m5mg" 
                fill="#2563eb" 
                name="M 5mg"
                radius={[2, 2, 0, 0]}
              />
              <Bar 
                dataKey="m5mgStar" 
                fill="#10b981" 
                name="M 5mg *"
                radius={[2, 2, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}