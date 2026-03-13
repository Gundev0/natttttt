"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "Quelle est la différence de latence entre Starlink et la fibre à Kinshasa ?",
    answer: "La fibre optique offre typiquement une latence de 5-15ms tandis que Starlink propose une latence de 20-40ms. Cette différence est imperceptible pour la plupart des usages professionnels (visioconférence, cloud, navigation). L'avantage majeur de Starlink réside dans sa disponibilité immédiate dans les zones non couvertes par la fibre.",
  },
  {
    question: "Combien de temps prend l'installation de Starlink ?",
    answer: "Pour les zones urbaines (Kinshasa, Goma, Lubumbashi), l'installation complète est réalisée sous 48h après réception du matériel. Pour les sites isolés ou industriels, nous planifions une intervention sur mesure incluant l'audit du site, l'installation et la configuration réseau complète.",
  },
  {
    question: "Starlink fonctionne-t-il pendant les coupures électriques ?",
    answer: "Starlink nécessite une alimentation électrique pour fonctionner. Nous recommandons et installons des solutions UPS (onduleurs) ou des systèmes solaires pour garantir la continuité de service. Notre Pack Hybride inclut cette protection pour les entreprises critiques.",
  },
  {
    question: "Quelle est la vitesse réelle de Starlink en RDC ?",
    answer: "En conditions normales, Starlink offre des débits de 50 à 250 Mbps en téléchargement et 10 à 40 Mbps en upload. Les performances peuvent varier selon la densité d'utilisateurs dans votre zone. Notre configuration optimisée permet de maximiser ces performances.",
  },
  {
    question: "Proposez-vous un support technique après l'installation ?",
    answer: "Oui ! Tous nos packs incluent un support technique. Le Pack Business et Hybride bénéficient d'un support prioritaire 24/7 avec intervention sur site en moins de 4h pour les zones urbaines. Nous proposons également des contrats de maintenance préventive pour anticiper les problèmes.",
  },
  {
    question: "Puis-je utiliser Starlink avec mon réseau d'entreprise existant ?",
    answer: "Absolument. Nos ingénieurs intègrent Starlink à votre infrastructure existante : configuration de VLANs, paramétrage de firewalls, mise en place de VPN site-à-site, et Load Balancing avec vos connexions actuelles. Nous garantissons une intégration transparente.",
  },
  {
    question: "Quels équipements réseaux vendez-vous ?",
    answer: "Nous distribuons une gamme complète d'équipements professionnels : routeurs Ubiquiti, MikroTik et Cisco, switches managés, access points Wi-Fi 6, firewalls, câblage structuré et accessoires Starlink. Tous nos équipements sont garantis et configurés par nos soins.",
  },
  {
    question: "Comment fonctionne le Pack Hybride avec failover automatique ?",
    answer: "Le Pack Hybride combine Starlink avec votre connexion fibre ou 4G existante. Un routeur intelligent détecte automatiquement les pannes et bascule instantanément sur la connexion de secours. Vous bénéficiez ainsi d'une disponibilité proche de 100% pour vos applications critiques.",
  },
]

export function FAQ() {
  return (
    <section id="faq" className="py-20 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/30 to-transparent" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-balance" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
            Questions{" "}
            <span className="gradient-text">fréquentes</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tout ce que vous devez savoir sur Starlink et nos services en RDC.
          </p>
        </div>
        
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="glass-card rounded-xl px-6 border-none"
            >
              <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-6">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
