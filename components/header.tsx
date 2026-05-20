"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X, Satellite, Phone, ChevronRight, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"

const navItems = [
  { name: "Accueil", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Offres", href: "/offres" },
  { name: "Équipements", href: "/equipements" },
  { name: "À propos", href: "/a-propos" },
  { name: "FAQ", href: "/faq" },
  { name: "Contact", href: "/contact" },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <>
      {/* Top Bar */}
      <div className="bg-[#3E1F0F] text-[#FFF1E8] py-2 text-sm hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <a href="https://wa.me/243979213370" target="_blank" className="flex items-center gap-2 hover:text-[#D39A6A] transition-colors">
              <Phone className="h-3.5 w-3.5" />
              <span>+243 979 213 370</span>
            </a>
            <span className="text-[#FFF1E8]/50">|</span>
            <a href="https://wa.me/243890868095" target="_blank" className="flex items-center gap-2 hover:text-[#D39A6A] transition-colors">
              <Phone className="h-3.5 w-3.5" />
              <span>+243 890 868 095</span>
            </a>
            <span className="text-[#FFF1E8]/50">|</span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Kinshasa, RDC
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[#FFF1E8]/70">Votre partenaire officiel pour une connectivité meilleure</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "glass-card py-3 shadow-lg"
            : "bg-background py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo-nathan.png"
                alt="NATHANGROUP Logo"
                width={50}
                height={50}
                className="h-12 w-auto"
              />
              <div className="hidden sm:block">
                <span className="text-xl font-bold text-foreground" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                  NATHAN<span className="text-primary">GROUP</span>
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-medium transition-colors relative py-2 ${
                    isActive(item.href)
                      ? "text-primary"
                      : "text-foreground/80 hover:text-primary"
                  }`}
                >
                  {item.name}
                  {isActive(item.href) && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                  )}
                </Link>
              ))}
            </nav>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <Button variant="outline" size="sm" asChild className="border-primary/30 hover:bg-primary/10">
                <Link href="/equipements" className="flex items-center gap-2">
                  <ShoppingBag className="h-4 w-4" />
                  <span className="hidden xl:inline">Boutique</span>
                </Link>
              </Button>
              <Button asChild className="cta-glow bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="/contact" className="flex items-center gap-2">
                  <Satellite className="h-4 w-4" />
                  <span>Devis gratuit</span>
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-foreground"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 glass-card rounded-xl p-4">
              {/* Mobile contact info */}
              <div className="flex flex-col gap-2 mb-4 pb-4 border-b border-border">
                <a href="https://wa.me/243979213370" target="_blank" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
                  <Phone className="h-4 w-4" />
                  <span>+243 979 213 370</span>
                </a>
                <a href="https://wa.me/243890868095" target="_blank" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
                  <Phone className="h-4 w-4" />
                  <span>+243 890 868 095</span>
                </a>
              </div>
              <nav className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-sm font-medium transition-colors py-3 px-4 rounded-lg ${
                      isActive(item.href)
                        ? "bg-primary/10 text-primary"
                        : "text-foreground/80 hover:text-primary hover:bg-primary/5"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                <hr className="border-border my-2" />
                <Button asChild className="w-full cta-glow bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Link href="/contact" className="flex items-center justify-center gap-2">
                    <Satellite className="h-4 w-4" />
                    <span>Demander un devis</span>
                  </Link>
                </Button>
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  )
}
