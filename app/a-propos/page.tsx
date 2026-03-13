import { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AboutHero } from "@/components/about/about-hero"
import { AboutMission } from "@/components/about/about-mission"
import { AboutTeam } from "@/components/about/about-team"
import { AboutValues } from "@/components/about/about-values"
import { Testimonials } from "@/components/testimonials"
import { CTASection } from "@/components/cta-section"

export const metadata: Metadata = {
  title: "À Propos | NATHAN GROUPE - Votre Partenaire Connectivité en RDC",
  description: "Découvrez NATHAN GROUPE, votre partenaire de confiance pour l'Internet satellite Starlink et les solutions réseaux en République Démocratique du Congo depuis 2020.",
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <AboutHero />
      <AboutMission />
      <AboutValues />
      <AboutTeam />
      <Testimonials />
      <CTASection />
      <Footer />
    </main>
  )
}
