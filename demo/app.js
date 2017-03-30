var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');

var Geetest = require('../gt-sdk');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('./'));
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/login.html");
});

app.use(session({
    secret: 'my-secret',
    resave: false,
    saveUninitialized: true
}));

// pc 端接口

var captcha1 = new Geetest({
    geetest_id: '48a6ebac4ebc6642d68c217fca33eb4d',
    geetest_key: '4f1c085290bec5afdc54df73535fc361'
});
app.get("/gt/register1", function (req, res) {
    // 向极验申请每次验证所需的challenge
    captcha1.register({
        client_type: 'unknown',
        ip_address: 'unknown'
    }, function (err, data) {
        if (err) {
            console.error(err);
            return;
        }

        if (!data.success) {
            // 进入 failback，如果一直进入此模式，请检查服务器到极验服务器是否可访问
            // 可以通过修改 hosts 把极验服务器 api.geetest.com 指到不可访问的地址

            // 为以防万一，你可以选择以下两种方式之一：

            // 1. 继续使用极验提供的failback备用方案
            req.session.fallback = true;
            res.send(data);

            // 2. 使用自己提供的备用方案
            // todo

        } else {
            // 正常模式
            req.session.fallback = false;
            res.send(data);
        }
    });
});

app.post("/gt/form-validate1", function (req, res) {

    // 对form表单提供的验证凭证进行验证
    captcha1.validate(req.session.fallback, {

        geetest_challenge: req.body.geetest_challenge,
        geetest_validate: req.body.geetest_validate,
        geetest_seccode: req.body.geetest_seccode

    }, function (err, success) {

        if (err) {
            // 网络错误
            res.send(err);

        } else if (!success) {

            // 二次验证失败
            res.send("<h1 style='text-align: center'>登录失败</h1>");

        } else {
            res.send("<h1 style='text-align: center'>登录成功</h1>");
        }

    });
});

var captcha2 = new Geetest({
    geetest_id: '002bc30ff1eef93e912f45814945e752',
    geetest_key: '4193a0e3247b82a26f563d595c447b1a'
});

app.get("/gt/register2", function (req, res) {

    // 向极验申请每次验证所需的challenge
    captcha2.register({
        client_type: 'unknown',
        ip_address: 'unknown'
    }, function (err, data) {
        if (err) {
            console.error(err);
            return;
        }

        if (!data.success) {
            // 进入 failback，如果一直进入此模式，请检查服务器到极验服务器是否可访问
            // 可以通过修改 hosts 把极验服务器 api.geetest.com 指到不可访问的地址

            // 为以防万一，你可以选择以下两种方式之一：

            // 1. 继续使用极验提供的failback备用方案
            req.session.fallback = true;
            res.send(data);

            // 2. 使用自己提供的备用方案
            // todo

        } else {
            // 正常模式
            req.session.fallback = false;
            res.send(data);
        }
    });
});

app.post("/gt/ajax-validate2", function (req, res) {

    // 对ajax提供的验证凭证进行二次验证
    captcha2.validate(req.session.fallback, {

        geetest_challenge: req.body.geetest_challenge,
        geetest_validate: req.body.geetest_validate,
        geetest_seccode: req.body.geetest_seccode

    }, function (err, success) {

        if (err) {

            // 网络错误
            res.send({
                status: "error",
                info: err
            });

        } else if (!success) {

            // 二次验证失败
            res.send({
                status: "fail",
                info: '登录失败'
            });
        } else {

            res.send({
                status: "success",
                info: '登录成功'
            });
        }
    });
});

var port = 9977;
app.listen(port, function () {
    console.log('listening at http://localhost:' + port)
});
