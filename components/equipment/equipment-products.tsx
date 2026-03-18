"use client"

import Link from "next/link"
import { Star, Tag, ArrowRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { useEffect, useState } from "react"

interface Equipment {
  id: string
  name: string
  description: string | null
  price: number | null
  image_url: string | null
  payment_link: string | null
  category: string | null
  is_featured: boolean
  is_active: boolean
  sort_order: number
}

// Fallback products for when database is empty
const fallbackProducts = [
  {
    id: "1",
    name: "MikroTik hAP ac3",
    category: "Routeur",
    price: 180,
    description: "5 ports Gigabit, WiFi 5 Dual-band, USB 3.0, RouterOS",
    image_url: null,
    payment_link: "https://wa.me/243979213370?text=Je souhaite commander MikroTik hAP ac3",
    is_featured: true,
    is_active: true,
    sort_order: 0
  },
  {
    id: "2",
    name: "MikroTik RB5009UG+S+IN",
    category: "Routeur",
    price: 280,
    description: "7 ports Gigabit, 2.5G port, SFP+ 10G, Quad-core",
    image_url: null,
    payment_link: "https://wa.me/243979213370?text=Je souhaite commander MikroTik RB5009UG",
    is_featured: false,
    is_active: true,
    sort_order: 1
  },
  {
    id: "3",
    name: "Ubiquiti UniFi U6 Pro",
    category: "Point d'accès",
    price: 200,
    description: "WiFi 6, 4x4 MIMO, 300+ clients, PoE",
    image_url: null,
    payment_link: "https://wa.me/243979213370?text=Je souhaite commander Ubiquiti UniFi U6 Pro",
    is_featured: true,
    is_active: true,
    sort_order: 2
  },
  {
    id: "4",
    name: "MikroTik CSS326-24G-2S+RM",
    category: "Switch",
    price: 150,
    description: "24 ports Gigabit, 2x SFP+ 10G, SwOS, Rack 1U",
    image_url: null,
    payment_link: "https://wa.me/243979213370?text=Je souhaite commander MikroTik CSS326",
    is_featured: false,
    is_active: true,
    sort_order: 3
  },
]

export function EquipmentProducts() {
  const [products, setProducts] = useState<Equipment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProducts() {
      try {
        const supabase = createClient()
        const { data, error } = await supabase
          .from('equipment')
          .select('*')
          .eq('is_active', true)
          .order('sort_order', { ascending: true })
        
        if (error) throw error
        setProducts(data && data.length > 0 ? data : fallbackProducts)
      } catch (error) {
        console.error('Error fetching products:', error)
        setProducts(fallbackProducts)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  if (loading) {
    return (
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </section>
    )
  }

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
          {products.map((product) => (
            <div 
              key={product.id}
              className="glass-card glass-card-hover rounded-2xl overflow-hidden group"
            >
              {/* Image placeholder */}
              <div className="relative h-48 bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                {product.image_url ? (
                  <img 
                    src={product.image_url} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-xl bg-primary/10 flex items-center justify-center">
                    <span className="text-3xl font-bold text-primary/50">
                      {product.name[0]}
                    </span>
                  </div>
                )}
                {product.is_featured && (
                  <span className="absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-semibold bg-secondary text-secondary-foreground">
                    Populaire
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                <p className="text-xs text-primary font-medium mb-1">{product.category}</p>
                <h3 className="font-semibold text-foreground mb-2 line-clamp-1" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                  {product.name}
                </h3>

                {/* Rating placeholder */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-secondary fill-secondary" />
                    <span className="text-sm font-medium text-foreground">4.8</span>
                  </div>
                  <span className="text-xs text-muted-foreground">(En stock)</span>
                </div>

                {/* Description */}
                {product.description && (
                  <p className="text-xs text-muted-foreground mb-4 line-clamp-2">
                    {product.description}
                  </p>
                )}

                {/* Price */}
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-bold text-foreground" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                      {product.price} USD
                    </span>
                  </div>
                  {product.payment_link ? (
                    <Button 
                      asChild
                      variant="default" 
                      size="sm" 
                      className="bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      <a href={product.payment_link} target="_blank" rel="noopener noreferrer">
                        Payer
                      </a>
                    </Button>
                  ) : (
                    <Button 
                      asChild
                      variant="default" 
                      size="sm" 
                      className="bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      <a href="https://wa.me/243979213370" target="_blank" rel="noopener noreferrer">
                        Payer
                      </a>
                    </Button>
                  )}
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
