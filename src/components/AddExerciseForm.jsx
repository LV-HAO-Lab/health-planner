import { useState } from 'react'

export default function AddExerciseForm({ onAdd, onClose, initial }) {
  const [name, setName] = useState(initial?.name || '')
  const [sets, setSets] = useState(initial?.sets || 3)
  const [reps, setReps] = useState(initial?.reps || 12)
  const [duration, setDuration] = useState(initial?.duration || 0)
  const [unit, setUnit] = useState(initial?.unit || '')
  const [note, setNote] = useState(initial?.note || '')
  const [isTimed, setIsTimed] = useState(!!initial?.duration)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim()) return
    onAdd({
      name: name.trim(),
      sets: isTimed ? (sets || 1) : sets,
      reps: isTimed ? 0 : reps,
      duration: isTimed ? duration : 0,
      unit: isTimed ? (unit || '分钟') : '',
      note: note.trim(),
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
          {initial ? '编辑锻炼' : '添加锻炼'}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 名称 */}
          <div>
            <label className="text-xs text-gray-400 mb-1.5 block">动作名称</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="如：俯卧撑"
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-green-400"
              autoFocus
            />
          </div>

          {/* 计时 or 计数 */}
          <div>
            <label className="text-xs text-gray-400 mb-1.5 block">训练方式</label>
            <div className="flex gap-2 mb-3">
              <button
                type="button"
                onClick={() => setIsTimed(false)}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  !isTimed ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-500'
                }`}
              >
                按次数
              </button>
              <button
                type="button"
                onClick={() => setIsTimed(true)}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  isTimed ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-500'
                }`}
              >
                按时间
              </button>
            </div>

            {isTimed ? (
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="text-xs text-gray-400 mb-1 block">组数</label>
                  <input
                    type="number" min="1" max="20"
                    value={sets}
                    onChange={e => setSets(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-green-400"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-xs text-gray-400 mb-1 block">时长</label>
                  <input
                    type="number" min="1"
                    value={duration}
                    onChange={e => setDuration(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-green-400"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-400 mb-1 block">单位</label>
                  <input
                    type="text"
                    value={unit}
                    onChange={e => setUnit(e.target.value)}
                    placeholder="分钟/秒"
                    className="w-20 px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-green-400"
                  />
                </div>
              </div>
            ) : (
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="text-xs text-gray-400 mb-1 block">组数</label>
                  <input
                    type="number" min="1" max="20"
                    value={sets}
                    onChange={e => setSets(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-green-400"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-xs text-gray-400 mb-1 block">每组次数</label>
                  <input
                    type="number" min="1" max="100"
                    value={reps}
                    onChange={e => setReps(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-green-400"
                  />
                </div>
              </div>
            )}
          </div>

          {/* 备注 */}
          <div>
            <label className="text-xs text-gray-400 mb-1.5 block">备注（可选）</label>
            <input
              type="text"
              value={note}
              onChange={e => setNote(e.target.value)}
              placeholder="如：保持背部挺直"
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-green-400"
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
