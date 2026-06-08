export default function TemplateSelector({ templates, onApply, onClose }) {
  const dietTemplates = templates.filter(t => t.type === 'diet')
  const exerciseTemplates = templates.filter(t => t.type === 'exercise')

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40" onClick={onClose}>
      <div
        className="w-full max-w-lg bg-white rounded-t-2xl p-5 safe-bottom max-h-[70vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-4">从模板添加</h3>

        <div className="flex-1 overflow-y-auto space-y-4 hide-scrollbar">
          {dietTemplates.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-2">🍽️ 饮食模板</h4>
              <div className="space-y-2">
                {dietTemplates.map((t, i) => (
                  <button
                    key={t.id || i}
                    onClick={() => { onApply(t); onClose() }}
                    className="w-full text-left p-3 rounded-xl border border-gray-100 hover:border-green-300 hover:bg-green-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-800">{t.name}</span>
                      {t._builtin && <span className="text-[10px] px-1.5 py-0.5 bg-gray-100 text-gray-400 rounded">内置</span>}
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      {(t.meals || []).map(m => m.name).join(' · ')}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {exerciseTemplates.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-2">🏃 锻炼模板</h4>
              <div className="space-y-2">
                {exerciseTemplates.map((t, i) => (
                  <button
                    key={t.id || i}
                    onClick={() => { onApply(t); onClose() }}
                    className="w-full text-left p-3 rounded-xl border border-gray-100 hover:border-green-300 hover:bg-green-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-800">{t.name}</span>
                      {t._builtin && <span className="text-[10px] px-1.5 py-0.5 bg-gray-100 text-gray-400 rounded">内置</span>}
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      {(t.exercises || []).map(e => e.name).join(' · ')}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {templates.length === 0 && (
            <p className="text-center text-gray-400 text-sm py-8">暂无模板</p>
          )}
        </div>

        <button
          onClick={onClose}
          className="mt-4 w-full py-3 rounded-xl bg-gray-100 text-gray-500 text-sm font-medium"
        >
          取消
        </button>
      </div>
    </div>
  )
}
