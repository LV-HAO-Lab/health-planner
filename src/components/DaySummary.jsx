import { displayDate, weekdayCN } from '../utils/date'

export default function DaySummary({ plan }) {
  if (!plan) return null

  const totalMeals = plan.meals?.length || 0
  const doneMeals = plan.meals?.filter(m => m.completed).length || 0
  const totalExercises = plan.exercises?.length || 0
  const doneExercises = plan.exercises?.filter(e => e.completed).length || 0
  const total = totalMeals + totalExercises
  const done = doneMeals + doneExercises
  const allDone = total > 0 && done === total

  let statusText, statusColor, statusEmoji
  if (total === 0) {
    statusText = '还没有计划，开始添加吧！'
    statusColor = 'text-gray-400'
    statusEmoji = '📋'
  } else if (allDone) {
    statusText = '全部完成！太棒了！🎉'
    statusColor = 'text-green-600'
    statusEmoji = '🔥'
  } else if (done > 0) {
    statusText = `完成 ${done}/${total}，继续加油！`
    statusColor = 'text-orange-500'
    statusEmoji = '💪'
  } else {
    statusText = '今天还没开始，行动起来！'
    statusColor = 'text-orange-500'
    statusEmoji = '⏰'
  }

  return (
    <div className="text-center mb-4">
      <div className="text-sm text-gray-400">
        {displayDate(plan.date)} {weekdayCN(plan.date)}
      </div>
      <div className={`text-sm font-medium mt-1 ${statusColor}`}>
        {statusEmoji} {statusText}
      </div>
    </div>
  )
}
