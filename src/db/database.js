import Dexie from 'dexie'

const db = new Dexie('HealthPlannerDB')

db.version(1).stores({
  plans: 'date',          // date 作为主键
  templates: '++id, type',  // 自增id, type索引(diet/exercise)
  settings: 'key',         // 单条设置记录
})

export default db
