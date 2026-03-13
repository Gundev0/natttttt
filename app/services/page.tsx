import { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServicesHero } from "@/components/services/services-hero"
import { ServicesList } from "@/components/services/services-list"
import { ServicesProcess } from "@/components/services/services-process"
import { CTASection } from "@/components/cta-section"

export const metadata: Metadata = {
  title: "Nos Services | NATHAN GROUPE - Internet Satellite & Réseaux en RDC",
  description: "Découvrez nos services: installation Starlink, équipements réseaux MikroTik et Ubiquiti, configuration réseau, maintenance et support technique 24/7 en RDC.",
}

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <ServicesHero />
      <ServicesList />
      <ServicesProcess />
      <CTASection />
      <Footer />
    </main>
  )
}
