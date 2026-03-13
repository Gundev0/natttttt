"use client"

import { Check, X } from "lucide-react"

const comparisonFeatures = [
  {
    category: "Connectivité",
    features: [
      { name: "Kit Starlink", standard: "Location", business: "Location", hybride: "Inclus" },
      { name: "Débit maximum", standard: "100 Mbps", business: "250 Mbps", hybride: "500+ Mbps" },
      { name: "Latence moyenne", standard: "< 50ms", business: "< 30ms", hybride: "< 20ms" },
      { name: "IP fixe", standard: false, business: "Option", hybride: true },
    ]
  },
  {
    category: "Équipements",
    features: [
      { name: "Installation incluse", standard: true, business: true, hybride: true },
      { name: "Routeur MikroTik", standard: false, business: true, hybride: true },
      { name: "Points d'accès WiFi", standard: "1", business: "2", hybride: "Illimité" },
      { name: "Configuration VLAN", standard: false, business: true, hybride: true },
    ]
  },
  {
    category: "Support",
    features: [
      { name: "Support email", standard: true, business: true, hybride: true },
      { name: "Support téléphonique", standard: false, business: "24/7", hybride: "24/7 VIP" },
      { name: "Temps de réponse", standard: "48h", business: "4h", hybride: "1h" },
      { name: "Ingénieur dédié", standard: false, business: false, hybride: true },
    ]
  },
  {
    category: "Garanties",
    features: [
      { name: "SLA disponibilité", standard: "95%", business: "99%", hybride: "99.9%" },
      { name: "Monitoring proactif", standard: false, business: true, hybride: true },
      { name: "Rapports mensuels", standard: false, business: true, hybride: true },
      { name: "Failover automatique", standard: false, business: false, hybride: true },
    ]
  },
]

export function OffersComparison() {
  const renderValue = (value: boolean | string) => {
    if (typeof value === "boolean") {
      return value ? (
        <Check className="w-5 h-5 text-green-600" />
      ) : (
        <X className="w-5 h-5 text-muted-foreground/30" />
      )
    }
    return <span className="text-sm font-medium text-foreground">{value}</span>
  }

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Comparatif
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
            Comparez nos offres en détail
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Toutes les caractéristiques de nos formules pour vous aider à faire le bon choix.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead>
              <tr>
                <th className="text-left py-4 px-4"></th>
                <th className="text-center py-4 px-4">
                  <span className="text-lg font-semibold text-foreground" style={{ fontFamily: 'var(--font-space-grotesk)' }}>Standard</span>
                  <p className="text-sm text-muted-foreground font-normal">350 USD/mois</p>
                </th>
                <th className="text-center py-4 px-4 bg-primary/5 rounded-t-xl">
                  <span className="text-lg font-semibold text-primary" style={{ fontFamily: 'var(--font-space-grotesk)' }}>Business</span>
                  <p className="text-sm text-muted-foreground font-normal">550 USD/mois</p>
                </th>
                <th className="text-center py-4 px-4">
                  <span className="text-lg font-semibold text-foreground" style={{ fontFamily: 'var(--font-space-grotesk)' }}>Hybride</span>
                  <p className="text-sm text-muted-foreground font-normal">Sur devis</p>
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonFeatures.map((category, categoryIndex) => (
                <>
                  <tr key={`category-${categoryIndex}`}>
                    <td colSpan={4} className="pt-8 pb-3 px-4">
                      <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                        {category.category}
                      </span>
                    </td>
                  </tr>
                  {category.features.map((feature, featureIndex) => (
                    <tr key={`feature-${categoryIndex}-${featureIndex}`} className="border-b border-border/50">
                      <td className="py-4 px-4 text-sm text-foreground/80">
                        {feature.name}
                      </td>
                      <td className="py-4 px-4 text-center">
                        {renderValue(feature.standard)}
                      </td>
                      <td className="py-4 px-4 text-center bg-primary/5">
                        {renderValue(feature.business)}
                      </td>
                      <td className="py-4 px-4 text-center">
                        {renderValue(feature.hybride)}
                      </td>
                    </tr>
                  ))}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
