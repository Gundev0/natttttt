"use client"

import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const contactDetails = [
  {
    icon: Phone,
    label: "Téléphone / WhatsApp",
    value: "+243 979 213 370",
    href: "tel:+243979213370"
  },
  {
    icon: Mail,
    label: "Email",
    value: "contact@nathangroupe.cd",
    href: "mailto:contact@nathangroupe.cd"
  },
  {
    icon: MapPin,
    label: "Adresses",
    value: "Kinshasa | Goma | Bunia",
    href: null
  },
  {
    icon: Clock,
    label: "Horaires",
    value: "Lun-Ven: 8h-18h | Sam: 9h-14h",
    href: null
  },
]

const locations = [
  { city: "Kinshasa (Siège)", address: "AV. KAUKA 53-73, IMM MAISHA-PARK Q/BATETELA C/GOMBE" },
  { city: "Goma", address: "Q/MABANGA-SUD AV.MUTONGO C/KARISIMBI N 007" },
  { city: "Bunia", address: "Q/BAKONKO Av.MANIEMA C/MBUNYA N 019" },
]

export function ContactInfo() {
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
          <Link href="https://wa.me/243979213370" target="_blank" className="flex items-center justify-center gap-2">
            <MessageCircle className="w-5 h-5" />
            Discuter sur WhatsApp
          </Link>
        </Button>
      </div>

      {/* Coverage Areas */}
      <div className="glass-card rounded-2xl p-8">
        <h3 className="text-xl font-bold mb-4 text-foreground" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
          Zones de couverture
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Nous intervenons dans tout le pays, avec des équipes locales dans les principales villes.
        </p>

        <div className="space-y-3">
          {locations.map((location, index) => (
            <div key={index} className="p-3 rounded-lg bg-muted/50">
              <p className="font-medium text-primary text-sm">{location.city}</p>
              <p className="text-xs text-muted-foreground mt-1">{location.address}</p>
            </div>
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
