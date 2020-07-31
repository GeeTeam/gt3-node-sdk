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
  geetest_id: '305883028523f32c10909c712b625fcc',
  geetest_key: '816c0dc6bac010d8cc16ae120f410c5f'
});

// 英文icon
captcha.enIcon = new Geetest({
  geetest_id: '8e974d6b14c008b25b494daf506d659f',
  geetest_key: 'fe53f9bbc2144e43e2656dd4c6439588'
});

// 英文fullpage
captcha.enFullpage = new Geetest({
  geetest_id: '022397c99c9f646f6477822485f30404',
  geetest_key: 'd394e1cee7ed8ca4e173b9756b4de843'
});

module.exports = captcha;