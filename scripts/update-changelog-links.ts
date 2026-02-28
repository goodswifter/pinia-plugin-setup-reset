#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/**
 * 更新 CHANGELOG.md 文件中的版本比较链接
 * 将 /compare/v1.x.x...v1.y.y 格式改为 /compare?from=v1.x.x&to=v1.y.y&tab=tags 格式
 */

function updateChangelogLinks() {
  const changelogPath = path.join(__dirname, '..', 'CHANGELOG.md')

  try {
    // 读取文件内容
    const content = fs.readFileSync(changelogPath, 'utf8')

    // 定义正则表达式来匹配版本比较链接
    // 匹配 /compare/v1.x.x...v1.y.y 格式的链接
    const compareLinkRegex =
      /(https:\/\/codeup\.aliyun\.com\/[^/]+\/[^/]+\/[^/]+\/)compare\/([^)]+)/g

    // 替换链接格式
    const updatedContent = content.replaceAll(compareLinkRegex, (match, baseUrl, versionRange) => {
      // 解析版本范围，例如 "v1.1.10...v1.1.11"
      const versions = versionRange.split('...')

      if (versions.length === 2) {
        const fromVersion = versions[0]
        const toVersion = versions[1]

        // 构建新的链接格式
        const newLink = `${baseUrl}compare?from=${fromVersion}&to=${toVersion}&tab=tags`
        console.log(`更新链接: ${match} -> ${newLink}`)

        return newLink
      }

      // 如果不是预期的格式，保持原样
      console.log(`跳过非标准格式: ${match}`)
      return match
    })

    // 写回文件
    fs.writeFileSync(changelogPath, updatedContent, 'utf8')

    console.log('✅ CHANGELOG.md 文件更新完成！')
  } catch (error) {
    console.error('❌ 更新失败:', (error as Error).message)
    process.exit(1)
  }
}

// 执行更新
updateChangelogLinks()
