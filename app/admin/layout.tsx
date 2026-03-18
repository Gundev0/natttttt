import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin - Nathan Group",
  description: "Panneau d'administration Nathan Group",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
