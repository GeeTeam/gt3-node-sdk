极验行为验证
========
极验行为验证是一款可以帮助你的网站与 APP 应用识别与拦截机器程序批量自动化操作的SaaS应用。它是由极验开发的
新一代人机验证产品，它不基于传统“问题-答案”的检测模式，而是通过利用深度学习对验证过程中产生的行为数据进行
高维分析，发现人机行为模式与行为特征的差异，更加精准地区分人机行为。


集成流程
--------
行为验证的整个集成流程是顺序进行的，业务层主要涉及到客户端和服务端的部署，在下一个步骤开始前请确保上一个
步骤的检查点都已经正确完成；请开发者严格按照步骤进行。

步骤： 注册极验账户(1) - 登录极验后台(2) - 注册验证ID和Key (3) - 配置ID属性(4) - 集成服务端代码(5) - 
	   集成客户端代码(6) - 服务上线(7) - 数据上线(8) - 登录后台查看数据(9)


新手指南
--------
0. 产品概述 - https://docs.geetest.com/install/overview/prodes/
1. 入门指引 - https://docs.geetest.com/install/overview/beginner/


文档导航
--------
* 部署指引 - https://docs.geetest.com/install/overview/guide
* 数据通讯流程 - https://docs.geetest.com/install/overview/flowchart
* 服务的部署 - https://docs.geetest.com/install/deploy/server/node
* 客户端部署 - https://docs.geetest.com/install/deploy/client/web
* 名词解释 - https://docs.geetest.com/install/help/glossary
* 常见问题 - https://docs.geetest.com/install/help/faq


联系我们
--------
官网： www.geetest.com    
技术支持邮箱：service@geetest.com    
技术支持电话：400-8521-816    
联系商务邮箱：cooperation@geetest.com    
联系商务电话：13720157161    


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

sdk 提供 Geetest 构造函数，实例化时需要传入一个配置对象。为了更好的理解，请参照demo理解以下内容。

配置对象的字段如下：

- geetest_id：验证公钥，**必须**
- geetest_key：验证私钥，**必须**
- protocol：与极验服务器交互时使用的协议，默认为 http://，**可选**
- api_server：针对私有化用户提供对默认的 api.geetest.com 进行修改，普通用户无需关注此选项，**可选**

geetest_id 和 geetest_key 申请地址：[account.geetest.com](http://account.geetest.com/)

申请后，初始化 Geetest：

```js
var Geetest = require('gt3-sdk');

var captcha = new Geetest({
    geetest_id: 'xxx', // 将xxx替换为您申请的 id
    geetest_key: 'xxx' // 将xxx替换为您申请的 key
});
```

上述 Geetest 的实例 captcha 提供两个方法：

##  register(data, callback)

data 给用户传入客户端的类型和ip地址（如果无法知道ip地址则填写'unknown'）。如果不想传 data，则传入 null。

data结构

- user_id：用户标识，若担心用户信息风险，可作预处理(如哈希处理)再提供
- client_type：'web': pc浏览器 'h5': 手机浏览器，包括webview 'native': 原生APP 'unknown': 未知
- ip_address：客户端请求您服务器的ip地址，'unknown'表示未知


## validate(failback, result, callback)

failback 表示当前session是否宕机。Boolean

result 验证onSuccess返回的结果.

result 结构
- geetest_challenge：验证返回的结果
- geetest_validate：验证返回的结果
- geetest_seccode：验证返回的结果


# 注意事项

1. 部署在生产环境中时，需要将js文件 demo/static/libs/gt.js 引入到页面中去。该js的作用是充分利用多CDN，使静态文件尽可能加载成功。

### 更新历史：[CHANGELOG](CHANGELOG.md)

