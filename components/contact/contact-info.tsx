"use client"

import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const contactDetails = [
  {
    icon: Phone,
    label: "WhatsApp",
    value: "+243 979 213 370",
    href: "https://wa.me/243979213370"
  },
  {
    icon: Mail,
    label: "Email",
    value: "contact@nathangroup.cd",
    href: "mailto:contact@nathangroup.cd"
  },
  {
    icon: Clock,
    label: "Horaires",
    value: "Lun-Ven: 8h-18h | Sam: 9h-14h",
    href: null
  },
]

const addresses = [
  {
    city: "Kinshasa",
    address: "AV. KAUKA 53-73, IMM MAISHA-PARK, Q/BATETELA, C/GOMBE"
  },
  {
    city: "Goma", 
    address: "Q/MABANGA-SUD, AV.MUTONGO, C/KARISIMBI N 007"
  },
  {
    city: "Bunia",
    address: "Q/BAKONKO, Av.MANIEMA, C/MBUNYA N 019"
  },
]

const locations = [
  "Kinshasa (Siège)",
  "Lubumbashi",
  "Goma",
  "Bukavu",
  "Kisangani",
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

      {/* Addresses */}
      <div className="glass-card rounded-2xl p-8">
        <h3 className="text-xl font-bold mb-4 text-foreground" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
          Nos adresses
        </h3>
        <div className="space-y-4">
          {addresses.map((item, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <MapPin className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">{item.city}</p>
                <p className="text-sm text-muted-foreground">{item.address}</p>
              </div>
            </div>
          ))}
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
