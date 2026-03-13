"use client"

import Link from "next/link"
import { ShoppingCart, Star, Tag, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const products = [
  {
    name: "MikroTik hAP ac3",
    category: "Routeur",
    price: 180,
    originalPrice: 220,
    rating: 4.8,
    reviews: 45,
    badge: "Populaire",
    features: ["5 ports Gigabit", "WiFi 5 Dual-band", "USB 3.0", "RouterOS"]
  },
  {
    name: "MikroTik RB5009UG+S+IN",
    category: "Routeur",
    price: 280,
    originalPrice: null,
    rating: 4.9,
    reviews: 32,
    badge: "Pro",
    features: ["7 ports Gigabit", "2.5G port", "SFP+ 10G", "Quad-core"]
  },
  {
    name: "Ubiquiti UniFi U6 Pro",
    category: "Point d'accès",
    price: 200,
    originalPrice: 250,
    rating: 4.7,
    reviews: 67,
    badge: "Promo",
    features: ["WiFi 6", "4x4 MIMO", "300+ clients", "PoE"]
  },
  {
    name: "MikroTik CSS326-24G-2S+RM",
    category: "Switch",
    price: 150,
    originalPrice: null,
    rating: 4.6,
    reviews: 28,
    badge: null,
    features: ["24 ports Gigabit", "2x SFP+ 10G", "SwOS", "Rack 1U"]
  },
  {
    name: "Ubiquiti EdgeSwitch 24",
    category: "Switch",
    price: 320,
    originalPrice: 380,
    rating: 4.8,
    reviews: 41,
    badge: "Promo",
    features: ["24 ports Gigabit", "2x SFP", "L2/L3", "VLAN"]
  },
  {
    name: "MikroTik LHG 60G",
    category: "Point d'accès",
    price: 350,
    originalPrice: null,
    rating: 4.5,
    reviews: 19,
    badge: "60GHz",
    features: ["60GHz wireless", "Jusqu'à 1Gbps", "Portée 1.5km", "Outdoor"]
  },
  {
    name: "Câble Cat6 (305m)",
    category: "Câblage",
    price: 120,
    originalPrice: 150,
    rating: 4.4,
    reviews: 85,
    badge: "Promo",
    features: ["UTP Cat6", "305 mètres", "23 AWG", "PVC"]
  },
  {
    name: "Kit connecteurs RJ45 (100pc)",
    category: "Accessoires",
    price: 25,
    originalPrice: null,
    rating: 4.3,
    reviews: 120,
    badge: null,
    features: ["RJ45 Cat6", "100 pièces", "Blindé", "Facile à sertir"]
  },
]

export function EquipmentProducts() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Nos produits
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-2 text-foreground" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
              Équipements en vedette
            </h2>
            <p className="text-muted-foreground">
              Une sélection des meilleurs équipements pour votre infrastructure réseau.
            </p>
          </div>
          <Button variant="outline" className="border-primary/30 hover:bg-primary/10">
            Voir tout le catalogue
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div 
              key={index}
              className="glass-card glass-card-hover rounded-2xl overflow-hidden group"
            >
              {/* Image placeholder */}
              <div className="relative h-48 bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                <div className="w-24 h-24 rounded-xl bg-primary/10 flex items-center justify-center">
                  <span className="text-3xl font-bold text-primary/50">
                    {product.name[0]}
                  </span>
                </div>
                {product.badge && (
                  <span className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-semibold ${
                    product.badge === "Promo" 
                      ? "bg-red-500 text-white" 
                      : product.badge === "Populaire"
                        ? "bg-secondary text-secondary-foreground"
                        : "bg-primary text-primary-foreground"
                  }`}>
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                <p className="text-xs text-primary font-medium mb-1">{product.category}</p>
                <h3 className="font-semibold text-foreground mb-2 line-clamp-1" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                  {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-secondary fill-secondary" />
                    <span className="text-sm font-medium text-foreground">{product.rating}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">({product.reviews} avis)</span>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {product.features.slice(0, 2).map((feature, i) => (
                    <span key={i} className="text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground">
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Price */}
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-bold text-foreground" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                      {product.price} USD
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        {product.originalPrice} USD
                      </span>
                    )}
                  </div>
                  <Button size="icon" variant="outline" className="rounded-full border-primary/30 hover:bg-primary hover:text-primary-foreground">
                    <ShoppingCart className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Info Banner */}
        <div className="mt-12 glass-card rounded-2xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Tag className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                  Besoin d{"'"}un devis personnalisé ?
                </h3>
                <p className="text-sm text-muted-foreground">
                  Contactez-nous pour des commandes en volume ou des configurations sur mesure.
                </p>
              </div>
            </div>
            <Button asChild className="cta-glow bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/contact">
                Demander un devis
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
