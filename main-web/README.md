# Public 目录说明

此目录用于存放不需要被 Vite 处理的静态资源。

## 目录结构

- `icons/` - 静态图标文件（如 favicon.ico, logo.svg）

## 使用方式

### 在 HTML 中使用
```html
<link rel="icon" href="/icons/favicon.ico">
<img src="/icons/logo.svg" alt="Logo">
```

### 在 Vue 组件中使用
```vue
<template>
  <img src="/icons/logo.svg" alt="Logo">
</template>
```

## 注意事项

- 此目录中的文件会被直接复制到构建输出目录
- 使用绝对路径访问（以 `/` 开头）
- 文件不会被压缩或添加 hash
- 适合存放 favicon、robots.txt 等静态文件
- 大型文件或第三方库的静态资源也适合放在这里
