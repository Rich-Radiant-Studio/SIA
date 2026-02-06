# Render 部署指南（免费且稳定）

Render 提供免费的静态网站托管，非常稳定。

## 快速部署

### 1. 注册 Render
访问：https://render.com
点击 "Get Started" → 用 GitHub 登录

### 2. 创建静态网站

1. 点击 "New +" → "Static Site"
2. 连接 GitHub 仓库 `Rich-Radiant-Studio/SIA`
3. 配置第一个应用（main-web）：
   ```
   Name: main-web
   Root Directory: packages/main-web
   Build Command: npm run build
   Publish Directory: packages/main-web/dist
   ```
4. 点击 "Create Static Site"

### 3. 部署其他应用

重复步骤 2，修改配置：

**designer-web:**
```
Name: designer-web
Root Directory: packages/designer-web
Build Command: npm run build
Publish Directory: packages/designer-web/dist
```

**supplier-web:**
```
Name: supplier-web
Root Directory: packages/supplier-web
Build Command: npm run build
Publish Directory: packages/supplier-web/dist
```

**user-web:**
```
Name: user-web
Root Directory: packages/user-web
Build Command: npm run build
Publish Directory: packages/user-web/dist
```

### 4. 获取公网地址

部署完成后，每个应用会得到一个地址，例如：
- https://main-web.onrender.com
- https://designer-web.onrender.com
- https://supplier-web.onrender.com
- https://user-web.onrender.com

---

## 优势

✅ 完全免费（静态网站）
✅ 自动部署（git push 自动更新）
✅ 自动 HTTPS
✅ 稳定可靠
✅ 支持自定义域名

## 注意

⚠️ 免费版首次访问可能需要等待几秒（冷启动）
⚠️ 免费版有带宽限制（100GB/月）

---

**推荐指数：⭐⭐⭐⭐⭐**
