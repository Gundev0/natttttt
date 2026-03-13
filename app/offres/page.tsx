import { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { OffersHero } from "@/components/offres/offers-hero"
import { OffersList } from "@/components/offres/offers-list"
import { OffersComparison } from "@/components/offres/offers-comparison"
import { CTASection } from "@/components/cta-section"

export const metadata: Metadata = {
  title: "Nos Offres | NATHAN GROUPE - Forfaits Internet Starlink en RDC",
  description: "Découvrez nos offres Internet Starlink: Standard, Business et Hybride. Des solutions adaptées aux particuliers et entreprises en République Démocratique du Congo.",
}

export default function OffresPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <OffersHero />
      <OffersList />
      <OffersComparison />
      <CTASection />
      <Footer />
    </main>
  )
}
