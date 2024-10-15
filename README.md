# name-nacing
## 项目介绍

本项目是一个基于Vue.js开发的点名系统，主要用于课堂、会议等场合的快速签到。通过本系统，管理员可以轻松管理参与人员，快速进行点名操作，并实时查看签到情况。

## 技术栈

* **Vue.js** : 前端框架，用于构建用户界面。
* **Axios** : 用于HTTP通信，已进行二次封装以简化API调用。
* **Element UI** : Vue.js的UI组件库，提升开发效率。
* **Token-based Authentication** : 基于Token的认证机制，保障系统安全性。

## 功能特性

* **用户登录/登出** : 管理员登录系统，进行点名操作。
* **点名管理** : 快速进行点名，记录签到状态。
* **签到记录** : 查看历史签到记录，支持导出功能。
* **实时统计** : 实时统计签到人数，展示签到进度。

## 环境搭建

### 安装依赖

bash

复制

```
npm install
```

### 开发环境

bash

复制

```
npm run serve
```

### 生产环境

bash

复制

```
npm run build
```

## 目录结构

复制

```
roll-call-system/
├── public/
│   └── index.html
├── src/
│   ├── assets/              # 静态资源
│   ├── components/          # 公共组件
│   ├── views/               # 页面组件
│   ├── router/              # 路由配置
│   ├── store/               # Vuex状态管理
│   ├── api/                 # API接口
│   ├── utils/               # 工具类
│   ├── App.vue
│   └── main.js
├── .env.development          # 开发环境配置
├── .env.production           # 生产环境配置
└── package.json
```
