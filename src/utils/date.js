// 获取今天的日期字符串
export function today() {
  return formatDate(new Date())
}

// 格式化日期为 YYYY-MM-DD
export function formatDate(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

// 获取中文星期几
export function weekdayCN(dateStr) {
  const d = new Date(dateStr)
  const days = ['日', '一', '二', '三', '四', '五', '六']
  return `星期${days[d.getDay()]}`
}

// 格式化显示日期
export function displayDate(dateStr) {
  const d = new Date(dateStr)
  return `${d.getMonth() + 1}月${d.getDate()}日`
}

// 获取当前周的所有日期
export function getWeekDates(dateStr) {
  const d = new Date(dateStr)
  const day = d.getDay() || 7 // 周日视为7
  const monday = new Date(d)
  monday.setDate(d.getDate() - day + 1)

  const dates = []
  for (let i = 0; i < 7; i++) {
    const dd = new Date(monday)
    dd.setDate(monday.getDate() + i)
    dates.push(formatDate(dd))
  }
  return dates
}

// 获取上个月到下个月共6周的日期列表（用于日历视图）
export function getCalendarMonth(dateStr) {
  const d = new Date(dateStr)
  const year = d.getFullYear()
  const month = d.getMonth()

  // 本月第一天
  const firstDay = new Date(year, month, 1)
  const startDay = firstDay.getDay() // 0=周日

  // 从本月第一天往前推
  const start = new Date(firstDay)
  start.setDate(firstDay.getDate() - startDay)

  const weeks = []
  for (let w = 0; w < 6; w++) {
    const week = []
    for (let i = 0; i < 7; i++) {
      const dd = new Date(start)
      dd.setDate(start.getDate() + w * 7 + i)
      week.push({
        date: formatDate(dd),
        day: dd.getDate(),
        isCurrentMonth: dd.getMonth() === month,
        isToday: formatDate(dd) === today(),
      })
    }
    weeks.push(week)
  }
  return weeks
}
