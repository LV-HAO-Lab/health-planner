export default function ExerciseCard({ exercise, onToggle, onDelete, onEdit }) {
  return (
    <div
      className={`flex items-center gap-3 p-3 rounded-xl border transition-all active:scale-[0.98] ${
        exercise.completed
          ? 'bg-green-50 border-green-200'
          : 'bg-white border-gray-100'
      }`}
    >
      {/* 打卡按钮 */}
      <button
        onClick={() => onToggle(exercise.id)}
        className={`w-7 h-7 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
          exercise.completed
            ? 'bg-green-500 border-green-500 text-white check-animation'
            : 'border-gray-300 hover:border-green-400'
        }`}
      >
        {exercise.completed && (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </button>

      {/* 内容 */}
      <div className="flex-1 min-w-0">
        <span className={`text-sm font-medium truncate block ${
          exercise.completed ? 'text-gray-400 line-through' : 'text-gray-800'
        }`}>
          {exercise.name}
        </span>
        <span className={`text-xs ${
          exercise.completed ? 'text-gray-300' : 'text-gray-400'
        }`}>
          {exercise.duration > 0
            ? `${exercise.sets ? exercise.sets + '组 · ' : ''}${exercise.duration}${exercise.unit || '分钟'}`
            : `${exercise.sets ? exercise.sets + '组 × ' : ''}${exercise.reps ? exercise.reps + '次' : ''}`
          }
          {exercise.note && ` — ${exercise.note}`}
        </span>
      </div>

      {/* 操作按钮 */}
      <div className="flex gap-1 flex-shrink-0">
        {onEdit && (
          <button onClick={() => onEdit(exercise)} className="p-1.5 text-gray-400 hover:text-gray-600">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </button>
        )}
        <button onClick={() => onDelete(exercise.id)} className="p-1.5 text-gray-400 hover:text-red-500">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    </div>
  )
}
