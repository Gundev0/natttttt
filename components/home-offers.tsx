"use client"

import Link from "next/link"
import { Check, ArrowRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

const offers = [
  {
    name: "Standard",
    description: "Idéal pour les particuliers",
    price: "350",
    currency: "USD",
    period: "/mois",
    features: [
      "Kit Starlink inclus",
      "Jusqu'à 100 Mbps",
      "Installation standard",
      "Support par email",
      "1 point d'accès WiFi",
    ],
    popular: false,
    cta: "Choisir Standard",
  },
  {
    name: "Business",
    description: "Pour les professionnels exigeants",
    price: "550",
    currency: "USD",
    period: "/mois",
    features: [
      "Kit Starlink Business",
      "Jusqu'à 250 Mbps",
      "Installation prioritaire",
      "Support téléphonique 24/7",
      "Configuration réseau avancée",
      "Routeur MikroTik inclus",
    ],
    popular: true,
    cta: "Choisir Business",
  },
  {
    name: "Hybride",
    description: "Solution multi-connexions",
    price: "Sur devis",
    currency: "",
    period: "",
    features: [
      "Starlink + Fibre/4G",
      "Failover automatique",
      "Load balancing",
      "Support dédié",
      "SLA garanti",
      "Infrastructure sur mesure",
    ],
    popular: false,
    cta: "Demander un devis",
  },
]

export function HomeOffers() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Nos offres
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
            Des formules adaptées à vos besoins
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choisissez l{"'"}offre qui correspond à votre utilisation. Toutes nos formules incluent l{"'"}installation et le support technique.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-10">
          {offers.map((offer, index) => (
            <div 
              key={index}
              className={`relative rounded-2xl p-6 transition-all duration-300 ${
                offer.popular 
                  ? "bg-primary text-primary-foreground scale-105 shadow-2xl" 
                  : "glass-card glass-card-hover"
              }`}
            >
              {offer.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-1 px-4 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-medium">
                  <Star className="w-4 h-4 fill-current" />
                  <span>Populaire</span>
                </div>
              )}

              <div className="mb-6">
                <h3 className={`text-xl font-bold mb-1 ${offer.popular ? "text-primary-foreground" : "text-foreground"}`} style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                  {offer.name}
                </h3>
                <p className={`text-sm ${offer.popular ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                  {offer.description}
                </p>
              </div>

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
              </div>

              <ul className="space-y-3 mb-8">
                {offer.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                      offer.popular ? "bg-primary-foreground/20" : "bg-primary/10"
                    }`}>
                      <Check className={`w-3 h-3 ${offer.popular ? "text-primary-foreground" : "text-primary"}`} />
                    </div>
                    <span className={`text-sm ${offer.popular ? "text-primary-foreground/90" : "text-foreground/80"}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

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

        {/* CTA */}
        <div className="text-center">
          <Button asChild size="lg" variant="outline" className="border-primary/30 hover:bg-primary/10">
            <Link href="/offres" className="flex items-center gap-2">
              <span>Voir le détail des offres</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
