export default function TabBar({ activeTab, onTabChange }) {
  const tabs = [
    { key: 'overview', label: '今日', icon: '🏠' },
    { key: 'diet', label: '饮食', icon: '🍽️' },
    { key: 'exercise', label: '锻炼', icon: '🏃' },
    { key: 'history', label: '记录', icon: '📊' },
  ]

  return (
    <nav className="flex-shrink-0 bg-white border-t border-gray-100 safe-bottom">
      <div className="flex">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => onTabChange(tab.key)}
            className={`flex-1 flex flex-col items-center py-2 text-xs transition-colors ${
              activeTab === tab.key
                ? 'text-green-600'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <span className="text-xl mb-0.5">{tab.icon}</span>
            <span className={activeTab === tab.key ? 'font-medium' : ''}>
              {tab.label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  )
}
