import { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { EquipmentHero } from "@/components/equipment/equipment-hero"
import { EquipmentCategories } from "@/components/equipment/equipment-categories"
import { EquipmentProducts } from "@/components/equipment/equipment-products"
import { CTASection } from "@/components/cta-section"

export const metadata: Metadata = {
  title: "Équipements Réseaux | NATHAN GROUPE - Routeurs, Switches, WiFi en RDC",
  description: "Achetez vos équipements réseaux professionnels: routeurs MikroTik, switches Cisco, points d'accès Ubiquiti, câbles et accessoires. Livraison en RDC.",
}

export default function EquipmentPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <EquipmentHero />
      <EquipmentCategories />
      <EquipmentProducts />
      <CTASection />
      <Footer />
    </main>
  )
}
