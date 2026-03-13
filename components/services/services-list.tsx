"use client"

import Link from "next/link"
import { 
  Satellite, 
  Network, 
  Shield, 
  Wrench, 
  Server, 
  Wifi,
  ArrowRight,
  Check
} from "lucide-react"
import { Button } from "@/components/ui/button"

const services = [
  {
    icon: Satellite,
    title: "Installation Starlink",
    description: "Installation complète de votre kit Starlink avec optimisation du positionnement pour une réception optimale du signal satellite.",
    features: [
      "Étude de faisabilité sur site",
      "Installation du kit Starlink",
      "Optimisation de l'angle et position",
      "Configuration réseau initiale",
      "Formation utilisateur",
    ],
    price: "À partir de 200 USD",
  },
  {
    icon: Network,
    title: "Équipements Réseaux",
    description: "Fourniture et installation d'équipements réseaux professionnels: routeurs MikroTik, switches, points d'accès Ubiquiti.",
    features: [
      "Routeurs MikroTik certifiés",
      "Switches managés Cisco/TP-Link",
      "Points d'accès Ubiquiti",
      "Câblage structuré Cat6/Cat7",
      "Armoires de brassage",
    ],
    price: "Sur devis",
  },
  {
    icon: Server,
    title: "Configuration Réseau",
    description: "Configuration avancée de votre infrastructure réseau: VLAN, QoS, VPN, pare-feu et routage optimisé.",
    features: [
      "Segmentation VLAN",
      "Quality of Service (QoS)",
      "VPN site-to-site et client",
      "Pare-feu et sécurité",
      "Load balancing multi-WAN",
    ],
    price: "À partir de 150 USD",
  },
  {
    icon: Shield,
    title: "Sécurité Réseau",
    description: "Protection complète de votre infrastructure contre les menaces avec surveillance continue et mises à jour de sécurité.",
    features: [
      "Audit de sécurité",
      "Pare-feu nouvelle génération",
      "Détection d'intrusions",
      "Certificats SSL/TLS",
      "Politique de sécurité",
    ],
    price: "À partir de 100 USD/mois",
  },
  {
    icon: Wifi,
    title: "Solutions WiFi Pro",
    description: "Déploiement de réseaux WiFi haute performance pour entreprises, hôtels, et espaces publics avec gestion centralisée.",
    features: [
      "Étude de couverture",
      "Points d'accès professionnels",
      "Portail captif personnalisé",
      "Gestion des utilisateurs",
      "Analyse de performance",
    ],
    price: "Sur devis",
  },
  {
    icon: Wrench,
    title: "Maintenance & Support",
    description: "Maintenance préventive et curative de votre infrastructure avec support technique réactif disponible 24/7.",
    features: [
      "Monitoring proactif",
      "Maintenance préventive",
      "Intervention d'urgence",
      "Support téléphonique 24/7",
      "Mises à jour firmware",
    ],
    price: "À partir de 75 USD/mois",
  },
]

export function ServicesList() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Ce que nous offrons
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
            Une gamme complète de services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Des solutions adaptées à tous les besoins, de la simple installation à l{"'"}infrastructure réseau complexe.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="glass-card glass-card-hover rounded-2xl p-6 flex flex-col"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <service.icon className="w-7 h-7 text-primary" />
              </div>

              <h3 className="text-xl font-semibold mb-3 text-foreground" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                {service.title}
              </h3>

              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                {service.description}
              </p>

              <ul className="space-y-2 mb-6 flex-1">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-2 text-sm text-foreground/80">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-4 border-t border-border">
                <div className="flex items-center justify-between">
                  <span className="text-primary font-semibold">{service.price}</span>
                  <Button asChild variant="ghost" size="sm" className="text-primary hover:bg-primary/10">
                    <Link href="/contact" className="flex items-center gap-1">
                      <span>Demander</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
