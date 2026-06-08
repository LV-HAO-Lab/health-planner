import { useState } from 'react'
import MealCard from './MealCard'
import AddMealForm from './AddMealForm'
import TemplateSelector from './TemplateSelector'
import { MEAL_TYPE_LABELS } from '../hooks/useSettings'

export default function DietPlan({
  plan,
  templates,
  settings,
  onToggleMeal,
  onAddMeal,
  onRemoveMeal,
  onApplyTemplate,
  onCopyFromDate,
}) {
  const [showAddMeal, setShowAddMeal] = useState(false)
  const [showTemplateSelector, setShowTemplateSelector] = useState(false)
  const [editMeal, setEditMeal] = useState(null)

  if (!plan) return null

  const mealTypes = settings.mealTypes || ['breakfast', 'lunch', 'dinner', 'snack']
  const groupedMeals = {}
  mealTypes.forEach(t => { groupedMeals[t] = [] })
  plan.meals?.forEach(m => {
    if (!groupedMeals[m.type]) groupedMeals[m.type] = []
    groupedMeals[m.type].push(m)
  })

  const dietTemplates = templates.filter(t => t.type === 'diet')

  return (
    <div className="flex-1 overflow-y-auto hide-scrollbar pb-4">
      {/* 操作栏 */}
      <div className="mx-4 mt-3 flex gap-2">
        <button
          onClick={() => setShowTemplateSelector(true)}
          className="flex-1 py-2.5 rounded-xl bg-purple-50 text-purple-600 text-sm font-medium hover:bg-purple-100 transition-colors"
        >
          📁 从模板添加
        </button>
        <button
          onClick={() => setShowAddMeal(true)}
          className="flex-1 py-2.5 rounded-xl bg-green-50 text-green-600 text-sm font-medium hover:bg-green-100 transition-colors"
        >
          ✏️ 手动添加
        </button>
        <button
          onClick={onCopyFromDate}
          className="flex-1 py-2.5 rounded-xl bg-blue-50 text-blue-600 text-sm font-medium hover:bg-blue-100 transition-colors"
        >
          📋 复制昨天
        </button>
      </div>

      {/* 按餐食类型分组 */}
      <div className="mx-4 mt-4 space-y-4">
        {mealTypes.map(type => {
          const meals = groupedMeals[type] || []
          return (
            <div key={type}>
              <h3 className="text-sm font-semibold text-gray-500 mb-2 flex items-center gap-2">
                {type === 'breakfast' ? '🌅' : type === 'lunch' ? '☀️' : type === 'dinner' ? '🌙' : '🍪'}
                {MEAL_TYPE_LABELS[type] || type}
                <span className="text-xs text-gray-300 font-normal">
                  {meals.length}项
                </span>
              </h3>
              {meals.length > 0 ? (
                <div className="space-y-1.5">
                  {meals.map(m => (
                    <MealCard
                      key={m.id}
                      meal={m}
                      onToggle={onToggleMeal}
                      onDelete={onRemoveMeal}
                      onEdit={setEditMeal}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-300 pl-6 py-2">
                  暂无，点击上方按钮添加
                </p>
              )}
            </div>
          )
        })}
      </div>

      {/* 弹窗 */}
      {showTemplateSelector && (
        <TemplateSelector
          templates={dietTemplates}
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
      {editMeal && (
        <AddMealForm
          mealTypes={mealTypes}
          onAdd={(updated) => {
            onRemoveMeal(editMeal.id)
            onAddMeal(updated)
          }}
          onClose={() => setEditMeal(null)}
          initial={editMeal}
        />
      )}
    </div>
  )
}
