import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import AdminDashboard from '@/components/admin/admin-dashboard'

export default async function AdminPage() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/admin/login')
  }

  // Check if user is admin
  const { data: adminData } = await supabase
    .from('admin_users')
    .select('id, email, role')
    .eq('id', user.id)
    .single()

  if (!adminData) {
    redirect('/admin/login')
  }

  return <AdminDashboard user={adminData} />
}
