// 推送通知管理
// 注意：推送通知需要 HTTPS，localhost 也支持

export async function requestPermission() {
  if (!('Notification' in window)) return 'denied'
  if (Notification.permission === 'granted') return 'granted'
  if (Notification.permission === 'denied') return 'denied'
  const result = await Notification.requestPermission()
  return result
}

export function sendNotification(title, options = {}) {
  if (!('Notification' in window)) return
  if (Notification.permission !== 'granted') return

  const opts = {
    icon: '/icons/icon.svg',
    badge: '/icons/icon.svg',
    tag: 'health-planner',
    ...options,
  }

  return new Notification(title, opts)
}

// 检查是否应该发送提醒
export function shouldRemind(plan, reminderTime) {
  if (!plan || !reminderTime) return false

  // 检查是否有未完成项目
  const hasUncompleted =
    plan.meals?.some(m => !m.completed) ||
    plan.exercises?.some(e => !e.completed)

  // 检查是否有任何计划
  const hasAny =
    plan.meals?.length > 0 || plan.exercises?.length > 0

  return hasAny && hasUncompleted
}

// 获取提醒消息
export function getReminderMessage(plan) {
  const uncompletedMeals = plan.meals?.filter(m => !m.completed) || []
  const uncompletedExercises = plan.exercises?.filter(e => !e.completed) || []

  let msg = ''
  if (uncompletedMeals.length > 0) {
    msg += `🍽️ ${uncompletedMeals.length}餐未打卡`
  }
  if (uncompletedExercises.length > 0) {
    if (msg) msg += '，'
    msg += `🏃 ${uncompletedExercises.length}项锻炼未完成`
  }

  return msg ? `${msg}，别忘了哦！` : ''
}
