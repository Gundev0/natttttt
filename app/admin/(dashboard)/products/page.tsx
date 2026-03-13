"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Plus, Pencil, Trash2, Package } from "lucide-react"

interface Product {
  id: string
  name: string
  category: string
  price: number
  original_price: number | null
  rating: number
  reviews: number
  badge: string | null
  features: string[]
  payment_link: string
  image_url: string | null
  is_active: boolean
  sort_order: number
}

const categories = ["Routeur", "Switch", "Point d'accès", "Câblage", "Accessoires"]

export default function ProductsAdminPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    category: "Routeur",
    price: "",
    original_price: "",
    badge: "",
    features: "",
    payment_link: "",
    is_active: true,
  })
  const supabase = createClient()

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    const { data } = await supabase
      .from("products")
      .select("*")
      .order("sort_order", { ascending: true })
    
    if (data) setProducts(data)
    setLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const productData = {
      name: formData.name,
      category: formData.category,
      price: parseFloat(formData.price),
      original_price: formData.original_price ? parseFloat(formData.original_price) : null,
      badge: formData.badge || null,
      features: formData.features.split(",").map(f => f.trim()).filter(Boolean),
      payment_link: formData.payment_link || `https://wa.me/243979213370?text=Je%20souhaite%20acheter%20${encodeURIComponent(formData.name)}`,
      is_active: formData.is_active,
    }

    if (editingProduct) {
      await supabase.from("products").update(productData).eq("id", editingProduct.id)
    } else {
      await supabase.from("products").insert([{ ...productData, sort_order: products.length + 1 }])
    }

    setDialogOpen(false)
    resetForm()
    fetchProducts()
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      original_price: product.original_price?.toString() || "",
      badge: product.badge || "",
      features: product.features?.join(", ") || "",
      payment_link: product.payment_link || "",
      is_active: product.is_active,
    })
    setDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) {
      await supabase.from("products").delete().eq("id", id)
      fetchProducts()
    }
  }

  const resetForm = () => {
    setEditingProduct(null)
    setFormData({
      name: "",
      category: "Routeur",
      price: "",
      original_price: "",
      badge: "",
      features: "",
      payment_link: "",
      is_active: true,
    })
  }

  if (loading) {
    return <div className="text-[#FFF1E8]">Chargement...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#FFF1E8]">Produits</h1>
          <p className="text-[#FFF1E8]/60 mt-1">Gérez vos équipements et produits</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button className="bg-[#D39A6A] hover:bg-[#D39A6A]/90 text-[#1A1A1A]">
              <Plus className="w-4 h-4 mr-2" />
              Ajouter un produit
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#242424] border-[#333] text-[#FFF1E8] max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingProduct ? "Modifier le produit" : "Ajouter un produit"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nom du produit</Label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-[#1A1A1A] border-[#333]"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Catégorie</Label>
                  <Select value={formData.category} onValueChange={(v) => setFormData({ ...formData, category: v })}>
                    <SelectTrigger className="bg-[#1A1A1A] border-[#333]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#242424] border-[#333]">
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Prix ($)</Label>
                  <Input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="bg-[#1A1A1A] border-[#333]"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Ancien prix ($)</Label>
                  <Input
                    type="number"
                    value={formData.original_price}
                    onChange={(e) => setFormData({ ...formData, original_price: e.target.value })}
                    className="bg-[#1A1A1A] border-[#333]"
                    placeholder="Optionnel"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Badge</Label>
                  <Input
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    className="bg-[#1A1A1A] border-[#333]"
                    placeholder="Ex: Promo, Populaire"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Caractéristiques (séparées par des virgules)</Label>
                <Input
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  className="bg-[#1A1A1A] border-[#333]"
                  placeholder="Ex: WiFi 6, 4 ports, PoE"
                />
              </div>
              <div className="space-y-2">
                <Label>Lien de paiement (WhatsApp)</Label>
                <Input
                  value={formData.payment_link}
                  onChange={(e) => setFormData({ ...formData, payment_link: e.target.value })}
                  className="bg-[#1A1A1A] border-[#333]"
                  placeholder="Auto-généré si vide"
                />
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={formData.is_active}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                />
                <Label>Produit actif</Label>
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)} className="border-[#333]">
                  Annuler
                </Button>
                <Button type="submit" className="bg-[#D39A6A] hover:bg-[#D39A6A]/90 text-[#1A1A1A]">
                  {editingProduct ? "Mettre à jour" : "Ajouter"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {products.map((product) => (
          <Card key={product.id} className="bg-[#242424] border-[#333]">
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#1A1A1A] flex items-center justify-center">
                  <Package className="w-6 h-6 text-[#D39A6A]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-[#FFF1E8]">{product.name}</h3>
                    {product.badge && (
                      <span className="px-2 py-0.5 text-xs rounded-full bg-[#D39A6A]/20 text-[#D39A6A]">
                        {product.badge}
                      </span>
                    )}
                    {!product.is_active && (
                      <span className="px-2 py-0.5 text-xs rounded-full bg-red-500/20 text-red-400">
                        Inactif
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-[#FFF1E8]/60">{product.category}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="font-bold text-[#D39A6A]">${product.price}</p>
                  {product.original_price && (
                    <p className="text-sm text-[#FFF1E8]/40 line-through">${product.original_price}</p>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button size="icon" variant="ghost" onClick={() => handleEdit(product)} className="text-[#FFF1E8]/70 hover:text-[#FFF1E8]">
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="ghost" onClick={() => handleDelete(product.id)} className="text-red-400 hover:text-red-300">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
