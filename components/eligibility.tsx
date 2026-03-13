"use client"

import { useState } from "react"
import { MapPin, Briefcase, User, Mail, ChevronRight, CheckCircle2, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const steps = [
  { id: 1, title: "Localisation", icon: MapPin },
  { id: 2, title: "Besoins", icon: Briefcase },
  { id: 3, title: "Contact", icon: Mail },
]

const locations = [
  "Kinshasa",
  "Goma",
  "Lubumbashi",
  "Bukavu",
  "Bunia",
  "Kisangani",
  "Matadi",
  "Autre ville",
]

const usageTypes = [
  { id: "perso", label: "Usage Personnel", description: "Streaming, télétravail, navigation" },
  { id: "pro", label: "Usage Professionnel", description: "PME, bureaux, commerce" },
  { id: "industrie", label: "Usage Industriel", description: "Sites isolés, chantiers, mines" },
]

export function Eligibility() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    location: "",
    usage: "",
    email: "",
    phone: "",
  })

  const handleSubmit = async () => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <section id="eligibilite" className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="glass-card rounded-2xl p-12 text-center">
              <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-foreground" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                Demande envoyée avec succès !
              </h3>
              <p className="text-muted-foreground mb-6">
                Notre équipe va analyser votre éligibilité et vous recontactera sous 24h avec un devis personnalisé.
              </p>
              <p className="text-sm text-muted-foreground">
                En attendant, consultez notre{" "}
                <a href="#faq" className="text-primary hover:underline">FAQ</a>
                {" "}pour plus d{"'"}informations.
              </p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="eligibilite" className="py-20 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/30 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Vérifiez votre éligibilité
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-balance" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
            Votre voyage vers la{" "}
            <span className="gradient-text">haute vitesse</span>{" "}
            commence ici
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            En 30 secondes, découvrez si Starlink est disponible dans votre zone et recevez un devis personnalisé.
          </p>
        </div>
        
        {/* Steps Indicator */}
        <div className="flex items-center justify-center gap-4 mb-12">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
                currentStep >= step.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}>
                <step.icon className="w-4 h-4" />
                <span className="text-sm font-medium hidden sm:inline">{step.title}</span>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-8 md:w-16 h-0.5 mx-2 ${
                  currentStep > step.id ? "bg-primary" : "bg-border"
                }`} />
              )}
            </div>
          ))}
        </div>
        
        {/* Form */}
        <div className="max-w-2xl mx-auto">
          <div className="glass-card rounded-2xl p-8">
            {/* Step 1: Location */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-foreground" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                  Quelle est votre localisation ?
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {locations.map((location) => (
                    <button
                      key={location}
                      onClick={() => setFormData({ ...formData, location })}
                      className={`p-4 rounded-xl border-2 transition-all text-sm font-medium ${
                        formData.location === location
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border hover:border-primary/50 text-foreground"
                      }`}
                    >
                      {location}
                    </button>
                  ))}
                </div>
                <Button
                  onClick={() => setCurrentStep(2)}
                  disabled={!formData.location}
                  className="w-full cta-glow bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Continuer
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )}
            
            {/* Step 2: Usage */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-foreground" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                  Quel est votre usage principal ?
                </h3>
                <div className="space-y-3">
                  {usageTypes.map((usage) => (
                    <button
                      key={usage.id}
                      onClick={() => setFormData({ ...formData, usage: usage.id })}
                      className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                        formData.usage === usage.id
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {usage.id === "perso" && <User className="w-5 h-5 text-primary" />}
                        {usage.id === "pro" && <Briefcase className="w-5 h-5 text-primary" />}
                        {usage.id === "industrie" && <MapPin className="w-5 h-5 text-primary" />}
                        <div>
                          <p className="font-medium text-foreground">{usage.label}</p>
                          <p className="text-sm text-muted-foreground">{usage.description}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(1)}
                    className="flex-1"
                  >
                    Retour
                  </Button>
                  <Button
                    onClick={() => setCurrentStep(3)}
                    disabled={!formData.usage}
                    className="flex-1 cta-glow bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    Continuer
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            )}
            
            {/* Step 3: Contact */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-foreground" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                  Vos coordonnées
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Email
                    </label>
                    <Input
                      type="email"
                      placeholder="votre@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-background/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Téléphone (optionnel)
                    </label>
                    <Input
                      type="tel"
                      placeholder="+243 xxx xxx xxx"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="bg-background/50"
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(2)}
                    className="flex-1"
                  >
                    Retour
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={!formData.email || isSubmitting}
                    className="flex-1 cta-glow bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        Recevoir mon devis
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
