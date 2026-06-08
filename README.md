# 贵阳漫游：手账风行程助手

> 一个充满设计感的移动端行程助手，用手账风格记录和展示每一次旅行。基于 Vue 3 + TypeScript + Vite 构建。

## 🎨 设计特色

- **手账风格 (Scrapbook Style)**：
  - 暖色调背景（#FDF9EC）与复古网格纹理。
  - 自由手绘边框、贴纸和装饰元素。
  - 动画效果灵感来源于胶片翻页与手账贴纸效果。

- **极简主义美学**：
  - 纯净的 UI 设计，无多余干扰。
  - 重点突出行程内容，提升阅读体验。

## 📂 项目结构

- `src/views/Home.vue` - 核心页面，展示手账行程。
- `src/components/ScenicCard.vue` - 自定义行程卡片组件。
- `src/store/itinerary.ts` -行程数据状态管理。
- `src/utils/amap.ts` - 高德地图导航工具。
- `src/assets/data/itinerary.json` - 行程数据源。

## 🚀 开始运行

1. **安装依赖**

   ```bash
   pnpm install
   ```

2. **运行开发服务器**

   ```bash
   pnpm dev
   ```

3. **访问应用**
   打开浏览器访问 `http://localhost:5173`（默认端口）。

## 🔧 构建与部署

1. **构建生产版本**

   ```bash
   pnpm build
   ```

2. **预览构建结果**
   ```bash
   pnpm preview
   ```

## 💡 技术栈

- **框架**：Vue 3
- **语言**：TypeScript
- **构建工具**：Vite
- **路由**：Vue Router
- **状态管理**：Pinia
- **UI 库**：Vant
- **动画库**：GSAP

## 📝 数据格式

行程数据存储在 `src/assets/data/itinerary.json` 中，采用以下结构：

```json
[
  {
    "day": 1,
    "date": "6.18",
    "title": "抵达贵阳 • 探索花果园",
    "activities": [
      {
        "time": "上午",
        "location": "花果园湿地公园",
        "description": "..."
      }
    ]
  }
]
```

## 🔗 外部依赖

- **高德地图**：使用 `amap-jsapi-loader` 加载高德地图 API，提供导航功能。
