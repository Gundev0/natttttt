"use client"

import { MessageSquare, ClipboardCheck, Wrench, Headphones } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Consultation",
    description: "Nous analysons vos besoins et votre environnement pour proposer la solution la plus adaptée."
  },
  {
    number: "02",
    icon: ClipboardCheck,
    title: "Proposition",
    description: "Vous recevez un devis détaillé avec les spécifications techniques et le planning d'intervention."
  },
  {
    number: "03",
    icon: Wrench,
    title: "Installation",
    description: "Nos techniciens certifiés procèdent à l'installation et à la configuration de votre solution."
  },
  {
    number: "04",
    icon: Headphones,
    title: "Support",
    description: "Bénéficiez d'un accompagnement continu avec notre support technique disponible 24/7."
  },
]

export function ServicesProcess() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Notre processus
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
            Comment ça marche ?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Un processus simple et transparent pour vous accompagner de A à Z.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary to-primary/30" />
              )}

              <div className="relative z-10 text-center">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center relative">
                  <step.icon className="w-10 h-10 text-primary" />
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                    {step.number}
                  </span>
                </div>

                <h3 className="text-xl font-semibold mb-2 text-foreground" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                  {step.title}
                </h3>

                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
