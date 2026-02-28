# npm-template

[![NPM version](https://img.shields.io/npm/v/npm-template?color=a1b858&label=)](https://www.npmjs.com/package/npm-template)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE)

一个现代化的 npm 包开发模板，支持 TypeScript、ESM 模块和完整的开发工具链。

## ✨ 特性

- 🚀 **TypeScript 支持** - 完整的类型定义和类型检查
- 📦 **ESM 模块** - 原生 ES 模块支持，支持 tree-shaking
- 🔧 **现代化工具链** - 使用 unbuild、pnpm、ESLint 等现代工具
- 📚 **完整文档** - 自动生成 TypeScript 声明文件和 JSDoc 注释
- 🧪 **测试支持** - 集成 Vitest 测试框架
- 🎯 **示例项目** - 包含 Vue 3 + Vite 示例项目
- 🔄 **热重载开发** - 支持文件监听和热重载开发模式

## 📦 安装

```bash
# 使用 pnpm (推荐)
pnpm add npm-template

# 使用 npm
npm install npm-template

# 使用 yarn
yarn add npm-template
```

## 🚀 快速开始

```typescript
// 类型工具
import type { Arrayable, Awaitable, Nullable } from 'npm-template'

import { add, mul, subtract } from 'npm-template' // 12

// 基础数学运算
const result = add(1, 2) // 3
const diff = subtract(5, 3) // 2
const product = mul(4, 3)

type MaybePromise = Awaitable<string>
type MaybeNull = Nullable<number>
type MaybeArray = Arrayable<string>
```

## 🛠️ 开发指南

### 环境要求

- Node.js >= 18
- pnpm >= 8.0.0

### 安装依赖

```bash
pnpm install
```

### 开发命令

```bash
# 开发模式（监听文件变化）
pnpm dev

# 构建项目
pnpm build

# 类型检查
pnpm typecheck

# 代码检查
pnpm lint

# 自动修复代码格式
pnpm lint-fix

# 运行测试
pnpm test

# 发布新版本
pnpm release
```

### 项目结构

```
npm-template/
├── src/                    # 源代码目录
│   ├── index.ts           # 主入口文件
│   ├── math.ts            # 数学工具函数
│   └── types.ts           # 类型定义
├── example/               # 示例项目
│   ├── src/              # Vue 示例源码
│   ├── package.json      # 示例项目配置
│   └── vite.config.ts    # Vite 配置
├── scripts/              # 构建脚本
├── build.config.ts       # unbuild 配置
├── tsconfig.json         # TypeScript 配置
├── eslint.config.mts     # ESLint 配置
└── package.json          # 项目配置
```

## 📚 API 文档

### 数学工具函数

#### `add(a: number, b: number): number`

加法运算，返回两个数的和。

```typescript
import { add } from 'npm-template'

add(1, 2) // 3
add(-1, 1) // 0
```

#### `subtract(a: number, b: number): number`

减法运算，返回两个数的差。

```typescript
import { subtract } from 'npm-template'

subtract(5, 3) // 2
subtract(1, 5) // -4
```

#### `mul(a: number, b: number): number`

乘法运算，返回两个数的乘积。

```typescript
import { mul } from 'npm-template'

mul(4, 3) // 12
mul(-2, 3) // -6
```

### 类型工具

#### `Awaitable<T>`

表示一个值可能是 Promise 或直接值。

```typescript
import type { Awaitable } from 'npm-template'

type MaybePromise = Awaitable<string>
// 等价于: string | PromiseLike<string>
```

#### `Nullable<T>`

表示一个值可能为 null 或 undefined。

```typescript
import type { Nullable } from 'npm-template'

type MaybeNull = Nullable<number>
// 等价于: number | null | undefined
```

#### `Fn<T = void>`

表示一个函数类型。

```typescript
import type { Fn } from 'npm-template'

type Callback = Fn<string>
// 等价于: () => string
```

#### `Arrayable<T>`

表示一个值可能是数组或单个值。

```typescript
import type { Arrayable } from 'npm-template'

type MaybeArray = Arrayable<string>
// 等价于: string | Array<string>
```

## 🧪 测试

项目使用 Vitest 进行测试：

```bash
# 运行所有测试
pnpm test

# 监听模式运行测试
pnpm test --watch

# 生成测试覆盖率报告
pnpm test --coverage
```

## 📦 构建

项目使用 unbuild 进行构建，支持多种输出格式：

- **ESM**: `dist/index.mjs` - 现代 ES 模块
- **类型声明**: `dist/index.d.mts` - TypeScript 类型定义

```bash
# 构建项目
pnpm build

# 开发模式构建（监听文件变化）
pnpm dev:watch

# 生成 stub 文件（用于开发）
pnpm dev:stub
```

## 🎯 示例项目

项目包含一个完整的 Vue 3 + Vite 示例项目，位于 `example/` 目录：

```bash
cd example
pnpm install
pnpm dev
```

示例项目展示了如何在 Vue 3 项目中使用这个 npm 包。

## 📝 发布

### 自动发布

```bash
# 发布新版本（自动更新版本号）
pnpm release
```

### 手动发布

```bash
# 构建项目
pnpm build

# 发布到 npm
pnpm publish
```

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 这个仓库
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开一个 Pull Request

## 📄 许可证

本项目基于 [MIT](./LICENSE) 许可证开源。

## 🙏 致谢

- [unbuild](https://github.com/unjs/unbuild) - 现代化的构建工具
- [pnpm](https://pnpm.io/) - 快速、节省磁盘空间的包管理器
- [Vitest](https://vitest.dev/) - 现代化的测试框架
- [Vue](https://vuejs.org/) - 渐进式 JavaScript 框架

---

Made with ❤️ by [goodswifter](https://github.com/goodswifter)
