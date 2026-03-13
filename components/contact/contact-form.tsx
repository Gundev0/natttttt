"use client"

import { useState } from "react"
import { Send, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

const services = [
  "Installation Starlink",
  "Équipements réseaux",
  "Configuration réseau",
  "Maintenance & Support",
  "Solution hybride",
  "Autre"
]

export function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    location: "",
    message: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate form submission
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  if (isSubmitted) {
    return (
      <div className="glass-card rounded-2xl p-8 md:p-12 text-center">
        <div className="w-16 h-16 mx-auto rounded-full bg-green-500/20 flex items-center justify-center mb-6">
          <Check className="w-8 h-8 text-green-500" />
        </div>
        <h3 className="text-2xl font-bold mb-4 text-foreground" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
          Message envoyé !
        </h3>
        <p className="text-muted-foreground">
          Nous avons bien reçu votre demande. Notre équipe vous contactera dans les plus brefs délais.
        </p>
      </div>
    )
  }

  return (
    <div className="glass-card rounded-2xl p-8">
      <h2 className="text-2xl font-bold mb-6 text-foreground" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
        Demander un devis gratuit
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
              Nom complet *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground"
              placeholder="Jean Dupont"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground"
              placeholder="jean@exemple.com"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
              Téléphone *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground"
              placeholder="+243 XXX XXX XXX"
            />
          </div>

          <div>
            <label htmlFor="company" className="block text-sm font-medium text-foreground mb-2">
              Entreprise
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground"
              placeholder="Nom de l'entreprise"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="service" className="block text-sm font-medium text-foreground mb-2">
              Service souhaité *
            </label>
            <select
              id="service"
              name="service"
              required
              value={formData.service}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground"
            >
              <option value="">Sélectionnez un service</option>
              {services.map((service, index) => (
                <option key={index} value={service}>{service}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-foreground mb-2">
              Localisation *
            </label>
            <input
              type="text"
              id="location"
              name="location"
              required
              value={formData.location}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground"
              placeholder="Ville, Province"
            />
          </div>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
            Votre message *
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground resize-none"
            placeholder="Décrivez votre projet et vos besoins..."
          />
        </div>

        <Button 
          type="submit" 
          size="lg" 
          className="w-full cta-glow bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <Send className="w-4 h-4 mr-2" />
          Envoyer ma demande
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          En soumettant ce formulaire, vous acceptez notre politique de confidentialité. 
          Nous ne partagerons jamais vos informations avec des tiers.
        </p>
      </form>
    </div>
  )
}
