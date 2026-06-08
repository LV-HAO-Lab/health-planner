import { useState } from 'react'
import { requestPermission } from '../utils/notifications'

export default function SettingsModal({ settings, onSave, onClose }) {
  const [morningReminder, setMorningReminder] = useState(settings.morningReminder || '08:00')
  const [eveningReminder, setEveningReminder] = useState(settings.eveningReminder || '20:00')
  const [notifyStatus, setNotifyStatus] = useState(
    'Notification' in window ? Notification.permission : 'denied'
  )

  const handleRequestPermission = async () => {
    const result = await requestPermission()
    setNotifyStatus(result)
  }

  const handleSave = () => {
    onSave({ morningReminder, eveningReminder })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40" onClick={onClose}>
      <div
        className="w-full max-w-lg bg-white rounded-t-2xl p-5 safe-bottom"
        onClick={e => e.stopPropagation()}
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-4">⚙️ 设置</h3>

        <div className="space-y-5">
          {/* 通知权限 */}
          <div>
            <label className="text-xs text-gray-400 mb-1.5 block">通知权限</label>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <span className="text-sm text-gray-600">
                {notifyStatus === 'granted' ? '✅ 已开启' : notifyStatus === 'denied' ? '❌ 已拒绝' : '⚠️ 未设置'}
              </span>
              {notifyStatus !== 'granted' && (
                <button
                  onClick={handleRequestPermission}
                  className="text-sm text-green-600 font-medium"
                >
                  开启通知
                </button>
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
