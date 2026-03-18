'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Save, Loader2 } from 'lucide-react'
import Link from 'next/link'

interface Equipment {
  id: string
  name: string
  description: string
  price: number
  image_url: string
  category: string
  is_active: boolean
  is_featured: boolean
  payment_link: string
  sort_order: number
}

interface EquipmentFormProps {
  equipment: Equipment | null
}

export function EquipmentForm({ equipment }: EquipmentFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: equipment?.name || '',
    description: equipment?.description || '',
    price: equipment?.price || 0,
    image_url: equipment?.image_url || '',
    category: equipment?.category || '',
    is_active: equipment?.is_active ?? true,
    is_featured: equipment?.is_featured ?? false,
    payment_link: equipment?.payment_link || '',
    sort_order: equipment?.sort_order || 0,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const supabase = createClient()

    try {
      if (equipment) {
        await supabase
          .from('equipment')
          .update(formData)
          .eq('id', equipment.id)
      } else {
        await supabase.from('equipment').insert(formData)
      }
      router.push('/admin/equipment')
      router.refresh()
    } catch (error) {
      console.error('Error saving equipment:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/equipment">
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Save className="w-4 h-4 mr-2" />
          )}
          {equipment ? 'Mettre à jour' : 'Créer'}
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Informations générales</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom du produit</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Prix ($)</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Catégorie</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="Ex: Kit Résidentiel"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Média et liens</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="image_url">URL de l&apos;image</Label>
              <Input
                id="image_url"
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                placeholder="/images/product.png"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="payment_link">Lien de paiement</Label>
              <Input
                id="payment_link"
                value={formData.payment_link}
                onChange={(e) => setFormData({ ...formData, payment_link: e.target.value })}
                placeholder="https://wa.me/243979213370?text=..."
              />
              <p className="text-xs text-muted-foreground">
                Ce lien sera utilisé pour le bouton &quot;Payer&quot;
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="sort_order">Ordre d&apos;affichage</Label>
              <Input
                id="sort_order"
                type="number"
                value={formData.sort_order}
                onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) })}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Options</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Actif</Label>
                <p className="text-sm text-muted-foreground">
                  Afficher ce produit sur le site
                </p>
              </div>
              <Switch
                checked={formData.is_active}
                onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>En vedette</Label>
                <p className="text-sm text-muted-foreground">
                  Mettre ce produit en avant
                </p>
              </div>
              <Switch
                checked={formData.is_featured}
                onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked })}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </form>
  )
}
