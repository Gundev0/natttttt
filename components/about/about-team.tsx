"use client"

import { Linkedin, Mail } from "lucide-react"

const team = [
  {
    name: "Nathan Kabongo",
    role: "Fondateur & CEO",
    description: "Expert en télécommunications avec 15 ans d'expérience dans le secteur."
  },
  {
    name: "Marie Lukusa",
    role: "Directrice Technique",
    description: "Ingénieur réseau certifiée MikroTik et Ubiquiti."
  },
  {
    name: "Patrick Mwamba",
    role: "Responsable Commercial",
    description: "Spécialiste des solutions B2B et grands comptes."
  },
  {
    name: "Sarah Kayembe",
    role: "Support Client",
    description: "Garante de la satisfaction client et du support 24/7."
  },
]

export function AboutTeam() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Notre équipe
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
            Des experts passionnés
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Une équipe pluridisciplinaire engagée pour votre réussite numérique.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div 
              key={index}
              className="glass-card glass-card-hover rounded-2xl p-6 text-center group"
            >
              {/* Avatar placeholder */}
              <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-4">
                <span className="text-3xl font-bold text-primary" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                  {member.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>

              <h3 className="text-lg font-semibold mb-1 text-foreground" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                {member.name}
              </h3>
              <p className="text-primary text-sm font-medium mb-3">
                {member.role}
              </p>
              <p className="text-muted-foreground text-sm mb-4">
                {member.description}
              </p>

              {/* Social Links */}
              <div className="flex justify-center gap-3">
                <a 
                  href="#" 
                  className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label={`LinkedIn de ${member.name}`}
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a 
                  href="#" 
                  className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label={`Email de ${member.name}`}
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
