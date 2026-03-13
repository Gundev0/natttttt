"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MapPin, Briefcase, Mail, ArrowRight, ArrowLeft, CheckCircle2, User, Loader2 } from "lucide-react"

const steps = [
  {
    id: 1,
    title: "Localisation",
    icon: MapPin,
    question: "Quelle est votre localisation ?",
    options: ["Kinshasa", "Goma", "Lubumbashi", "Bukavu", "Bunia", "Kisangani", "Matadi", "Autre ville"],
  },
  {
    id: 2,
    title: "Usage",
    icon: Briefcase,
    question: "Quel est votre usage principal ?",
    options: [
      { id: "perso", label: "Usage Personnel", description: "Streaming, télétravail, navigation" },
      { id: "pro", label: "Usage Professionnel", description: "PME, bureaux, commerce" },
      { id: "industrie", label: "Usage Industriel", description: "Sites isolés, chantiers, mines" },
    ],
  },
  {
    id: 3,
    title: "Contact",
    icon: Mail,
    question: "Vos coordonnées pour recevoir le devis",
    isEmail: true,
  },
]

export function Onboarding() {
  const [currentStep, setCurrentStep] = useState(0)
  const [selections, setSelections] = useState<Record<number, string>>({})
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [isComplete, setIsComplete] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSelect = (value: string) => {
    setSelections({ ...selections, [currentStep]: value })
  }

  const handleNext = async () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setIsSubmitting(true)
      await new Promise(resolve => setTimeout(resolve, 1500))
      setIsSubmitting(false)
      setIsComplete(true)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const currentStepData = steps[currentStep]
  const canProceed = currentStepData.isEmail ? email.includes("@") : selections[currentStep]

  if (isComplete) {
    return (
      <section id="eligibilite" className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/30 to-transparent" />
        <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
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
      </section>
    )
  }

  return (
    <section id="eligibilite" className="py-20 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/30 to-transparent" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-4 mb-12">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
                  index <= currentStep
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                <step.icon className="w-4 h-4" />
                <span className="text-sm font-medium hidden sm:inline">{step.title}</span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`w-8 md:w-16 h-0.5 mx-2 ${
                    index < currentStep ? "bg-primary" : "bg-border"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Form Card */}
        <div className="glass-card rounded-2xl p-8">
          <h3 className="text-xl font-bold text-foreground mb-8 text-center" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
            {currentStepData.question}
          </h3>

          {/* Step 1: Location */}
          {currentStep === 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {(currentStepData.options as string[])?.map((option) => (
                <button
                  key={option}
                  onClick={() => handleSelect(option)}
                  className={`p-4 rounded-xl border-2 transition-all text-sm font-medium ${
                    selections[currentStep] === option
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border hover:border-primary/50 text-foreground"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          {/* Step 2: Usage */}
          {currentStep === 1 && (
            <div className="space-y-3">
              {(currentStepData.options as { id: string; label: string; description: string }[])?.map((usage) => (
                <button
                  key={usage.id}
                  onClick={() => handleSelect(usage.id)}
                  className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                    selections[currentStep] === usage.id
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
          )}

          {/* Step 3: Contact */}
          {currentStep === 2 && (
            <div className="space-y-4 max-w-md mx-auto">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email
                </label>
                <Input
                  type="email"
                  placeholder="votre@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="bg-background/50"
                />
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-10">
            <Button
              variant="ghost"
              onClick={handleBack}
              disabled={currentStep === 0}
              className="text-muted-foreground"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour
            </Button>
            <Button
              onClick={handleNext}
              disabled={!canProceed || isSubmitting}
              className="cta-glow bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Envoi en cours...
                </>
              ) : currentStep === steps.length - 1 ? (
                <>
                  Recevoir mon devis
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              ) : (
                <>
                  Continuer
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
