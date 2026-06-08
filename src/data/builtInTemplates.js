// 内置饮食模板
export const builtInDietTemplates = [
  {
    name: '减脂均衡餐',
    type: 'diet',
    category: 'built-in',
    meals: [
      { type: 'breakfast', name: '减脂早餐', foods: ['燕麦片 50g', '水煮蛋 2个', '牛奶 250ml'] },
      { type: 'lunch', name: '减脂午餐', foods: ['鸡胸肉 150g', '西兰花 100g', '糙米饭 100g'] },
      { type: 'dinner', name: '减脂晚餐', foods: ['清蒸鱼 150g', '生菜沙拉', '紫薯 100g'] },
      { type: 'snack', name: '加餐', foods: ['酸奶 200ml', '杏仁 15g'] },
    ],
  },
  {
    name: '增肌高蛋白餐',
    type: 'diet',
    category: 'built-in',
    meals: [
      { type: 'breakfast', name: '增肌早餐', foods: ['全麦面包 3片', '煎蛋 3个', '牛奶 500ml', '香蕉 1根'] },
      { type: 'lunch', name: '增肌午餐', foods: ['牛肉 200g', '土豆 200g', '西兰花 100g', '米饭 200g'] },
      { type: 'dinner', name: '增肌晚餐', foods: ['三文鱼 200g', '红薯 200g', '菠菜 100g'] },
      { type: 'snack', name: '加餐', foods: ['蛋白粉 30g', '全麦面包 2片', '花生酱 30g'] },
    ],
  },
  {
    name: '轻断食日',
    type: 'diet',
    category: 'built-in',
    meals: [
      { type: 'breakfast', name: '轻食早餐', foods: ['黑咖啡 1杯', '全麦吐司 1片', '水煮蛋 1个'] },
      { type: 'lunch', name: '轻食午餐', foods: ['蔬菜沙拉大份', '鸡胸肉 100g', '橄榄油 1勺'] },
      { type: 'dinner', name: '轻食晚餐', foods: ['蔬菜汤 1碗', '蒸豆腐 150g'] },
    ],
  },
]

// 内置锻炼模板
export const builtInExerciseTemplates = [
  {
    name: '新手全身训练',
    type: 'exercise',
    category: 'built-in',
    exercises: [
      { name: '深蹲', sets: 3, reps: 12, duration: 0, unit: '', note: '保持背部挺直' },
      { name: '俯卧撑', sets: 3, reps: 10, duration: 0, unit: '', note: '可从跪姿开始' },
      { name: '平板支撑', sets: 3, reps: 0, duration: 30, unit: '秒', note: '收紧核心' },
      { name: '哑铃弯举', sets: 3, reps: 12, duration: 0, unit: '', note: '可用水瓶代替' },
      { name: '开合跳', sets: 3, reps: 0, duration: 60, unit: '秒', note: '保持节奏' },
    ],
  },
  {
    name: '进阶分化训练（上肢）',
    type: 'exercise',
    category: 'built-in',
    exercises: [
      { name: '俯卧撑', sets: 4, reps: 15, duration: 0, unit: '', note: '标准俯卧撑' },
      { name: '哑铃推举', sets: 4, reps: 12, duration: 0, unit: '', note: '坐姿更稳定' },
      { name: '引体向上', sets: 3, reps: 8, duration: 0, unit: '', note: '可借力弹力带' },
      { name: '哑铃划船', sets: 4, reps: 12, duration: 0, unit: '', note: '单侧交替' },
      { name: '侧平举', sets: 3, reps: 15, duration: 0, unit: '', note: '小重量多次数' },
      { name: '仰卧起坐', sets: 3, reps: 20, duration: 0, unit: '', note: '腹肌收尾' },
    ],
  },
  {
    name: '进阶分化训练（下肢）',
    type: 'exercise',
    category: 'built-in',
    exercises: [
      { name: '深蹲跳', sets: 4, reps: 12, duration: 0, unit: '', note: '爆发力训练' },
      { name: '弓步蹲', sets: 3, reps: 12, duration: 0, unit: '', note: '每侧12次' },
      { name: '臀桥', sets: 4, reps: 15, duration: 0, unit: '', note: '顶峰收缩2秒' },
      { name: '提踵', sets: 4, reps: 20, duration: 0, unit: '', note: '小腿训练' },
      { name: '高抬腿', sets: 3, reps: 0, duration: 45, unit: '秒', note: '快速交替' },
    ],
  },
  {
    name: '有氧燃脂日',
    type: 'exercise',
    category: 'built-in',
    exercises: [
      { name: '慢跑', sets: 1, reps: 0, duration: 30, unit: '分钟', note: '保持心率130-150' },
      { name: '跳绳', sets: 3, reps: 0, duration: 180, unit: '秒', note: '组间休息60秒' },
      { name: '波比跳', sets: 4, reps: 10, duration: 0, unit: '', note: '全身燃脂' },
      { name: '拉伸', sets: 1, reps: 0, duration: 10, unit: '分钟', note: '全身拉伸放松' },
    ],
  },
]
