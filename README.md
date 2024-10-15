# name-nacing
## 项目介绍

本项目是一个基于Vue.js开发的web点名系统，主要用于课堂、会议等场合的快速签到。通过本系统，管理员可以轻松管理参与人员，快速进行点名操作，并实时查看签到情况并且可以调整成员的积分、获取排名数据等。

## 演示视频

https://www.bilibili.com/video/BV1hV2YYKEBj/?share_source=copy_web&vd_source=b685eca13d7e9f08a70ac4c9963f1d4c

## 上线地址

http://47.122.59.26:5173/

## 技术栈

* **Vue.js** : 前端框架，用于构建用户界面。
* **Axios** : 用于HTTP通信，已进行二次封装以简化API调用。
* **Element Plus** : Vue.js的UI组件库，提升开发效率。
* **Token-based Authentication** : 基于Token的认证机制，保障系统安全性。

## 功能特性

* **用户登录/登出** : 进入登录系统，存token，进行点名操作。
* **点名管理** : 下载点名模板，导入点名文件，快速进行点名，实行积分奖惩制度。
* **点名规则** : 积分越高被点到的概率越小。
* **随机事件** : 制定随机事件，让点名过程变得更有趣。
* **积分记录** : 搜索、翻页查看累计积分排名，支持导出功能。

## 环境搭建

### 安装依赖

```
npm install
```

### 开发环境

```
npm run dev
```

### 生产环境

```
npm run build
```

## 目录结构

```
FRONT_ATTENDANCE/
├── public/
│   └── 点名.png
├── src/
│   ├── assets/              # 静态资源
│   ├── views/               # 页面组件
│   ├── router/              # 路由配置
│   ├── token/               # token的存取和删除
│   ├── utils/               # axios二次封装
│   ├── App.vue
│   └── main.js
├── index.html          
├── jsconfig.json
├── package-lock.json
├── package.json            
└── vite.config.js
```
