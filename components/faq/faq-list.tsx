"use client"

import { useState } from "react"
import { ChevronDown, Satellite, Network, CreditCard, Headphones } from "lucide-react"

const faqCategories = [
  {
    name: "Starlink",
    icon: Satellite,
    questions: [
      {
        question: "Qu'est-ce que Starlink et comment ça marche ?",
        answer: "Starlink est un service Internet par satellite développé par SpaceX. Il utilise une constellation de milliers de satellites en orbite basse pour fournir une connexion Internet haut débit avec une faible latence, même dans les zones les plus reculées. Le kit comprend une antenne parabolique et un routeur WiFi."
      },
      {
        question: "Quelle est la vitesse de connexion avec Starlink ?",
        answer: "Starlink offre des vitesses de téléchargement allant de 50 à 250 Mbps selon l'offre choisie, avec une latence moyenne de 20-40ms. Ces performances peuvent varier selon la localisation et les conditions météorologiques."
      },
      {
        question: "Starlink fonctionne-t-il pendant les orages ?",
        answer: "Starlink est conçu pour résister aux intempéries. Les fortes pluies ou orages peuvent temporairement réduire la qualité du signal, mais la connexion reste généralement stable. L'antenne dispose également d'un système de chauffage automatique."
      },
      {
        question: "Combien de temps prend l'installation ?",
        answer: "L'installation standard prend entre 2 et 4 heures. Cela inclut le positionnement optimal de l'antenne, le câblage, la configuration du routeur et les tests de connectivité. Nos techniciens vous forment également à l'utilisation du système."
      },
    ]
  },
  {
    name: "Équipements",
    icon: Network,
    questions: [
      {
        question: "Quelles marques d'équipements proposez-vous ?",
        answer: "Nous proposons des équipements des meilleures marques du marché : MikroTik pour les routeurs et switches, Ubiquiti pour les solutions WiFi, ainsi que Cisco, TP-Link et d'autres fabricants reconnus pour leur fiabilité."
      },
      {
        question: "Proposez-vous une garantie sur les équipements ?",
        answer: "Oui, tous nos équipements sont garantis minimum 1 an. Cette garantie couvre les défauts de fabrication et les pannes matérielles. Nous proposons également des extensions de garantie et des contrats de maintenance."
      },
      {
        question: "Livrez-vous en dehors de Kinshasa ?",
        answer: "Oui, nous livrons dans toutes les provinces de la RDC. Les délais et frais de livraison varient selon la destination. Contactez-nous pour obtenir un devis de livraison personnalisé."
      },
    ]
  },
  {
    name: "Tarification",
    icon: CreditCard,
    questions: [
      {
        question: "Quels sont les modes de paiement acceptés ?",
        answer: "Nous acceptons les paiements en espèces (USD et CDF), les virements bancaires, Mobile Money (M-Pesa, Airtel Money, Orange Money), et les paiements par carte pour les entreprises. Des facilités de paiement peuvent être arrangées pour les grandes installations."
      },
      {
        question: "Y a-t-il des frais cachés ?",
        answer: "Non, tous nos devis sont transparents et détaillés. Le prix affiché inclut l'installation, la configuration et la formation. Les seuls frais récurrents sont l'abonnement mensuel et, le cas échéant, les frais de maintenance préventive si vous optez pour un contrat de support."
      },
      {
        question: "Puis-je changer d'offre après souscription ?",
        answer: "Oui, vous pouvez upgrader ou downgrader votre offre à tout moment. Le changement prend effet au prochain cycle de facturation. Des frais d'installation supplémentaires peuvent s'appliquer si un changement d'équipement est nécessaire."
      },
    ]
  },
  {
    name: "Support",
    icon: Headphones,
    questions: [
      {
        question: "Comment contacter le support technique ?",
        answer: "Notre support est disponible par téléphone au +243 123 456 789, par email à support@nathangroup.cd, ou via WhatsApp. Les clients Business et Hybride bénéficient d'un support prioritaire 24/7 avec des temps de réponse garantis."
      },
      {
        question: "Quel est le délai d'intervention en cas de panne ?",
        answer: "Pour les clients Business et Hybride, nous garantissons une intervention dans les 4 heures en zone urbaine et 24 heures en zone rurale. Pour l'offre Standard, le délai moyen est de 48 heures ouvrées."
      },
      {
        question: "Proposez-vous des formations ?",
        answer: "Oui, nous proposons des formations sur la gestion de votre infrastructure réseau. Cela inclut l'administration des routeurs MikroTik, la configuration WiFi, et les bonnes pratiques de sécurité. Contactez-nous pour les programmes disponibles."
      },
    ]
  },
]

export function FAQList() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({})

  const toggleItem = (categoryIndex: number, questionIndex: number) => {
    const key = `${categoryIndex}-${questionIndex}`
    setOpenItems(prev => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          {faqCategories.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <category.icon className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                  {category.name}
                </h2>
              </div>

              <div className="space-y-4">
                {category.questions.map((item, questionIndex) => {
                  const key = `${categoryIndex}-${questionIndex}`
                  const isOpen = openItems[key]

                  return (
                    <div 
                      key={questionIndex}
                      className="glass-card rounded-xl overflow-hidden"
                    >
                      <button
                        onClick={() => toggleItem(categoryIndex, questionIndex)}
                        className="w-full flex items-center justify-between p-5 text-left"
                      >
                        <span className="font-medium text-foreground pr-4">
                          {item.question}
                        </span>
                        <ChevronDown 
                          className={`w-5 h-5 text-primary flex-shrink-0 transition-transform ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      
                      {isOpen && (
                        <div className="px-5 pb-5 pt-0">
                          <p className="text-muted-foreground leading-relaxed">
                            {item.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
