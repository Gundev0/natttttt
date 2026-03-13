"use client"

import Image from "next/image"
import { Award, Users, Clock, MapPin } from "lucide-react"

const reasons = [
  {
    icon: Award,
    title: "Expertise Certifiée",
    description: "Équipe d'ingénieurs formés et certifiés sur les technologies Starlink et réseaux d'entreprise.",
  },
  {
    icon: Users,
    title: "Équipe Locale",
    description: "Présence physique en RDC pour une intervention rapide et un support de proximité.",
  },
  {
    icon: Clock,
    title: "Installation Express",
    description: "Déploiement en moins de 48h pour les zones urbaines, accompagnement personnalisé pour les sites isolés.",
  },
  {
    icon: MapPin,
    title: "Couverture Nationale",
    description: "De Kinshasa à Goma, de Lubumbashi à Bunia, nous intervenons sur tout le territoire congolais.",
  },
]

const testimonials = [
  {
    quote: "Grâce à NATHAN GROUPE, notre entreprise à Goma dispose enfin d'une connexion fiable. Les visioconférences sont fluides et le cloud fonctionne parfaitement.",
    author: "Jean-Pierre M.",
    company: "Directeur, LogiCongo SARL",
  },
  {
    quote: "L'équipe a installé Starlink sur notre site minier en zone reculée. La latence est incroyablement basse pour du satellite !",
    author: "Marie K.",
    company: "Responsable IT, MineTech",
  },
  {
    quote: "Le support technique est réactif et l'équipe connaît vraiment son métier. Un vrai partenaire pour notre transformation digitale.",
    author: "Patrick N.",
    company: "CEO, FinanceKin",
  },
]

export function WhyUs() {
  return (
    <section id="pourquoi" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left - Content */}
          <div>
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Pourquoi NATHAN GROUPE
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-balance" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
              Votre partenaire de confiance pour la{" "}
              <span className="gradient-text">connectivité</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Nous ne vendons pas simplement du matériel. Nous construisons des infrastructures 
              réseau robustes qui propulsent votre entreprise vers l{"'"}avenir, même dans les 
              conditions les plus difficiles.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-6">
              {reasons.map((reason, index) => (
                <div key={index} className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <reason.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">{reason.title}</h3>
                    <p className="text-sm text-muted-foreground">{reason.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right - Image/Logo */}
          <div className="relative">
            <div className="glass-card rounded-2xl p-12 flex items-center justify-center">
              <Image
                src="/logo-nathan.png"
                alt="NATHAN GROUPE"
                width={400}
                height={400}
                className="w-full max-w-sm h-auto"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-secondary/10 rounded-full blur-2xl" />
          </div>
        </div>
        
        {/* Testimonials */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-center mb-12 text-foreground" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
            Ce que disent nos clients
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="glass-card glass-card-hover rounded-2xl p-8">
                <p className="text-muted-foreground mb-6 italic leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div>
                  <p className="font-bold text-foreground">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
