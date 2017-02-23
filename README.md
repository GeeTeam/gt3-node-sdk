** 此处为极验 3.0 验证码的 Node SDK，如需要极验 2.0 验证码的SDK，请到 [gt-node-sdk](https://github.com/GeeTeam/gt-node-sdk)**

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

sdk 提供 `Geetest` 构造函数，实例化时需要传入一个配置对象。

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

## `register(callback)`

```js
// 回调形式
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

// Promise 形式
captcha.register().then(function (data) {
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
}, function (err) {
    console.error(err);
});
```

## `validate(result, callback)`

```js
// 回调形式
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

// Promise 形式
captcha.validate({
    geetest_challenge: 'xxx',
    geetest_validate: 'xxx',
    geetest_seccode: 'xxx'
}).then(function (success) {
    if (!success) {
        // 二次验证失败
        // send('fail');
    } else {
        // send('success');
    }
}, function (err) {
    console.error(err);
})
```

### 更新历史：[CHANGELOG](CHANGELOG.md)

