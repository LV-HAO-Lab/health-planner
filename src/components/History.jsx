import { useState, useEffect, useCallback } from 'react'
import db from '../db/database'
import CalendarView from './CalendarView'
import MealCard from './MealCard'
import ExerciseCard from './ExerciseCard'
import { displayDate, weekdayCN, formatDate } from '../utils/date'

export default function History({
  selectedDate,
  onSelectDate,
  plan,
  onToggleMeal,
  onToggleExercise,
  onRemoveMeal,
  onRemoveExercise,
}) {
  const [planDates, setPlanDates] = useState(new Set())

  // 加载有计划的日期
  const loadPlanDates = useCallback(async () => {
    const allPlans = await db.plans.toArray()
    const dates = new Set(
      allPlans
        .filter(p => p.meals?.length > 0 || p.exercises?.length > 0)
        .map(p => p.date)
    )
    setPlanDates(dates)
  }, [])

  useEffect(() => { loadPlanDates() }, [loadPlanDates])

  if (!plan) return null

  const totalMeals = plan.meals?.length || 0
  const doneMeals = plan.meals?.filter(m => m.completed).length || 0
  const totalExercises = plan.exercises?.length || 0
  const doneExercises = plan.exercises?.filter(e => e.completed).length || 0
  const total = totalMeals + totalExercises
  const done = doneMeals + doneExercises

  return (
    <div className="flex-1 overflow-y-auto hide-scrollbar pb-4">
      {/* 日历 */}
      <div className="mx-4 mt-3 p-4 bg-white rounded-2xl border border-gray-100">
        <CalendarView
          currentDate={selectedDate}
          onSelectDate={onSelectDate}
          planDates={planDates}
        />
      </div>

      {/* 当天详情 */}
      <div className="mx-4 mt-3 p-4 bg-white rounded-2xl border border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-base font-semibold text-gray-800">
              {displayDate(plan.date)} {weekdayCN(plan.date)}
            </h3>
            {total > 0 && (
              <p className="text-xs text-gray-400 mt-0.5">
                完成 {done}/{total} · {
                  total > 0 && done === total ? '✅ 全部完成' :
                  done > 0 ? '🟡 部分完成' : '🔴 未开始'
                }
              </p>
            )}
          </div>
        </div>

        {total === 0 ? (
          <div className="text-center py-8">
            <p className="text-4xl mb-2">📭</p>
            <p className="text-sm text-gray-400">这天没有计划记录</p>
          </div>
        ) : (
          <>
            {/* 饮食 */}
            {plan.meals?.length > 0 && (
              <div className="mb-3">
                <h4 className="text-sm font-semibold text-gray-500 mb-2">🍽️ 饮食 · {doneMeals}/{totalMeals}</h4>
                <div className="space-y-1.5">
                  {plan.meals.map(m => (
                    <MealCard
                      key={m.id}
                      meal={m}
                      onToggle={onToggleMeal}
                      onDelete={onRemoveMeal}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* 锻炼 */}
            {plan.exercises?.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-gray-500 mb-2">🏃 锻炼 · {doneExercises}/{totalExercises}</h4>
                <div className="space-y-1.5">
                  {plan.exercises.map(e => (
                    <ExerciseCard
                      key={e.id}
                      exercise={e}
                      onToggle={onToggleExercise}
                      onDelete={onRemoveExercise}
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
