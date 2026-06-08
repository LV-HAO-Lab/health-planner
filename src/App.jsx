import { useState, useEffect, useCallback, useRef } from 'react'
import { usePlans, useStreak } from './hooks/usePlans'
import { useTemplates } from './hooks/useTemplates'
import { useSettings } from './hooks/useSettings'
import TabBar from './components/TabBar'
import TodayOverview from './components/TodayOverview'
import DietPlan from './components/DietPlan'
import ExercisePlan from './components/ExercisePlan'
import History from './components/History'
import SettingsModal from './components/SettingsModal'
import { today as getToday, formatDate } from './utils/date'
import { requestPermission, shouldRemind, getReminderMessage, sendNotification } from './utils/notifications'

export default function App() {
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedDate, setSelectedDate] = useState(getToday())
  const [showSettings, setShowSettings] = useState(false)

  // 当前查看日期的计划
  const { plan, toggleMeal, toggleExercise, addMeal, addExercise, removeMeal, removeExercise, applyTemplate, copyFromDate, reload } = usePlans(selectedDate)
  const streakData = useStreak()

  // 模板和设置
  const dietTemplates = useTemplates('diet')
  const exerciseTemplates = useTemplates('exercise')
  const { settings, updateSettings } = useSettings()

  // 合并所有模板（用于今日概览的模板选择器）
  const allTemplates = [
    ...dietTemplates.templates.filter(t => t.type === 'diet'),
    ...exerciseTemplates.templates.filter(t => t.type === 'exercise'),
  ]

  // 复制昨天的计划
  const handleCopyFromDate = useCallback(async () => {
    const yesterday = new Date(selectedDate)
    yesterday.setDate(yesterday.getDate() - 1)
    const fromDate = formatDate(yesterday)
    const result = await copyFromDate(fromDate)
    return result
  }, [selectedDate, copyFromDate])

  // 切换日期
  const handleSelectDate = useCallback((dateStr) => {
    setSelectedDate(dateStr)
  }, [])

  // 通知初始化与定时器
  const timerRef = useRef(null)

  useEffect(() => {
    requestPermission()
  }, [])

  useEffect(() => {
    const checkReminders = async () => {
      const now = new Date()
      const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`

      // 只在当天检查
      if (selectedDate !== getToday()) return

      if (settings.morningReminder === currentTime || settings.eveningReminder === currentTime) {
        if (plan && shouldRemind(plan, currentTime)) {
          const msg = getReminderMessage(plan)
          if (msg) {
            sendNotification('健康计划提醒', { body: msg })
          }
        }
      }
    }

    // 每分钟检查一次
    timerRef.current = setInterval(checkReminders, 60000)
    return () => clearInterval(timerRef.current)
  }, [settings, plan, selectedDate])

  return (
    <div className="h-dvh flex flex-col bg-gray-50 max-w-lg mx-auto">
      {/* 提示横幅：非今日的页面 */}
      {selectedDate !== getToday() && activeTab !== 'history' && (
        <div className="flex-shrink-0 mx-4 mt-3 px-4 py-2.5 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-between">
          <span className="text-sm text-blue-600">
            正在查看 {selectedDate} 的计划
          </span>
          <button
            onClick={() => setSelectedDate(getToday())}
            className="text-sm text-blue-600 font-medium"
          >
            回到今天
          </button>
        </div>
      )}

      {/* 页面内容 */}
      {activeTab === 'overview' && (
        <TodayOverview
          key={selectedDate}
          plan={plan}
          templates={allTemplates}
          settings={settings}
          onToggleMeal={toggleMeal}
          onToggleExercise={toggleExercise}
          onAddMeal={addMeal}
          onAddExercise={addExercise}
          onRemoveMeal={removeMeal}
          onRemoveExercise={removeExercise}
          onApplyTemplate={applyTemplate}
          onCopyFromDate={handleCopyFromDate}
          onOpenSettings={() => setShowSettings(true)}
          streakData={streakData}
        />
      )}
      {activeTab === 'diet' && (
        <DietPlan
          key={selectedDate}
          plan={plan}
          selectedDate={selectedDate}
          onDateChange={handleSelectDate}
          templates={dietTemplates.templates}
          settings={settings}
          onToggleMeal={toggleMeal}
          onAddMeal={addMeal}
          onRemoveMeal={removeMeal}
          onApplyTemplate={applyTemplate}
          onCopyFromDate={handleCopyFromDate}
        />
      )}
      {activeTab === 'exercise' && (
        <ExercisePlan
          key={selectedDate}
          plan={plan}
          selectedDate={selectedDate}
          onDateChange={handleSelectDate}
          templates={exerciseTemplates.templates}
          onToggleExercise={toggleExercise}
          onAddExercise={addExercise}
          onRemoveExercise={removeExercise}
          onApplyTemplate={applyTemplate}
          onCopyFromDate={handleCopyFromDate}
        />
      )}
      {activeTab === 'history' && (
        <History
          selectedDate={selectedDate}
          onSelectDate={handleSelectDate}
          plan={plan}
          onToggleMeal={toggleMeal}
          onToggleExercise={toggleExercise}
          onRemoveMeal={removeMeal}
          onRemoveExercise={removeExercise}
        />
      )}

      {/* 底部导航 */}
      <TabBar activeTab={activeTab} onTabChange={(tab) => {
        setActiveTab(tab)
      }} />

      {/* 设置弹窗 */}
      {showSettings && (
        <SettingsModal
          settings={settings}
          onSave={updateSettings}
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  )
}
