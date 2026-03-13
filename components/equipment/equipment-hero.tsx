"use client"

import Image from "next/image"
import { ShoppingBag, Truck, Shield, Headphones } from "lucide-react"

const features = [
  { icon: Truck, text: "Livraison RDC" },
  { icon: Shield, text: "Garantie 1 an" },
  { icon: Headphones, text: "Support technique" },
]

export function EquipmentHero() {
  return (
    <section className="pt-8 pb-16 bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-secondary rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <ShoppingBag className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Boutique équipements</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6 text-foreground" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
              Équipements réseaux{" "}
              <span className="gradient-text">professionnels</span>
            </h1>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Découvrez notre sélection d{"'"}équipements réseaux de qualité professionnelle. 
              Routeurs MikroTik, switches Cisco, points d{"'"}accès Ubiquiti et accessoires 
              disponibles avec livraison partout en RDC.
            </p>

            <div className="flex flex-wrap gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted">
                  <feature.icon className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/equipment-network.jpg"
                alt="Équipements réseaux NATHAN GROUPE"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#3E1F0F]/30 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
