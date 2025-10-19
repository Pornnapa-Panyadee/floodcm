"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Building2, AlertTriangle, CheckCircle, AlertCircle, XCircle } from "lucide-react"

interface CityArea {
  id: number
  name: string
  district: string
  floodLevel: number
  capacity: number
  population: number
  evacuated: number
  status: "safe" | "warning" | "danger" | "critical"
  lastUpdate: string
}

const cityAreas: CityArea[] = [
  {
    id: 1,
    name: "Downtown",
    district: "Central District",
    floodLevel: 85,
    capacity: 100,
    population: 45000,
    evacuated: 12000,
    status: "critical",
    lastUpdate: "1 min ago",
  },
  {
    id: 2,
    name: "Riverside",
    district: "East District",
    floodLevel: 72,
    capacity: 100,
    population: 32000,
    evacuated: 8000,
    status: "danger",
    lastUpdate: "2 min ago",
  },
  {
    id: 3,
    name: "North Quarter",
    district: "North District",
    floodLevel: 58,
    capacity: 100,
    population: 28000,
    evacuated: 0,
    status: "warning",
    lastUpdate: "1 min ago",
  },
  {
    id: 4,
    name: "West Hills",
    district: "West District",
    floodLevel: 25,
    capacity: 100,
    population: 18000,
    evacuated: 0,
    status: "safe",
    lastUpdate: "3 min ago",
  },
  {
    id: 5,
    name: "South Bay",
    district: "South District",
    floodLevel: 68,
    capacity: 100,
    population: 38000,
    evacuated: 5000,
    status: "danger",
    lastUpdate: "2 min ago",
  },
  {
    id: 6,
    name: "East Side",
    district: "East District",
    floodLevel: 42,
    capacity: 100,
    population: 22000,
    evacuated: 0,
    status: "warning",
    lastUpdate: "4 min ago",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "critical":
      return "text-red-600"
    case "danger":
      return "text-orange-600"
    case "warning":
      return "text-yellow-600"
    case "safe":
      return "text-green-600"
    default:
      return "text-gray-600"
  }
}

const getStatusBgColor = (status: string) => {
  switch (status) {
    case "critical":
      return "bg-red-100 border-red-300"
    case "danger":
      return "bg-orange-100 border-orange-300"
    case "warning":
      return "bg-yellow-100 border-yellow-300"
    case "safe":
      return "bg-green-100 border-green-300"
    default:
      return "bg-gray-100 border-gray-300"
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "critical":
      return <XCircle className="h-5 w-5" />
    case "danger":
      return <AlertTriangle className="h-5 w-5" />
    case "warning":
      return <AlertCircle className="h-5 w-5" />
    case "safe":
      return <CheckCircle className="h-5 w-5" />
  }
}

const getGaugeColor = (level: number) => {
  if (level >= 80) return "#dc2626"
  if (level >= 65) return "#ea580c"
  if (level >= 50) return "#eab308"
  return "#16a34a"
}

const CircularGauge = ({ level, size = 120 }: { level: number; size?: number }) => {
  const radius = size / 2 - 10
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (level / 100) * circumference

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="#e5e7eb" strokeWidth="8" fill="none" />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={getGaugeColor(level)}
          strokeWidth="8"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-gray-900">{level}%</span>
        <span className="text-xs text-gray-600">Flood Level</span>
      </div>
    </div>
  )
}

