// 推送通知管理
// 注意：iOS Safari 必须将 PWA 添加到主屏幕后才支持通知（iOS 16.4+）

// 检测是否为 iOS
export function isIOS() {
  return /iPhone|iPad|iPod/.test(navigator.userAgent)
}

// 检测是否支持通知
export function supportsNotifications() {
  return 'Notification' in window && typeof Notification.requestPermission === 'function'
}

// 检测是否为独立模式（已添加到桌面）
export function isStandalone() {
  return window.matchMedia('(display-mode: standalone)').matches
    || navigator.standalone
    || document.referrer.includes('android-app://')
}

// 获取通知不可用的原因
export function getNotAvailableReason() {
  if (!('Notification' in window)) {
    return '此浏览器不支持通知功能'
  }
  if (typeof Notification.requestPermission !== 'function') {
    return '此浏览器不支持请求通知权限'
  }
  if (isIOS() && !isStandalone()) {
    return 'iOS 需要先将应用添加到主屏幕才能开启通知'
  }
  if (Notification.permission === 'denied') {
    return '通知权限已被拒绝，请在浏览器设置中手动开启'
  }
  return null
}

export async function requestPermission() {
  if (!supportsNotifications()) return 'unsupported'
  if (Notification.permission === 'granted') return 'granted'
  if (Notification.permission === 'denied') return 'denied'

  try {
    const result = await Notification.requestPermission()
    return result
  } catch (e) {
    console.error('Notification permission request failed:', e)
    return 'denied'
  }
}

export function sendNotification(title, options = {}) {
  if (!supportsNotifications()) return
  if (Notification.permission !== 'granted') return

  try {
    const opts = {
      icon: '/icons/icon.svg',
      badge: '/icons/icon.svg',
      tag: 'health-planner',
      ...options,
    }
    return new Notification(title, opts)
  } catch (e) {
    console.error('Failed to send notification:', e)
  }
}

// 检查是否应该发送提醒
export function shouldRemind(plan, reminderTime) {
  if (!plan || !reminderTime) return false

  const hasUncompleted =
    plan.meals?.some(m => !m.completed) ||
    plan.exercises?.some(e => !e.completed)

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
