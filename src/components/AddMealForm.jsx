import { useState } from 'react'
import { MEAL_TYPE_LABELS } from '../hooks/useSettings'

export default function AddMealForm({ mealTypes, onAdd, onClose, initial }) {
  const [type, setType] = useState(initial?.type || mealTypes[0] || 'breakfast')
  const [name, setName] = useState(initial?.name || '')
  const [foodsText, setFoodsText] = useState(initial?.foods?.join('、') || '')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim()) return
    onAdd({
      type,
      name: name.trim(),
      foods: foodsText.split(/[、,，\n]/).map(f => f.trim()).filter(Boolean),
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40" onClick={onClose}>
      <div
        className="w-full max-w-lg bg-white rounded-t-2xl p-5 safe-bottom animate-[slideUp_0.2s_ease-out]"
        onClick={e => e.stopPropagation()}
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          {initial ? '编辑餐食' : '添加餐食'}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 餐食类型 */}
          <div>
            <label className="text-xs text-gray-400 mb-1.5 block">类型</label>
            <div className="flex gap-2 flex-wrap">
              {mealTypes.map(t => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setType(t)}
                  className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                    type === t
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
                >
                  {MEAL_TYPE_LABELS[t] || t}
                </button>
              ))}
            </div>
          </div>

          {/* 名称 */}
          <div>
            <label className="text-xs text-gray-400 mb-1.5 block">食物名称</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="如：鸡胸肉沙拉"
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-green-400"
              autoFocus
            />
          </div>

          {/* 食材列表 */}
          <div>
            <label className="text-xs text-gray-400 mb-1.5 block">
              食材清单（用逗号或顿号分隔）
            </label>
            <textarea
              value={foodsText}
              onChange={e => setFoodsText(e.target.value)}
              placeholder="如：鸡胸肉、生菜、番茄、橄榄油"
              rows={2}
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-green-400 resize-none"
            />
          </div>

          {/* 按钮 */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl bg-gray-100 text-gray-500 text-sm font-medium"
            >
              取消
            </button>
            <button
              type="submit"
              className="flex-1 py-3 rounded-xl bg-green-500 text-white text-sm font-medium hover:bg-green-600"
            >
              {initial ? '保存' : '添加'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
