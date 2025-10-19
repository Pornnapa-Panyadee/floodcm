"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Droplets, Info } from "lucide-react"

const riskZones = [
  { id: 1, name: "Downtown District", risk: "high", x: 30, y: 40, width: 25, height: 20 },
  { id: 2, name: "Riverside Area", risk: "critical", x: 15, y: 55, width: 30, height: 25 },
  { id: 3, name: "North Quarter", risk: "medium", x: 50, y: 20, width: 30, height: 25 },
  { id: 4, name: "East Side", risk: "low", x: 65, y: 50, width: 25, height: 30 },
  { id: 5, name: "West Hills", risk: "low", x: 10, y: 15, width: 20, height: 20 },
  { id: 6, name: "South Bay", risk: "high", x: 40, y: 70, width: 35, height: 20 },
]

const getRiskColor = (risk: string) => {
  switch (risk) {
    case "critical":
      return "fill-red-600 hover:fill-red-700"
    case "high":
      return "fill-orange-500 hover:fill-orange-600"
    case "medium":
      return "fill-yellow-500 hover:fill-yellow-600"
    case "low":
      return "fill-green-500 hover:fill-green-600"
    default:
      return "fill-gray-400"
  }
}

const getRiskBadgeVariant = (risk: string) => {
  switch (risk) {
    case "critical":
      return "destructive"
    case "high":
      return "default"
    case "medium":
      return "secondary"
    case "low":
      return "outline"
    default:
      return "outline"
  }
}

export default function FloodRiskMapPage() {
  const [selectedZone, setSelectedZone] = useState<(typeof riskZones)[0] | null>(null)
  const [filter, setFilter] = useState<string>("all")

  const filteredZones = filter === "all" ? riskZones : riskZones.filter((zone) => zone.risk === filter)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-600 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">Flood Risk Map</h1>
          </div>
          <p className="text-gray-600 text-lg">Interactive map showing flood risk zones across the city</p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Button variant={filter === "all" ? "default" : "outline"} onClick={() => setFilter("all")}>
            All Zones
          </Button>
          <Button
            variant={filter === "critical" ? "default" : "outline"}
            onClick={() => setFilter("critical")}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            Critical
          </Button>
          <Button
            variant={filter === "high" ? "default" : "outline"}
            onClick={() => setFilter("high")}
            className="bg-orange-500 hover:bg-orange-600 text-white"
          >
            High Risk
          </Button>
          <Button
            variant={filter === "medium" ? "default" : "outline"}
            onClick={() => setFilter("medium")}
            className="bg-yellow-500 hover:bg-yellow-600 text-white"
          >
            Medium Risk
          </Button>
          <Button
            variant={filter === "low" ? "default" : "outline"}
            onClick={() => setFilter("low")}
            className="bg-green-500 hover:bg-green-600 text-white"
          >
            Low Risk
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Map */}
          <Card className="lg:col-span-2 p-6">
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">City Risk Zones</h2>
              <p className="text-sm text-gray-600">Click on a zone to view details</p>
            </div>

            <div className="relative w-full aspect-square bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg border-2 border-gray-200 overflow-hidden">
              {/* River */}
              <svg className="absolute inset-0 w-full h-full">
                <path d="M 0 60 Q 25 55, 50 60 T 100 60" stroke="#3b82f6" strokeWidth="8" fill="none" opacity="0.3" />
              </svg>

              {/* Risk Zones */}
              <svg className="absolute inset-0 w-full h-full">
                {filteredZones.map((zone) => (
                  <rect
                    key={zone.id}
                    x={`${zone.x}%`}
                    y={`${zone.y}%`}
                    width={`${zone.width}%`}
                    height={`${zone.height}%`}
                    className={`${getRiskColor(zone.risk)} cursor-pointer transition-all stroke-white stroke-2 ${
                      selectedZone?.id === zone.id ? "opacity-100 stroke-4" : "opacity-70"
                    }`}
                    onClick={() => setSelectedZone(zone)}
                    rx="4"
                  />
                ))}
              </svg>

              {/* Zone Labels */}
              {filteredZones.map((zone) => (
                <div
                  key={`label-${zone.id}`}
                  className="absolute text-xs font-semibold text-white pointer-events-none text-center"
                  style={{
                    left: `${zone.x + zone.width / 2}%`,
                    top: `${zone.y + zone.height / 2}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  {zone.name}
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="mt-6 flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-600 rounded"></div>
                <span className="text-sm text-gray-700">Critical</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-orange-500 rounded"></div>
                <span className="text-sm text-gray-700">High Risk</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                <span className="text-sm text-gray-700">Medium Risk</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span className="text-sm text-gray-700">Low Risk</span>
              </div>
            </div>
          </Card>

          {/* Zone Details */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Zone Details</h2>

            {selectedZone ? (
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{selectedZone.name}</h3>
                  <Badge variant={getRiskBadgeVariant(selectedZone.risk)} className="capitalize">
                    {selectedZone.risk} Risk
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <Droplets className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">Flood Probability</p>
                      <p className="text-sm text-gray-600">
                        {selectedZone.risk === "critical" && "85-100% during heavy rainfall"}
                        {selectedZone.risk === "high" && "60-85% during heavy rainfall"}
                        {selectedZone.risk === "medium" && "30-60% during heavy rainfall"}
                        {selectedZone.risk === "low" && "Below 30% during heavy rainfall"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">Recommended Actions</p>
                      <p className="text-sm text-gray-600">
                        {selectedZone.risk === "critical" &&
                          "Immediate evacuation during flood warnings. Avoid area during heavy rain."}
                        {selectedZone.risk === "high" && "Prepare emergency kit. Monitor weather alerts closely."}
                        {selectedZone.risk === "medium" &&
                          "Stay informed about weather conditions. Have evacuation plan ready."}
                        {selectedZone.risk === "low" && "Standard precautions. Monitor local weather updates."}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <p className="text-xs text-gray-500">Last updated: {new Date().toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <AlertTriangle className="h-12 w-12 text-gray-300 mb-3" />
                <p className="text-gray-500">Select a zone on the map to view detailed information</p>
              </div>
            )}
          </Card>
        </div>

        {/* Statistics */}
        <div className="grid md:grid-cols-4 gap-4 mt-6">
          <Card className="p-4">
            <p className="text-sm text-gray-600 mb-1">Critical Zones</p>
            <p className="text-3xl font-bold text-red-600">{riskZones.filter((z) => z.risk === "critical").length}</p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-gray-600 mb-1">High Risk Zones</p>
            <p className="text-3xl font-bold text-orange-500">{riskZones.filter((z) => z.risk === "high").length}</p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-gray-600 mb-1">Medium Risk Zones</p>
            <p className="text-3xl font-bold text-yellow-500">{riskZones.filter((z) => z.risk === "medium").length}</p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-gray-600 mb-1">Low Risk Zones</p>
            <p className="text-3xl font-bold text-green-500">{riskZones.filter((z) => z.risk === "low").length}</p>
          </Card>
        </div>
      </div>
    </div>
  )
}
