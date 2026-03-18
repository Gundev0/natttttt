'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { 
  LayoutDashboard, 
  Package, 
  Image, 
  Settings, 
  MapPin, 
  LogOut,
  Menu,
  X,
  Wrench
} from 'lucide-react'
import { EquipmentManager } from './equipment-manager'
import { HeroManager } from './hero-manager'
import { AddressManager } from './address-manager'
import { SettingsManager } from './settings-manager'
import { ServicesManager } from './services-manager'

interface AdminUser {
  id: string
  email: string
  role: string
}

interface AdminDashboardProps {
  user: AdminUser
}

const menuItems = [
  { id: 'dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
  { id: 'equipment', label: 'Équipements', icon: Package },
  { id: 'hero', label: 'Bannières', icon: Image },
  { id: 'services', label: 'Services', icon: Wrench },
  { id: 'addresses', label: 'Adresses', icon: MapPin },
  { id: 'settings', label: 'Paramètres', icon: Settings },
]

export default function AdminDashboard({ user }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter()

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'equipment':
        return <EquipmentManager />
      case 'hero':
        return <HeroManager />
      case 'services':
        return <ServicesManager />
      case 'addresses':
        return <AddressManager />
      case 'settings':
        return <SettingsManager />
      default:
        return <DashboardOverview />
    }
  }

  return (
    <div className="min-h-screen bg-[#1A1A1A] flex">
      {/* Mobile menu button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-[#242424] text-[#FFF1E8]"
      >
        {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-40 w-64 bg-[#242424] border-r border-[#FFF1E8]/10
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-[#FFF1E8]/10">
            <h1 className="text-xl font-bold text-[#FFF1E8]" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
              Nathan Group
            </h1>
            <p className="text-sm text-[#FFF1E8]/60">Administration</p>
          </div>

          <nav className="flex-1 p-4 space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id)
                  setSidebarOpen(false)
                }}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left
                  ${activeTab === item.id 
                    ? 'bg-[#D39A6A] text-[#1A1A1A]' 
                    : 'text-[#FFF1E8]/70 hover:bg-[#FFF1E8]/5 hover:text-[#FFF1E8]'
                  }
                `}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-[#FFF1E8]/10">
            <div className="px-4 py-2 mb-2">
              <p className="text-sm text-[#FFF1E8]/60 truncate">{user.email}</p>
              <p className="text-xs text-[#D39A6A] capitalize">{user.role}</p>
            </div>
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="w-full justify-start gap-3 text-[#FFF1E8]/70 hover:text-red-400 hover:bg-red-400/10"
            >
              <LogOut className="w-5 h-5" />
              Déconnexion
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-4 lg:p-8 pt-16 lg:pt-8">
        <div className="max-w-6xl mx-auto">
          {renderContent()}
        </div>
      </main>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}

function DashboardOverview() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-[#FFF1E8] mb-6" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
        Tableau de bord
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Équipements', icon: Package, color: 'bg-blue-500/20 text-blue-400' },
          { label: 'Bannières', icon: Image, color: 'bg-green-500/20 text-green-400' },
          { label: 'Services', icon: Wrench, color: 'bg-purple-500/20 text-purple-400' },
          { label: 'Adresses', icon: MapPin, color: 'bg-orange-500/20 text-orange-400' },
        ].map((item) => (
          <div key={item.label} className="bg-[#242424] rounded-xl p-6 border border-[#FFF1E8]/10">
            <div className={`w-12 h-12 rounded-lg ${item.color} flex items-center justify-center mb-4`}>
              <item.icon className="w-6 h-6" />
            </div>
            <p className="text-[#FFF1E8]/60 text-sm">{item.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-[#242424] rounded-xl p-6 border border-[#FFF1E8]/10">
        <h3 className="text-lg font-semibold text-[#FFF1E8] mb-4">Bienvenue dans l&apos;administration</h3>
        <p className="text-[#FFF1E8]/60">
          Utilisez le menu de gauche pour naviguer entre les différentes sections et gérer le contenu de votre site.
        </p>
        <ul className="mt-4 space-y-2 text-[#FFF1E8]/60">
          <li>• <strong className="text-[#D39A6A]">Équipements</strong> - Gérer les produits et liens de paiement</li>
          <li>• <strong className="text-[#D39A6A]">Bannières</strong> - Modifier les slides de la page d&apos;accueil</li>
          <li>• <strong className="text-[#D39A6A]">Services</strong> - Gérer les services proposés</li>
          <li>• <strong className="text-[#D39A6A]">Adresses</strong> - Mettre à jour vos localisations</li>
          <li>• <strong className="text-[#D39A6A]">Paramètres</strong> - Configurer les informations générales</li>
        </ul>
      </div>
    </div>
  )
}
