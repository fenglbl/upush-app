# upush-app

一个基于 `uni-app` 的消息推送示例项目，包含移动端客户端与 Node.js 服务端，适合用来快速搭建简单的登录、注册、消息推送、消息列表展示流程。

## 项目简介

本项目主要由两部分组成：

- `uni-app` 客户端：负责登录、注册、接收推送消息、查看消息列表
- `upushServer` 服务端：负责云函数风格接口转发、消息推送调用、数据库连接

当前仓库已完成一轮基础工程整理：

- 个推配置改为从环境变量读取
- MongoDB 配置改为从环境变量读取
- token 缓存文件不会进入 Git
- `uniCloud-aliyun/` 目录默认不上传到仓库
- 客户端运行模式已迁移到 `Vue 3`
- 客户端已接入中英文国际化

## 当前状态

### 前端技术现状

- 当前 `manifest.json` 已启用 `Vue 3`
- 前端入口已使用 `createSSRApp` 和 `app.config.globalProperties`
- 页面仍以 `Options API` 为主，这在 uni-app 的 Vue 3 模式下是可正常运行的
- 首页原有 Vue 2 过滤器写法已经移除，改为普通工具方法调用

### 国际化现状

- 当前支持两种语言：`中文` / `English`
- 默认语言跟随系统语言自动初始化
- 当前语言会持久化保存到本地 `appLocale`
- 登录页、注册页、首页及部分通用提示已接入国际化
- 国际化实现位于 `common/lib/i18n.js`

## 功能特性

- 用户登录
- 用户注册
- 拉取推送消息列表
- 服务端统一处理云函数调用
- 对接个推推送服务
- MongoDB 持久化存储
- uni-app 多端项目结构
- 日间 / 夜间主题切换
- 中文 / 英文语言切换

## 目录结构

```text
.
|-- App.vue
|-- main.js
|-- manifest.json
|-- pages.json
|-- pages/
|   |-- home/
|   |   `-- index.vue
|   |-- login/
|   |   `-- index.vue
|   `-- register/
|       `-- index.vue
|-- common/
|   |-- api/
|   `-- lib/
|       |-- app.js
|       |-- cloudfunctions.js
|       |-- i18n.js
|       `-- request.js
|-- static/
|-- uni_modules/
|-- upushServer/
|   |-- app.js
|   |-- cloudfunctions/
|   |-- db/
|   |-- package.json
|   `-- unipush/
|-- README.md
`-- LICENSE
```

## 运行环境

### 客户端

- HBuilderX 5+
- uni-app（Vue 3）

### 服务端

- Node.js 18+
- MongoDB
- 个推开发者配置

## 本地开发

### 1. 安装服务端依赖

进入 `upushServer` 目录后执行：

```bash
npm install
```

### 2. 配置环境变量

复制示例配置：

```bash
cp .env.example .env
```

Windows 下也可以手动创建 `upushServer/.env`。

可用环境变量如下：

```env
# 个推配置
GETUI_APPKEY=your_getui_appkey
GETUI_MASTERSECRET=your_getui_mastersecret
GETUI_SERVER_URL=https://restapi.getui.com/v2/your_appid/

# MongoDB 配置
DB_HOST=your_db_host
DB_PORT=27017
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=upush
```

### 3. 启动服务端

在 `upushServer` 目录执行：

```bash
node app.js
```

默认监听端口：`3000`

### 4. 运行客户端

使用 HBuilderX 打开项目根目录，然后运行到目标平台：

- Android App
- iOS App
- H5
- 各类小程序平台

## 页面说明

- `pages/login/index.vue`：登录页
- `pages/register/index.vue`：注册页
- `pages/home/index.vue`：首页 / 消息列表页

## 接口说明

### 服务端接口

当前 `upushServer/app.js` 里主要提供以下接口：

- `POST /cloudfunction`：统一调用服务端 `cloudfunctions`
- `POST /pushMessage`：提交推送消息
- `GET /pushMessage`：通过查询参数提交推送消息
- `GET /pushMessage/:id`：按用户或目标 ID 提交推送消息

### 客户端主要能力

- 登录并缓存 token
- 注册新账号
- 拉取并分页展示推送消息
- 按系统语言自动初始化界面语言
- 支持手动切换中英文
- 支持日间 / 夜间主题切换

## 已知事项

- `common/lib/cloudfunctions.js` 当前仍使用硬编码服务端地址，部署前建议改为按环境配置
- 仓库默认不包含 `uniCloud-aliyun/`，如果你依赖该目录，请自行本地维护或使用单独仓库存放
- 推送能力依赖个推服务可用配置
- 部分后端返回文案仍然是中文，如果要完全国际化，建议继续在前端做统一文案映射

## 安全建议

- 不要提交真实的 `.env` 文件
- 不要提交数据库账号密码、第三方密钥、token 缓存文件
- 若历史上曾暴露过密钥或密码，建议及时轮换
- 生产环境优先使用 HTTPS，避免明文 HTTP 传输

## 开源协议

本项目采用 MIT License 开源，详见 `LICENSE`。

## 致谢

- [uni-app](https://uniapp.dcloud.net.cn/)
- [HBuilderX](https://www.dcloud.io/hbuilderx.html)
- [MongoDB](https://www.mongodb.com/)
- [个推](https://docs.getui.com/)
