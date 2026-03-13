"use client"

import { Satellite, Shield, Headphones, Gauge, Wifi, Server } from "lucide-react"

const features = [
  {
    icon: Gauge,
    title: "Vitesse Orbitale",
    description: "Débits allant jusqu'à 250 Mbps pour le streaming, les appels vidéo et le cloud sans latence.",
  },
  {
    icon: Satellite,
    title: "Couverture Totale",
    description: "Une connexion stable à Kinshasa, Goma, Bunia et partout en RDC, même là où la fibre ne va pas.",
  },
  {
    icon: Server,
    title: "Expertise Configuration",
    description: "Nos ingénieurs optimisent votre réseau local (VLAN, sécurité, Wi-Fi Mesh) pour exploiter 100% de la puissance satellite.",
  },
  {
    icon: Headphones,
    title: "Support Réactif",
    description: "Une équipe locale pour une maintenance immédiate et un suivi de vos metrics de performance.",
  },
  {
    icon: Shield,
    title: "Sécurité Maximale",
    description: "Configuration Firewall, protection DDoS et surveillance 24/7 de votre infrastructure réseau.",
  },
  {
    icon: Wifi,
    title: "Load Balancing",
    description: "Équilibrage de charge intelligent entre Starlink et vos connexions existantes pour une disponibilité maximale.",
  },
]

export function Services() {
  return (
    <section id="services" className="py-20 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/30 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Nos Services
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-balance" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
            Plus qu{"'"}une connexion,{" "}
            <span className="gradient-text">une infrastructure robuste</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-pretty">
            Acheter un kit est une chose, garantir une latence minimale et une sécurité maximale en est une autre. 
            Nous résolvons vos problèmes de coupures intempestives.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="glass-card glass-card-hover rounded-2xl p-8 group"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
