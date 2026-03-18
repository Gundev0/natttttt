import { createClient } from '@/lib/supabase/server'
import { EquipmentTable } from '@/components/admin/equipment-table'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'

export default async function EquipmentPage() {
  const supabase = await createClient()
  const { data: equipment } = await supabase
    .from('equipment')
    .select('*')
    .order('sort_order', { ascending: true })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Équipements</h1>
          <p className="text-muted-foreground">Gérez vos produits et équipements Starlink</p>
        </div>
        <Button asChild>
          <Link href="/admin/equipment/new">
            <Plus className="w-4 h-4 mr-2" />
            Ajouter
          </Link>
        </Button>
      </div>

      <EquipmentTable equipment={equipment || []} />
    </div>
  )
}
