"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import Image from "next/image"
import { 
  LayoutDashboard, 
  Package, 
  MapPin, 
  MessageSquare, 
  Settings, 
  ImageIcon,
  LogOut,
  ChevronRight
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { User } from "@supabase/supabase-js"

const navItems = [
  { href: "/admin", label: "Tableau de bord", icon: LayoutDashboard },
  { href: "/admin/products", label: "Produits", icon: Package },
  { href: "/admin/offices", label: "Bureaux", icon: MapPin },
  { href: "/admin/testimonials", label: "Témoignages", icon: MessageSquare },
  { href: "/admin/media", label: "Médias", icon: ImageIcon },
  { href: "/admin/settings", label: "Paramètres", icon: Settings },
]

export function AdminSidebar({ user }: { user: User }) {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/admin/login")
    router.refresh()
  }

  return (
    <aside className="w-64 bg-[#242424] border-r border-[#333] flex flex-col">
      <div className="p-6 border-b border-[#333]">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo-nathan.png"
            alt="NATHAN GROUPE"
            width={40}
            height={40}
            className="rounded-lg"
          />
          <div>
            <span className="font-bold text-[#FFF1E8]">NATHAN </span>
            <span className="font-bold text-[#D39A6A]">GROUPE</span>
            <p className="text-xs text-[#FFF1E8]/50">Administration</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || 
            (item.href !== "/admin" && pathname.startsWith(item.href))
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                isActive 
                  ? "bg-[#D39A6A] text-[#1A1A1A]" 
                  : "text-[#FFF1E8]/70 hover:bg-[#333] hover:text-[#FFF1E8]"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
              {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-[#333]">
        <div className="flex items-center gap-3 px-4 py-2 mb-3">
          <div className="w-8 h-8 rounded-full bg-[#D39A6A] flex items-center justify-center text-[#1A1A1A] font-bold text-sm">
            {user.email?.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-[#FFF1E8] truncate">{user.email}</p>
            <p className="text-xs text-[#FFF1E8]/50">Administrateur</p>
          </div>
        </div>
        <Button
          variant="ghost"
          onClick={handleLogout}
          className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-500/10"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Déconnexion
        </Button>
      </div>
    </aside>
  )
}
