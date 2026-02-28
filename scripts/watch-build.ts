import { exec } from 'node:child_process'
import { watch } from 'node:fs/promises'
import process from 'node:process'

// 执行构建
const execBuild = () => {
  exec('pnpm build', (err, stdout, stderr) => {
    if (err) {
      console.error(`Build error: ${stderr}`)
    } else {
      console.log(`Build success: ${stdout}`)
    }
  })
}

// 初始构建
console.log('Initial build...')
execBuild()

// 使用 AbortController 来控制文件监听器
const controller = new AbortController()
const watcher = watch('./src', { recursive: true, signal: controller.signal })

// 优雅退出处理
const gracefulExit = () => {
  console.log('\n👋 Gracefully shutting down...')
  controller.abort()
  console.log('✅ File watcher stopped')
  process.exit(0)
}

// 监听退出信号
process.on('SIGINT', gracefulExit) // Ctrl+C
process.on('SIGTERM', gracefulExit) // 终止信号

try {
  for await (const event of watcher) {
    console.log(`Change detected: ${event.filename}`)
    execBuild()
  }
} catch (error) {
  if (error instanceof Error && error.name !== 'AbortError') {
    console.error('❌ Watcher error:', error)
  }
}
