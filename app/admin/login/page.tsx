'use client'

import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Lock, Mail, Loader2 } from 'lucide-react'
import Link from 'next/link'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error

      // Check if user is admin
      const { data: adminData } = await supabase
        .from('admin_users')
        .select('id')
        .eq('id', data.user.id)
        .single()

      if (!adminData) {
        await supabase.auth.signOut()
        throw new Error('Accès non autorisé. Vous n\'êtes pas administrateur.')
      }

      router.push('/admin')
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'Une erreur est survenue')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#1A1A1A] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <h1 className="text-2xl font-bold text-[#FFF1E8]" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
              Nathan Group
            </h1>
          </Link>
          <p className="text-[#FFF1E8]/60 mt-2">Administration</p>
        </div>

        <div className="bg-[#242424] rounded-2xl p-8 border border-[#FFF1E8]/10">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#D39A6A]/20 mx-auto mb-6">
            <Lock className="w-8 h-8 text-[#D39A6A]" />
          </div>

          <h2 className="text-xl font-bold text-[#FFF1E8] text-center mb-6" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
            Connexion Admin
          </h2>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#FFF1E8]/80">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#FFF1E8]/40" />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@nathangroup.cd"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-10 bg-[#1A1A1A] border-[#FFF1E8]/20 text-[#FFF1E8] placeholder:text-[#FFF1E8]/40"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-[#FFF1E8]/80">Mot de passe</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#FFF1E8]/40" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-10 bg-[#1A1A1A] border-[#FFF1E8]/20 text-[#FFF1E8] placeholder:text-[#FFF1E8]/40"
                />
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#D39A6A] hover:bg-[#D39A6A]/90 text-[#1A1A1A] font-semibold"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Connexion...
                </>
              ) : (
                'Se connecter'
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Link href="/" className="text-sm text-[#FFF1E8]/60 hover:text-[#D39A6A] transition-colors">
              Retour au site
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
