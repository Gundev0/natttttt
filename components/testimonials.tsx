"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"

const testimonials = [
  {
    name: "Jean-Pierre Mukendi",
    role: "PDG, TechCongo SARL",
    content: "Grâce à NATHANGROUP, notre entreprise dispose désormais d'une connexion Internet stable et rapide. Finis les problèmes de coupures qui nous coûtaient cher. Le service client est exceptionnel.",
    rating: 5,
    image: "/images/team-tech.jpg"
  },
  {
    name: "Marie-Claire Kabila",
    role: "Directrice, Hôtel Kinshasa Palace",
    content: "L'installation Starlink par NATHANGROUP a transformé l'expérience de nos clients. La connexion WiFi est maintenant notre point fort. Installation rapide et équipe très professionnelle.",
    rating: 5,
    image: "/images/about-team.jpg"
  },
  {
    name: "Patrick Lumumba",
    role: "Responsable IT, Mining Corp",
    content: "Pour nos opérations en zone minière, avoir une connexion fiable était crucial. NATHANGROUP a déployé une solution hybride qui répond parfaitement à nos exigences. Support technique réactif 24/7.",
    rating: 5,
    image: "/images/hero-satellite.jpg"
  },
]

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const current = testimonials[currentIndex]

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Témoignages
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
            Ce que nos clients disent de nous
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Découvrez pourquoi des centaines d{"'"}entreprises nous font confiance pour leur connectivité.
          </p>
        </div>

        {/* Testimonial Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
            <Image
              src={current.image}
              alt={current.name}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#3E1F0F]/60 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="glass-card rounded-xl p-4 backdrop-blur-md">
                <div className="flex items-center gap-1 mb-2">
                  <span className="text-2xl font-bold text-foreground">150k+</span>
                  <span className="text-muted-foreground text-sm">clients satisfaits</span>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial Card */}
          <div className="relative">
            <Quote className="absolute -top-4 -left-4 w-16 h-16 text-primary/10" />
            
            <div className="glass-card rounded-2xl p-8">
              {/* Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-secondary fill-secondary" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-xl text-foreground leading-relaxed mb-8">
                &ldquo;{current.content}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-foreground" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                    {current.name}
                  </p>
                  <p className="text-sm text-muted-foreground">{current.role}</p>
                </div>

                {/* Navigation */}
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={prevTestimonial}
                    className="rounded-full border-primary/30 hover:bg-primary/10"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={nextTestimonial}
                    className="rounded-full border-primary/30 hover:bg-primary/10"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex 
                      ? "bg-primary w-8" 
                      : "bg-primary/30 hover:bg-primary/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
