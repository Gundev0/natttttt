import { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FAQHero } from "@/components/faq/faq-hero"
import { FAQList } from "@/components/faq/faq-list"
import { FAQContact } from "@/components/faq/faq-contact"

export const metadata: Metadata = {
  title: "FAQ | NATHANGROUP - Questions Fréquentes sur Starlink en RDC",
  description: "Trouvez les réponses à vos questions sur l'installation Starlink, les équipements réseaux et nos services en République Démocratique du Congo.",
}

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <FAQHero />
      <FAQList />
      <FAQContact />
      <Footer />
    </main>
  )
}
