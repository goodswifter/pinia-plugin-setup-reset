import type { UserConfig } from 'cz-git'

const config: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新功能
        'fix', // 修复 bug
        'docs', // 文档
        'style', // 格式（不影响代码逻辑）
        'refactor', // 重构
        'perf', // 性能优化
        'test', // 测试
        'build', // 构建
        'ci', // CI/CD
        'chore', // 更新版本号
        'revert', // 回滚
        'wip', // 开发中
        'release', // 发版
      ],
    ],
  },
  prompt: {
    messages: {
      type: '选择提交类型:',
      subject: '填写简短精炼的变更描述:',
    },
    types: [
      { value: 'feat', name: 'feat:     ✨ 新增功能' },
      { value: 'fix', name: 'fix:      🐛 修复 bug' },
      { value: 'docs', name: 'docs:     📚 文档更新' },
      { value: 'style', name: 'style:    💎 代码格式' },
      { value: 'refactor', name: 'refactor: 📦 代码重构' },
      { value: 'perf', name: 'perf:     🚀 性能提升' },
      { value: 'test', name: 'test:     🚨 测试相关' },
      { value: 'build', name: 'build:    🛠 构建相关' },
      { value: 'ci', name: 'ci:       ⚙️ 持续集成' },
      { value: 'revert', name: 'revert:   🗑 回退代码' },
      { value: 'chore', name: 'chore:    ♻️ 其他修改' },
    ],
    useEmoji: true,
  },
}

export default config
