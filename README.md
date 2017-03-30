**此处为极验 3.0 验证码的 Node SDK，如需要极验 2.0 验证码的SDK，请到 [gt-node-sdk](https://github.com/GeeTeam/gt-node-sdk)**

# Install 安装

```
npm install gt3-sdk --save
```

# 运行DEMO

```shell
cd Project
git clone https://github.com/GeeTeam/gt3-node-sdk.git
cd gt3-node-sdk
npm install
npm start
// 最后请打开浏览器访问localhost:9977
// 了解sdk的使用方式请查阅demo目录下的app.js文件
```

# 使用说明

sdk 提供 `Geetest` 构造函数，实例化时需要传入一个配置对象。为了更好的理解，请参照demo理解以下内容。

配置对象的字段如下：

- `geetest_id`：验证公钥，**必须**
- `geetest_key`：验证私钥，**必须**
- `protocol`：与极验服务器交互时使用的协议，默认为 `http://`，**可选**
- `api_server`：针对私有化用户提供对默认的 `api.geetest.com` 进行修改，普通用户无需关注此选项，**可选**

`geetest_id` 和 `geetest_key` 申请地址：[account.geetest.com](http://account.geetest.com/)

申请后，初始化 `Geetest`：

```js
var Geetest = require('gt3-sdk');

var captcha = new Geetest({
    geetest_id: 'xxx', // 将xxx替换为您申请的 id
    geetest_key: 'xxx' // 将xxx替换为您申请的 key
});
```

上述 `Geetest` 的实例 `captcha` 提供两个方法：

## `register(data, callback)`

`data` 给用户传入客户端的类型和ip地址（如果无法知道ip地址则填写`'unknown'`）。如果不想传 `data`，则传入 `null`。

类型有以下几种：

`'web'`: pc浏览器
`'h5'`: 手机浏览器，包括webview
`'native'`: 原生APP
`'unknown'`: 未知

## `validate(fallback, result, callback)`

`fallback` 表示当前session是否宕机。

### 更新历史：[CHANGELOG](CHANGELOG.md)

