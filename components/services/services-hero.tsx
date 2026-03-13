"use client"

import Image from "next/image"
import Link from "next/link"
import { Satellite, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ServicesHero() {
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
              <Satellite className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Nos services</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6 text-foreground" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
              Des solutions de connectivité{" "}
              <span className="gradient-text">sur mesure</span>
            </h1>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              De l{"'"}installation Starlink à la configuration réseau complète, NATHAN GROUPE 
              vous accompagne avec une expertise technique de pointe. Nos ingénieurs certifiés 
              conçoivent et déploient des solutions adaptées à vos besoins spécifiques.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="cta-glow bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="/contact" className="flex items-center gap-2">
                  <span>Demander un devis</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-primary/30 hover:bg-primary/10">
                <Link href="/offres">
                  Voir nos offres
                </Link>
              </Button>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/team-tech.jpg"
                alt="Installation d'équipements réseaux par NATHAN GROUPE"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#3E1F0F]/30 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
