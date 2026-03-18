'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { LayoutDashboard, Package, Wrench, Image, MapPin, Settings } from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Équipements', href: '/admin/equipment', icon: Package },
  { name: 'Services', href: '/admin/services', icon: Wrench },
  { name: 'Hero Slides', href: '/admin/hero-slides', icon: Image },
  { name: 'Adresses', href: '/admin/addresses', icon: MapPin },
  { name: 'Paramètres', href: '/admin/settings', icon: Settings },
]

export function AdminNav() {
  const pathname = usePathname()

  return (
    <nav className="flex items-center gap-1 px-4 lg:px-6 overflow-x-auto">
      {navigation.map((item) => {
        const isActive = pathname === item.href || 
          (item.href !== '/admin' && pathname.startsWith(item.href))
        
        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              'flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors',
              isActive
                ? 'border-[#D39A6A] text-[#D39A6A]'
                : 'border-transparent text-[#FFF1E8]/60 hover:text-[#FFF1E8] hover:border-[#FFF1E8]/30'
            )}
          >
            <item.icon className="w-4 h-4" />
            {item.name}
          </Link>
        )
      })}
    </nav>
  )
}
