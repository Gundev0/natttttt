'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2, Save, Settings } from 'lucide-react'

interface SiteSetting {
  id: string
  key: string
  value: string | null
  type: string
}

export function SettingsManager() {
  const [settings, setSettings] = useState<SiteSetting[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState<Record<string, string>>({})

  const supabase = createClient()

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    setLoading(true)
    const { data } = await supabase
      .from('site_settings')
      .select('*')
      .order('key', { ascending: true })
    
    if (data) {
      setSettings(data)
      const form: Record<string, string> = {}
      data.forEach(s => {
        form[s.key] = s.value || ''
      })
      setFormData(form)
    }
    setLoading(false)
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      for (const setting of settings) {
        if (formData[setting.key] !== setting.value) {
          await supabase
            .from('site_settings')
            .update({ value: formData[setting.key], updated_at: new Date().toISOString() })
            .eq('key', setting.key)
        }
      }
      await fetchSettings()
    } catch (error) {
      console.error('Error saving settings:', error)
    }
    setSaving(false)
  }

  const settingLabels: Record<string, string> = {
    site_name: 'Nom du site',
    tagline: 'Slogan',
    whatsapp: 'Numéro WhatsApp',
    email: 'Email de contact',
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
          Paramètres du site
        </h2>
      </div>

      <div className="bg-[#242424] rounded-xl p-6 border border-[#FFF1E8]/10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-lg bg-[#D39A6A]/20 flex items-center justify-center">
            <Settings className="w-6 h-6 text-[#D39A6A]" />
          </div>
          <div>
            <h3 className="font-semibold text-[#FFF1E8]">Informations générales</h3>
            <p className="text-sm text-[#FFF1E8]/60">Configurez les informations de base du site</p>
          </div>
        </div>

        <div className="space-y-4">
          {settings.map((setting) => (
            <div key={setting.key} className="space-y-2">
              <Label className="text-[#FFF1E8]/80">
                {settingLabels[setting.key] || setting.key}
              </Label>
              <Input
                value={formData[setting.key] || ''}
                onChange={(e) => setFormData({ ...formData, [setting.key]: e.target.value })}
                className="bg-[#1A1A1A] border-[#FFF1E8]/20 text-[#FFF1E8]"
              />
            </div>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t border-[#FFF1E8]/10">
          <Button
            onClick={handleSave}
            disabled={saving}
            className="bg-[#D39A6A] hover:bg-[#D39A6A]/90 text-[#1A1A1A]"
          >
            {saving ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            Enregistrer les modifications
          </Button>
        </div>
      </div>
    </div>
  )
}
