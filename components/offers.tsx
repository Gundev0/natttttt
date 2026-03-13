"use client"

import Link from "next/link"
import { Check, Star, Zap, Building2, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"

const plans = [
  {
    name: "Starlink Standard",
    icon: Zap,
    target: "Particuliers & Télétravail",
    price: "Sur devis",
    popular: false,
    features: [
      "Kit Starlink Standard",
      "Installation de base",
      "Configuration Wi-Fi optimisée",
      "Support standard par email",
      "Guide d'utilisation inclus",
    ],
    cta: "Demander un devis",
  },
  {
    name: "Starlink Business",
    icon: Building2,
    target: "PME & Entreprises",
    price: "Sur devis",
    popular: true,
    features: [
      "Antenne Haute Performance",
      "Priorité réseau garantie",
      "Configuration Firewall avancée",
      "Support prioritaire 24/7",
      "Monitoring en temps réel",
      "SLA 99.9% disponibilité",
    ],
    cta: "Demander un devis",
  },
  {
    name: "Pack Hybride (Failover)",
    icon: Shield,
    target: "Entreprises critiques",
    price: "Sur devis",
    popular: false,
    features: [
      "Starlink + Fibre optique",
      "Basculement automatique",
      "Load Balancing intelligent",
      "Redondance totale",
      "Support dédié avec SLA",
      "Audit infrastructure inclus",
      "Maintenance préventive",
    ],
    cta: "Demander un devis",
  },
]

export function Offers() {
  return (
    <section id="offres" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Nos Offres
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-balance" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
            Des solutions adaptées à{" "}
            <span className="gradient-text">chaque profil</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            De l{"'"}utilisateur individuel aux grandes entreprises, nous avons la solution qui correspond à vos besoins.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`glass-card glass-card-hover rounded-2xl p-8 relative ${
                plan.popular ? "ring-2 ring-primary" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                    <Star className="w-4 h-4" />
                    Populaire
                  </span>
                </div>
              )}
              
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <plan.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                    {plan.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{plan.target}</p>
                </div>
              </div>
              
              <div className="mb-6">
                <span className="text-2xl font-bold text-foreground">{plan.price}</span>
              </div>
              
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button
                asChild
                className={`w-full ${
                  plan.popular
                    ? "cta-glow bg-primary hover:bg-primary/90 text-primary-foreground"
                    : "bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                }`}
              >
                <Link href="#contact">{plan.cta}</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
