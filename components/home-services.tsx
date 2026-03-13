"use client"

import Link from "next/link"
import { Satellite, Network, Shield, Wrench, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const services = [
  {
    icon: Satellite,
    title: "Internet Starlink",
    description: "Accédez à Internet haut débit par satellite avec une latence ultra-faible, même dans les zones les plus reculées de la RDC.",
  },
  {
    icon: Network,
    title: "Équipements Réseaux",
    description: "Routeurs MikroTik, switches managés, points d'accès Ubiquiti et câblage structuré pour des infrastructures performantes.",
  },
  {
    icon: Shield,
    title: "Sécurité Réseau",
    description: "Protection complète de vos infrastructures avec pare-feu, VPN et surveillance continue de votre réseau.",
  },
  {
    icon: Wrench,
    title: "Support Technique",
    description: "Maintenance préventive, dépannage rapide et assistance technique 24/7 pour garantir votre continuité opérationnelle.",
  },
]

export function HomeServices() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Nos services
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
            Des solutions complètes pour votre connectivité
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            De l{"'"}installation Starlink à la maintenance réseau, nous vous accompagnons à chaque étape.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {services.map((service, index) => (
            <div 
              key={index}
              className="glass-card glass-card-hover rounded-2xl p-6 group cursor-pointer"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                <service.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button asChild size="lg" variant="outline" className="border-primary/30 hover:bg-primary/10">
            <Link href="/services" className="flex items-center gap-2">
              <span>Découvrir tous nos services</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
