"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Satellite, Zap, Globe, ChevronRight, Play, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const stats = [
  { value: 500, suffix: "+", label: "Clients satisfaits" },
  { value: 99.9, suffix: "%", label: "Disponibilité" },
  { value: 20, suffix: "ms", label: "Latence moyenne" },
]

const techLogos = [
  { name: "Starlink", color: "#3E1F0F" },
  { name: "MikroTik", color: "#9A5A2E" },
  { name: "Ubiquiti", color: "#D39A6A" },
  { name: "Cisco", color: "#3E1F0F" },
]

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    const duration = 2000
    const steps = 60
    const increment = value / steps
    let current = 0
    
    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current * 10) / 10)
      }
    }, duration / steps)
    
    return () => clearInterval(timer)
  }, [value])
  
  return (
    <span className="text-3xl md:text-4xl font-bold text-primary" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
      {value % 1 === 0 ? Math.floor(count) : count.toFixed(1)}{suffix}
    </span>
  )
}

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-8 pb-16 overflow-hidden bg-background">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary rounded-full blur-3xl" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm font-medium text-primary">Votre partenaire officiel pour une connectivité meilleure</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-balance" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
              Connectez-vous à{" "}
              <span className="gradient-text">la puissance du satellite</span>{" "}
              partout en RDC
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl text-pretty">
              Internet haut débit par satellite, équipements réseaux professionnels et expertise 
              technique. NATHANGROUP accompagne les entreprises et particuliers vers une 
              connectivité sans compromis.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
              <Button asChild size="lg" className="cta-glow bg-primary hover:bg-primary/90 text-primary-foreground text-base px-8 h-14">
                <Link href="/contact" className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  <span>Demander un devis gratuit</span>
                  <ChevronRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base px-8 h-14 border-primary/30 hover:bg-primary/10">
                <Link href="/services" className="flex items-center gap-2">
                  <Play className="h-5 w-5" />
                  <span>Découvrir nos services</span>
                </Link>
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
              {stats.map((stat, index) => (
                <div key={index} className="text-center lg:text-left">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right Content - Hero Image */}
          <div className="relative hidden lg:block">
            <div className="relative">
              {/* Main Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/hero-satellite.jpg"
                  alt="Internet satellite haute performance avec NATHANGROUP"
                  width={600}
                  height={500}
                  className="w-full h-auto object-cover"
                  priority
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#3E1F0F]/30 to-transparent" />
              </div>
              
              {/* Floating Cards */}
              <div className="absolute -top-4 -right-4 glass-card rounded-xl p-4 shadow-xl animate-bounce" style={{ animationDuration: '3s' }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Status</p>
                    <p className="text-sm font-semibold text-foreground">Connexion active</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -left-4 glass-card rounded-xl p-4 shadow-xl animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Vitesse</p>
                    <p className="text-sm font-semibold text-foreground">250 Mbps</p>
                  </div>
                </div>
              </div>

              <div className="absolute top-1/2 -right-8 glass-card rounded-xl p-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                    <Globe className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Couverture</p>
                    <p className="text-sm font-semibold text-foreground">Nationale</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tech Partners */}
        <div className="mt-16 pt-8 border-t border-border">
          <p className="text-center text-sm text-muted-foreground mb-6">Nos partenaires technologiques</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {techLogos.map((logo, index) => (
              <div 
                key={index} 
                className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity"
              >
                <Satellite className="w-5 h-5" style={{ color: logo.color }} />
                <span className="font-semibold text-foreground/70" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                  {logo.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
