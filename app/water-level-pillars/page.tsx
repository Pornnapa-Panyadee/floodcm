"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Waves, TrendingUp, TrendingDown, Minus, AlertTriangle } from "lucide-react"

interface Station {
  id: number
  name: string
  location: string
  currentLevel: number
  maxLevel: number
  warningLevel: number
  criticalLevel: number
  trend: "rising" | "falling" | "stable"
  lastUpdate: string
}

const stations: Station[] = [
  {
    id: 1,
    name: "Station A",
    location: "Downtown River",
    currentLevel: 7.2,
    maxLevel: 10,
    warningLevel: 7,
    criticalLevel: 8.5,
    trend: "rising",
    lastUpdate: "2 min ago",
  },
  {
    id: 2,
    name: "Station B",
    location: "North Bridge",
    currentLevel: 5.8,
    maxLevel: 10,
    warningLevel: 7,
    criticalLevel: 8.5,
    trend: "stable",
    lastUpdate: "1 min ago",
  },
  {
    id: 3,
    name: "Station C",
    location: "East Canal",
    currentLevel: 8.9,
    maxLevel: 10,
    warningLevel: 7,
    criticalLevel: 8.5,
    trend: "rising",
    lastUpdate: "3 min ago",
  },
  {
    id: 4,
    name: "Station D",
    location: "South Bay",
    currentLevel: 4.5,
    maxLevel: 10,
    warningLevel: 7,
    criticalLevel: 8.5,
    trend: "falling",
    lastUpdate: "1 min ago",
  },
  {
    id: 5,
    name: "Station E",
    location: "West Harbor",
    currentLevel: 6.3,
    maxLevel: 10,
    warningLevel: 7,
    criticalLevel: 8.5,
    trend: "stable",
    lastUpdate: "2 min ago",
  },
  {
    id: 6,
    name: "Station F",
    location: "Central Lake",
    currentLevel: 7.8,
    maxLevel: 10,
    warningLevel: 7,
    criticalLevel: 8.5,
    trend: "rising",
    lastUpdate: "4 min ago",
  },
]

const getStatusColor = (level: number, warningLevel: number, criticalLevel: number) => {
  if (level >= criticalLevel) return "bg-red-500"
  if (level >= warningLevel) return "bg-orange-500"
  return "bg-blue-500"
}

const getStatusBadge = (level: number, warningLevel: number, criticalLevel: number) => {
  if (level >= criticalLevel)
    return (
      <Badge variant="destructive" className="gap-1">
        <AlertTriangle className="h-3 w-3" />
        Critical
      </Badge>
    )
  if (level >= warningLevel)
    return (
      <Badge className="bg-orange-500 hover:bg-orange-600 gap-1">
        <AlertTriangle className="h-3 w-3" />
        Warning
      </Badge>
    )
  return (
    <Badge variant="outline" className="gap-1">
      Normal
    </Badge>
  )
}

const getTrendIcon = (trend: string) => {
  switch (trend) {
    case "rising":
      return <TrendingUp className="h-4 w-4 text-red-500" />
    case "falling":
      return <TrendingDown className="h-4 w-4 text-green-500" />
    case "stable":
      return <Minus className="h-4 w-4 text-gray-500" />
  }
}

