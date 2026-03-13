"use client"

import Image from "next/image"
import { Building2 } from "lucide-react"

export function AboutHero() {
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
              <Building2 className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">À propos de nous</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6 text-foreground" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
              Connecter la RDC au{" "}
              <span className="gradient-text">monde entier</span>
            </h1>

            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Depuis 2020, NATHAN GROUPE s{"'"}engage à révolutionner la connectivité en République 
              Démocratique du Congo. Notre mission : rendre l{"'"}Internet haut débit accessible 
              à tous, partout, grâce à la technologie satellite Starlink et notre expertise réseau.
            </p>

            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary" style={{ fontFamily: 'var(--font-space-grotesk)' }}>500+</p>
                <p className="text-sm text-muted-foreground">Installations</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary" style={{ fontFamily: 'var(--font-space-grotesk)' }}>15+</p>
                <p className="text-sm text-muted-foreground">Techniciens</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary" style={{ fontFamily: 'var(--font-space-grotesk)' }}>24/7</p>
                <p className="text-sm text-muted-foreground">Support</p>
              </div>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/about-team.jpg"
                alt="L'équipe NATHAN GROUPE"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#3E1F0F]/30 to-transparent" />
            </div>
            
            {/* Floating badge */}
            <div className="absolute -bottom-6 -left-6 glass-card rounded-xl p-4 shadow-xl">
              <p className="text-sm text-muted-foreground">Partenaire officiel</p>
              <p className="text-lg font-bold text-foreground" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                Starlink
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
