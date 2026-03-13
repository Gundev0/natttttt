"use client"

import Image from "next/image"
import { Target, Eye, Compass } from "lucide-react"

export function AboutMission() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/hero-satellite.jpg"
                alt="Connexion satellite NATHAN GROUPE"
                width={600}
                height={450}
                className="w-full h-auto object-cover"
              />
            </div>
            
            {/* Stats overlay */}
            <div className="absolute -right-6 top-1/2 -translate-y-1/2 glass-card rounded-xl p-6 shadow-xl hidden md:block">
              <div className="space-y-4">
                <div>
                  <p className="text-2xl font-bold text-primary" style={{ fontFamily: 'var(--font-space-grotesk)' }}>150k+</p>
                  <p className="text-sm text-muted-foreground">Utilisateurs connectés</p>
                </div>
                <div className="h-px bg-border" />
                <div>
                  <p className="text-2xl font-bold text-primary" style={{ fontFamily: 'var(--font-space-grotesk)' }}>11</p>
                  <p className="text-sm text-muted-foreground">Provinces couvertes</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <div>
              <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Notre raison d{"'"}être
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                Apprenez et développez vos compétences avec NATHAN GROUPE
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                NATHAN GROUPE est une entreprise spécialisée dans les solutions de connectivité 
                et les équipements réseaux. Nous accompagnons les entreprises et les particuliers 
                dans leur transformation numérique avec des solutions fiables et performantes.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                    Notre Mission
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Démocratiser l{"'"}accès à Internet haut débit en RDC en proposant des solutions 
                    satellite et réseau accessibles et performantes.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Eye className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                    Notre Vision
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Devenir le leader de la connectivité satellite en Afrique centrale, 
                    en offrant des services de qualité mondiale.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Compass className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                    Nos Valeurs
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Excellence technique, intégrité, proximité client et innovation 
                    guident chacune de nos actions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
