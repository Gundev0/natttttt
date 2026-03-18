import { createClient } from '@/lib/supabase/server'
import { Package, MapPin, Image, Wrench, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default async function AdminDashboardPage() {
  const supabase = await createClient()

  const [equipmentRes, servicesRes, slidesRes, addressesRes] = await Promise.all([
    supabase.from('equipment').select('id', { count: 'exact' }),
    supabase.from('services').select('id', { count: 'exact' }),
    supabase.from('hero_slides').select('id', { count: 'exact' }),
    supabase.from('addresses').select('id', { count: 'exact' }),
  ])

  const stats = [
    {
      title: 'Équipements',
      value: equipmentRes.count || 0,
      icon: Package,
      href: '/admin/equipment',
      color: 'bg-blue-500/20 text-blue-400',
    },
    {
      title: 'Services',
      value: servicesRes.count || 0,
      icon: Wrench,
      href: '/admin/services',
      color: 'bg-green-500/20 text-green-400',
    },
    {
      title: 'Hero Slides',
      value: slidesRes.count || 0,
      icon: Image,
      href: '/admin/hero-slides',
      color: 'bg-purple-500/20 text-purple-400',
    },
    {
      title: 'Adresses',
      value: addressesRes.count || 0,
      icon: MapPin,
      href: '/admin/addresses',
      color: 'bg-orange-500/20 text-orange-400',
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[#FFF1E8]" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
          Tableau de bord
        </h1>
        <p className="text-[#FFF1E8]/60">Bienvenue dans votre panneau d&apos;administration</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link 
            key={stat.title} 
            href={stat.href}
            className="bg-[#242424] rounded-xl p-6 border border-[#FFF1E8]/10 hover:border-[#D39A6A]/30 transition-colors group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <ArrowRight className="w-5 h-5 text-[#FFF1E8]/30 group-hover:text-[#D39A6A] transition-colors" />
            </div>
            <p className="text-sm text-[#FFF1E8]/60 mb-1">{stat.title}</p>
            <p className="text-3xl font-bold text-[#FFF1E8]" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
              {stat.value}
            </p>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="bg-[#242424] rounded-xl p-6 border border-[#FFF1E8]/10">
          <h2 className="text-lg font-semibold text-[#FFF1E8] mb-4" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
            Actions rapides
          </h2>
          <div className="space-y-2">
            <Link
              href="/admin/equipment"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#FFF1E8]/5 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-[#D39A6A]/20 flex items-center justify-center">
                <Package className="w-5 h-5 text-[#D39A6A]" />
              </div>
              <div>
                <p className="font-medium text-[#FFF1E8]">Gérer les équipements</p>
                <p className="text-sm text-[#FFF1E8]/60">Ajouter, modifier ou supprimer des produits</p>
              </div>
            </Link>
            <Link
              href="/admin/hero-slides"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#FFF1E8]/5 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-[#D39A6A]/20 flex items-center justify-center">
                <Image className="w-5 h-5 text-[#D39A6A]" />
              </div>
              <div>
                <p className="font-medium text-[#FFF1E8]">Gérer le Hero</p>
                <p className="text-sm text-[#FFF1E8]/60">Modifier les slides de la page d&apos;accueil</p>
              </div>
            </Link>
            <Link
              href="/admin/settings"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#FFF1E8]/5 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-[#D39A6A]/20 flex items-center justify-center">
                <Wrench className="w-5 h-5 text-[#D39A6A]" />
              </div>
              <div>
                <p className="font-medium text-[#FFF1E8]">Paramètres du site</p>
                <p className="text-sm text-[#FFF1E8]/60">Modifier le tagline, WhatsApp, email</p>
              </div>
            </Link>
          </div>
        </div>

        <div className="bg-[#242424] rounded-xl p-6 border border-[#FFF1E8]/10">
          <h2 className="text-lg font-semibold text-[#FFF1E8] mb-4" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
            Informations
          </h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-[#FFF1E8]/60">Site</p>
              <p className="font-medium text-[#FFF1E8]">Nathan Group - Starlink RDC</p>
            </div>
            <div>
              <p className="text-sm text-[#FFF1E8]/60">Version</p>
              <p className="font-medium text-[#FFF1E8]">1.0.0</p>
            </div>
            <div>
              <p className="text-sm text-[#FFF1E8]/60">Statut</p>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                En ligne
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