export default function CityFloodIndicatorsPage() {
  const [selectedArea, setSelectedArea] = useState<CityArea | null>(null)
  const [filter, setFilter] = useState<string>("all")

  const filteredAreas = filter === "all" ? cityAreas : cityAreas.filter((area) => area.status === filter)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Building2 className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">City Flood Level Indicators</h1>
          </div>
          <p className="text-gray-600 text-lg">Monitor flood levels across all city districts</p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Button variant={filter === "all" ? "default" : "outline"} onClick={() => setFilter("all")}>
            All Areas
          </Button>
          <Button
            variant={filter === "critical" ? "default" : "outline"}
            onClick={() => setFilter("critical")}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            Critical
          </Button>
          <Button
            variant={filter === "danger" ? "default" : "outline"}
            onClick={() => setFilter("danger")}
            className="bg-orange-600 hover:bg-orange-700 text-white"
          >
            Danger
          </Button>
          <Button
            variant={filter === "warning" ? "default" : "outline"}
            onClick={() => setFilter("warning")}
            className="bg-yellow-600 hover:bg-yellow-700 text-white"
          >
            Warning
          </Button>
          <Button
            variant={filter === "safe" ? "default" : "outline"}
            onClick={() => setFilter("safe")}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Safe
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Indicators Grid */}
          <div className="lg:col-span-2 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              {filteredAreas.map((area) => (
                <Card
                  key={area.id}
                  className={`p-6 cursor-pointer transition-all hover:shadow-lg border-2 ${
                    selectedArea?.id === area.id ? "ring-2 ring-blue-500" : ""
                  } ${getStatusBgColor(area.status)}`}
                  onClick={() => setSelectedArea(area)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{area.name}</h3>
                      <p className="text-sm text-gray-600">{area.district}</p>
                    </div>
                    <div className={getStatusColor(area.status)}>{getStatusIcon(area.status)}</div>
                  </div>

                  <div className="flex items-center justify-center mb-4">
                    <CircularGauge level={area.floodLevel} size={100} />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Status</span>
                      <Badge
                        variant={area.status === "safe" ? "outline" : "default"}
                        className={`capitalize ${getStatusColor(area.status)}`}
                      >
                        {area.status}
                      </Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Population</span>
                      <span className="font-semibold text-gray-900">{area.population.toLocaleString()}</span>
                    </div>
                    {area.evacuated > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Evacuated</span>
                        <span className="font-semibold text-red-600">{area.evacuated.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Last Update</span>
                      <span className="text-gray-900">{area.lastUpdate}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Area Details */}
          <Card className="p-6 h-fit sticky top-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Area Details</h2>

            {selectedArea ? (
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{selectedArea.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{selectedArea.district}</p>
                  <div className="flex items-center gap-2">
                    <div className={getStatusColor(selectedArea.status)}>{getStatusIcon(selectedArea.status)}</div>
                    <Badge
                      variant={selectedArea.status === "safe" ? "outline" : "default"}
                      className={`capitalize ${getStatusColor(selectedArea.status)}`}
                    >
                      {selectedArea.status}
                    </Badge>
                  </div>
                </div>

                <div className="flex justify-center py-4">
                  <CircularGauge level={selectedArea.floodLevel} size={140} />
                </div>

                <div className="space-y-3 pt-4 border-t">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Flood Level</span>
                    <span className="text-lg font-bold text-gray-900">{selectedArea.floodLevel}%</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Capacity</span>
                    <span className="text-sm font-semibold text-gray-900">{selectedArea.capacity}%</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Population</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {selectedArea.population.toLocaleString()}
                    </span>
                  </div>

                  {selectedArea.evacuated > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Evacuated</span>
                      <span className="text-sm font-semibold text-red-600">
                        {selectedArea.evacuated.toLocaleString()}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between items-center pt-3 border-t">
                    <span className="text-sm text-gray-600">Last Update</span>
                    <span className="text-sm text-gray-900">{selectedArea.lastUpdate}</span>
                  </div>
                </div>

                {selectedArea.status === "critical" && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-800 font-medium">
                      <AlertTriangle className="h-4 w-4 inline mr-1" />
                      Critical flood level. Immediate evacuation required.
                    </p>
                  </div>
                )}

                {selectedArea.status === "danger" && (
                  <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                    <p className="text-sm text-orange-800 font-medium">
                      <AlertTriangle className="h-4 w-4 inline mr-1" />
                      Dangerous flood level. Prepare for evacuation.
                    </p>
                  </div>
                )}

                {selectedArea.status === "warning" && (
                  <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-yellow-800 font-medium">
                      <AlertCircle className="h-4 w-4 inline mr-1" />
                      Warning level. Monitor situation closely.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Building2 className="h-12 w-12 text-gray-300 mb-3" />
                <p className="text-gray-500">Select an area to view detailed information</p>
              </div>
            )}
          </Card>
        </div>

        {/* Statistics */}
        <div className="grid md:grid-cols-4 gap-4 mt-6">
          <Card className="p-4">
            <p className="text-sm text-gray-600 mb-1">Critical Areas</p>
            <p className="text-3xl font-bold text-red-600">{cityAreas.filter((a) => a.status === "critical").length}</p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-gray-600 mb-1">Danger Areas</p>
            <p className="text-3xl font-bold text-orange-600">
              {cityAreas.filter((a) => a.status === "danger").length}
            </p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-gray-600 mb-1">Warning Areas</p>
            <p className="text-3xl font-bold text-yellow-600">
              {cityAreas.filter((a) => a.status === "warning").length}
            </p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-gray-600 mb-1">Safe Areas</p>
            <p className="text-3xl font-bold text-green-600">{cityAreas.filter((a) => a.status === "safe").length}</p>
          </Card>
        </div>
      </div>
    </div>
  )
}
