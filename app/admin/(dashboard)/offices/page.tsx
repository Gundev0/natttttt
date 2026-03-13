"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Plus, Pencil, Trash2, MapPin, Building2 } from "lucide-react"

interface Office {
  id: string
  city: string
  address: string
  phone: string | null
  is_headquarters: boolean
  is_active: boolean
  sort_order: number
}

export default function OfficesAdminPage() {
  const [offices, setOffices] = useState<Office[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingOffice, setEditingOffice] = useState<Office | null>(null)
  const [formData, setFormData] = useState({
    city: "",
    address: "",
    phone: "",
    is_headquarters: false,
    is_active: true,
  })
  const supabase = createClient()

  useEffect(() => {
    fetchOffices()
  }, [])

  const fetchOffices = async () => {
    const { data } = await supabase
      .from("offices")
      .select("*")
      .order("sort_order", { ascending: true })
    
    if (data) setOffices(data)
    setLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const officeData = {
      city: formData.city,
      address: formData.address,
      phone: formData.phone || null,
      is_headquarters: formData.is_headquarters,
      is_active: formData.is_active,
    }

    if (editingOffice) {
      await supabase.from("offices").update(officeData).eq("id", editingOffice.id)
    } else {
      await supabase.from("offices").insert([{ ...officeData, sort_order: offices.length + 1 }])
    }

    setDialogOpen(false)
    resetForm()
    fetchOffices()
  }

  const handleEdit = (office: Office) => {
    setEditingOffice(office)
    setFormData({
      city: office.city,
      address: office.address,
      phone: office.phone || "",
      is_headquarters: office.is_headquarters,
      is_active: office.is_active,
    })
    setDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce bureau ?")) {
      await supabase.from("offices").delete().eq("id", id)
      fetchOffices()
    }
  }

  const resetForm = () => {
    setEditingOffice(null)
    setFormData({
      city: "",
      address: "",
      phone: "",
      is_headquarters: false,
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
          <h1 className="text-3xl font-bold text-[#FFF1E8]">Bureaux</h1>
          <p className="text-[#FFF1E8]/60 mt-1">Gérez vos adresses et bureaux</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button className="bg-[#D39A6A] hover:bg-[#D39A6A]/90 text-[#1A1A1A]">
              <Plus className="w-4 h-4 mr-2" />
              Ajouter un bureau
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#242424] border-[#333] text-[#FFF1E8]">
            <DialogHeader>
              <DialogTitle>{editingOffice ? "Modifier le bureau" : "Ajouter un bureau"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>Ville</Label>
                <Input
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="bg-[#1A1A1A] border-[#333]"
                  placeholder="Ex: Kinshasa, Goma, Bunia"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Adresse complète</Label>
                <Input
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="bg-[#1A1A1A] border-[#333]"
                  placeholder="Ex: AV. KAUKA 53-73, IMM MAISHA-PARK"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Téléphone</Label>
                <Input
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="bg-[#1A1A1A] border-[#333]"
                  placeholder="+243 979 213 370"
                />
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Switch
                    checked={formData.is_headquarters}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_headquarters: checked })}
                  />
                  <Label>Siège social</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={formData.is_active}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                  />
                  <Label>Actif</Label>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)} className="border-[#333]">
                  Annuler
                </Button>
                <Button type="submit" className="bg-[#D39A6A] hover:bg-[#D39A6A]/90 text-[#1A1A1A]">
                  {editingOffice ? "Mettre à jour" : "Ajouter"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {offices.map((office) => (
          <Card key={office.id} className="bg-[#242424] border-[#333]">
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#1A1A1A] flex items-center justify-center">
                  {office.is_headquarters ? (
                    <Building2 className="w-6 h-6 text-[#D39A6A]" />
                  ) : (
                    <MapPin className="w-6 h-6 text-[#D39A6A]" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-[#FFF1E8]">{office.city}</h3>
                    {office.is_headquarters && (
                      <span className="px-2 py-0.5 text-xs rounded-full bg-[#D39A6A]/20 text-[#D39A6A]">
                        Siège
                      </span>
                    )}
                    {!office.is_active && (
                      <span className="px-2 py-0.5 text-xs rounded-full bg-red-500/20 text-red-400">
                        Inactif
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-[#FFF1E8]/60">{office.address}</p>
                  {office.phone && (
                    <p className="text-sm text-[#D39A6A]">{office.phone}</p>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="icon" variant="ghost" onClick={() => handleEdit(office)} className="text-[#FFF1E8]/70 hover:text-[#FFF1E8]">
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button size="icon" variant="ghost" onClick={() => handleDelete(office.id)} className="text-red-400 hover:text-red-300">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
