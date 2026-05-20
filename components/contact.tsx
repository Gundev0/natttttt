"use client"

import { useState } from "react"
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const contactInfo = [
  {
    icon: Phone,
    label: "WhatsApp",
    value: "+243 979 213 370",
    href: "https://wa.me/243979213370",
  },
  {
    icon: Phone,
    label: "Téléphone",
    value: "+243 890 868 095",
    href: "https://wa.me/243890868095",
  },
  {
    icon: Mail,
    label: "Email",
    value: "nathangroup02@gmail.com",
    href: "mailto:nathangroup02@gmail.com",
  },
  {
    icon: MapPin,
    label: "Adresse",
    value: "Kinshasa, RD Congo",
    href: "#",
  },
]

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [serviceType, setServiceType] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  return (
    <section id="contact" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Contact
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-balance" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
            Prêt à vous{" "}
            <span className="gradient-text">connecter</span> ?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Notre équipe est là pour répondre à toutes vos questions et vous accompagner dans votre projet de connectivité.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div>
            <div className="glass-card rounded-2xl p-8 mb-8">
              <h3 className="text-xl font-bold mb-6 text-foreground" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                Nos coordonnées
              </h3>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <a
                    key={index}
                    href={info.href}
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <info.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{info.label}</p>
                      <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                        {info.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
            
            <div className="glass-card rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-4 text-foreground" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                Horaires d{"'"}ouverture
              </h3>
              <div className="space-y-2 text-muted-foreground">
                <p className="flex justify-between">
                  <span>Lundi - Vendredi</span>
                  <span className="font-medium text-foreground">08:00 - 18:00</span>
                </p>
                <p className="flex justify-between">
                  <span>Samedi</span>
                  <span className="font-medium text-foreground">09:00 - 14:00</span>
                </p>
                <p className="flex justify-between">
                  <span>Dimanche</span>
                  <span className="text-muted-foreground">Fermé</span>
                </p>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                Support technique disponible 24/7 pour les clients Business et Hybride.
              </p>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="glass-card rounded-2xl p-8">
            {isSubmitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-10 h-10 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-foreground" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                  Message envoyé !
                </h3>
                <p className="text-muted-foreground">
                  Nous vous répondrons dans les plus brefs délais.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-xl font-bold mb-6 text-foreground" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                  Envoyez-nous un message
                </h3>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Nom complet
                    </label>
                    <Input
                      type="text"
                      placeholder="Jean Dupont"
                      required
                      className="bg-background/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Email
                    </label>
                    <Input
                      type="email"
                      placeholder="jean@exemple.com"
                      required
                      className="bg-background/50"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Type de service
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {["Installation Starlink", "Achat matériel", "Audit réseau", "Support technique"].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setServiceType(type)}
                        className={`p-3 rounded-xl border-2 text-sm font-medium transition-all ${
                          serviceType === type
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border hover:border-primary/50 text-foreground"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Message
                  </label>
                  <Textarea
                    placeholder="Décrivez votre projet ou votre question..."
                    rows={4}
                    required
                    className="bg-background/50 resize-none"
                  />
                </div>
                
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full cta-glow bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Envoyer le message
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
