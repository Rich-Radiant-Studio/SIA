# Netlify 部署指南（推荐替代方案）

Netlify 比 Vercel 更宽容，不会有权限问题。

## 快速部署步骤

### 1. 注册 Netlify
访问：https://www.netlify.com
点击 "Sign up" → 选择 "GitHub" 登录

### 2. 部署主应用 (main-web)

1. 点击 "Add new site" → "Import an existing project"
2. 选择 "Deploy with GitHub"
3. 选择仓库 `Rich-Radiant-Studio/SIA`
4. 配置构建设置：
   ```
   Base directory: packages/main-web
   Build command: npm run build
   Publish directory: packages/main-web/dist
   ```
5. 点击 "Deploy site"

### 3. 部署其他应用

重复步骤 2，但修改配置：

**designer-web:**
```
Base directory: packages/designer-web
Build command: npm run build
Publish directory: packages/designer-web/dist
```

**supplier-web:**
```
Base directory: packages/supplier-web
Build command: npm run build
Publish directory: packages/supplier-web/dist
```

**user-web:**
```
Base directory: packages/user-web
Build command: npm run build
Publish directory: packages/user-web/dist
```

### 4. 获取公网地址

部署完成后，每个应用会得到一个地址，例如：
- https://main-web-xxx.netlify.app
- https://designer-web-xxx.netlify.app
- https://supplier-web-xxx.netlify.app
- https://user-web-xxx.netlify.app

---

## 优势

✅ 不会有权限问题
✅ 构建速度快
✅ 免费额度充足
✅ 自动 HTTPS
✅ 自动部署（每次 git push 自动更新）

---

**部署完成后，直接访问主应用地址即可！**
