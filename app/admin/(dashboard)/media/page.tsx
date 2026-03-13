"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2, ImageIcon, Copy, Check } from "lucide-react"
import Image from "next/image"

interface Media {
  id: string
  name: string
  url: string
  type: string
  section: string | null
  created_at: string
}

const sections = ["hero", "about", "equipment", "testimonials", "other"]

export default function MediaAdminPage() {
  const [media, setMedia] = useState<Media[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    url: "",
    section: "other",
  })
  const supabase = createClient()

  useEffect(() => {
    fetchMedia()
  }, [])

  const fetchMedia = async () => {
    const { data } = await supabase
      .from("media")
      .select("*")
      .order("created_at", { ascending: false })
    
    if (data) setMedia(data)
    setLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    await supabase.from("media").insert([{
      name: formData.name,
      url: formData.url,
      type: "image",
      section: formData.section,
    }])

    setDialogOpen(false)
    setFormData({ name: "", url: "", section: "other" })
    fetchMedia()
  }

  const handleDelete = async (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette image ?")) {
      await supabase.from("media").delete().eq("id", id)
      fetchMedia()
    }
  }

  const copyUrl = (id: string, url: string) => {
    navigator.clipboard.writeText(url)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  if (loading) {
    return <div className="text-[#FFF1E8]">Chargement...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#FFF1E8]">Médias</h1>
          <p className="text-[#FFF1E8]/60 mt-1">Gérez vos images et médias</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#D39A6A] hover:bg-[#D39A6A]/90 text-[#1A1A1A]">
              <Plus className="w-4 h-4 mr-2" />
              Ajouter une image
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#242424] border-[#333] text-[#FFF1E8]">
            <DialogHeader>
              <DialogTitle>Ajouter une image</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>Nom de l{"'"}image</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-[#1A1A1A] border-[#333]"
                  placeholder="Ex: Hero background"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>URL de l{"'"}image</Label>
                <Input
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  className="bg-[#1A1A1A] border-[#333]"
                  placeholder="https://..."
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Section</Label>
                <Select value={formData.section} onValueChange={(v) => setFormData({ ...formData, section: v })}>
                  <SelectTrigger className="bg-[#1A1A1A] border-[#333]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#242424] border-[#333]">
                    {sections.map((section) => (
                      <SelectItem key={section} value={section} className="capitalize">
                        {section}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {formData.url && (
                <div className="relative aspect-video rounded-lg overflow-hidden bg-[#1A1A1A]">
                  <Image
                    src={formData.url}
                    alt="Preview"
                    fill
                    className="object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = "/placeholder.svg"
                    }}
                  />
                </div>
              )}
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)} className="border-[#333]">
                  Annuler
                </Button>
                <Button type="submit" className="bg-[#D39A6A] hover:bg-[#D39A6A]/90 text-[#1A1A1A]">
                  Ajouter
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {media.map((item) => (
          <Card key={item.id} className="bg-[#242424] border-[#333] overflow-hidden">
            <div className="relative aspect-video bg-[#1A1A1A]">
              {item.url ? (
                <Image
                  src={item.url}
                  alt={item.name}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = "/placeholder.svg"
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ImageIcon className="w-12 h-12 text-[#333]" />
                </div>
              )}
            </div>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium text-[#FFF1E8]">{item.name}</h3>
                  <p className="text-xs text-[#FFF1E8]/50 capitalize">{item.section || "other"}</p>
                </div>
                <div className="flex gap-1">
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    onClick={() => copyUrl(item.id, item.url)}
                    className="text-[#FFF1E8]/70 hover:text-[#FFF1E8]"
                  >
                    {copiedId === item.id ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    onClick={() => handleDelete(item.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {media.length === 0 && (
          <div className="col-span-full text-center py-12 text-[#FFF1E8]/50">
            Aucun média pour le moment
          </div>
        )}
      </div>
    </div>
  )
}
