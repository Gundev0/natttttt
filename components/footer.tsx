"use client"

import Link from "next/link"
import Image from "next/image"
import { Mail, Phone, MapPin, Facebook, Linkedin, Instagram, Twitter, Send } from "lucide-react"
import { Button } from "@/components/ui/button"

const footerLinks = {
  services: [
    { name: "Installation Starlink", href: "/services" },
    { name: "Équipements Réseaux", href: "/equipements" },
    { name: "Configuration Réseau", href: "/services" },
    { name: "Support Technique", href: "/contact" },
  ],
  company: [
    { name: "À propos", href: "/a-propos" },
    { name: "Nos Offres", href: "/offres" },
    { name: "Pourquoi Nous", href: "/a-propos#pourquoi" },
    { name: "FAQ", href: "/faq" },
  ],
  legal: [
    { name: "Mentions légales", href: "#" },
    { name: "Politique de confidentialité", href: "#" },
    { name: "Conditions générales", href: "#" },
  ],
}

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "#" },
  { name: "LinkedIn", icon: Linkedin, href: "#" },
  { name: "Instagram", icon: Instagram, href: "#" },
  { name: "Twitter", icon: Twitter, href: "#" },
]

export function Footer() {
  return (
    <footer className="bg-[#3E1F0F] text-[#FFF1E8]">
      {/* Newsletter Section */}
      <div className="border-b border-[#FFF1E8]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                Restez informé de nos offres
              </h3>
              <p className="text-[#FFF1E8]/70">
                Recevez nos actualités et promotions directement dans votre boîte mail.
              </p>
            </div>
            <form className="flex flex-col sm:flex-row w-full md:w-auto gap-3">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="px-4 py-3 rounded-lg bg-[#FFF1E8]/10 border border-[#FFF1E8]/20 text-[#FFF1E8] placeholder:text-[#FFF1E8]/50 focus:outline-none focus:border-[#D39A6A] w-full md:w-72"
              />
              <Button className="bg-[#D39A6A] hover:bg-[#9A5A2E] text-[#3E1F0F] font-semibold whitespace-nowrap">
                <Send className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Envoyer</span>
                <span className="sm:hidden">OK</span>
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <Image
                src="/logo-nathan.png"
                alt="NATHANGROUP"
                width={50}
                height={50}
                className="h-12 w-auto"
              />
              <span className="text-xl font-bold" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                NATHAN<span className="text-[#D39A6A]">GROUP</span>
              </span>
            </Link>
            <p className="text-[#FFF1E8]/70 mb-6 leading-relaxed max-w-sm">
              Votre partenaire de confiance pour la connectivité satellite haute performance et les équipements réseaux en République Démocratique du Congo.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-[#FFF1E8]/10 flex items-center justify-center hover:bg-[#D39A6A] hover:text-[#3E1F0F] transition-all duration-300"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
          
          {/* Services */}
          <div>
            <h4 className="font-bold text-lg mb-4" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
              Services
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[#FFF1E8]/70 hover:text-[#D39A6A] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Company */}
          <div>
            <h4 className="font-bold text-lg mb-4" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
              Entreprise
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[#FFF1E8]/70 hover:text-[#D39A6A] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-4" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
              Contact
            </h4>
            <ul className="space-y-4">
              <li>
                <a href="https://wa.me/243979213370" target="_blank" className="flex items-center gap-3 text-[#FFF1E8]/70 hover:text-[#D39A6A] transition-colors">
                  <div className="w-8 h-8 rounded-full bg-[#FFF1E8]/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span>+243 979 213 370</span>
                </a>
              </li>
              <li>
                <a href="https://wa.me/243890868095" target="_blank" className="flex items-center gap-3 text-[#FFF1E8]/70 hover:text-[#D39A6A] transition-colors">
                  <div className="w-8 h-8 rounded-full bg-[#FFF1E8]/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span>+243 890 868 095</span>
                </a>
              </li>
              <li>
                <a href="mailto:nathangroup02@gmail.com" className="flex items-center gap-3 text-[#FFF1E8]/70 hover:text-[#D39A6A] transition-colors">
                  <div className="w-8 h-8 rounded-full bg-[#FFF1E8]/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span>nathangroup02@gmail.com</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-[#FFF1E8]/70">
                  <div className="w-8 h-8 rounded-full bg-[#FFF1E8]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="text-sm space-y-1">
                    <p><strong>Kinshasa:</strong> AV. KAUKA 53-73, IMM MAISHA-PARK, Q/BATETELA, C/GOMBE</p>
                    <p><strong>Goma:</strong> Q/MABANGA-SUD, AV.MUTONGO, C/KARISIMBI N 007</p>
                    <p><strong>Bunia:</strong> Q/BAKONKO, Av.MANIEMA, C/MBUNYA N 019</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom */}
        <div className="pt-8 border-t border-[#FFF1E8]/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[#FFF1E8]/50 text-sm">
              © {new Date().getFullYear()} NATHANGROUP SARL. Tous droits réservés.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm text-[#FFF1E8]/50 hover:text-[#D39A6A] transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
