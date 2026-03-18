import { createClient } from '@/lib/supabase/server'
import { EquipmentForm } from '@/components/admin/equipment-form'
import { notFound } from 'next/navigation'

interface EquipmentEditPageProps {
  params: Promise<{ id: string }>
}

export default async function EquipmentEditPage({ params }: EquipmentEditPageProps) {
  const { id } = await params
  const isNew = id === 'new'

  let equipment = null

  if (!isNew) {
    const supabase = await createClient()
    const { data } = await supabase
      .from('equipment')
      .select('*')
      .eq('id', id)
      .single()

    if (!data) {
      notFound()
    }
    equipment = data
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          {isNew ? 'Nouvel équipement' : 'Modifier l\'équipement'}
        </h1>
        <p className="text-muted-foreground">
          {isNew ? 'Ajoutez un nouveau produit' : 'Modifiez les informations du produit'}
        </p>
      </div>

      <EquipmentForm equipment={equipment} />
    </div>
  )
}
