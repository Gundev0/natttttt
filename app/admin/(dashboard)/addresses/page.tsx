import { createClient } from '@/lib/supabase/server'
import { AddressesManager } from '@/components/admin/addresses-manager'

export default async function AddressesPage() {
  const supabase = await createClient()
  const { data: addresses } = await supabase
    .from('addresses')
    .select('*')
    .order('sort_order', { ascending: true })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Adresses</h1>
        <p className="text-muted-foreground">Gérez vos adresses et points de vente</p>
      </div>

      <AddressesManager addresses={addresses || []} />
    </div>
  )
}
