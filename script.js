// 代办事项应用主要功能
class TodoApp {
    constructor() {
        this.tasks = this.loadTasks();
        this.currentFilter = 'all';
        this.init();
    }

    // 初始化应用
    init() {
        this.bindEvents();
        this.render();
        this.updateStats();
    }

    // 绑定事件
    bindEvents() {
        const addTaskForm = document.getElementById('addTaskForm');
        const taskInput = document.getElementById('taskInput');
        const tasksList = document.getElementById('tasksList');
        const filterBtns = document.querySelectorAll('.filter-btn');
        const clearBtn = document.getElementById('clearCompleted');

        // 添加任务表单提交
        addTaskForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const text = taskInput.value.trim();
            if (text) {
                this.addTask(text);
                taskInput.value = '';
                taskInput.focus();
            }
        });

        // 任务列表事件委托
        tasksList.addEventListener('click', (e) => {
            const taskItem = e.target.closest('.task-item');
            if (!taskItem) return;

            const taskId = parseInt(taskItem.dataset.id);

            if (e.target.classList.contains('task-checkbox')) {
                this.toggleTask(taskId);
            } else if (e.target.classList.contains('delete-btn')) {
                this.deleteTask(taskId);
            }
        });

        // 过滤按钮
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.setFilter(btn.dataset.filter);
                this.updateFilterButtons(btn);
            });
        });

        // 清除已完成任务
        clearBtn.addEventListener('click', () => {
            this.clearCompleted();
        });

        // 键盘快捷键
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === '/') {
                e.preventDefault();
                taskInput.focus();
            }
        });
    }

    // 添加任务
    addTask(text) {
        const task = {
            id: Date.now(),
            text: text,
            completed: false,
            createdAt: new Date().toISOString()
        };

        this.tasks.push(task);
        this.saveTasks();
        this.render();
        this.updateStats();

        // 添加成功动画效果
        this.showNotification('任务添加成功！', 'success');
    }

    // 切换任务完成状态
    toggleTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            task.updatedAt = new Date().toISOString();
            this.saveTasks();
            this.render();
            this.updateStats();

            const message = task.completed ? '任务已完成！' : '任务已恢复！';
            this.showNotification(message, task.completed ? 'success' : 'info');
        }
    }

    // 删除任务
    deleteTask(id) {
        const taskIndex = this.tasks.findIndex(t => t.id === id);
        if (taskIndex !== -1) {
            this.tasks.splice(taskIndex, 1);
            this.saveTasks();
            this.render();
            this.updateStats();
            this.showNotification('任务已删除！', 'warning');
        }
    }

    // 清除所有已完成的任务
    clearCompleted() {
        const completedCount = this.tasks.filter(t => t.completed).length;
        if (completedCount === 0) {
            this.showNotification('没有已完成的任务可清除', 'info');
            return;
        }

        if (confirm(`确定要清除 ${completedCount} 个已完成的任务吗？`)) {
            this.tasks = this.tasks.filter(t => !t.completed);
            this.saveTasks();
            this.render();
            this.updateStats();
            this.showNotification(`已清除 ${completedCount} 个任务！`, 'success');
        }
    }

    // 设置过滤器
    setFilter(filter) {
        this.currentFilter = filter;
        this.render();
    }

    // 更新过滤按钮状态
    updateFilterButtons(activeBtn) {
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => btn.classList.remove('active'));
        activeBtn.classList.add('active');
    }

    // 获取过滤后的任务
    getFilteredTasks() {
        switch (this.currentFilter) {
            case 'pending':
                return this.tasks.filter(t => !t.completed);
            case 'completed':
                return this.tasks.filter(t => t.completed);
            default:
                return this.tasks;
        }
    }

    // 渲染任务列表
    render() {
        const tasksList = document.getElementById('tasksList');
        const emptyState = document.getElementById('emptyState');
        const filteredTasks = this.getFilteredTasks();

        // 清空列表
        tasksList.innerHTML = '';

        if (filteredTasks.length === 0) {
            emptyState.classList.remove('hidden');
            tasksList.style.display = 'none';
        } else {
            emptyState.classList.add('hidden');
            tasksList.style.display = 'block';

            filteredTasks.forEach(task => {
                const taskElement = this.createTaskElement(task);
                tasksList.appendChild(taskElement);
            });
        }
    }

    // 创建任务元素
    createTaskElement(task) {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        li.dataset.id = task.id;

        li.innerHTML = `
            <div class="task-checkbox ${task.completed ? 'checked' : ''}"
                 title="${task.completed ? '点击标记为未完成' : '点击标记为已完成'}">
            </div>
            <span class="task-text">${this.escapeHtml(task.text)}</span>
            <button class="delete-btn" title="删除任务">
                🗑️
            </button>
        `;

        return li;
    }

    // 更新统计信息
    updateStats() {
        const totalTasks = this.tasks.length;
        const completedTasks = this.tasks.filter(t => t.completed).length;
        const pendingTasks = totalTasks - completedTasks;

        document.getElementById('totalTasks').textContent = totalTasks;
        document.getElementById('completedTasks').textContent = completedTasks;
        document.getElementById('pendingTasks').textContent = pendingTasks;

        // 更新清除按钮状态
        const clearBtn = document.getElementById('clearCompleted');
        clearBtn.disabled = completedTasks === 0;
    }

    // 显示通知
    showNotification(message, type = 'info') {
        // 创建通知元素
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;

        // 添加通知样式
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '12px 20px',
            background: type === 'success' ? '#7d8471' :
                       type === 'warning' ? '#d4a574' :
                       type === 'error' ? '#b85450' : '#6b4e3d',
            color: 'white',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            zIndex: '1000',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease-out',
            fontSize: '14px',
            fontWeight: '500',
            maxWidth: '300px',
            wordWrap: 'break-word'
        });

        document.body.appendChild(notification);

        // 显示动画
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // 自动隐藏
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // HTML转义
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // 保存任务到本地存储
    saveTasks() {
        try {
            localStorage.setItem('todoapp_tasks', JSON.stringify(this.tasks));
        } catch (error) {
            console.error('保存任务失败:', error);
            this.showNotification('保存失败，请检查浏览器设置', 'error');
        }
    }

    // 从本地存储加载任务
    loadTasks() {
        try {
            const saved = localStorage.getItem('todoapp_tasks');
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.error('加载任务失败:', error);
            this.showNotification('加载数据失败，将使用空列表', 'warning');
            return [];
        }
    }

    // 导出数据
    exportData() {
        const data = {
            tasks: this.tasks,
            exportDate: new Date().toISOString(),
            version: '1.0'
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], {
            type: 'application/json'
        });

        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `todolist_backup_${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        this.showNotification('数据导出成功！', 'success');
    }

    // 导入数据
    importData(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                if (data.tasks && Array.isArray(data.tasks)) {
                    if (confirm('导入数据将覆盖当前所有任务，确定继续吗？')) {
                        this.tasks = data.tasks;
                        this.saveTasks();
                        this.render();
                        this.updateStats();
                        this.showNotification('数据导入成功！', 'success');
                    }
                } else {
                    throw new Error('文件格式不正确');
                }
            } catch (error) {
                console.error('导入失败:', error);
                this.showNotification('导入失败，请检查文件格式', 'error');
            }
        };
        reader.readAsText(file);
    }
}

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
    const app = new TodoApp();

    // 将应用实例暴露到全局，便于调试和扩展
    window.todoApp = app;

    // 添加键盘快捷键提示
    const taskInput = document.getElementById('taskInput');
    taskInput.setAttribute('title', '按 Ctrl + / 快速聚焦到输入框');

    console.log('📝 代办事项应用已启动！');
    console.log('💡 提示：使用 Ctrl + / 快速聚焦到输入框');
    console.log('💾 数据自动保存到本地存储');
});

// 添加一些实用的工具函数
window.todoUtils = {
    // 清除所有数据
    clearAllData() {
        if (confirm('确定要清除所有数据吗？此操作不可恢复！')) {
            localStorage.removeItem('todoapp_tasks');
            location.reload();
        }
    },

    // 获取统计信息
    getStats() {
        const tasks = window.todoApp.tasks;
        return {
            total: tasks.length,
            completed: tasks.filter(t => t.completed).length,
            pending: tasks.filter(t => !t.completed).length,
            completionRate: tasks.length ? Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100) : 0
        };
    },

    // 批量添加任务
    addMultipleTasks(taskTexts) {
        if (Array.isArray(taskTexts)) {
            taskTexts.forEach(text => {
                if (text.trim()) {
                    window.todoApp.addTask(text.trim());
                }
            });
        }
    }
};