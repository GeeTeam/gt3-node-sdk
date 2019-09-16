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

var webOfficial = require('./webOfficial');

// slide-官网
app.get("/gt/register-slide-official", function (req, res) {

    // 向极验申请每次验证所需的challenge
    webOfficial.slide.register(function (err, data) {
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
app.post("/gt/validate-slide-official", function (req, res) {

    // 对ajax提供的验证凭证进行二次验证
    webOfficial.slide.validate({
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

// click-官网
app.get("/gt/register-click-official", function (req, res) {

    // 向极验申请每次验证所需的challenge
    webOfficial.click.register(function (err, data) {
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
app.post("/gt/validate-click-official", function (req, res) {

    // 对ajax提供的验证凭证进行二次验证
    webOfficial.click.validate({
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

// fullpage-官网
app.get("/gt/register-fullpage-official", function (req, res) {

    // 向极验申请每次验证所需的challenge
    webOfficial.fullpage.register(function (err, data) {
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
app.post("/gt/validate-fullpage-official", function (req, res) {

    // 对ajax提供的验证凭证进行二次验证
    webOfficial.fullpage.validate({
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

// enSlide-官网
app.get("/gt/register-enSlide-official", function (req, res) {

  // 向极验申请每次验证所需的challenge
  webOfficial.enSlide.register(function (err, data) {
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
app.post("/gt/validate-enSlide-official", function (req, res) {

  // 对ajax提供的验证凭证进行二次验证
  webOfficial.enSlide.validate({
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

// enIcon-官网
app.get("/gt/register-enIcon-official", function (req, res) {

  // 向极验申请每次验证所需的challenge
  webOfficial.enIcon.register(function (err, data) {
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
app.post("/gt/validate-enIcon-official", function (req, res) {

  // 对ajax提供的验证凭证进行二次验证
  webOfficial.enIcon.validate({
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

// enFullpage-官网
app.get("/gt/register-enFullpage-official", function (req, res) {

  // 向极验申请每次验证所需的challenge
  webOfficial.enFullpage.register(function (err, data) {
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
app.post("/gt/validate-enFullpage-official", function (req, res) {

  // 对ajax提供的验证凭证进行二次验证
  webOfficial.enFullpage.validate({
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

var voice = require('./voice');

var hw_voice = require('./hw-voice');
// 华为app接口，支持risk_type: 0 (AI) 1(滑动) 2（大图）3（语音）
app.get("/gt/register-hw-voice", function (req, res) {
	// 向极验申请每次验证所需的challenge
	var risk_type = req.query.risk_type ? req.query.risk_type : 0;
	hw_voice.register(function (err, data) {
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
	},{risk_type:risk_type});
});
app.post("/gt/validate-hw-voice", function (req, res) {

	// 对ajax提供的验证凭证进行二次验证
	hw_voice.validate({
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

var space = require('./space');
app.get("/gt/register-space", function (req, res) {

    // 向极验申请每次验证所需的challenge
    space.register(function (err, data) {
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
app.post("/gt/validate-space", function (req, res) {

    // 对ajax提供的验证凭证进行二次验证
    space.validate({
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

var slide_na = require('./slide_en');
app.get("/gt/register-slide-na", function (req, res) {

    // 向极验申请每次验证所需的challenge
    slide_na.register(function (err, data) {
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
    }, {na: true});
});
app.post("/gt/validate-slide-na", function (req, res) {

    // 对ajax提供的验证凭证进行二次验证
    slide_na.validate({
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
    }, {na:false});
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
        challenge: req.body.challenge,
        idType: 1,
        idValue: req.body.phone
    }, function (err, success) {
        if (err) {

            // 网络错误
            res.send({
                status: "error",
                info: err
            });

        } else if (success && success.status === 'success') {
            console.log(success)
            res.send({
                status: "success",
                info: '登录成功'
            });
        } else {
            console.log(success)
            // 二次验证失败
            res.send({
                status: "fail",
                info: '登录失败'
            });
        }
    });
});
app.post("/gt/verify-web", function (req, res) {
    var sense = require('./sense')
    // 对ajax提供的验证凭证进行二次验证
    sense.verify({
        challenge: req.body.challenge,
        idType: 1,
        idValue: req.body.phone,
        gtid:'95da05c7809ec08cf97cfb2e932cd381',
        gtkey:'e639f5d2ad7ed993ec0f148c200181c5'
    }, function (err, success) {        
        if (err) {

            // 网络错误
            res.send({
                status: "error",
                info: err
            });

        } else if (success && success.status === 'success') {
            console.log(success)
            res.send({
                status: "success",
                info: '登录成功'
            });            
        } else {
            console.log(success)
            // 二次验证失败
            res.send({
                status: "fail",
                info: '登录失败'
            });
        }
    });
});
app.post("/gt/verify-ios", function (req, res) {
    var sense = require('./sense')
    // 对ajax提供的验证凭证进行二次验证
    sense.verify({
        challenge: req.body.challenge,
        idType: 1,
        idValue: req.body.phone,
        gtid: 'ccccf9a5f96540df27e34fb274d7ea00',
        gtkey: '01a679bb560db909d41feb0e154b9c7e'
    }, function (err, success) {        
        if (err) {

            // 网络错误
            res.send({
                status: "error",
                info: err
            });

        } else if (success && success.status === 'success') {
            console.log(success)
            res.send({
                status: "success",
                info: '登录成功'
            });            
        } else {
            console.log(success)
            // 二次验证失败
            res.send({
                status: "fail",
                info: '登录失败'
            });
        }
    });
});
app.post("/gt/verify-android", function (req, res) {
    var sense = require('./sense')
    // 对ajax提供的验证凭证进行二次验证
    sense.verify({
        challenge: req.body.challenge,
        idType: 1,
        idValue: req.body.phone,
        gtid: '06d65cab4b025384f7d8f575ab309035',
        gtkey: '0e2501393f725e9d94d5dbbc1533dfdd'        
    }, function (err, success) {        
        if (err) {

            // 网络错误
            res.send({
                status: "error",
                info: err
            });

        } else if (success && success.status === 'success') {
            console.log(success)
            res.send({
                status: "success",
                info: '登录成功'
            });            
        } else {
            console.log(success)
            // 二次验证失败
            res.send({
                status: "fail",
                info: '登录失败'
            });
        }
    });
});
app.post("/gt/verify-autosense", function (req, res) {
    var sense = require('./sense')
    // 对ajax提供的验证凭证进行二次验证
    sense.verify({
        challenge: req.body.challenge,
        idType: 4,
        idValue: new Date().getTime().toString('32'), //业务相关
        gtid:'a87d498cbd86bce7c211ef183a3ec958',
        gtkey:'6a76957cc1fb21a711aef6b9409c372c'
    }, function (err, success) {        
        if (err) {

            // 网络错误
            res.send({
                status: "error",
                info: err
            });

        } else if (success && success.status === 'success') {
            console.log(success)
            res.send({
                status: "success",
                info: '成功'
            });            
        } else {
            console.log(success)
            // 二次验证失败
            res.send({
                status: "fail",
                info: '失败'
            });
        }
    });
});
app.post("/gt/official-autosense", function (req, res) {
    var sense = require('./sense')
    // 对ajax提供的验证凭证进行二次验证
    sense.verify({
        challenge: req.body.challenge,
        idType: 4,
        idValue: new Date().getTime().toString('32'), //业务相关
        gtid:'13f1eeeeae9485df8b593bbe8eb12bfc',
        gtkey:'377f89479357367c685335d0dcca4b92'
    }, function (err, success) {        
        if (err) {

            // 网络错误
            res.send({
                status: "error",
                info: err
            });

        } else if (success && success.status === 'success') {
            console.log(success)
            res.send({
                status: "success",
                info: '成功'
            });            
        } else {
            console.log(success)
            // 二次验证失败
            res.send({
                status: "fail",
                info: '失败'
            });
        }
    });
});
app.post("/gt/verify-sense", function (req, res) {
    var sense = require('./sense')
    // 对ajax提供的验证凭证进行二次验证
    sense.verify({
        challenge: req.body.challenge,
        idType: 1,
        idValue: req.body.idValue || new Date().getTime().toString('32'),
        gtid:'',
        gtkey:'4e62e1b2994969a47b629840f71553d1'
    }, function (err, success) {        
        if (err) {

            // 网络错误
            res.send({
                status: "error",
                info: err
            });

        } else if (success && success.status === 'success') {
            console.log(success)
            res.send({
                status: "success",
                info: '登录成功'
            });            
        } else {
            console.log(success)
            // 二次验证失败
            res.send({
                status: "fail",
                info: '登录失败'
            });
        }
    });
});
app.post("/gt/verify-dk-v2", function (req, res) {
    var sense = require('./dk-v2')
    // 对ajax提供的验证凭证进行二次验证
    sense.verify({
        session_id: req.body.session_id,
    }, function (err, data) {  
        data = typeof data === 'string' ? JSON.parse(data) : data;
        if (err) {

            // 网络错误
            res.send({
                status: "error",
                info: err
            });

        } else if (data && data.status === 1) {
            console.log(data)
            res.send({
                status: "success",
                info: '登录成功'
            });
        } else {
            console.log(data)
            // 二次验证失败
            res.send({
                status: "fail",
                info: '登录失败'
            });
        }
    });
});
var port = 9977;
app.listen(port, function () {
    console.log('listening at http://localhost:' + port)
});
