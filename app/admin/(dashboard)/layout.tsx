import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { AdminNav } from '@/components/admin/admin-nav'
import { AdminUserMenu } from '@/components/admin/admin-user-menu'

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/admin/login')
  }

  return (
    <div className="min-h-screen bg-[#1A1A1A]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#242424] border-b border-[#FFF1E8]/10">
        <div className="flex items-center justify-between h-16 px-4 lg:px-6">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="flex items-center gap-2">
              <span className="text-xl font-bold text-[#FFF1E8]" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                Nathan Group
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-[#D39A6A]/20 text-[#D39A6A]">
                Admin
              </span>
            </Link>
          </div>
          <AdminUserMenu user={user} />
        </div>
        <AdminNav />
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
        {children}
      </main>
    </div>
  )
}
