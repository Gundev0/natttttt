'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { User, LogOut, ExternalLink } from 'lucide-react'
import type { User as SupabaseUser } from '@supabase/supabase-js'
import Link from 'next/link'

interface AdminUserMenuProps {
  user: SupabaseUser
}

export function AdminUserMenu({ user }: AdminUserMenuProps) {
  const router = useRouter()

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="gap-2 text-[#FFF1E8]/80 hover:text-[#FFF1E8] hover:bg-[#FFF1E8]/10">
          <div className="w-8 h-8 rounded-full bg-[#D39A6A]/20 flex items-center justify-center">
            <User className="w-4 h-4 text-[#D39A6A]" />
          </div>
          <span className="hidden sm:inline text-sm max-w-[150px] truncate">{user.email}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-[#242424] border-[#FFF1E8]/10">
        <DropdownMenuLabel className="text-[#FFF1E8]">Mon compte</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-[#FFF1E8]/10" />
        <DropdownMenuItem className="text-[#FFF1E8]/60 focus:bg-[#FFF1E8]/10 focus:text-[#FFF1E8]">
          {user.email}
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-[#FFF1E8]/10" />
        <DropdownMenuItem asChild className="text-[#FFF1E8]/80 focus:bg-[#FFF1E8]/10 focus:text-[#FFF1E8]">
          <Link href="/" className="flex items-center gap-2">
            <ExternalLink className="w-4 h-4" />
            Voir le site
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={handleSignOut} 
          className="text-red-400 focus:bg-red-500/10 focus:text-red-400"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Déconnexion
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
