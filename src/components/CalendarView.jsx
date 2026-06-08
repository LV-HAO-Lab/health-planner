import { getCalendarMonth, today as getToday, formatDate } from '../utils/date'

export default function CalendarView({ currentDate, onSelectDate, planDates }) {
  const weeks = getCalendarMonth(currentDate)
  const todayStr = getToday()

  return (
    <div>
      {/* 星期标题 */}
      <div className="grid grid-cols-7 mb-1">
        {['日', '一', '二', '三', '四', '五', '六'].map(d => (
          <div key={d} className="text-center text-xs text-gray-400 py-1">{d}</div>
        ))}
      </div>

      {/* 日期格子 */}
      {weeks.map((week, wi) => (
        <div key={wi} className="grid grid-cols-7">
          {week.map((day, di) => {
            const hasPlan = planDates.has(day.date)
            const isToday = day.date === todayStr
            const isSelected = day.date === currentDate
            const isCurrentMonth = day.isCurrentMonth

            return (
              <button
                key={di}
                onClick={() => onSelectDate(day.date)}
                className={`relative aspect-square flex flex-col items-center justify-center text-sm transition-colors rounded-lg ${
                  !isCurrentMonth ? 'text-gray-300' : 'text-gray-700'
                } ${isSelected ? 'bg-green-500 text-white font-semibold' : ''} ${
                  isToday && !isSelected ? 'text-green-600 font-semibold' : ''
                }`}
              >
                <span>{day.day}</span>
                {hasPlan && (
                  <span className={`w-1 h-1 rounded-full mt-0.5 ${
                    isSelected ? 'bg-white' : 'bg-green-400'
                  }`} />
                )}
              </button>
            )
          })}
        </div>
      ))}
    </div>
  )
}