export default function WaterLevelPillarsPage() {
  const [selectedStation, setSelectedStation] = useState<Station | null>(null)
  const [filter, setFilter] = useState<string>("all")

  const filteredStations = stations.filter((station) => {
    if (filter === "all") return true
    if (filter === "critical") return station.currentLevel >= station.criticalLevel
    if (filter === "warning")
      return station.currentLevel >= station.warningLevel && station.currentLevel < station.criticalLevel
    if (filter === "normal") return station.currentLevel < station.warningLevel
    return true
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Waves className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">Water Level Pillars</h1>
          </div>
          <p className="text-gray-600 text-lg">Real-time water level monitoring across all stations</p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Button variant={filter === "all" ? "default" : "outline"} onClick={() => setFilter("all")}>
            All Stations
          </Button>
          <Button
            variant={filter === "critical" ? "default" : "outline"}
            onClick={() => setFilter("critical")}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            Critical
          </Button>
          <Button
            variant={filter === "warning" ? "default" : "outline"}
            onClick={() => setFilter("warning")}
            className="bg-orange-500 hover:bg-orange-600 text-white"
          >
            Warning
          </Button>
          <Button
            variant={filter === "normal" ? "default" : "outline"}
            onClick={() => setFilter("normal")}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            Normal
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Pillars Display */}
          <Card className="lg:col-span-2 p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Station Water Levels</h2>
              <p className="text-sm text-gray-600">Click on a pillar to view detailed information</p>
            </div>

            <div className="flex items-end justify-around gap-4 h-96 bg-gradient-to-b from-gray-50 to-gray-100 rounded-lg p-6 border-2 border-gray-200">
              {filteredStations.map((station) => {
                const percentage = (station.currentLevel / station.maxLevel) * 100
                const warningPercentage = (station.warningLevel / station.maxLevel) * 100
                const criticalPercentage = (station.criticalLevel / station.maxLevel) * 100

                return (
                  <div key={station.id} className="flex flex-col items-center gap-2 flex-1 max-w-24">
                    {/* Pillar Container */}
                    <div className="relative w-full h-80 bg-gray-200 rounded-lg overflow-hidden border-2 border-gray-300 cursor-pointer hover:border-blue-500 transition-all">
                      {/* Critical Line */}
                      <div
                        className="absolute w-full border-t-2 border-dashed border-red-600 z-10"
                        style={{ bottom: `${criticalPercentage}%` }}
                      >
                        <span className="absolute -right-1 -top-2 text-xs font-semibold text-red-600">C</span>
                      </div>

                      {/* Warning Line */}
                      <div
                        className="absolute w-full border-t-2 border-dashed border-orange-500 z-10"
                        style={{ bottom: `${warningPercentage}%` }}
                      >
                        <span className="absolute -right-1 -top-2 text-xs font-semibold text-orange-500">W</span>
                      </div>

                      {/* Water Level */}
                      <div
                        className={`absolute bottom-0 w-full ${getStatusColor(
                          station.currentLevel,
                          station.warningLevel,
                          station.criticalLevel,
                        )} transition-all duration-1000 ease-out`}
                        style={{ height: `${percentage}%` }}
                        onClick={() => setSelectedStation(station)}
                      >
                        {/* Wave Effect */}
                        <div className="absolute top-0 w-full h-2 bg-white opacity-30 animate-pulse"></div>
                      </div>

                      {/* Level Text */}
                      <div
                        className="absolute w-full text-center font-bold text-white text-sm z-20 pointer-events-none"
                        style={{ bottom: `${percentage + 2}%` }}
                      >
                        {station.currentLevel}m
                      </div>
                    </div>

                    {/* Station Name */}
                    <div className="text-center">
                      <p className="text-xs font-semibold text-gray-900">{station.name}</p>
                      <div className="flex items-center justify-center gap-1 mt-1">{getTrendIcon(station.trend)}</div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Legend */}
            <div className="mt-6 flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-500 rounded"></div>
                <span className="text-gray-700">Normal</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-orange-500 rounded"></div>
                <span className="text-gray-700">Warning</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <span className="text-gray-700">Critical</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-0.5 border-t-2 border-dashed border-gray-600"></div>
                <span className="text-gray-700">Threshold Lines</span>
              </div>
            </div>
          </Card>

          {/* Station Details */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Station Details</h2>

            {selectedStation ? (
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{selectedStation.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{selectedStation.location}</p>
                  {getStatusBadge(
                    selectedStation.currentLevel,
                    selectedStation.warningLevel,
                    selectedStation.criticalLevel,
                  )}
                </div>

                <div className="space-y-3 pt-4 border-t">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Current Level</span>
                    <span className="text-lg font-bold text-gray-900">{selectedStation.currentLevel}m</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Warning Level</span>
                    <span className="text-sm font-semibold text-orange-500">{selectedStation.warningLevel}m</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Critical Level</span>
                    <span className="text-sm font-semibold text-red-600">{selectedStation.criticalLevel}m</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Maximum Level</span>
                    <span className="text-sm font-semibold text-gray-900">{selectedStation.maxLevel}m</span>
                  </div>

                  <div className="flex justify-between items-center pt-3 border-t">
                    <span className="text-sm text-gray-600">Trend</span>
                    <div className="flex items-center gap-2">
                      {getTrendIcon(selectedStation.trend)}
                      <span className="text-sm font-semibold text-gray-900 capitalize">{selectedStation.trend}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Last Update</span>
                    <span className="text-sm text-gray-900">{selectedStation.lastUpdate}</span>
                  </div>
                </div>

                {selectedStation.currentLevel >= selectedStation.criticalLevel && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-800 font-medium">
                      <AlertTriangle className="h-4 w-4 inline mr-1" />
                      Critical water level reached. Immediate action required.
                    </p>
                  </div>
                )}

                {selectedStation.currentLevel >= selectedStation.warningLevel &&
                  selectedStation.currentLevel < selectedStation.criticalLevel && (
                    <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                      <p className="text-sm text-orange-800 font-medium">
                        <AlertTriangle className="h-4 w-4 inline mr-1" />
                        Warning level exceeded. Monitor closely.
                      </p>
                    </div>
                  )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Waves className="h-12 w-12 text-gray-300 mb-3" />
                <p className="text-gray-500">Select a station pillar to view detailed information</p>
              </div>
            )}
          </Card>
        </div>

        {/* Statistics */}
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <Card className="p-4">
            <p className="text-sm text-gray-600 mb-1">Critical Stations</p>
            <p className="text-3xl font-bold text-red-600">
              {stations.filter((s) => s.currentLevel >= s.criticalLevel).length}
            </p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-gray-600 mb-1">Warning Stations</p>
            <p className="text-3xl font-bold text-orange-500">
              {stations.filter((s) => s.currentLevel >= s.warningLevel && s.currentLevel < s.criticalLevel).length}
            </p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-gray-600 mb-1">Normal Stations</p>
            <p className="text-3xl font-bold text-blue-500">
              {stations.filter((s) => s.currentLevel < s.warningLevel).length}
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}
