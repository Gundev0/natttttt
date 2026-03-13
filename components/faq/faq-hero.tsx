"use client"

import { HelpCircle, Search } from "lucide-react"

export function FAQHero() {
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
            <HelpCircle className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Questions fréquentes</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6 text-foreground" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
            Comment pouvons-nous{" "}
            <span className="gradient-text">vous aider ?</span>
          </h1>

          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Retrouvez les réponses aux questions les plus fréquentes sur nos services, 
            l{"'"}installation Starlink et les équipements réseaux.
          </p>

          {/* Search */}
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Rechercher une question..."
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-muted border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground placeholder:text-muted-foreground"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
