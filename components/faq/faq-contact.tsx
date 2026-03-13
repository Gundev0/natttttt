"use client"

import Link from "next/link"
import { MessageCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function FAQContact() {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card rounded-2xl p-8 md:p-12 text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-6">
            <MessageCircle className="w-8 h-8 text-primary" />
          </div>

          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
            Vous n{"'"}avez pas trouvé votre réponse ?
          </h2>

          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            Notre équipe est là pour vous aider. Contactez-nous et nous vous répondrons 
            dans les plus brefs délais.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="cta-glow bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/contact" className="flex items-center gap-2">
                <span>Nous contacter</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-primary/30 hover:bg-primary/10">
              <Link href="https://wa.me/243979213370" target="_blank">
                Discuter sur WhatsApp
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
