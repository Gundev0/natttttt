"use client"

import { Router, Server, Wifi, Cable, HardDrive, MonitorSpeaker } from "lucide-react"

const categories = [
  {
    icon: Router,
    name: "Routeurs",
    count: 12,
    description: "MikroTik, Cisco, TP-Link"
  },
  {
    icon: Server,
    name: "Switches",
    count: 8,
    description: "Managés et non-managés"
  },
  {
    icon: Wifi,
    name: "Points d'accès",
    count: 15,
    description: "Ubiquiti, MikroTik"
  },
  {
    icon: Cable,
    name: "Câblage",
    count: 20,
    description: "Cat6, Cat7, Fibre"
  },
  {
    icon: HardDrive,
    name: "NAS & Serveurs",
    count: 6,
    description: "Stockage réseau"
  },
  {
    icon: MonitorSpeaker,
    name: "Accessoires",
    count: 25,
    description: "Connecteurs, outils"
  },
]

export function EquipmentCategories() {
  return (
    <section className="py-12 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <button
              key={index}
              className="flex flex-col items-center p-4 rounded-xl bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors text-center group"
            >
              <div className="w-12 h-12 rounded-full bg-primary-foreground/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <category.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-primary-foreground text-sm mb-1">
                {category.name}
              </h3>
              <p className="text-primary-foreground/60 text-xs">
                {category.count} produits
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
