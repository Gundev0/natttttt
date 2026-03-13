import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, MapPin, MessageSquare, Settings } from "lucide-react"
import Link from "next/link"

export default async function AdminDashboardPage() {
  const supabase = await createClient()
  
  const [products, offices, testimonials, settings] = await Promise.all([
    supabase.from("products").select("id", { count: "exact" }),
    supabase.from("offices").select("id", { count: "exact" }),
    supabase.from("testimonials").select("id", { count: "exact" }),
    supabase.from("site_settings").select("id", { count: "exact" }),
  ])

  const stats = [
    { 
      label: "Produits", 
      value: products.count || 0, 
      icon: Package, 
      href: "/admin/products",
      color: "bg-blue-500/10 text-blue-400"
    },
    { 
      label: "Bureaux", 
      value: offices.count || 0, 
      icon: MapPin, 
      href: "/admin/offices",
      color: "bg-green-500/10 text-green-400"
    },
    { 
      label: "Témoignages", 
      value: testimonials.count || 0, 
      icon: MessageSquare, 
      href: "/admin/testimonials",
      color: "bg-purple-500/10 text-purple-400"
    },
    { 
      label: "Paramètres", 
      value: settings.count || 0, 
      icon: Settings, 
      href: "/admin/settings",
      color: "bg-orange-500/10 text-orange-400"
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#FFF1E8]">Tableau de bord</h1>
        <p className="text-[#FFF1E8]/60 mt-1">Bienvenue dans le panneau d{"'"}administration NATHAN GROUPE</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href}>
            <Card className="bg-[#242424] border-[#333] hover:border-[#D39A6A]/50 transition-colors cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-[#FFF1E8]/70">
                  {stat.label}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.color}`}>
                  <stat.icon className="w-4 h-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-[#FFF1E8]">{stat.value}</div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-[#242424] border-[#333]">
          <CardHeader>
            <CardTitle className="text-[#FFF1E8]">Actions rapides</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link 
              href="/admin/products" 
              className="flex items-center gap-3 p-3 rounded-lg bg-[#1A1A1A] hover:bg-[#333] transition-colors"
            >
              <Package className="w-5 h-5 text-[#D39A6A]" />
              <span className="text-[#FFF1E8]">Gérer les produits</span>
            </Link>
            <Link 
              href="/admin/offices" 
              className="flex items-center gap-3 p-3 rounded-lg bg-[#1A1A1A] hover:bg-[#333] transition-colors"
            >
              <MapPin className="w-5 h-5 text-[#D39A6A]" />
              <span className="text-[#FFF1E8]">Gérer les bureaux</span>
            </Link>
            <Link 
              href="/admin/settings" 
              className="flex items-center gap-3 p-3 rounded-lg bg-[#1A1A1A] hover:bg-[#333] transition-colors"
            >
              <Settings className="w-5 h-5 text-[#D39A6A]" />
              <span className="text-[#FFF1E8]">Modifier les paramètres</span>
            </Link>
          </CardContent>
        </Card>

        <Card className="bg-[#242424] border-[#333]">
          <CardHeader>
            <CardTitle className="text-[#FFF1E8]">Informations du site</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 rounded-lg bg-[#1A1A1A]">
              <p className="text-sm text-[#FFF1E8]/50">Nom de l{"'"}entreprise</p>
              <p className="text-[#FFF1E8] font-medium">NATHAN GROUPE</p>
            </div>
            <div className="p-3 rounded-lg bg-[#1A1A1A]">
              <p className="text-sm text-[#FFF1E8]/50">Slogan</p>
              <p className="text-[#FFF1E8] font-medium">Votre partenaire officiel pour une connectivite meilleure</p>
            </div>
            <div className="p-3 rounded-lg bg-[#1A1A1A]">
              <p className="text-sm text-[#FFF1E8]/50">WhatsApp</p>
              <p className="text-[#FFF1E8] font-medium">+243 979 213 370</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
