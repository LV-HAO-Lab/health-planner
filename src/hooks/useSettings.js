import { useState, useEffect, useCallback } from 'react'
import db from '../db/database'

const DEFAULT_SETTINGS = {
  key: 'app_settings',
  morningReminder: '08:00',
  eveningReminder: '20:00',
  mealTypes: ['breakfast', 'lunch', 'dinner', 'snack'],
  weekStartDay: 1, // 周一
}

export const MEAL_TYPE_LABELS = {
  breakfast: '早餐',
  lunch: '午餐',
  dinner: '晚餐',
  snack: '加餐',
}

export function useSettings() {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      const s = await db.settings.get('app_settings')
      if (s) {
        setSettings({ ...DEFAULT_SETTINGS, ...s })
      } else {
        await db.settings.put(DEFAULT_SETTINGS)
        setSettings(DEFAULT_SETTINGS)
      }
      setLoading(false)
    })()
  }, [])

  const updateSettings = useCallback(async (updates) => {
    const updated = { ...settings, ...updates }
    await db.settings.put(updated)
    setSettings(updated)
  }, [settings])

  return { settings, loading, updateSettings }
}
