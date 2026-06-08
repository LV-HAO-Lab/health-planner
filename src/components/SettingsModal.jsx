import { useState } from 'react'
import {
  requestPermission,
  supportsNotifications,
  getNotAvailableReason,
  isIOS,
  isStandalone,
} from '../utils/notifications'

export default function SettingsModal({ settings, onSave, onClose }) {
  const [morningReminder, setMorningReminder] = useState(settings.morningReminder || '08:00')
  const [eveningReminder, setEveningReminder] = useState(settings.eveningReminder || '20:00')
  const [notifyStatus, setNotifyStatus] = useState(
    supportsNotifications() ? Notification.permission : 'unsupported'
  )
  const [requesting, setRequesting] = useState(false)

  const handleRequestPermission = async () => {
    setRequesting(true)
    const result = await requestPermission()
    setNotifyStatus(result)
    setRequesting(false)
  }

  const handleSave = () => {
    onSave({ morningReminder, eveningReminder })
    onClose()
  }

  const reason = getNotAvailableReason()

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40" onClick={onClose}>
      <div
        className="w-full max-w-lg bg-white rounded-t-2xl p-5 safe-bottom max-h-[85vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-4">⚙️ 设置</h3>

        <div className="space-y-5">
          {/* 通知权限 */}
          <div>
            <label className="text-xs text-gray-400 mb-1.5 block">通知权限</label>

            {/* 状态显示 */}
            <div className="p-3 bg-gray-50 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  {notifyStatus === 'granted'
                    ? '✅ 通知已开启'
                    : notifyStatus === 'denied'
                      ? '❌ 通知已拒绝'
                      : notifyStatus === 'unsupported'
                        ? '🚫 当前环境不支持通知'
                        : '⚠️ 通知未开启'}
                </span>

                {notifyStatus === 'granted' ? null : notifyStatus === 'denied' ? (
                  <button
                    onClick={handleRequestPermission}
                    disabled={requesting}
                    className="text-sm text-orange-500 font-medium"
                  >
                    {requesting ? '请求中...' : '重新请求'}
                  </button>
                ) : notifyStatus !== 'unsupported' ? (
                  <button
                    onClick={handleRequestPermission}
                    disabled={requesting}
                    className="text-sm text-green-600 font-medium px-3 py-1 bg-green-50 rounded-lg"
                  >
                    {requesting ? '请求中...' : '开启通知'}
                  </button>
                ) : null}
              </div>

              {/* 不可用原因说明 */}
              {reason && (
                <p className="text-xs text-orange-500 bg-orange-50 p-2 rounded-lg">
                  {reason}
                </p>
              )}

              {/* iOS 特别提示 */}
              {isIOS() && !isStandalone() && (
                <div className="text-xs text-blue-600 bg-blue-50 p-2 rounded-lg space-y-1">
                  <p className="font-medium">📱 iOS 开启通知的步骤：</p>
                  <p>1. 在 Safari 中点底部「分享」按钮</p>
                  <p>2. 选择「添加到主屏幕」</p>
                  <p>3. 从桌面图标打开应用</p>
                  <p>4. 再回来这里点「开启通知」</p>
                </div>
              )}

              {/* 已拒绝提示 */}
              {notifyStatus === 'denied' && (
                <div className="text-xs text-gray-500 bg-gray-100 p-2 rounded-lg space-y-1">
                  <p className="font-medium">已拒绝怎么办？</p>
                  {isIOS() ? (
                    <p>iPhone：设置 → Safari → 网站通知 → 找到本站开启。</p>
                  ) : (
                    <p>Chrome：点击地址栏左边的小锁图标 → 通知 → 允许。</p>
                  )}
                  <p>或者点上面「重新请求」按钮再试一次。</p>
                </div>
              )}
            </div>
          </div>

          {/* 提醒时间 */}
          <div>
            <label className="text-xs text-gray-400 mb-1.5 block">早上提醒时间</label>
            <input
              type="time"
              value={morningReminder}
              onChange={e => setMorningReminder(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-green-400"
            />
          </div>

          <div>
            <label className="text-xs text-gray-400 mb-1.5 block">晚上提醒时间</label>
            <input
              type="time"
              value={eveningReminder}
              onChange={e => setEveningReminder(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-green-400"
            />
          </div>

          <p className="text-xs text-gray-400">
            💡 提醒仅在当天有计划且未全部完成时发送。如果当天全部打卡完成则不会发送提醒。
          </p>
        </div>

        <div className="flex gap-3 mt-5">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl bg-gray-100 text-gray-500 text-sm font-medium"
          >
            取消
          </button>
          <button
            onClick={handleSave}
            className="flex-1 py-3 rounded-xl bg-green-500 text-white text-sm font-medium hover:bg-green-600"
          >
            保存
          </button>
        </div>
      </div>
    </div>
  )
}
