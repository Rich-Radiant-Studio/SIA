# 快速分享指南（临时演示用）

如果只是想临时让别人看一下项目，不需要部署，直接本地运行 + Cloudflare Tunnel。

## 方法 1: 使用 Cloudflare Tunnel（推荐）

### 1. 启动所有应用

打开 4 个命令行窗口，分别运行：

**窗口 1 - 主应用:**
```bash
cd packages/main-web
npm run dev
```

**窗口 2 - 设计师应用:**
```bash
cd packages/designer-web
npm run dev
```

**窗口 3 - 供应商应用:**
```bash
cd packages/supplier-web
npm run dev
```

**窗口 4 - 用户应用:**
```bash
cd packages/user-web
npm run dev
```

### 2. 创建 Cloudflare Tunnel

打开第 5 个命令行窗口：

```bash
# 为主应用创建隧道（端口 8080）
cloudflared tunnel --url http://localhost:8080
```

会得到一个公网地址，例如：
```
https://random-name.trycloudflare.com
```

### 3. 分享地址

把这个地址发给别人，他们就可以访问了！

---

## 方法 2: 使用 ngrok（备选）

### 1. 下载 ngrok
访问：https://ngrok.com/download

### 2. 启动应用（同上）

### 3. 创建隧道
```bash
ngrok http 8080
```

会得到一个公网地址，例如：
```
https://xxxx-xx-xx-xx-xx.ngrok-free.app
```

---

## 优势

✅ 最快速，几秒钟就能分享
✅ 不需要部署
✅ 不需要构建
✅ 实时更新（修改代码立即生效）

## 缺点

❌ 临时地址，关闭电脑就失效
❌ 需要保持电脑运行
❌ 网络不稳定可能断开

---

**适合场景：** 临时演示、快速分享、开发调试
