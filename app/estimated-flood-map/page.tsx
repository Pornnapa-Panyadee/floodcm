"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { MapPin, Clock, TrendingUp, AlertTriangle } from "lucide-react"

interface FloodPrediction {
  hour: number
  zones: {
    id: number
    name: string
    x: number
    y: number
    width: number
    height: number
    level: number
    risk: string
  }[]
}

const predictions: FloodPrediction[] = [
  {
    hour: 0,
    zones: [
      { id: 1, name: "Downtown", x: 30, y: 40, width: 25, height: 20, level: 45, risk: "medium" },
      { id: 2, name: "Riverside", x: 15, y: 55, width: 30, height: 25, level: 65, risk: "high" },
      { id: 3, name: "North Quarter", x: 50, y: 20, width: 30, height: 25, level: 35, risk: "low" },
      { id: 4, name: "East Side", x: 65, y: 50, width: 25, height: 30, level: 25, risk: "low" },
      { id: 5, name: "South Bay", x: 40, y: 70, width: 35, height: 20, level: 55, risk: "medium" },
    ],
  },
  {
    hour: 3,
    zones: [
      { id: 1, name: "Downtown", x: 30, y: 40, width: 25, height: 20, level: 60, risk: "high" },
      { id: 2, name: "Riverside", x: 15, y: 55, width: 30, height: 25, level: 78, risk: "high" },
      { id: 3, name: "North Quarter", x: 50, y: 20, width: 30, height: 25, level: 48, risk: "medium" },
      { id: 4, name: "East Side", x: 65, y: 50, width: 25, height: 30, level: 32, risk: "low" },
      { id: 5, name: "South Bay", x: 40, y: 70, width: 35, height: 20, level: 68, risk: "high" },
    ],
  },
  {
    hour: 6,
    zones: [
      { id: 1, name: "Downtown", x: 30, y: 40, width: 25, height: 20, level: 75, risk: "high" },
      { id: 2, name: "Riverside", x: 15, y: 55, width: 30, height: 25, level: 88, risk: "critical" },
      { id: 3, name: "North Quarter", x: 50, y: 20, width: 30, height: 25, level: 58, risk: "medium" },
      { id: 4, name: "East Side", x: 65, y: 50, width: 25, height: 30, level: 42, risk: "medium" },
      { id: 5, name: "South Bay", x: 40, y: 70, width: 35, height: 20, level: 80, risk: "critical" },
    ],
  },
  {
    hour: 12,
    zones: [
      { id: 1, name: "Downtown", x: 30, y: 40, width: 25, height: 20, level: 85, risk: "critical" },
      { id: 2, name: "Riverside", x: 15, y: 55, width: 30, height: 25, level: 95, risk: "critical" },
      { id: 3, name: "North Quarter", x: 50, y: 20, width: 30, height: 25, level: 68, risk: "high" },
      { id: 4, name: "East Side", x: 65, y: 50, width: 25, height: 30, level: 52, risk: "medium" },
      { id: 5, name: "South Bay", x: 40, y: 70, width: 35, height: 20, level: 90, risk: "critical" },
    ],
  },
  {
    hour: 24,
    zones: [
      { id: 1, name: "Downtown", x: 30, y: 40, width: 25, height: 20, level: 70, risk: "high" },
      { id: 2, name: "Riverside", x: 15, y: 55, width: 30, height: 25, level: 82, risk: "critical" },
      { id: 3, name: "North Quarter", x: 50, y: 20, width: 30, height: 25, level: 55, risk: "medium" },
      { id: 4, name: "East Side", x: 65, y: 50, width: 25, height: 30, level: 45, risk: "medium" },
      { id: 5, name: "South Bay", x: 40, y: 70, width: 35, height: 20, level: 75, risk: "high" },
    ],
  },
]

