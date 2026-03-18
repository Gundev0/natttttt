import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { userId, email } = await request.json()

    if (!userId || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Use service role to bypass RLS
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false } }
    )

    // Check if there's already an admin
    const { data: existingAdmins } = await supabaseAdmin
      .from('admin_users')
      .select('id')
      .limit(1)

    if (existingAdmins && existingAdmins.length > 0) {
      return NextResponse.json({ error: 'Admin already exists' }, { status: 400 })
    }

    // Create admin user
    const { error } = await supabaseAdmin
      .from('admin_users')
      .insert({ id: userId, email, role: 'admin' })

    if (error) {
      console.error('Error creating admin:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Setup error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
