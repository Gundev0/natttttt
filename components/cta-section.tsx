"use client"

import Link from "next/link"
import { ArrowRight, Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CTASection() {
  return (
    <section className="py-20 bg-primary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-foreground rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-primary-foreground rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-primary-foreground" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
            Prêt à transformer votre connectivité ?
          </h2>
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-10 leading-relaxed">
            Contactez-nous dès aujourd{"'"}hui pour une étude personnalisée de vos besoins. 
            Notre équipe d{"'"}experts vous accompagne de A à Z.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              asChild 
              size="lg" 
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 text-lg px-8 h-14"
            >
              <Link href="/contact" className="flex items-center gap-2">
                <span>Demander un devis gratuit</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button 
              asChild 
              size="lg" 
              variant="outline"
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 text-lg px-8 h-14"
            >
              <Link href="tel:+243123456789" className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                <span>Appeler maintenant</span>
              </Link>
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-primary-foreground/80">
            <a href="tel:+243123456789" className="flex items-center gap-2 hover:text-primary-foreground transition-colors">
              <Phone className="w-5 h-5" />
              <span>+243 123 456 789</span>
            </a>
            <span className="hidden sm:block">|</span>
            <a href="mailto:contact@nathangroup.cd" className="flex items-center gap-2 hover:text-primary-foreground transition-colors">
              <Mail className="w-5 h-5" />
              <span>contact@nathangroup.cd</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
