import { useState } from 'react'
import ExerciseCard from './ExerciseCard'
import AddExerciseForm from './AddExerciseForm'
import TemplateSelector from './TemplateSelector'
import DateNavigator from './DateNavigator'

export default function ExercisePlan({
  plan,
  selectedDate,
  onDateChange,
  templates,
  onToggleExercise,
  onAddExercise,
  onRemoveExercise,
  onApplyTemplate,
  onCopyFromDate,
}) {
  const [showAddExercise, setShowAddExercise] = useState(false)
  const [showTemplateSelector, setShowTemplateSelector] = useState(false)
  const [editExercise, setEditExercise] = useState(null)

  if (!plan) return null

  const exerciseTemplates = templates.filter(t => t.type === 'exercise')

  return (
    <div className="flex-1 overflow-y-auto hide-scrollbar pb-4">
      {/* 日期选择器 */}
      <DateNavigator currentDate={selectedDate || plan.date} onDateChange={onDateChange} />

      {/* 操作栏 */}
      <div className="mx-4 mt-3 flex gap-2">
        <button
          onClick={() => setShowTemplateSelector(true)}
          className="flex-1 py-2.5 rounded-xl bg-purple-50 text-purple-600 text-sm font-medium hover:bg-purple-100 transition-colors"
        >
          📁 从模板添加
        </button>
        <button
          onClick={() => setShowAddExercise(true)}
          className="flex-1 py-2.5 rounded-xl bg-orange-50 text-orange-600 text-sm font-medium hover:bg-orange-100 transition-colors"
        >
          ✏️ 手动添加
        </button>
        <button
          onClick={onCopyFromDate}
          className="flex-1 py-2.5 rounded-xl bg-blue-50 text-blue-600 text-sm font-medium hover:bg-blue-100 transition-colors"
        >
          📋 前一天
        </button>
      </div>

      {/* 训练列表 */}
      <div className="mx-4 mt-4">
        {plan.exercises?.length > 0 ? (
          <div className="space-y-1.5">
            {plan.exercises.map(e => (
              <ExerciseCard
                key={e.id}
                exercise={e}
                onToggle={onToggleExercise}
                onDelete={onRemoveExercise}
                onEdit={setEditExercise}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-4xl mb-3">🏋️</p>
            <p className="text-sm text-gray-400">还没有训练计划</p>
            <p className="text-xs text-gray-300 mt-1">点击上方按钮添加</p>
          </div>
        )}

        {/* 训练提示 */}
        {plan.exercises?.length > 0 && (
          <div className="mt-4 p-3 bg-gray-50 rounded-xl">
            <p className="text-xs text-gray-400">
              💡 点击圆形按钮打卡完成每组训练。绿色=已完成，灰色=待完成。
            </p>
          </div>
        )}
      </div>

      {/* 弹窗 */}
      {showTemplateSelector && (
        <TemplateSelector
          templates={exerciseTemplates}
          onApply={onApplyTemplate}
          onClose={() => setShowTemplateSelector(false)}
        />
      )}
      {showAddExercise && (
        <AddExerciseForm
          onAdd={onAddExercise}
          onClose={() => setShowAddExercise(false)}
        />
      )}
      {editExercise && (
        <AddExerciseForm
          onAdd={(updated) => {
            onRemoveExercise(editExercise.id)
            onAddExercise(updated)
          }}
          onClose={() => setEditExercise(null)}
          initial={editExercise}
        />
      )}
    </div>
  )
}
