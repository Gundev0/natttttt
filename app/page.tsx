import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { FeaturesBanner } from "@/components/features-banner"
import { HomeServices } from "@/components/home-services"
import { HomeOffers } from "@/components/home-offers"
import { Testimonials } from "@/components/testimonials"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <FeaturesBanner />
      <HomeServices />
      <HomeOffers />
      <Testimonials />
      <CTASection />
      <Footer />
    </main>
  )
}
