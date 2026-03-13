"use client"

import { Award, Users, Zap, Shield, Clock, Heart } from "lucide-react"

const values = [
  {
    icon: Award,
    title: "Excellence",
    description: "Nous visons l'excellence dans chaque installation et chaque intervention technique."
  },
  {
    icon: Users,
    title: "Proximité",
    description: "Une équipe locale disponible et à l'écoute de vos besoins spécifiques."
  },
  {
    icon: Zap,
    title: "Innovation",
    description: "Nous adoptons les dernières technologies pour vous offrir le meilleur."
  },
  {
    icon: Shield,
    title: "Fiabilité",
    description: "Des solutions robustes et durables pour une connectivité sans faille."
  },
  {
    icon: Clock,
    title: "Réactivité",
    description: "Support technique disponible 24/7 avec des temps de réponse garantis."
  },
  {
    icon: Heart,
    title: "Engagement",
    description: "Votre satisfaction est notre priorité, nous allons au-delà des attentes."
  },
]

export function AboutValues() {
  return (
    <section className="py-20 bg-background" id="pourquoi">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Pourquoi nous choisir
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
            Ce qui nous distingue
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Des valeurs fortes qui guident notre engagement envers nos clients chaque jour.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div 
              key={index}
              className="glass-card glass-card-hover rounded-2xl p-6 text-center group"
            >
              <div className="w-16 h-16 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                <value.icon className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                {value.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
