# upush-app

一个基于 `uni-app` 的消息推送示例项目，包含移动端客户端与 Node.js 服务端，适合用来快速搭建简单的登录、消息推送、消息列表展示流程。

## 项目简介

本项目主要由两部分组成：

- `uni-app` 客户端：负责登录、接收推送消息、查看消息列表
- `upushServer` 服务端：负责云函数风格接口转发、消息推送调用、数据库连接

当前仓库已对部分敏感配置做了拆分处理：

- 个推配置改为从环境变量读取
- MongoDB 配置改为从环境变量读取
- token 缓存文件不会进入 Git
- `uniCloud-aliyun/` 目录默认不上传到仓库

## 功能特性

- 用户登录
- 拉取推送消息列表
- 服务端统一处理云函数调用
- 对接个推推送服务
- MongoDB 持久化存储
- uni-app 多端项目结构

## 目录结构

```text
.
|-- App.vue
|-- main.js
|-- manifest.json
|-- pages.json
|-- pages/
|   `-- index/
|       |-- home.vue
|       `-- index.vue
|-- common/
|   |-- api/
|   `-- lib/
|-- static/
|-- uni_modules/
|-- upushServer/
|   |-- app.js
|   |-- cloudfunctions/
|   |-- db/
|   |-- package.json
|   `-- unipush/
`-- README.md
```

## 运行环境

### 客户端

- HBuilderX 5+
- uni-app（Vue 2）

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

## 接口说明

### 服务端接口

当前 `upushServer/app.js` 里主要提供以下接口：

- `POST /cloudfunction`：统一调用服务端 `cloudfunctions`
- `POST /pushMessage`：提交推送消息
- `GET /pushMessage`：通过查询参数提交推送消息
- `GET /pushMessage/:id`：按用户或目标 ID 提交推送消息

### 客户端主要页面

- `pages/index/index.vue`：登录页
- `pages/index/home.vue`：消息列表页

## 已知事项

- `common/lib/cloudfunctions.js` 当前仍使用硬编码服务端地址，部署前建议改为按环境配置
- 仓库默认不包含 `uniCloud-aliyun/`，如果你依赖该目录，请自行本地维护或使用单独仓库存放
- 推送能力依赖个推服务可用配置

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
