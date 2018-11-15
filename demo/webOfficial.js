var Geetest = require('../gt-sdk');

var captcha = {
    slide: Object,
    click: Object,
    fullpage: Object,
    enSlide: Object,
    enIcon: Object,
    enFullpage: Object
}

// 中文slide
captcha.slide = new Geetest({
    geetest_id: 'ff3cd843746782b0e0f377c2d234d6a5',
    geetest_key: '4c0e8b58d4952f5e3080be0e119300d3'
});

// 中文click
captcha.click = new Geetest({
    geetest_id: '9dd4b398509fd4b2a2cbf2a7c0a7c605',
    geetest_key: '2136d3f762321df38a783bda583efef0'
});

// 中文fullpage
captcha.fullpage = new Geetest({
    geetest_id: 'fe23d6148baf995e34decea58c12b5e4',
    geetest_key: '37eaf56b367bfc0cc3277b26eace7515'
});

// 英文slide
captcha.enSlide = new Geetest({
  geetest_id: '71730f3344b6e5f38717007368a833bb',
  geetest_key: '8b820b88c9768da4c4c3120fff5b5f7b'
});

// 英文icon
captcha.enIcon = new Geetest({
  geetest_id: '8e974d6b14c008b25b494daf506d659f',
  geetest_key: 'fe53f9bbc2144e43e2656dd4c6439588'
});

// 英文fullpage
captcha.enFullpage = new Geetest({
  geetest_id: '7b8ee24aa22172edf436fbaf851ff96c',
  geetest_key: '638bb5b66bebd65d5dc0cb8d4a340817'
});

module.exports = captcha;