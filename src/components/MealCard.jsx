import { MEAL_TYPE_LABELS } from '../hooks/useSettings'

export default function MealCard({ meal, onToggle, onDelete, onEdit }) {
  return (
    <div
      className={`flex items-center gap-3 p-3 rounded-xl border transition-all active:scale-[0.98] ${
        meal.completed
          ? 'bg-green-50 border-green-200'
          : 'bg-white border-gray-100'
      }`}
    >
      {/* 打卡按钮 */}
      <button
        onClick={() => onToggle(meal.id)}
        className={`w-7 h-7 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
          meal.completed
            ? 'bg-green-500 border-green-500 text-white check-animation'
            : 'border-gray-300 hover:border-green-400'
        }`}
      >
        {meal.completed && (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </button>

      {/* 内容 */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className={`text-xs px-2 py-0.5 rounded-full ${
            meal.completed ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
          }`}>
            {MEAL_TYPE_LABELS[meal.type] || meal.type}
          </span>
          <span className={`text-sm font-medium truncate ${
            meal.completed ? 'text-gray-400 line-through' : 'text-gray-800'
          }`}>
            {meal.name}
          </span>
        </div>
        {meal.foods && meal.foods.length > 0 && (
          <p className={`text-xs mt-1 truncate ${
            meal.completed ? 'text-gray-300' : 'text-gray-400'
          }`}>
            {meal.foods.join(' / ')}
          </p>
        )}
      </div>

      {/* 操作按钮 */}
      <div className="flex gap-1 flex-shrink-0">
        {onEdit && (
          <button onClick={() => onEdit(meal)} className="p-1.5 text-gray-400 hover:text-gray-600">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </button>
        )}
        <button onClick={() => onDelete(meal.id)} className="p-1.5 text-gray-400 hover:text-red-500">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    </div>
  )
}
