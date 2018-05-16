var express = require("express");
var bodyParser = require("body-parser");

var Geetest = require('../gt-sdk');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('./demo/static'));

app.all('*', function(req, res, next){
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
        next();
});

var voice = require('./voice');

// click-转语音
app.get("/gt/register-click-voice", function (req, res) {

    // 向极验申请每次验证所需的challenge
    voice.register(function (err, data) {
        if (err) {
            console.error(err);
            return;
        }

        if (!data.success) {
            // 进入 failback，如果一直进入此模式，请检查服务器到极验服务器是否可访问
            // 可以通过修改 hosts 把极验服务器 api.geetest.com 指到不可访问的地址

            // 为以防万一，你可以选择以下两种方式之一：

            // 1. 继续使用极验提供的failback备用方案
            res.send(data);

            // 2. 使用自己提供的备用方案
            // todo

        } else {
            // 正常模式
            res.send(data);
        }
    },{risk_type: 2});
});
app.post("/gt/validate-click-voice", function (req, res) {

    // 对ajax提供的验证凭证进行二次验证
    voice.validate({
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

// slide-转语音
app.get("/gt/register-slide-voice", function (req, res) {

    // 向极验申请每次验证所需的challenge
    voice.register(function (err, data) {
        if (err) {
            console.error(err);
            return;
        }

        if (!data.success) {
            // 进入 failback，如果一直进入此模式，请检查服务器到极验服务器是否可访问
            // 可以通过修改 hosts 把极验服务器 api.geetest.com 指到不可访问的地址

            // 为以防万一，你可以选择以下两种方式之一：

            // 1. 继续使用极验提供的failback备用方案
            res.send(data);

            // 2. 使用自己提供的备用方案
            // todo

        } else {
            // 正常模式
            res.send(data);
        }
    },{risk_type: 1});
});
app.post("/gt/validate-slide-voice", function (req, res) {

    // 对ajax提供的验证凭证进行二次验证
    voice.validate({
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
// 语音
app.get("/gt/register-voice", function (req, res) {

    // 向极验申请每次验证所需的challenge
    voice.register(function (err, data) {
        if (err) {
            console.error(err);
            return;
        }

        if (!data.success) {
            // 进入 failback，如果一直进入此模式，请检查服务器到极验服务器是否可访问
            // 可以通过修改 hosts 把极验服务器 api.geetest.com 指到不可访问的地址

            // 为以防万一，你可以选择以下两种方式之一：

            // 1. 继续使用极验提供的failback备用方案
            res.send(data);

            // 2. 使用自己提供的备用方案
            // todo

        } else {
            // 正常模式
            res.send(data);
        }
    },{risk_type: 3});
});
app.post("/gt/validate-voice", function (req, res) {

    // 对ajax提供的验证凭证进行二次验证
    voice.validate({
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

var fullpage = require('./fullpage');
app.get("/gt/register-fullpage", function (req, res) {

    // 向极验申请每次验证所需的challenge
    fullpage.register(function (err, data) {
        if (err) {
            console.error(err);
            return;
        }

        if (!data.success) {
            // 进入 failback，如果一直进入此模式，请检查服务器到极验服务器是否可访问
            // 可以通过修改 hosts 把极验服务器 api.geetest.com 指到不可访问的地址

            // 为以防万一，你可以选择以下两种方式之一：

            // 1. 继续使用极验提供的failback备用方案
            res.send(data);

            // 2. 使用自己提供的备用方案
            // todo

        } else {
            // 正常模式
            res.send(data);
        }
    });
});
app.post("/gt/validate-fullpage", function (req, res) {

    // 对ajax提供的验证凭证进行二次验证
    fullpage.validate({
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

var click = require('./click');
app.get("/gt/register-click", function (req, res) {

    // 向极验申请每次验证所需的challenge
    click.register(function (err, data) {
        if (err) {
            console.error(err);
            return;
        }

        if (!data.success) {
            // 进入 failback，如果一直进入此模式，请检查服务器到极验服务器是否可访问
            // 可以通过修改 hosts 把极验服务器 api.geetest.com 指到不可访问的地址

            // 为以防万一，你可以选择以下两种方式之一：

            // 1. 继续使用极验提供的failback备用方案
            res.send(data);

            // 2. 使用自己提供的备用方案
            // todo

        } else {
            // 正常模式
            res.send(data);
        }
    });
});
app.post("/gt/validate-click", function (req, res) {

    // 对ajax提供的验证凭证进行二次验证
    click.validate({
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

var slide = require('./slide');
app.get("/gt/register-slide", function (req, res) {

    // 向极验申请每次验证所需的challenge
    slide.register(function (err, data) {
        if (err) {
            console.error(err);
            return;
        }

        if (!data.success) {
            // 进入 failback，如果一直进入此模式，请检查服务器到极验服务器是否可访问
            // 可以通过修改 hosts 把极验服务器 api.geetest.com 指到不可访问的地址

            // 为以防万一，你可以选择以下两种方式之一：

            // 1. 继续使用极验提供的failback备用方案
            res.send(data);

            // 2. 使用自己提供的备用方案
            // todo

        } else {
            // 正常模式
            res.send(data);
        }
    });
});
app.post("/gt/validate-slide", function (req, res) {

    // 对ajax提供的验证凭证进行二次验证
    slide.validate({
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

var slide_en = require('./slide_en');
app.get("/gt/register-slide-en", function (req, res) {

    // 向极验申请每次验证所需的challenge
    slide_en.register(function (err, data) {
        if (err) {
            console.error(err);
            return;
        }

        if (!data.success) {
            // 进入 failback，如果一直进入此模式，请检查服务器到极验服务器是否可访问
            // 可以通过修改 hosts 把极验服务器 api.geetest.com 指到不可访问的地址

            // 为以防万一，你可以选择以下两种方式之一：

            // 1. 继续使用极验提供的failback备用方案
            res.send(data);

            // 2. 使用自己提供的备用方案
            // todo

        } else {
            // 正常模式
            res.send(data);
        }
    });
});
app.post("/gt/validate-slide-en", function (req, res) {

    // 对ajax提供的验证凭证进行二次验证
    slide_en.validate({
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

var test = require('./test');
app.get("/gt/register-test", function (req, res) {

    // 向极验申请每次验证所需的challenge
    test.register(function (err, data) {
        if (err) {
            console.error(err);
            return;
        }

        if (!data.success) {
            // 进入 failback，如果一直进入此模式，请检查服务器到极验服务器是否可访问
            // 可以通过修改 hosts 把极验服务器 api.geetest.com 指到不可访问的地址

            // 为以防万一，你可以选择以下两种方式之一：

            // 1. 继续使用极验提供的failback备用方案
            res.send(data);

            // 2. 使用自己提供的备用方案
            // todo

        } else {
            // 正常模式
            res.send(data);
        }
    });
});
app.post("/gt/validate-test", function (req, res) {

    // 对ajax提供的验证凭证进行二次验证
    test.validate({
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

var userdemo = require('./userdemo');
app.get("/gt/register-userdemo", function (req, res) {

    // 向极验申请每次验证所需的challenge
    userdemo.register(function (err, data) {
        if (err) {
            console.error(err);
            return;
        }

        if (!data.success) {
            // 进入 failback，如果一直进入此模式，请检查服务器到极验服务器是否可访问
            // 可以通过修改 hosts 把极验服务器 api.geetest.com 指到不可访问的地址

            // 为以防万一，你可以选择以下两种方式之一：

            // 1. 继续使用极验提供的failback备用方案
            res.send(data);

            // 2. 使用自己提供的备用方案
            // todo

        } else {
            // 正常模式
            res.send(data);
        }
    });
});
app.post("/gt/validate-userdemo", function (req, res) {

    // 对ajax提供的验证凭证进行二次验证
    userdemo.validate({
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

var op = require('./onepass')
app.post("/gt/check_gateway", function (req, res) {
    op.check_gateway(req.body, function(err, result){        
        res.send(result);
    })
});
app.post("/gt/check_message", function (req, res) {    
    op.check_message(req.body, function(err, result){        
        res.send(result);
    })
});

var click_s = require('./click_s');
app.get("/gt/register-click-s-e", function (req, res) {

    // 向极验申请每次验证所需的challenge
    click_s.e.register(function (err, data) {
        if (err) {
            console.error(err);
            return;
        }

        if (!data.success) {
            // 进入 failback，如果一直进入此模式，请检查服务器到极验服务器是否可访问
            // 可以通过修改 hosts 把极验服务器 api.geetest.com 指到不可访问的地址

            // 为以防万一，你可以选择以下两种方式之一：

            // 1. 继续使用极验提供的failback备用方案
            res.send(data);

            // 2. 使用自己提供的备用方案
            // todo

        } else {
            // 正常模式
            res.send(data);
        }
    });
});
app.post("/gt/validate-click-s-e", function (req, res) {

    // 对ajax提供的验证凭证进行二次验证
    click_s.e.validate({
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
app.get("/gt/register-click-s-h", function (req, res) {

    // 向极验申请每次验证所需的challenge
    click_s.h.register(function (err, data) {
        if (err) {
            console.error(err);
            return;
        }

        if (!data.success) {
            // 进入 failback，如果一直进入此模式，请检查服务器到极验服务器是否可访问
            // 可以通过修改 hosts 把极验服务器 api.geetest.com 指到不可访问的地址

            // 为以防万一，你可以选择以下两种方式之一：

            // 1. 继续使用极验提供的failback备用方案
            res.send(data);

            // 2. 使用自己提供的备用方案
            // todo

        } else {
            // 正常模式
            res.send(data);
        }
    });
});
app.post("/gt/validate-click-s-h", function (req, res) {

    // 对ajax提供的验证凭证进行二次验证
    click_s.h.validate({
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


var phrase = require('./phrase');
app.get("/gt/register-phrase", function (req, res) {

    // 向极验申请每次验证所需的challenge
    phrase.register(function (err, data) {
        if (err) {
            console.error(err);
            return;
        }

        if (!data.success) {
            // 进入 failback，如果一直进入此模式，请检查服务器到极验服务器是否可访问
            // 可以通过修改 hosts 把极验服务器 api.geetest.com 指到不可访问的地址

            // 为以防万一，你可以选择以下两种方式之一：

            // 1. 继续使用极验提供的failback备用方案
            res.send(data);

            // 2. 使用自己提供的备用方案
            // todo

        } else {
            // 正常模式
            res.send(data);
        }
    });
});
app.post("/gt/validate-phrase", function (req, res) {

    // 对ajax提供的验证凭证进行二次验证
    phrase.validate({
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

var icon = require('./icon');
app.get("/gt/register-icon", function (req, res) {

    // 向极验申请每次验证所需的challenge
    icon.register(function (err, data) {
        if (err) {
            console.error(err);
            return;
        }

        if (!data.success) {
            // 进入 failback，如果一直进入此模式，请检查服务器到极验服务器是否可访问
            // 可以通过修改 hosts 把极验服务器 api.geetest.com 指到不可访问的地址

            // 为以防万一，你可以选择以下两种方式之一：

            // 1. 继续使用极验提供的failback备用方案
            res.send(data);

            // 2. 使用自己提供的备用方案
            // todo

        } else {
            // 正常模式
            res.send(data);
        }
    });
});
app.post("/gt/validate-icon", function (req, res) {

    // 对ajax提供的验证凭证进行二次验证
    icon.validate({
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

app.post("/gt/verify", function (req, res) {
    var sense = require('./sense')
    // 对ajax提供的验证凭证进行二次验证
    sense.verify({
        id: req.body.id,
        challenge: req.body.challenge,
        idType: req.body.idType,
        idValue: req.body.username
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
            console.log(success)
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
