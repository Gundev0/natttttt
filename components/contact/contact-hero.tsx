"use client"

import { Mail } from "lucide-react"

export function ContactHero() {
  return (
    <section className="pt-8 pb-16 bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-72 h-72 bg-secondary rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Mail className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Contactez-nous</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6 text-foreground" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
            Parlons de votre{" "}
            <span className="gradient-text">projet</span>
          </h1>

          <p className="text-lg text-muted-foreground leading-relaxed">
            Que vous ayez besoin d{"'"}une installation Starlink, d{"'"}équipements réseaux ou 
            d{"'"}un accompagnement technique, notre équipe est à votre écoute pour vous 
            proposer la solution adaptée à vos besoins.
          </p>
        </div>
      </div>
    </section>
  )
}
