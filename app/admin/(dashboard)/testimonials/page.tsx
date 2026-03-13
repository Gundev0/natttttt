"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Plus, Pencil, Trash2, MessageSquare, Star } from "lucide-react"

interface Testimonial {
  id: string
  author_name: string
  author_role: string | null
  author_company: string | null
  content: string
  rating: number
  is_active: boolean
  sort_order: number
}

export default function TestimonialsAdminPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null)
  const [formData, setFormData] = useState({
    author_name: "",
    author_role: "",
    author_company: "",
    content: "",
    rating: 5,
    is_active: true,
  })
  const supabase = createClient()

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    const { data } = await supabase
      .from("testimonials")
      .select("*")
      .order("sort_order", { ascending: true })
    
    if (data) setTestimonials(data)
    setLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const testimonialData = {
      author_name: formData.author_name,
      author_role: formData.author_role || null,
      author_company: formData.author_company || null,
      content: formData.content,
      rating: formData.rating,
      is_active: formData.is_active,
    }

    if (editingTestimonial) {
      await supabase.from("testimonials").update(testimonialData).eq("id", editingTestimonial.id)
    } else {
      await supabase.from("testimonials").insert([{ ...testimonialData, sort_order: testimonials.length + 1 }])
    }

    setDialogOpen(false)
    resetForm()
    fetchTestimonials()
  }

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial)
    setFormData({
      author_name: testimonial.author_name,
      author_role: testimonial.author_role || "",
      author_company: testimonial.author_company || "",
      content: testimonial.content,
      rating: testimonial.rating,
      is_active: testimonial.is_active,
    })
    setDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce témoignage ?")) {
      await supabase.from("testimonials").delete().eq("id", id)
      fetchTestimonials()
    }
  }

  const resetForm = () => {
    setEditingTestimonial(null)
    setFormData({
      author_name: "",
      author_role: "",
      author_company: "",
      content: "",
      rating: 5,
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
          <h1 className="text-3xl font-bold text-[#FFF1E8]">Témoignages</h1>
          <p className="text-[#FFF1E8]/60 mt-1">Gérez les avis clients</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button className="bg-[#D39A6A] hover:bg-[#D39A6A]/90 text-[#1A1A1A]">
              <Plus className="w-4 h-4 mr-2" />
              Ajouter un témoignage
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#242424] border-[#333] text-[#FFF1E8]">
            <DialogHeader>
              <DialogTitle>{editingTestimonial ? "Modifier le témoignage" : "Ajouter un témoignage"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nom de l{"'"}auteur</Label>
                  <Input
                    value={formData.author_name}
                    onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
                    className="bg-[#1A1A1A] border-[#333]"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Fonction</Label>
                  <Input
                    value={formData.author_role}
                    onChange={(e) => setFormData({ ...formData, author_role: e.target.value })}
                    className="bg-[#1A1A1A] border-[#333]"
                    placeholder="Ex: Directeur"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Entreprise</Label>
                <Input
                  value={formData.author_company}
                  onChange={(e) => setFormData({ ...formData, author_company: e.target.value })}
                  className="bg-[#1A1A1A] border-[#333]"
                  placeholder="Ex: Congo Mining Corp"
                />
              </div>
              <div className="space-y-2">
                <Label>Témoignage</Label>
                <Textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="bg-[#1A1A1A] border-[#333] min-h-[100px]"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Note (1-5)</Label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData({ ...formData, rating: star })}
                      className="p-1"
                    >
                      <Star
                        className={`w-6 h-6 ${star <= formData.rating ? "text-yellow-500 fill-yellow-500" : "text-[#333]"}`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={formData.is_active}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                />
                <Label>Actif</Label>
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)} className="border-[#333]">
                  Annuler
                </Button>
                <Button type="submit" className="bg-[#D39A6A] hover:bg-[#D39A6A]/90 text-[#1A1A1A]">
                  {editingTestimonial ? "Mettre à jour" : "Ajouter"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id} className="bg-[#242424] border-[#333]">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[#1A1A1A] flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-[#D39A6A]" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-[#FFF1E8]">{testimonial.author_name}</h3>
                      {!testimonial.is_active && (
                        <span className="px-2 py-0.5 text-xs rounded-full bg-red-500/20 text-red-400">
                          Inactif
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-[#FFF1E8]/60">
                      {testimonial.author_role}{testimonial.author_company && ` - ${testimonial.author_company}`}
                    </p>
                    <div className="flex gap-0.5 my-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${star <= testimonial.rating ? "text-yellow-500 fill-yellow-500" : "text-[#333]"}`}
                        />
                      ))}
                    </div>
                    <p className="text-[#FFF1E8]/80 text-sm line-clamp-2">{testimonial.content}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="icon" variant="ghost" onClick={() => handleEdit(testimonial)} className="text-[#FFF1E8]/70 hover:text-[#FFF1E8]">
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="ghost" onClick={() => handleDelete(testimonial.id)} className="text-red-400 hover:text-red-300">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {testimonials.length === 0 && (
          <div className="text-center py-12 text-[#FFF1E8]/50">
            Aucun témoignage pour le moment
          </div>
        )}
      </div>
    </div>
  )
}
