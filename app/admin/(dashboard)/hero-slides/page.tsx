import { createClient } from '@/lib/supabase/server'
import { HeroSlidesManager } from '@/components/admin/hero-slides-manager'

export default async function HeroSlidesPage() {
  const supabase = await createClient()
  const { data: slides } = await supabase
    .from('hero_slides')
    .select('*')
    .order('sort_order', { ascending: true })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Hero Slides</h1>
        <p className="text-muted-foreground">Gérez les slides de la page d&apos;accueil</p>
      </div>

      <HeroSlidesManager slides={slides || []} />
    </div>
  )
}
