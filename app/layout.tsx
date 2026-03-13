import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
});

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: '--font-space-grotesk'
});

export const metadata: Metadata = {
  title: 'NATHANGROUP | Internet Satellite Haute Performance en RDC',
  description: 'Accédez à la puissance de Starlink avec NATHANGROUP. Connectivité satellite haute performance, équipements réseaux avancés et expertise technique pour entreprises et particuliers en RDC.',
  keywords: ['Starlink', 'Internet satellite', 'RDC', 'Kinshasa', 'connectivité', 'réseau', 'NATHANGROUP', 'équipements réseaux', 'Goma', 'Bunia'],
  authors: [{ name: 'NATHANGROUP' }],
  openGraph: {
    title: 'NATHANGROUP | Internet Satellite Haute Performance',
    description: 'La puissance du satellite et de l\'expertise réseau pour votre entreprise en RDC.',
    type: 'website',
    locale: 'fr_FR',
  },
  icons: {
    icon: '/logo-nathan.png',
    shortcut: '/logo-nathan.png',
    apple: '/logo-nathan.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#9A5A2E',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans antialiased bg-background text-foreground">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
