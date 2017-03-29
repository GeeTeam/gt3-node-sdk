# 概述

本 SDK 为极验验证 3.0 的 Node 服务端库。封装了与极验 API 接口交互相关的细节，以及提供了 failback 功能。

## 环境要求

| 条目 | |
| --- | --- |
| 兼容性    | Node 4+ |
| SDK 依赖  | request |
| demo 依赖 | express, body-parser, supervisor |

通过在项目的根目录下运行 `npm install` 命令来安装所有依赖。

## 资源下载

| 条目 | |
|---|---|
| 产品结构流程 | http:// |
| SDK下载链接 | http:// |
| SDK接口文档 | [gt3-node-sdk](https://github.com/GeeTeam/gt3-node-sdk) |
| 错误码列表 | http:// |
| Q&A | |

# 安装

## 下载SDK

### 使用 git 从 Github 获取

```
git clone https://github.com/GeeTeam/gt3-node-sdk.git
```

### 手动下载获取

使用从Github下载ZIP文件获取最新的sdk

下载地址：[gt3-node-sdk](https://github.com/GeeTeam/gt3-node-sdk/archive/master.zip)

## 引入及初始化

在 Node 项目中，通过 `npm install gt3-sdk --save` 安装该 SDK。然后通过以下方式引入：

```js
var Geetest = require('gt3-sdk');
```

## 接口

`Geetest` 初始化后的实例拥有以下接口：

1. 注册接口 `register`
2. 二次验证接口 `validate`

# 代码示例

### 初始化及获取challenge

```
var captcha = new Geetest({
    geetest_id: 'xxx',
    geetest_key: 'xxx'
});
captcha.register(function (err, data) {
    if (err) {
        console.error(err);
        return;
    }
    if (!data.success) {
        // 进入 failback，如果一直进入此模式，请检查服务器到极验服务器是否可访问
        // 可以通过修改 hosts 把极验服务器 api.geetest.com 指到不可访问的地址

        // 为以防万一，你可以选择以下两种方式之一：

        // 1. 继续使用极验提供的failback备用方案
        // send(data);

        // 2. 使用自己提供的备用方案
        // todo
    } else {
        // 正常模式
        // send(data);
    }
});

```

### 二次验证

```
captcha.validate({
    geetest_challenge: 'xxx',
    geetest_validate: 'xxx',
    geetest_seccode: 'xxx'
}, function (err, success) {
    if (err) {
        // 网络错误
        // send(err);
    } else if (!success) {
        // 二次验证失败
        // send('fail');
    } else {
        // send('success');
    }
});
```

# 运行demo

安装好依赖后，在 SDK 根目录下运行 `npm start`，然后使用浏览器访问 [http://localhost:9977](http://localhost:9977)