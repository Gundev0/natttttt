"use client"

import { useEffect, useState } from "react"
import { Phone, Mail, MapPin, Clock, MessageCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"

interface Address {
  id: string
  city: string
  address: string
  phone: string | null
  is_active: boolean
  sort_order: number
}

interface SiteSetting {
  key: string
  value: string
}

const locations = [
  "Kinshasa (Siège)",
  "Lubumbashi",
  "Goma",
  "Bukavu",
  "Kisangani",
]

export function ContactInfo() {
  const [addresses, setAddresses] = useState<Address[]>([])
  const [settings, setSettings] = useState<{ [key: string]: string }>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const supabase = createClient()
        
        // Fetch addresses and settings in parallel
        const [addressesRes, settingsRes] = await Promise.all([
          supabase
            .from('addresses')
            .select('*')
            .eq('is_active', true)
            .order('sort_order', { ascending: true }),
          supabase
            .from('site_settings')
            .select('key, value')
        ])
        
        if (addressesRes.data) {
          setAddresses(addressesRes.data)
        }
        
        if (settingsRes.data) {
          const settingsMap: { [key: string]: string } = {}
          settingsRes.data.forEach((s: SiteSetting) => {
            settingsMap[s.key] = s.value
          })
          setSettings(settingsMap)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const whatsapp = settings.whatsapp || '+243979213370'
  const phoneSecondary = settings.phone_secondary || '+243890868095'
  const email = settings.email || 'nathangroup02@gmail.com'

  const contactDetails = [
    {
      icon: Phone,
      label: "WhatsApp",
      value: whatsapp.replace(/(\d{3})(\d{3})(\d{3})(\d{3})/, '+$1 $2 $3 $4'),
      href: `https://wa.me/${whatsapp.replace(/\D/g, '')}`
    },
    {
      icon: Phone,
      label: "Téléphone",
      value: phoneSecondary.replace(/(\d{3})(\d{3})(\d{3})(\d{3})/, '+$1 $2 $3 $4'),
      href: `https://wa.me/${phoneSecondary.replace(/\D/g, '')}`
    },
    {
      icon: Mail,
      label: "Email",
      value: email,
      href: `mailto:${email}`
    },
    {
      icon: Clock,
      label: "Horaires",
      value: "Lun-Ven: 8h-18h | Sam: 9h-14h",
      href: null
    },
  ]

  if (loading) {
    return (
      <div className="space-y-8 flex justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Contact Details */}
      <div className="glass-card rounded-2xl p-8">
        <h3 className="text-xl font-bold mb-6 text-foreground" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
          Nos coordonnées
        </h3>

        <div className="space-y-6">
          {contactDetails.map((item, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{item.label}</p>
                {item.href ? (
                  <a href={item.href} className="font-medium text-foreground hover:text-primary transition-colors">
                    {item.value}
                  </a>
                ) : (
                  <p className="font-medium text-foreground">{item.value}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        <hr className="my-6 border-border" />

        <Button asChild className="w-full bg-green-600 hover:bg-green-700 text-white">
          <Link href={`https://wa.me/${whatsapp.replace(/\D/g, '')}`} target="_blank" className="flex items-center justify-center gap-2">
            <MessageCircle className="w-5 h-5" />
            Discuter sur WhatsApp
          </Link>
        </Button>
      </div>

      {/* Addresses */}
      <div className="glass-card rounded-2xl p-8">
        <h3 className="text-xl font-bold mb-4 text-foreground" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
          Nos adresses
        </h3>
        <div className="space-y-4">
          {addresses.length > 0 ? (
            addresses.map((item) => (
              <div key={item.id} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{item.city}</p>
                  <p className="text-sm text-muted-foreground">{item.address}</p>
                </div>
              </div>
            ))
          ) : (
            <>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Kinshasa</p>
                  <p className="text-sm text-muted-foreground">AV. KAUKA 53-73, IMM MAISHA-PARK, Q/BATETELA, C/GOMBE</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Goma</p>
                  <p className="text-sm text-muted-foreground">Q/MABANGA-SUD, AV.MUTONGO, C/KARISIMBI N 007</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Bunia</p>
                  <p className="text-sm text-muted-foreground">Q/BAKONKO, Av.MANIEMA, C/MBUNYA N 019</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Coverage Areas */}
      <div className="glass-card rounded-2xl p-8">
        <h3 className="text-xl font-bold mb-4 text-foreground" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
          Zones de couverture
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Nous intervenons dans tout le pays, avec des équipes locales dans les principales villes.
        </p>

        <div className="flex flex-wrap gap-2">
          {locations.map((location, index) => (
            <span 
              key={index}
              className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium"
            >
              {location}
            </span>
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <div className="glass-card rounded-2xl p-8">
        <h3 className="text-xl font-bold mb-4 text-foreground" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
          Liens rapides
        </h3>
        <div className="space-y-3">
          <Link href="/faq" className="block text-muted-foreground hover:text-primary transition-colors">
            Questions fréquentes
          </Link>
          <Link href="/services" className="block text-muted-foreground hover:text-primary transition-colors">
            Nos services
          </Link>
          <Link href="/offres" className="block text-muted-foreground hover:text-primary transition-colors">
            Voir nos offres
          </Link>
          <Link href="/equipements" className="block text-muted-foreground hover:text-primary transition-colors">
            Boutique équipements
          </Link>
        </div>
      </div>
    </div>
  )
}
