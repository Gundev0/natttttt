"use client"

import { Wifi, Headphones, BookOpen, CheckCircle } from "lucide-react"

const features = [
  {
    icon: Wifi,
    title: "Connexion 100% fiable",
    description: "Internet satellite haute performance avec latence ultra-faible."
  },
  {
    icon: BookOpen,
    title: "Installation guidée",
    description: "Accompagnement complet étape par étape pour votre installation."
  },
  {
    icon: Headphones,
    title: "Support 24/7",
    description: "Équipe technique disponible à tout moment pour vous assister."
  },
  {
    icon: CheckCircle,
    title: "Simple à configurer",
    description: "Mise en service rapide avec notre expertise technique."
  },
]

export function FeaturesBanner() {
  return (
    <section className="py-8 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="flex flex-col items-center text-center p-4 rounded-xl bg-primary-foreground/10 backdrop-blur-sm"
            >
              <div className="w-12 h-12 rounded-full bg-primary-foreground/20 flex items-center justify-center mb-3">
                <feature.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-primary-foreground text-sm md:text-base mb-1" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                {feature.title}
              </h3>
              <p className="text-primary-foreground/70 text-xs md:text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