const getRiskColor = (risk: string) => {
  switch (risk) {
    case "critical":
      return "fill-red-600"
    case "high":
      return "fill-orange-500"
    case "medium":
      return "fill-yellow-500"
    case "low":
      return "fill-green-500"
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

export default function EstimatedFloodMapPage() {
  const [timeIndex, setTimeIndex] = useState(0)
  const [selectedZone, setSelectedZone] = useState<(typeof predictions)[0]["zones"][0] | null>(null)

  const currentPrediction = predictions[timeIndex]
  const currentHour = currentPrediction.hour

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-600 rounded-lg">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">Estimated Flood Level Map</h1>
          </div>
          <p className="text-gray-600 text-lg">Predictive flood level mapping for the next 24 hours</p>
        </div>

        {/* Time Control */}
        <Card className="p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <Clock className="h-5 w-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-900">Time Forecast</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Current Time</span>
              <Badge variant="outline" className="text-lg font-semibold">
                +{currentHour} hours
              </Badge>
            </div>

            <div className="space-y-2">
              <Slider
                value={[timeIndex]}
                onValueChange={(value) => setTimeIndex(value[0])}
                max={predictions.length - 1}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>Now</span>
                <span>+3h</span>
                <span>+6h</span>
                <span>+12h</span>
                <span>+24h</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {predictions.map((pred, index) => (
                <Button
                  key={pred.hour}
                  variant={timeIndex === index ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTimeIndex(index)}
                >
                  +{pred.hour}h
                </Button>
              ))}
            </div>
          </div>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Map */}
          <Card className="lg:col-span-2 p-6">
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Predicted Flood Zones</h2>
              <p className="text-sm text-gray-600">Click on a zone to view estimated details</p>
            </div>

            <div className="relative w-full aspect-square bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg border-2 border-gray-200 overflow-hidden">
              {/* River */}
              <svg className="absolute inset-0 w-full h-full">
                <path d="M 0 60 Q 25 55, 50 60 T 100 60" stroke="#3b82f6" strokeWidth="8" fill="none" opacity="0.3" />
              </svg>

              {/* Flood Zones */}
              <svg className="absolute inset-0 w-full h-full">
                {currentPrediction.zones.map((zone) => (
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
              {currentPrediction.zones.map((zone) => (
                <div
                  key={`label-${zone.id}`}
                  className="absolute text-xs font-semibold text-white pointer-events-none text-center"
                  style={{
                    left: `${zone.x + zone.width / 2}%`,
                    top: `${zone.y + zone.height / 2}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <div>{zone.name}</div>
                  <div className="text-lg">{zone.level}%</div>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="mt-6 flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-600 rounded"></div>
                <span className="text-sm text-gray-700">Critical (80%+)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-orange-500 rounded"></div>
                <span className="text-sm text-gray-700">High (60-80%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                <span className="text-sm text-gray-700">Medium (40-60%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span className="text-sm text-gray-700">Low (0-40%)</span>
              </div>
            </div>
          </Card>

          {/* Zone Details */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Prediction Details</h2>

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
                    <MapPin className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">Estimated Flood Level</p>
                      <p className="text-2xl font-bold text-gray-900">{selectedZone.level}%</p>
                      <p className="text-sm text-gray-600">in +{currentHour} hours</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <TrendingUp className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">Trend Analysis</p>
                      <p className="text-sm text-gray-600">
                        {selectedZone.level >= 80 && "Rapidly increasing flood levels expected"}
                        {selectedZone.level >= 60 && selectedZone.level < 80 && "Steady increase in water levels"}
                        {selectedZone.level >= 40 && selectedZone.level < 60 && "Moderate flood risk developing"}
                        {selectedZone.level < 40 && "Low flood risk maintained"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">Recommended Actions</p>
                      <p className="text-sm text-gray-600">
                        {selectedZone.level >= 80 &&
                          "Plan immediate evacuation. Secure property and move to higher ground."}
                        {selectedZone.level >= 60 &&
                          selectedZone.level < 80 &&
                          "Prepare emergency supplies. Monitor updates closely."}
                        {selectedZone.level >= 40 && selectedZone.level < 60 && "Stay alert. Review evacuation routes."}
                        {selectedZone.level < 40 && "Continue normal activities. Stay informed."}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <p className="text-xs text-gray-500">
                      Prediction based on current weather patterns and historical data
                    </p>
                  </div>
                </div>

                {selectedZone.level >= 80 && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-800 font-medium">
                      <AlertTriangle className="h-4 w-4 inline mr-1" />
                      Critical flood level predicted. Take immediate precautions.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <MapPin className="h-12 w-12 text-gray-300 mb-3" />
                <p className="text-gray-500">Select a zone on the map to view predicted flood levels</p>
              </div>
            )}
          </Card>
        </div>

        {/* Statistics */}
        <div className="grid md:grid-cols-4 gap-4 mt-6">
          <Card className="p-4">
            <p className="text-sm text-gray-600 mb-1">Critical Zones</p>
            <p className="text-3xl font-bold text-red-600">
              {currentPrediction.zones.filter((z) => z.risk === "critical").length}
            </p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-gray-600 mb-1">High Risk Zones</p>
            <p className="text-3xl font-bold text-orange-500">
              {currentPrediction.zones.filter((z) => z.risk === "high").length}
            </p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-gray-600 mb-1">Medium Risk Zones</p>
            <p className="text-3xl font-bold text-yellow-500">
              {currentPrediction.zones.filter((z) => z.risk === "medium").length}
            </p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-gray-600 mb-1">Low Risk Zones</p>
            <p className="text-3xl font-bold text-green-500">
              {currentPrediction.zones.filter((z) => z.risk === "low").length}
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}
