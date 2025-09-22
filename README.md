# 📝 ToDoList - 现代化代办事项应用

一个采用复古简约风格设计的现代化代办事项管理应用，使用纯HTML、CSS、JavaScript技术栈开发。

![应用预览](https://img.shields.io/badge/Status-Active-brightgreen) ![技术栈](https://img.shields.io/badge/Tech-HTML%20%7C%20CSS%20%7C%20JavaScript-blue) ![响应式](https://img.shields.io/badge/Design-Responsive-orange)

## ✨ 功能特点

### 🎨 设计特色
- **复古简约风格**：温暖的棕色调配色方案，优雅的圆角设计
- **流畅动画**：精心设计的过渡效果和微交互
- **响应式布局**：完美适配桌面和移动设备

### ⚡ 核心功能
- ✅ **任务管理**：添加、完成、删除代办事项
- 🔍 **智能筛选**：按状态筛选任务（全部/待完成/已完成）
- 📊 **实时统计**：显示总任务数、已完成数、待完成数
- 💾 **数据持久化**：自动保存到浏览器本地存储
- 🧹 **批量操作**：一键清除所有已完成任务
- ⌨️ **快捷键支持**：Ctrl + / 快速聚焦输入框

### 📱 用户体验
- 🚀 **即时响应**：无需等待，所有操作立即生效
- 🔔 **状态提示**：操作成功/失败的友好提示信息
- 📱 **触控友好**：针对移动设备优化的按钮大小
- 🎯 **空状态提示**：引导用户开始使用应用

## 🚀 快速开始

### 在线体验
直接访问：[ToDoList 在线演示](https://pgaicoding.github.io/ToDoList/)

### 本地运行
1. **克隆项目**
   ```bash
   git clone https://github.com/pgaicoding/ToDoList.git
   cd ToDoList
   ```

2. **打开应用**
   - 直接在浏览器中打开 `index.html` 文件
   - 或使用本地服务器（推荐）：
     ```bash
     # 使用 Python
     python -m http.server 8000

     # 使用 Node.js
     npx serve .

     # 使用 Live Server (VSCode 扩展)
     ```

3. **开始使用**
   - 在输入框中输入代办事项
   - 点击"添加"按钮或按回车键
   - 享受高效的任务管理体验！

## 📁 项目结构

```
ToDoList/
├── index.html          # 主页面文件
├── style.css           # 样式文件
├── script.js           # 功能逻辑文件
└── README.md          # 项目说明文档
```

## 🛠️ 技术栈

- **HTML5**：语义化标记，良好的可访问性
- **CSS3**：
  - CSS Grid & Flexbox 布局
  - CSS 变量和自定义属性
  - 响应式媒体查询
  - 流畅的动画和过渡效果
- **JavaScript ES6+**：
  - 类和模块化设计
  - LocalStorage API
  - 事件委托和优化
  - 现代 DOM 操作

## 🎯 使用指南

### 基本操作
1. **添加任务**：在输入框中输入内容，点击"添加"或按回车
2. **完成任务**：点击任务前的圆形复选框
3. **删除任务**：点击任务右侧的垃圾桶图标
4. **筛选任务**：使用顶部的筛选按钮查看不同状态的任务
5. **清除已完成**：点击底部"清除已完成"按钮

### 快捷键
- `Ctrl + /`：快速聚焦到输入框

### 高级功能
- **数据导出/导入**：通过浏览器开发者工具访问 `window.todoUtils`
- **批量添加**：使用 `todoUtils.addMultipleTasks(['任务1', '任务2'])`
- **统计信息**：使用 `todoUtils.getStats()` 查看详细统计

## 🌟 特色亮点

### 设计理念
- **极简主义**：去除冗余元素，专注核心功能
- **视觉和谐**：精心调配的色彩搭配和间距
- **用户友好**：直观的交互设计和清晰的视觉反馈

### 技术亮点
- **原生JavaScript**：无框架依赖，性能优异
- **模块化架构**：清晰的代码组织和可维护性
- **渐进增强**：基础功能优先，逐步增强体验
- **跨浏览器兼容**：支持现代浏览器

## 🔧 开发说明

### 自定义配置
项目使用 CSS 变量定义主题色彩，可在 `style.css` 文件顶部的 `:root` 选择器中调整：

```css
:root {
    --primary-color: #6b4e3d;      /* 主色调 */
    --secondary-color: #d4a574;    /* 辅助色 */
    --accent-color: #e8c5a0;       /* 强调色 */
    --background-color: #f7f3ef;   /* 背景色 */
    /* ... 更多变量 */
}
```

### 扩展功能
项目采用模块化设计，易于扩展：
- 添加新的任务属性（优先级、标签等）
- 集成云同步功能
- 添加任务提醒功能
- 支持任务分类和项目管理

## 📋 更新日志

### v1.0.0 (2024-09-22)
- ✨ 初始版本发布
- 🎨 实现复古简约风格UI设计
- ⚡ 完成核心任务管理功能
- 📱 添加响应式设计支持
- 💾 集成本地存储功能

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 本项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 👨‍💻 作者

**pgaicoding** - [GitHub](https://github.com/pgaicoding)

## 🙏 致谢

感谢所有为这个项目提供建议和反馈的朋友们！

---

⭐ 如果这个项目对您有帮助，请给它一个星标！

📧 有问题或建议？欢迎提交 Issue 或联系我们。