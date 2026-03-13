"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Save, Phone, Mail, Building2, MessageSquare } from "lucide-react"

interface Setting {
  id: string
  key: string
  value: string
  type: string
}

export default function SettingsAdminPage() {
  const [settings, setSettings] = useState<Setting[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState<Record<string, string>>({})
  const supabase = createClient()

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    const { data } = await supabase.from("site_settings").select("*")
    
    if (data) {
      setSettings(data)
      const initialData: Record<string, string> = {}
      data.forEach(s => { initialData[s.key] = s.value || "" })
      setFormData(initialData)
    }
    setLoading(false)
  }

  const handleSave = async () => {
    setSaving(true)
    
    for (const [key, value] of Object.entries(formData)) {
      await supabase
        .from("site_settings")
        .update({ value, updated_at: new Date().toISOString() })
        .eq("key", key)
    }
    
    setSaving(false)
    alert("Paramètres sauvegardés avec succès!")
  }

  const settingsConfig = [
    { key: "company_name", label: "Nom de l'entreprise", icon: Building2 },
    { key: "slogan", label: "Slogan", icon: MessageSquare },
    { key: "phone", label: "Téléphone", icon: Phone },
    { key: "whatsapp", label: "WhatsApp (sans +)", icon: MessageSquare },
    { key: "email", label: "Email", icon: Mail },
  ]

  if (loading) {
    return <div className="text-[#FFF1E8]">Chargement...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#FFF1E8]">Paramètres</h1>
          <p className="text-[#FFF1E8]/60 mt-1">Configurez les informations de votre site</p>
        </div>
        <Button 
          onClick={handleSave} 
          disabled={saving}
          className="bg-[#D39A6A] hover:bg-[#D39A6A]/90 text-[#1A1A1A]"
        >
          <Save className="w-4 h-4 mr-2" />
          {saving ? "Sauvegarde..." : "Sauvegarder"}
        </Button>
      </div>

      <Card className="bg-[#242424] border-[#333]">
        <CardHeader>
          <CardTitle className="text-[#FFF1E8]">Informations générales</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {settingsConfig.map(({ key, label, icon: Icon }) => (
            <div key={key} className="space-y-2">
              <Label className="text-[#FFF1E8]/80 flex items-center gap-2">
                <Icon className="w-4 h-4 text-[#D39A6A]" />
                {label}
              </Label>
              <Input
                value={formData[key] || ""}
                onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                className="bg-[#1A1A1A] border-[#333] text-[#FFF1E8]"
              />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="bg-[#242424] border-[#333]">
        <CardHeader>
          <CardTitle className="text-[#FFF1E8]">Lien WhatsApp généré</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 rounded-lg bg-[#1A1A1A] break-all">
            <p className="text-sm text-[#FFF1E8]/50 mb-2">Lien de contact:</p>
            <code className="text-[#D39A6A] text-sm">
              https://wa.me/{formData.whatsapp || "243979213370"}
            </code>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
