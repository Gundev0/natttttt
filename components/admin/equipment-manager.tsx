'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Plus, Pencil, Trash2, Loader2, Save, X, Link as LinkIcon } from 'lucide-react'

interface Equipment {
  id: string
  name: string
  description: string | null
  price: number | null
  image_url: string | null
  payment_link: string | null
  category: string | null
  is_featured: boolean
  is_active: boolean
  sort_order: number
}

export function EquipmentManager() {
  const [items, setItems] = useState<Equipment[]>([])
  const [loading, setLoading] = useState(true)
  const [editingItem, setEditingItem] = useState<Equipment | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [saving, setSaving] = useState(false)

  const supabase = createClient()

  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    setLoading(true)
    const { data } = await supabase
      .from('equipment')
      .select('*')
      .order('sort_order', { ascending: true })
    setItems(data || [])
    setLoading(false)
  }

  const handleSave = async (item: Partial<Equipment>) => {
    setSaving(true)
    try {
      if (item.id) {
        await supabase.from('equipment').update(item).eq('id', item.id)
      } else {
        await supabase.from('equipment').insert(item)
      }
      await fetchItems()
      setEditingItem(null)
      setIsCreating(false)
    } catch (error) {
      console.error('Error saving:', error)
    }
    setSaving(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet élément ?')) return
    await supabase.from('equipment').delete().eq('id', id)
    await fetchItems()
  }

  const toggleActive = async (id: string, isActive: boolean) => {
    await supabase.from('equipment').update({ is_active: !isActive }).eq('id', id)
    await fetchItems()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-[#D39A6A]" />
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-[#FFF1E8]" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
          Équipements
        </h2>
        <Button
          onClick={() => {
            setIsCreating(true)
            setEditingItem({
              id: '',
              name: '',
              description: '',
              price: 0,
              image_url: '',
              payment_link: '',
              category: '',
              is_featured: false,
              is_active: true,
              sort_order: items.length
            })
          }}
          className="bg-[#D39A6A] hover:bg-[#D39A6A]/90 text-[#1A1A1A]"
        >
          <Plus className="w-4 h-4 mr-2" />
          Ajouter
        </Button>
      </div>

      {(editingItem || isCreating) && (
        <EquipmentForm
          item={editingItem!}
          saving={saving}
          onSave={handleSave}
          onCancel={() => {
            setEditingItem(null)
            setIsCreating(false)
          }}
        />
      )}

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-[#242424] rounded-xl p-4 border border-[#FFF1E8]/10 flex items-center gap-4"
          >
            {item.image_url && (
              <img
                src={item.image_url}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-lg"
              />
            )}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-[#FFF1E8] truncate">{item.name}</h3>
              <p className="text-sm text-[#FFF1E8]/60 truncate">{item.description}</p>
              <div className="flex items-center gap-4 mt-1">
                {item.price && (
                  <span className="text-[#D39A6A] font-semibold">${item.price}</span>
                )}
                {item.payment_link && (
                  <span className="flex items-center gap-1 text-xs text-green-400">
                    <LinkIcon className="w-3 h-3" />
                    Lien de paiement
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={item.is_active}
                onCheckedChange={() => toggleActive(item.id, item.is_active)}
              />
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setEditingItem(item)}
                className="text-[#FFF1E8]/60 hover:text-[#D39A6A]"
              >
                <Pencil className="w-4 h-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => handleDelete(item.id)}
                className="text-[#FFF1E8]/60 hover:text-red-400"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}

        {items.length === 0 && (
          <div className="text-center py-12 text-[#FFF1E8]/60">
            Aucun équipement. Cliquez sur &quot;Ajouter&quot; pour commencer.
          </div>
        )}
      </div>
    </div>
  )
}

interface EquipmentFormProps {
  item: Equipment
  saving: boolean
  onSave: (item: Partial<Equipment>) => void
  onCancel: () => void
}

function EquipmentForm({ item, saving, onSave, onCancel }: EquipmentFormProps) {
  const [formData, setFormData] = useState(item)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const dataToSave = { ...formData }
    if (!dataToSave.id) delete (dataToSave as Partial<Equipment>).id
    onSave(dataToSave)
  }

  return (
    <div className="bg-[#242424] rounded-xl p-6 border border-[#D39A6A]/30 mb-6">
      <h3 className="text-lg font-semibold text-[#FFF1E8] mb-4">
        {item.id ? 'Modifier' : 'Nouvel équipement'}
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-[#FFF1E8]/80">Nom</Label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="bg-[#1A1A1A] border-[#FFF1E8]/20 text-[#FFF1E8]"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-[#FFF1E8]/80">Prix (USD)</Label>
            <Input
              type="number"
              value={formData.price || ''}
              onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || null })}
              className="bg-[#1A1A1A] border-[#FFF1E8]/20 text-[#FFF1E8]"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-[#FFF1E8]/80">Description</Label>
          <Textarea
            value={formData.description || ''}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="bg-[#1A1A1A] border-[#FFF1E8]/20 text-[#FFF1E8]"
            rows={3}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-[#FFF1E8]/80">URL de l&apos;image</Label>
            <Input
              value={formData.image_url || ''}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              placeholder="https://..."
              className="bg-[#1A1A1A] border-[#FFF1E8]/20 text-[#FFF1E8]"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-[#FFF1E8]/80">Lien de paiement</Label>
            <Input
              value={formData.payment_link || ''}
              onChange={(e) => setFormData({ ...formData, payment_link: e.target.value })}
              placeholder="https://..."
              className="bg-[#1A1A1A] border-[#FFF1E8]/20 text-[#FFF1E8]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-[#FFF1E8]/80">Catégorie</Label>
            <Input
              value={formData.category || ''}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="bg-[#1A1A1A] border-[#FFF1E8]/20 text-[#FFF1E8]"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-[#FFF1E8]/80">Ordre d&apos;affichage</Label>
            <Input
              type="number"
              value={formData.sort_order}
              onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })}
              className="bg-[#1A1A1A] border-[#FFF1E8]/20 text-[#FFF1E8]"
            />
          </div>
        </div>

        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <Switch
              checked={formData.is_active}
              onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
            />
            <span className="text-sm text-[#FFF1E8]/80">Actif</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <Switch
              checked={formData.is_featured}
              onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked })}
            />
            <span className="text-sm text-[#FFF1E8]/80">Mis en avant</span>
          </label>
        </div>

        <div className="flex gap-3 pt-4">
          <Button
            type="submit"
            disabled={saving}
            className="bg-[#D39A6A] hover:bg-[#D39A6A]/90 text-[#1A1A1A]"
          >
            {saving ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            Enregistrer
          </Button>
          <Button type="button" variant="ghost" onClick={onCancel} className="text-[#FFF1E8]/60">
            <X className="w-4 h-4 mr-2" />
            Annuler
          </Button>
        </div>
      </form>
    </div>
  )
}
