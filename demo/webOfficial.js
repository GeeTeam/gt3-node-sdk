var Geetest = require('../gt-sdk');

var captcha = {
    slide: Object,
    click: Object,
    fullpage: Object
}

captcha.slide = new Geetest({
    geetest_id: 'ff3cd843746782b0e0f377c2d234d6a5',
    geetest_key: '4c0e8b58d4952f5e3080be0e119300d3'
});

captcha.click = new Geetest({
    geetest_id: '9dd4b398509fd4b2a2cbf2a7c0a7c605',
    geetest_key: '2136d3f762321df38a783bda583efef0'
});

captcha.fullpage = new Geetest({
    geetest_id: 'fe23d6148baf995e34decea58c12b5e4',
    geetest_key: '37eaf56b367bfc0cc3277b26eace7515'
});

module.exports = captcha;