export function Footer() {
  const partners = [
    {
      name: "กรมอุตุนิยมวิทยา",
      abbr: "TMD",
    },
    {
      name: "กรมชลประทาน",
      abbr: "RID",
    },
    {
      name: "กรมป้องกันและบรรเทาสาธารณภัย",
      abbr: "DDPM",
    },
    {
      name: "กรุงเทพมหานคร",
      abbr: "BMA",
    },
    {
      name: "สำนักงานทรัพยากรน้ำแห่งชาติ",
      abbr: "ONWR",
    },
  ]

  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center gap-6">
          <div className="text-center">
            <h3 className="font-heading text-sm font-semibold text-foreground/80 mb-4">หน่วยงานที่ให้การสนับสนุน</h3>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {partners.map((partner) => (
              <div
                key={partner.abbr}
                className="flex flex-col items-center gap-2 group cursor-pointer transition-transform hover:scale-105"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center border-2 border-primary/20 group-hover:border-primary/40 transition-colors">
                  <span className="font-heading font-bold text-lg text-primary">{partner.abbr}</span>
                </div>
                <span className="text-xs text-muted-foreground text-center max-w-[100px] leading-tight">
                  {partner.name}
                </span>
              </div>
            ))}
          </div>

          <div className="text-center text-sm text-muted-foreground pt-4 border-t w-full">
            <p>© 2025 ระบบเตือนภัยน้ำท่วมเขตเมือง | สงวนลิขสิทธิ์</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
