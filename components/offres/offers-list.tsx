"use client"

import Link from "next/link"
import { Check, Star, Zap, Building2, Layers } from "lucide-react"
import { Button } from "@/components/ui/button"

const offers = [
  {
    icon: Zap,
    name: "Standard",
    tagline: "Idéal pour les particuliers",
    price: "350",
    currency: "USD",
    period: "/mois",
    setupFee: "600 USD (installation)",
    description: "Une connexion Internet fiable pour votre domicile avec tout le nécessaire pour rester connecté.",
    features: [
      { text: "Kit Starlink inclus (location)", included: true },
      { text: "Débit jusqu'à 100 Mbps", included: true },
      { text: "Installation standard", included: true },
      { text: "1 point d'accès WiFi", included: true },
      { text: "Support par email", included: true },
      { text: "Configuration réseau basique", included: true },
      { text: "Support téléphonique 24/7", included: false },
      { text: "Équipements réseau avancés", included: false },
    ],
    popular: false,
    cta: "Choisir Standard",
  },
  {
    icon: Building2,
    name: "Business",
    tagline: "Pour les professionnels exigeants",
    price: "550",
    currency: "USD",
    period: "/mois",
    setupFee: "800 USD (installation)",
    description: "Une solution complète pour les entreprises avec support prioritaire et équipements professionnels.",
    features: [
      { text: "Kit Starlink Business", included: true },
      { text: "Débit jusqu'à 250 Mbps", included: true },
      { text: "Installation prioritaire", included: true },
      { text: "Routeur MikroTik inclus", included: true },
      { text: "Configuration réseau avancée", included: true },
      { text: "Support téléphonique 24/7", included: true },
      { text: "Monitoring proactif", included: true },
      { text: "IP fixe disponible (+50 USD/mois)", included: true },
    ],
    popular: true,
    cta: "Choisir Business",
  },
  {
    icon: Layers,
    name: "Hybride",
    tagline: "Solution multi-connexions",
    price: "Sur devis",
    currency: "",
    period: "",
    setupFee: "Selon configuration",
    description: "Pour les organisations nécessitant une haute disponibilité avec basculement automatique.",
    features: [
      { text: "Starlink + Fibre/4G/VSAT", included: true },
      { text: "Failover automatique", included: true },
      { text: "Load balancing intelligent", included: true },
      { text: "Infrastructure sur mesure", included: true },
      { text: "Support dédié VIP", included: true },
      { text: "SLA garanti 99.9%", included: true },
      { text: "Ingénieur dédié", included: true },
      { text: "Rapports mensuels détaillés", included: true },
    ],
    popular: false,
    cta: "Demander un devis",
  },
]

export function OffersList() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {offers.map((offer, index) => (
            <div 
              key={index}
              className={`relative rounded-2xl p-8 flex flex-col transition-all duration-300 ${
                offer.popular 
                  ? "bg-primary text-primary-foreground shadow-2xl scale-105 z-10" 
                  : "glass-card glass-card-hover"
              }`}
            >
              {offer.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-1 px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-semibold shadow-lg">
                  <Star className="w-4 h-4 fill-current" />
                  <span>Le plus populaire</span>
                </div>
              )}

              {/* Header */}
              <div className="mb-6">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${
                  offer.popular ? "bg-primary-foreground/20" : "bg-primary/10"
                }`}>
                  <offer.icon className={`w-7 h-7 ${offer.popular ? "text-primary-foreground" : "text-primary"}`} />
                </div>
                <h3 className={`text-2xl font-bold mb-1 ${offer.popular ? "text-primary-foreground" : "text-foreground"}`} style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                  {offer.name}
                </h3>
                <p className={`text-sm ${offer.popular ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                  {offer.tagline}
                </p>
              </div>

              {/* Pricing */}
              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className={`text-4xl font-bold ${offer.popular ? "text-primary-foreground" : "text-foreground"}`} style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                    {offer.price}
                  </span>
                  {offer.currency && (
                    <span className={`text-lg ${offer.popular ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                      {offer.currency}
                    </span>
                  )}
                  {offer.period && (
                    <span className={`text-sm ${offer.popular ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                      {offer.period}
                    </span>
                  )}
                </div>
                <p className={`text-sm mt-1 ${offer.popular ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
                  {offer.setupFee}
                </p>
              </div>

              {/* Description */}
              <p className={`text-sm mb-6 leading-relaxed ${offer.popular ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                {offer.description}
              </p>

              {/* Features */}
              <ul className="space-y-3 mb-8 flex-1">
                {offer.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      feature.included 
                        ? offer.popular ? "bg-primary-foreground/20" : "bg-primary/10"
                        : "bg-muted"
                    }`}>
                      <Check className={`w-3 h-3 ${
                        feature.included 
                          ? offer.popular ? "text-primary-foreground" : "text-primary"
                          : "text-muted-foreground/50"
                      }`} />
                    </div>
                    <span className={`text-sm ${
                      feature.included 
                        ? offer.popular ? "text-primary-foreground/90" : "text-foreground/80"
                        : "text-muted-foreground/50 line-through"
                    }`}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button 
                asChild 
                className={`w-full ${
                  offer.popular 
                    ? "bg-primary-foreground text-primary hover:bg-primary-foreground/90" 
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                }`}
                size="lg"
              >
                <Link href="/contact">
                  {offer.cta}
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
