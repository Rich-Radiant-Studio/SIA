# 注册表单实现总结

## 更新日期
2026-01-28

## 表单提示语实现

### 浮动标签系统
所有输入框都使用了浮动标签（Floating Label）系统，标签文字会在以下情况浮动到输入框顶部：
- 输入框获得焦点时
- 输入框有内容时

### 基础表单字段（所有角色共用）

| 字段 | 浮动标签文字 | 说明 |
|------|------------|------|
| Email | Email | 必填 |
| Password | Password | 必填 |
| Email verification code | Email verification code | 必填，带发送验证码按钮 |
| Confirm password | Confirm password | 必填 |
| Phone number | Phone number | 选填 |

### Designer 角色专属字段

#### Designer Nature 模块
- 单选按钮组：Individual / Studio / Company
- Designer / Company Name（必填，浮动标签）

#### Specialized Room Types 模块
- 10个复选框：Living Room, Bedroom, Kitchen, Bathroom, Dining Room, Study, Balcony, Entrance, Kids Room, Storage
- 5列网格布局

### Supplier 角色专属字段

#### Company Information 模块
| 字段 | 浮动标签文字 | 说明 |
|------|------------|------|
| Company Name | Company Name | 必填 |
| Contact Person | Contact Person | 必填 |
| Contact Phone | Contact Phone | 必填 |

#### Company Address 模块
| 字段 | 浮动标签文字 | 说明 |
|------|------------|------|
| Street Address | Street Address | 必填 |
| Apartment, Suite, Floor, etc | Apartment, Suite, Floor, etc | 选填 |
| City | City | 必填 |
| State / Province | State / Province | 必填 |
| Postal Code | Postal Code | 必填 |
| Country | Country | 必填 |

#### Building Materials Category 模块
- 9个复选框：Tiles, Flooring, Bathroom, Cabinets, Doors & Windows, Paint, Lighting, Hardware, Others
- 5列网格布局

## 表单验证

### 验证触发时机
- **blur（失去焦点）**：所有输入框在失去焦点时验证
- **change（值改变）**：协议复选框在值改变时验证
- **submit（提交）**：点击 Create account 按钮时验证所有字段

### 错误提示方式
- 隐藏错误文字提示
- 显示红色边框（#f56c6c）
- 执行抖动动画（0.5秒）

### 角色切换行为
- 切换角色时清空角色专属数据
- 切换角色时清除所有验证错误状态
- 公共字段（Email、Password等）保持不变

## 布局特性

### 固定头部和底部
- **固定头部**：标题、副标题、角色选择卡片
- **可滚动中间**：所有表单内容
- **固定底部**：Cancel 和 Create account 按钮

### 容器尺寸
- 最大宽度：60rem
- 最大高度：90vh
- 内边距：上下 24px (1.5rem)，左右 32px (2rem)

### 按钮样式
- 高度：32px (2rem)
- 字体：Inter, 400, 14px, 行高 22px
- 间距：8px (0.5rem)

## 颜色系统
- 主题色：#00699A
- 文字色：#1D2129
- 边框色：#E5E6EB
- 按钮色：#333333
- 错误色：#f56c6c
- 占位符色：#5C5C5C
