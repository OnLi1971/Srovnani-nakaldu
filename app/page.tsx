"use client";

import { MedicalTable } from "@/components/medical-table";
import { MedicalChart } from "@/components/medical-chart";
import { Pill, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  console.log("Home page rendering");

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-lightgray via-white to-blue-50">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 py-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Pill className="h-8 w-8 text-medical-blue" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-medical-blue to-medical-green bg-clip-text text-transparent">
              Analýza nákladů na medikaci
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Komplexní přehled měsíčních nákladů na medikaci M 5mg a její optimalizovanou variantu 
            s vyhodnocením úspor za 16měsíční období.
          </p>
          <Button 
            variant="outline" 
            className="mt-4 border-medical-blue text-medical-blue hover:bg-medical-blue hover:text-white"
            onClick={() => window.open('https://github.com', '_blank')}
          >
            <Github className="h-4 w-4 mr-2" />
            Zobrazit na GitHub
          </Button>
        </div>

        {/* Medical Table */}
        <MedicalTable />

        {/* Charts */}
        <div className="pt-8">
          <MedicalChart />
        </div>

        {/* Disclaimer */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg shadow-sm max-w-4xl mx-auto">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                Důležité upozornění
              </h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>
                  Tato analýza slouží pouze pro sledování nákladů a není doporučením výrobce. 
                  Veškeré informace jsou pouze orientační a nenahrazují konzultaci s lékařem. 
                  Způsob užívání léků se řiďte výhradně podle pokynů lékaře a výrobce.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center py-8 text-gray-500 text-sm">
          <p>Vytvořeno pro sledování a optimalizaci nákladů na zdravotní péči</p>
        </div>
      </div>
    </div>
  );
}
