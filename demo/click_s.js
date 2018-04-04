var Geetest = require('../gt-sdk');

var captcha_easy = new Geetest({
    geetest_id: '453dacd2513f1153a9cff7663641e0b9',
    geetest_key: 'fa126509a930422dbbd097d15d72f64f'
});

var captcha_hard = new Geetest({
    geetest_id: '079076dde2f95a42c1a8bace8828787e',
    geetest_key: 'd5921435616f3c517bdd4f0eb70a999c'
});

module.exports = {e: captcha_easy, h: captcha_hard};