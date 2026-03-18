'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Plus, Pencil, Trash2, Loader2, Save, X, Wrench } from 'lucide-react'

interface Service {
  id: string
  title: string
  description: string | null
  icon: string | null
  image_url: string | null
  is_active: boolean
  sort_order: number
}

export function ServicesManager() {
  const [items, setItems] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [editingItem, setEditingItem] = useState<Service | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [saving, setSaving] = useState(false)

  const supabase = createClient()

  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    setLoading(true)
    const { data } = await supabase
      .from('services')
      .select('*')
      .order('sort_order', { ascending: true })
    setItems(data || [])
    setLoading(false)
  }

  const handleSave = async (item: Partial<Service>) => {
    setSaving(true)
    try {
      if (item.id) {
        await supabase.from('services').update(item).eq('id', item.id)
      } else {
        await supabase.from('services').insert(item)
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
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce service ?')) return
    await supabase.from('services').delete().eq('id', id)
    await fetchItems()
  }

  const toggleActive = async (id: string, isActive: boolean) => {
    await supabase.from('services').update({ is_active: !isActive }).eq('id', id)
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
          Services
        </h2>
        <Button
          onClick={() => {
            setIsCreating(true)
            setEditingItem({
              id: '',
              title: '',
              description: '',
              icon: '',
              image_url: '',
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
        <ServiceForm
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
            <div className="w-12 h-12 rounded-lg bg-[#D39A6A]/20 flex items-center justify-center flex-shrink-0">
              <Wrench className="w-6 h-6 text-[#D39A6A]" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-[#FFF1E8]">{item.title}</h3>
              <p className="text-sm text-[#FFF1E8]/60 truncate">{item.description}</p>
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
            Aucun service. Cliquez sur &quot;Ajouter&quot; pour commencer.
          </div>
        )}
      </div>
    </div>
  )
}

interface ServiceFormProps {
  item: Service
  saving: boolean
  onSave: (item: Partial<Service>) => void
  onCancel: () => void
}

function ServiceForm({ item, saving, onSave, onCancel }: ServiceFormProps) {
  const [formData, setFormData] = useState(item)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const dataToSave = { ...formData }
    if (!dataToSave.id) delete (dataToSave as Partial<Service>).id
    onSave(dataToSave)
  }

  return (
    <div className="bg-[#242424] rounded-xl p-6 border border-[#D39A6A]/30 mb-6">
      <h3 className="text-lg font-semibold text-[#FFF1E8] mb-4">
        {item.id ? 'Modifier le service' : 'Nouveau service'}
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label className="text-[#FFF1E8]/80">Titre</Label>
          <Input
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
            className="bg-[#1A1A1A] border-[#FFF1E8]/20 text-[#FFF1E8]"
          />
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
            <Label className="text-[#FFF1E8]/80">Icône (nom lucide)</Label>
            <Input
              value={formData.icon || ''}
              onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
              placeholder="ex: Wifi, Satellite, etc."
              className="bg-[#1A1A1A] border-[#FFF1E8]/20 text-[#FFF1E8]"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-[#FFF1E8]/80">URL de l&apos;image</Label>
            <Input
              value={formData.image_url || ''}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              placeholder="https://..."
              className="bg-[#1A1A1A] border-[#FFF1E8]/20 text-[#FFF1E8]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-[#FFF1E8]/80">Ordre d&apos;affichage</Label>
            <Input
              type="number"
              value={formData.sort_order}
              onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })}
              className="bg-[#1A1A1A] border-[#FFF1E8]/20 text-[#FFF1E8]"
            />
          </div>
          <div className="flex items-center gap-2 pt-8">
            <Switch
              checked={formData.is_active}
              onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
            />
            <span className="text-sm text-[#FFF1E8]/80">Actif</span>
          </div>
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
