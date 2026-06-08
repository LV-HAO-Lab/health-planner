import { useState, useEffect, useCallback } from 'react'
import db from '../db/database'
import { builtInDietTemplates, builtInExerciseTemplates } from '../data/builtInTemplates'

export function useTemplates(type) {
  const [templates, setTemplates] = useState([])
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    const custom = await db.templates.where('type').equals(type).toArray()
    const builtIn = type === 'diet' ? builtInDietTemplates : builtInExerciseTemplates
    setTemplates([...builtIn.map(t => ({ ...t, _builtin: true })), ...custom])
    setLoading(false)
  }, [type])

  useEffect(() => { load() }, [load])

  const saveTemplate = useCallback(async (template) => {
    const t = { ...template, type, category: 'custom' }
    const id = await db.templates.add(t)
    setTemplates(prev => [...prev, { ...t, id }])
    return id
  }, [type])

  const deleteTemplate = useCallback(async (id) => {
    await db.templates.delete(id)
    setTemplates(prev => prev.filter(t => t.id !== id))
  }, [])

  return { templates, loading, saveTemplate, deleteTemplate, reload: load }
}
