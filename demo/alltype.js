var Geetest = require('../gt-sdk');

const KEYS = {
    "雷达-RIE": {
        id: "2faf346dfa15d7694076a51c0e621a62",
        key: "3d62b25a9843cd593bdb6b97d1932f57"
    },
    "雷达-滑动": {
        id: "a68efb2d2d460fb80e040ed9875d0a7a",
        key: "b01300428aca2418de1817cd6cd5097e"
    },
    "雷达-大图": {
        id: "b172b902629a868bfdfdb37be93770bc",
        key: "4122bd30491c838d45f9d2fa244ba92e"
    },
    "bind-RIE": {
        id: "23d541d33ca2b8897b874696047d9005",
        key: "30454d30beccc36449e4c20bb8221b30"
    },
    "bind-滑动": {
        id: "9be848cb88e3ca0e1aad51477d392e71",
        key: "89c094d7622cf21e00180cc9a9222f89"
    },
    "bind-大图": {
        id: "86e840f899eaf1bca3e75bf8b00d407e",
        key: "0ef478ec9d91f0ad023022c59a4a7e56"
    }
};

const SupportType = ["雷达-RIE", "雷达-滑动", "雷达-大图", "bind-RIE", "bind-滑动", "bind-大图"];


module.exports = function (typeId) {
    if (typeId > SupportType.length - 1) { throw Error('类型无效') }
    var type = KEYS[SupportType[typeId]];
    return new Geetest({
        geetest_id: type.id,
        geetest_key: type.key
    })
};