import { displayDate, weekdayCN, today as getToday } from '../utils/date'

export default function DateNavigator({ currentDate, onDateChange }) {
  const todayStr = getToday()
  const isToday = currentDate === todayStr

  const goToPrev = () => {
    const d = new Date(currentDate)
    d.setDate(d.getDate() - 1)
    onDateChange(d.toISOString().split('T')[0])
  }

  const goToNext = () => {
    const d = new Date(currentDate)
    d.setDate(d.getDate() + 1)
    onDateChange(d.toISOString().split('T')[0])
  }

  const goToToday = () => {
    onDateChange(todayStr)
  }

  return (
    <div className="flex items-center justify-between px-4 py-2.5 bg-white border-b border-gray-100">
      <button onClick={goToPrev} className="p-1.5 text-gray-400 hover:text-gray-600">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <button onClick={goToToday} className="flex flex-col items-center">
        <span className="text-sm font-medium text-gray-700">
          {displayDate(currentDate)} {weekdayCN(currentDate)}
        </span>
        {!isToday && (
          <span className="text-xs text-green-500 mt-0.5">回到今天</span>
        )}
      </button>

      <button onClick={goToNext} className="p-1.5 text-gray-400 hover:text-gray-600">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </div>
  )
}
