import { useState, useEffect, useCallback } from 'react'
import db from '../db/database'
import { today as getToday } from '../utils/date'

export function usePlans(dateStr) {
  const [plan, setPlan] = useState(null)
  const [loading, setLoading] = useState(true)

  const loadPlan = useCallback(async () => {
    const p = await db.plans.get(dateStr)
    setPlan(p || { date: dateStr, meals: [], exercises: [] })
    setLoading(false)
  }, [dateStr])

  useEffect(() => {
    setLoading(true)
    loadPlan()
  }, [loadPlan])

  const save = useCallback(async (updatedPlan) => {
    await db.plans.put(updatedPlan)
    setPlan(updatedPlan)
  }, [])

  // 切换餐食打卡状态
  const toggleMeal = useCallback(async (mealId) => {
    const updated = {
      ...plan,
      meals: plan.meals.map(m =>
        m.id === mealId ? { ...m, completed: !m.completed } : m
      ),
    }
    await save(updated)
  }, [plan, save])

  // 切换锻炼打卡状态
  const toggleExercise = useCallback(async (exerciseId) => {
    const updated = {
      ...plan,
      exercises: plan.exercises.map(e =>
        e.id === exerciseId ? { ...e, completed: !e.completed } : e
      ),
    }
    await save(updated)
  }, [plan, save])

  // 添加餐食
  const addMeal = useCallback(async (meal) => {
    const newMeal = { id: Date.now().toString(36) + Math.random().toString(36).slice(2), completed: false, ...meal }
    const updated = {
      ...plan,
      meals: [...plan.meals, newMeal],
    }
    await save(updated)
  }, [plan, save])

  // 添加锻炼
  const addExercise = useCallback(async (exercise) => {
    const newEx = { id: Date.now().toString(36) + Math.random().toString(36).slice(2), completed: false, ...exercise }
    const updated = {
      ...plan,
      exercises: [...plan.exercises, newEx],
    }
    await save(updated)
  }, [plan, save])

  // 删除餐食
  const removeMeal = useCallback(async (mealId) => {
    const updated = {
      ...plan,
      meals: plan.meals.filter(m => m.id !== mealId),
    }
    await save(updated)
  }, [plan, save])

  // 删除锻炼
  const removeExercise = useCallback(async (exerciseId) => {
    const updated = {
      ...plan,
      exercises: plan.exercises.filter(e => e.id !== exerciseId),
    }
    await save(updated)
  }, [plan, save])

  // 从模板批量添加
  const applyTemplate = useCallback(async (template) => {
    const now = Date.now()
    let updated
    if (template.type === 'diet') {
      const newMeals = (template.meals || []).map((m, i) => ({
        id: (now + i).toString(36) + Math.random().toString(36).slice(2),
        completed: false,
        ...m,
      }))
      updated = { ...plan, meals: [...plan.meals, ...newMeals] }
    } else {
      const newExercises = (template.exercises || []).map((e, i) => ({
        id: (now + i).toString(36) + Math.random().toString(36).slice(2),
        completed: false,
        ...e,
      }))
      updated = { ...plan, exercises: [...plan.exercises, ...newExercises] }
    }
    await save(updated)
  }, [plan, save])

  // 复制昨天的计划
  const copyFromDate = useCallback(async (fromDate) => {
    const fromPlan = await db.plans.get(fromDate)
    if (!fromPlan || (!fromPlan.meals?.length && !fromPlan.exercises?.length)) return false

    const newMeals = (fromPlan.meals || []).map(m => ({
      ...m,
      id: Date.now().toString(36) + Math.random().toString(36).slice(2),
      completed: false,
    }))
    const newExercises = (fromPlan.exercises || []).map(e => ({
      ...e,
      id: Date.now().toString(36) + Math.random().toString(36).slice(2),
      completed: false,
    }))

    const updated = {
      ...plan,
      meals: [...plan.meals, ...newMeals],
      exercises: [...plan.exercises, ...newExercises],
    }
    await save(updated)
    return true
  }, [plan, save])

  return {
    plan,
    loading,
    toggleMeal,
    toggleExercise,
    addMeal,
    addExercise,
    removeMeal,
    removeExercise,
    applyTemplate,
    copyFromDate,
    reload: loadPlan,
  }
}

// 获取连续打卡天数的 hook
export function useStreak() {
  const [streakData, setStreakData] = useState({ streak: 0, totalDays: 0, completionRate: 0 })

  const calculate = useCallback(async () => {
    const allPlans = await db.plans.toArray()
    const plansWithContent = allPlans.filter(p => p.meals?.length > 0 || p.exercises?.length > 0)

    if (plansWithContent.length === 0) {
      setStreakData({ streak: 0, totalDays: 0, completionRate: 0 })
      return
    }

    // 总完成天数
    const completedDays = plansWithContent.filter(p => {
      const total = (p.meals?.length || 0) + (p.exercises?.length || 0)
      const done = (p.meals?.filter(m => m.completed)?.length || 0) + (p.exercises?.filter(e => e.completed)?.length || 0)
      return total > 0 && done === total
    })

    // 连续打卡天数（从今天往回数）
    let streak = 0
    const todayStr = getToday()
    const today = new Date(todayStr)

    for (let i = 0; i < 365; i++) {
      const d = new Date(today)
      d.setDate(d.getDate() - i)
      const ds = d.toISOString().split('T')[0]
      const p = allPlans.find(pl => pl.date === ds)

      if (!p || !p.meals?.length && !p.exercises?.length) {
        // 没有计划的日子不打断连续（可能还没开始用）
        if (i > 7) break // 超过7天没记录就停止
        continue
      }

      const total = (p.meals?.length || 0) + (p.exercises?.length || 0)
      const done = (p.meals?.filter(m => m.completed)?.length || 0) + (p.exercises?.filter(e => e.completed)?.length || 0)

      if (total > 0 && done === total) {
        streak++
      } else {
        break
      }
    }

    setStreakData({
      streak,
      totalDays: completedDays.length,
      completionRate: plansWithContent.length > 0
        ? Math.round((completedDays.length / plansWithContent.length) * 100)
        : 0,
    })
  }, [])

  useEffect(() => { calculate() }, [calculate])

  return { ...streakData, refresh: calculate }
}
