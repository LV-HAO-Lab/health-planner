import { useState } from 'react'
import DaySummary from './DaySummary'
import MealCard from './MealCard'
import ExerciseCard from './ExerciseCard'
import ProgressBar from './ProgressBar'
import TemplateSelector from './TemplateSelector'
import AddMealForm from './AddMealForm'
import AddExerciseForm from './AddExerciseForm'
import { MEAL_TYPE_LABELS } from '../hooks/useSettings'
import { sendNotification, getReminderMessage } from '../utils/notifications'

export default function TodayOverview({
  plan,
  templates,
  settings,
  onToggleMeal,
  onToggleExercise,
  onAddMeal,
  onAddExercise,
  onRemoveMeal,
  onRemoveExercise,
  onApplyTemplate,
  onCopyFromDate,
  onOpenSettings,
  streakData,
}) {
  const [showTemplateSelector, setShowTemplateSelector] = useState(false)
  const [showAddMeal, setShowAddMeal] = useState(false)
  const [showAddExercise, setShowAddExercise] = useState(false)

  if (!plan) return null

  const totalMeals = plan.meals?.length || 0
  const doneMeals = plan.meals?.filter(m => m.completed).length || 0
  const totalExercises = plan.exercises?.length || 0
  const doneExercises = plan.exercises?.filter(e => e.completed).length || 0

  const uncompletedMeals = plan.meals?.filter(m => !m.completed) || []
  const uncompletedExercises = plan.exercises?.filter(e => !e.completed) || []

  const mealTypes = settings.mealTypes || ['breakfast', 'lunch', 'dinner', 'snack']

  return (
    <div className="flex-1 overflow-y-auto hide-scrollbar pb-4">
      {/* 统计卡片 */}
      <div className="mx-4 mt-3 p-4 bg-white rounded-2xl border border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-semibold text-gray-800">今日概览</h2>
          <div className="flex gap-2">
            <button
              onClick={onOpenSettings}
              className="p-2 text-gray-400 hover:text-gray-600"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
            </button>
          </div>
        </div>

        <DaySummary plan={plan} />

        {/* 连续打卡 */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          <div className="text-center p-2 bg-green-50 rounded-xl">
            <div className="text-xl font-bold text-green-600">{streakData.streak}</div>
            <div className="text-xs text-green-500">连续天数</div>
          </div>
          <div className="text-center p-2 bg-orange-50 rounded-xl">
            <div className="text-xl font-bold text-orange-500">{streakData.totalDays}</div>
            <div className="text-xs text-orange-400">全勤天数</div>
          </div>
          <div className="text-center p-2 bg-blue-50 rounded-xl">
            <div className="text-xl font-bold text-blue-500">{streakData.completionRate}%</div>
            <div className="text-xs text-blue-400">完成率</div>
          </div>
        </div>

        {/* 🍽️ 饮食 */}
        <div className="mb-3">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-gray-700">🍽️ 饮食</h3>
            <ProgressBar done={doneMeals} total={totalMeals} />
          </div>
          {plan.meals?.length > 0 ? (
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
          ) : (
            <p className="text-sm text-gray-300 text-center py-3">暂无饮食计划</p>
          )}
        </div>

        {/* 🏃 锻炼 */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-gray-700">🏃 锻炼</h3>
            <ProgressBar done={doneExercises} total={totalExercises} />
          </div>
          {plan.exercises?.length > 0 ? (
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
          ) : (
            <p className="text-sm text-gray-300 text-center py-3">暂无锻炼计划</p>
          )}
        </div>
      </div>

      {/* 快捷操作 */}
      <div className="mx-4 mt-3 flex gap-2">
        <button
          onClick={() => setShowAddMeal(true)}
          className="flex-1 py-3 rounded-xl bg-green-50 text-green-600 text-sm font-medium hover:bg-green-100 transition-colors"
        >
          🍽️ 加餐食
        </button>
        <button
          onClick={() => setShowAddExercise(true)}
          className="flex-1 py-3 rounded-xl bg-orange-50 text-orange-600 text-sm font-medium hover:bg-orange-100 transition-colors"
        >
          🏃 加锻炼
        </button>
        <button
          onClick={() => onCopyFromDate().then(success => {
            if (success) {
              sendNotification('健康计划', { body: '已复制昨天的计划到今天' })
            }
          })}
          className="flex-1 py-3 rounded-xl bg-blue-50 text-blue-600 text-sm font-medium hover:bg-blue-100 transition-colors"
        >
          📋 复制昨天
        </button>
        <button
          onClick={() => setShowTemplateSelector(true)}
          className="flex-1 py-3 rounded-xl bg-purple-50 text-purple-600 text-sm font-medium hover:bg-purple-100 transition-colors"
        >
          📁 模板
        </button>
      </div>

      {/* 弹窗 */}
      {showTemplateSelector && (
        <TemplateSelector
          templates={templates}
          onApply={onApplyTemplate}
          onClose={() => setShowTemplateSelector(false)}
        />
      )}
      {showAddMeal && (
        <AddMealForm
          mealTypes={mealTypes}
          onAdd={onAddMeal}
          onClose={() => setShowAddMeal(false)}
        />
      )}
      {showAddExercise && (
        <AddExerciseForm
          onAdd={onAddExercise}
          onClose={() => setShowAddExercise(false)}
        />
      )}
    </div>
  )
}
