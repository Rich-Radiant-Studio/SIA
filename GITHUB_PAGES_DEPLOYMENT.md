# GitHub Pages 部署指南（完全免费）

使用 GitHub Pages 托管静态文件，完全免费，无限流量。

## 部署步骤

### 1. 构建所有应用

在本地运行：
```bash
cd packages/main-web
npm run build

cd ../designer-web
npm run build

cd ../supplier-web
npm run build

cd ../user-web
npm run build
```

### 2. 创建部署分支

```bash
# 回到项目根目录
cd ../..

# 创建 gh-pages 分支
git checkout --orphan gh-pages

# 清空所有文件
git rm -rf .

# 复制构建文件
mkdir main-web designer-web supplier-web user-web

cp -r packages/main-web/dist/* main-web/
cp -r packages/designer-web/dist/* designer-web/
cp -r packages/supplier-web/dist/* supplier-web/
cp -r packages/user-web/dist/* user-web/

# 创建首页
echo "<h1>SIA Project</h1><ul><li><a href='main-web/'>Main App</a></li><li><a href='designer-web/'>Designer App</a></li><li><a href='supplier-web/'>Supplier App</a></li><li><a href='user-web/'>User App</a></li></ul>" > index.html

# 提交
git add .
git commit -m "Deploy to GitHub Pages"
git push origin gh-pages
```

### 3. 启用 GitHub Pages

1. 访问 GitHub 仓库
2. 点击 "Settings"
3. 左侧菜单找到 "Pages"
4. Source 选择 "gh-pages" 分支
5. 点击 "Save"

### 4. 访问地址

几分钟后，访问：
```
https://rich-radiant-studio.github.io/SIA/main-web/
```

---

## 优势

✅ 完全免费
✅ 无限流量
✅ 自动 HTTPS
✅ 稳定可靠

## 缺点

❌ 需要手动构建和推送
❌ 不支持服务器端功能
❌ 每次更新需要重新构建

---

**适合：** 纯静态项目，不需要频繁更新
