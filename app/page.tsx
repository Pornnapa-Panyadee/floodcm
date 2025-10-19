import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Droplets, MapPin, TrendingUp, Info } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mb-8 text-center">
          <h3 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-2xl text-balance">
            ระบบเตือนภัยน้ำท่วมเขตเมือง จังหวัดเชียงใหม่
          </h3>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground text-pretty">
            CMFlood : Urban Flood Warning Systems in Chiang Mai
          </p>
        </div>

       

        {/* Quick Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">ระดับน้ำเฉลี่ย</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-foreground">1.2</span>
                <span className="text-sm text-muted-foreground">เมตร</span>
              </div>
              <Badge variant="secondary" className="mt-2">
                ปกติ
              </Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">พื้นที่เสี่ยง</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-foreground">3</span>
                <span className="text-sm text-muted-foreground">พื้นที่</span>
              </div>
              <Badge variant="secondary" className="mt-2">
                ติดตาม
              </Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">หลักวัดน้ำ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-foreground">12</span>
                <span className="text-sm text-muted-foreground">จุด</span>
              </div>
              <Badge variant="secondary" className="mt-2">
                ทำงานปกติ
              </Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">อัปเดตล่าสุด</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-foreground">5</span>
                <span className="text-sm text-muted-foreground">นาที</span>
              </div>
              <Badge variant="secondary" className="mt-2">
                เรียลไทม์
              </Badge>
            </CardContent>
          </Card>
        </div>

        {/* Feature Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          <Card className="overflow-hidden">
            <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
              <MapPin className="h-16 w-16 text-primary" />
            </div>
            <CardHeader>
              <CardTitle className="text-foreground">แผนที่เสี่ยงภัยน้ำท่วม</CardTitle>
              <CardDescription>ดูพื้นที่เสี่ยงภัยน้ำท่วมในเขตเมือง พร้อมข้อมูลระดับความเสี่ยง</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/risk-map">
                <Button className="w-full">ดูแผนที่</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <div className="aspect-video bg-gradient-to-br from-chart-2/20 to-chart-2/5 flex items-center justify-center">
              <Droplets className="h-16 w-16 text-chart-2" />
            </div>
            <CardHeader>
              <CardTitle className="text-foreground">หลักวัดระดับน้ำ</CardTitle>
              <CardDescription>ตรวจสอบข้อมูลจากหลักวัดระดับน้ำทั้งหมดในเขตเมือง</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/water-pillars">
                <Button className="w-full" variant="secondary">
                  ดูข้อมูล
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <div className="aspect-video bg-gradient-to-br from-chart-4/20 to-chart-4/5 flex items-center justify-center">
              <Info className="h-16 w-16 text-chart-4" />
            </div>
            <CardHeader>
              <CardTitle className="text-foreground">เครื่องหมายระดับน้ำเมือง</CardTitle>
              <CardDescription>ดูเครื่องหมายระดับน้ำและจุดวัดต่างๆ ในเขตเมือง</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/city-levels">
                <Button className="w-full" variant="secondary">
                  ดูรายละเอียด
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <div className="aspect-video bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
              <TrendingUp className="h-16 w-16 text-accent" />
            </div>
            <CardHeader>
              <CardTitle className="text-foreground">แผนที่ประมาณการน้ำท่วม</CardTitle>
              <CardDescription>ดูการพยากรณ์ระดับน้ำและพื้นที่ที่อาจได้รับผลกระทบ</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/forecast">
                <Button className="w-full" variant="secondary">
                  ดูพยากรณ์
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Info Section */}
        <Card className="mt-8 bg-muted/50">
          <CardHeader>
            <CardTitle className="text-foreground">เกี่ยวกับระบบ</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              ระบบเตือนภัยน้ำท่วมเขตเมืองถูกพัฒนาขึ้นเพื่อช่วยให้ประชาชนสามารถติดตามสถานการณ์น้ำท่วมได้แบบเรียลไทม์
              พร้อมทั้งรับการแจ้งเตือนล่วงหน้าเมื่อมีความเสี่ยงสูง
            </p>
            <p>
              ระบบประกอบด้วยเครือข่ายเซ็นเซอร์วัดระดับน้ำที่กระจายอยู่ทั่วเขตเมือง ซึ่งส่งข้อมูลมายังศูนย์ควบคุมเพื่อวิเคราะห์และประมวลผลแบบอัตโนมัติ
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
