'use client'

import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Lock, Mail, Loader2, UserPlus, Check } from 'lucide-react'
import Link from 'next/link'

export default function AdminSetupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [hasAdmin, setHasAdmin] = useState<boolean | null>(null)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    checkExistingAdmin()
  }, [])

  const checkExistingAdmin = async () => {
    const { data, error } = await supabase
      .from('admin_users')
      .select('id')
      .limit(1)
    
    if (!error && data && data.length > 0) {
      setHasAdmin(true)
    } else {
      setHasAdmin(false)
    }
  }

  const handleSetup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas')
      setIsLoading(false)
      return
    }

    if (password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères')
      setIsLoading(false)
      return
    }

    try {
      // Create user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/admin`,
        }
      })

      if (authError) throw authError

      if (authData.user) {
        // Add to admin_users table using service role (via API route)
        const response = await fetch('/api/admin/setup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            userId: authData.user.id, 
            email: authData.user.email 
          })
        })

        if (!response.ok) {
          const result = await response.json()
          throw new Error(result.error || 'Erreur lors de la création de l\'admin')
        }

        setSuccess(true)
      }
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'Une erreur est survenue')
    } finally {
      setIsLoading(false)
    }
  }

  if (hasAdmin === null) {
    return (
      <div className="min-h-screen bg-[#1A1A1A] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#D39A6A]" />
      </div>
    )
  }

  if (hasAdmin) {
    return (
      <div className="min-h-screen bg-[#1A1A1A] flex items-center justify-center p-6">
        <div className="w-full max-w-md text-center">
          <div className="bg-[#242424] rounded-2xl p-8 border border-[#FFF1E8]/10">
            <div className="w-16 h-16 rounded-full bg-green-500/20 mx-auto mb-6 flex items-center justify-center">
              <Check className="w-8 h-8 text-green-500" />
            </div>
            <h2 className="text-xl font-bold text-[#FFF1E8] mb-4">Admin déjà configuré</h2>
            <p className="text-[#FFF1E8]/60 mb-6">
              Un compte administrateur existe déjà. Veuillez vous connecter.
            </p>
            <Button asChild className="w-full bg-[#D39A6A] hover:bg-[#D39A6A]/90 text-[#1A1A1A]">
              <Link href="/admin/login">Se connecter</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (success) {
    return (
      <div className="min-h-screen bg-[#1A1A1A] flex items-center justify-center p-6">
        <div className="w-full max-w-md text-center">
          <div className="bg-[#242424] rounded-2xl p-8 border border-[#FFF1E8]/10">
            <div className="w-16 h-16 rounded-full bg-green-500/20 mx-auto mb-6 flex items-center justify-center">
              <Check className="w-8 h-8 text-green-500" />
            </div>
            <h2 className="text-xl font-bold text-[#FFF1E8] mb-4">Compte créé avec succès!</h2>
            <p className="text-[#FFF1E8]/60 mb-6">
              Vérifiez votre email pour confirmer votre compte, puis connectez-vous.
            </p>
            <Button asChild className="w-full bg-[#D39A6A] hover:bg-[#D39A6A]/90 text-[#1A1A1A]">
              <Link href="/admin/login">Se connecter</Link>
            </Button>
          </div>
        </div>
      </div>
    )
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
          <p className="text-[#FFF1E8]/60 mt-2">Configuration initiale</p>
        </div>

        <div className="bg-[#242424] rounded-2xl p-8 border border-[#FFF1E8]/10">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#D39A6A]/20 mx-auto mb-6">
            <UserPlus className="w-8 h-8 text-[#D39A6A]" />
          </div>

          <h2 className="text-xl font-bold text-[#FFF1E8] text-center mb-2" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
            Créer le premier admin
          </h2>
          <p className="text-sm text-[#FFF1E8]/60 text-center mb-6">
            Ce compte aura accès complet au panneau d&apos;administration.
          </p>

          <form onSubmit={handleSetup} className="space-y-4">
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

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-[#FFF1E8]/80">Confirmer le mot de passe</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#FFF1E8]/40" />
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
                  Création...
                </>
              ) : (
                'Créer le compte admin'
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
