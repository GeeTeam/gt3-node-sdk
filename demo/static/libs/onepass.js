"v1.0 Geetest Inc.";

(function (global, factory) {

    "use strict";

    if (typeof module === "object" && typeof module.exports === "object") {

        // CommonJS
        module.exports = global.document ?
            factory(global, true) :
            function (w) {
                if (!w.document) {
                    throw new Error("Geetest requires a window with a document");
                }
                return factory(w);
            };
    } if(typeof define === 'function' && define.amd ){
        define(factory)
    } else {
        window.GTOP = factory(global);
    }

})(typeof window !== "undefined" ? window : this, function (window, noGlobal) {

    /**
 * @constructor
 * 独立实现的事件中心
 */
function PureEvent() {
    this._events = {};
}
PureEvent.prototype = {
    _addEvent: function (type, cb) {
        var self = this;
        if (self._events[type]) {
            self._events[type].push(cb);
        } else {
            self._events[type] = [cb];
        }
        return self;
    },
    _emitEvent: function (type, msg) {
        var self = this;
        var cbs = self._events[type];
        if (!cbs) {
            return;
        }
        for (var i = 0, len = cbs.length; i < len; i = i + 1) {
            cbs[i](msg);
        }
        return self;
    },
    _destroy: function () {
        this._events = {};
    }
};
/**
 * Created by rhx on 2017/5/12.
 */
var ajax = (function () {
    return {
        _canAjax: function () {
            return (window.XDomainRequest
                || (window.XMLHttpRequest
                && ('withCredentials' in (new window.XMLHttpRequest()))))
                && window.JSON;
        },
        _post: function (url, data, success, error) {

            var body = window.JSON.stringify(data);

            if (window.XMLHttpRequest && !('withCredentials' in (new window.XMLHttpRequest()))) {

                var protocol = window.location.protocol;
                var xdr = new window.XDomainRequest();

                // XDomainRequest 要求跨域的协议与页面一致
                if (url.indexOf(protocol) === -1) {
                    url = url.replace(/^https?:/, protocol);
                }

                xdr.open('POST', url);
                xdr.ontimeout = function () {
                    typeof error === 'function' && error({error: 'timeout'});
                };
                xdr.onerror = function () {
                    typeof error === 'function' && error({error: 'error'})
                };
                xdr.onload = function () {
                    typeof success === 'function' && success(window.JSON.parse(xdr.responseText));
                };
                xdr.send(body);
            } else if (window.XMLHttpRequest) {
                var xhr = new window.XMLHttpRequest();
                xhr.open('POST', url, true);
                xhr.setRequestHeader('Content-Type', 'text/plain;charset=utf-8');
                xhr.setRequestHeader('Accept', 'application/json');
                xhr.withCredentials = true; // 允许带上 cookie，IE10+ 有效
                xhr.onload = function () {
                    success(window.JSON.parse(xhr.responseText));
                };
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 200) {
                            success(window.JSON.parse(xhr.responseText));
                        } else {
                            error({error: 'status: ' + xhr.status});
                        }
                    }
                };
                xhr.send(body);
            }
        }
    }
})();
var _Promise = (function (root) {
    // 工具函数
    var isFunction = function (value) {
        return (typeof value === 'function');
    };
    var isObject = function (value) {
        return (typeof value === 'object' && value !== null);
    };
    var async = function (fun) {
        fun();
    };

    // 队列结构
    function Queue() {
        var o = this;
        o._head = o._tail = null;
    }

    Queue.prototype = {
        enqueue: function (ele) {
            var o = this;
            var one = {
                ele: ele,
                next: null
            };
            if (o._head === null) {
                o._head = this._tail = one;
            } else {
                o._tail.next = one;
                o._tail = o._tail.next;
            }
        },
        dequeue: function () {
            var o = this;
            if (o._head === null) {
                throw new Error('queue is empty');
            }
            var res = o._head.ele;
            o._head = o._head.next;
            return res;
        },
        isEmpty: function () {
            var o = this;
            return o._head === null;
        },
        clear: function () {
            var o = this;
            o._head = o._next = null;
        },
        each: function (cb) {
            var o = this;
            if (!o.isEmpty()) {
                cb(o.dequeue());
                o.each(cb);
            }
        }
    };

    // Promise解决过程[[Resolve]](promise, x)
    var _Resolve_ = function (promise, x) {
        if (promise === x) {
            promise._reject(new TypeError());
        } else if (x instanceof Promise) {
            x.then(function (value) {
                _Resolve_(promise, value);
            }, function (reason) {
                promise._reject(reason);
            });
        } else if (isFunction(x) || isObject(x)) {
            var then;
            try {
                then = x.then;
            } catch (e) {
                Promise._catch(e);
                promise._reject(e);
                return;
            }

            var flag = false;
            if (isFunction(then)) {
                try {
                    then.call(x, function (y) {
                        if (flag) {
                            return;
                        }
                        flag = true;
                        _Resolve_(promise, y);
                    }, function (r) {
                        if (flag) {
                            return;
                        }
                        flag = true;
                        promise._reject(r);
                    })
                } catch (e) {
                    if (flag) {
                        return;
                    }
                    flag = true;
                    promise._reject(e);
                }
            } else {
                promise._resolve(x);
            }
        } else {
            promise._resolve(x);
        }
    };

    // Promise对象
    function Promise(asyncJob) {
        var o = this;
        o._state = o.PENDING;
        o._q1 = new Queue();
        o._q2 = new Queue();
        if (isFunction(asyncJob)) {
            try {
                asyncJob(function (value) {
                    o._resolve(value)
                }, function (reason) {
                    o._reject(reason);
                });
            } catch (e) {
                Promise._catch(e);
            }
        }
    }

    var debug = false;

    Promise.debug = function () {
        debug = true;
    };

    Promise._catch = function (e) {
        if (debug && typeof console !== 'undefined') {
            console.error(e);
        }
    };

    Promise.prototype = {

        PENDING: 0,
        RESOLVED: 1,
        REJECTED: -1,

        _resolve: function (value) {
            var o = this;
            if (o._state !== o.PENDING) {
                return;
            }
            o._state = o.RESOLVED;
            o._value = value;
            o._run();
        },

        _reject: function (reason) {
            var o = this;
            if (o._state !== o.PENDING) {
                return;
            }
            o._state = o.REJECTED;
            o._reason = reason;
            o._run();
        },

        _run: function () {
            var o = this;
            var q, arg, state = o._state;
            if (state === o.RESOLVED) {
                q = o._q1;
                o._q2.clear();
                arg = o._value;
            } else if (state === o.REJECTED) {
                q = o._q2;
                o._q1.clear();
                arg = o._reason;
            }
            q.each(function (fun) {
                async(function () {
                    fun(state, arg);
                });
            });
        },

        _return_: function (state, handler, arg) {

            var o = this;

            async(function () {

                if (isFunction(handler)) {

                    var x;

                    try {
                        x = handler(arg);
                    } catch (e) {
                        Promise._catch(e);
                        o._reject(e);
                        return;
                    }

                    _Resolve_(o, x);

                } else {
                    if (state === o.RESOLVED) {
                        o._resolve(arg);
                    } else if (state === o.REJECTED) {
                        o._reject(arg);
                    }
                }
            });

        },

        then: function (onResolved, onRejected) {

            var o = this;

            var p2 = new Promise();

            o._q1.enqueue(function (state, value) {
                p2._return_(state, onResolved, value);
            });

            o._q2.enqueue(function (state, reason) {
                p2._return_(state, onRejected, reason);
            });

            if (o._state === o.RESOLVED) {
                o._run();
            } else if (o._state === o.REJECTED) {
                o._run();
            }

            return p2;
        }
    };


    // 并行，所有完成才算完成
    Promise.all = function (jobs) {
        return new Promise(function (resolve, reject) {
            var max = jobs.length;
            var count = 0;
            var flag = false;
            var values = [];

            function check(err, value, index) {
                if (flag) {
                    return;
                }
                if (err !== null) {
                    flag = true;
                    reject(err);
                }
                values[index] = value;
                count += 1;
                if (count === max) {
                    flag = true;
                    resolve(values);
                }
            }

            for (var i = 0; i < max; i = i + 1) {
                (function (index) {
                    var job = jobs[index];
                    if (!(job instanceof Promise)) {
                        job = new Promise(job);
                    }
                    job.then(function (value) {
                        check(null, value, index);
                    }, function (reason) {
                        check(reason || true);
                    });
                }(i));
            }
        })
    };

    // 并行，只要有一个完成就算完成
    Promise.race = function (jobs) {
        return new Promise(function (resolve, reject) {

            var max = jobs.length;
            var flag = false;
            var count = 0;

            function check(err, value) {
                if (flag) {
                    return;
                }
                if (err == null) {
                    flag = true;
                    resolve(value);
                } else {
                    count += 1;
                    if (count >= max) {
                        flag = true;
                        reject(err);
                    }
                }
            }

            for (var i = 0; i < max; i = i + 1) {
                (function (index) {
                    var job = jobs[index];
                    if (!(job instanceof Promise)) {
                        job = new Promise(job);
                    }
                    job.then(function (value) {
                        check(null, value, index);
                    }, function (reason) {
                        check(reason || true);
                    });
                }(i));
            }
        })
    };


    // 串行
    Promise.step = function (jobs) {

        var max = jobs.length;

        var p2 = new Promise();

        var next = function (at, value) {
            if (at >= max) {
                return p2._resolve(value);
            }
            new Promise(jobs[at]).then(function (value) {
                next(at + 1, value)
            }, function (reason) {
                p2._reject(reason);
            })
        };
        new Promise(jobs[0]).then(function (value) {
            next(1, value);
        }, function (reason) {
            p2._reject(reason);
        });

        return p2;
    };

    // for common use
    // if (module && module.exports) {
    //     module.exports = exports = Promise;
    // } else {
    //     root.LittlePromise = Promise;
    // }

    // for gt-captcha
    Promise.prototype._then = function (onResolved, onRejected) {
        return this.then(onResolved, onRejected);
    };
    return Promise;
})(this);

_Promise.debug();
var uid = (function () {
    // var at = -1;
    return function () {
        // at += 1;
        // return at;
        return parseInt(Math.random() * 10000) + (new Date()).valueOf()
    }
})();
// 数据中心
var data = (function () {
    var _data = [];
    return {
        // 存储数据
        _set: function (id, val) {
            _data[id] = val;
        },
        // 获取数据
        _get: function (id) {
            return _data[id];
        }
    }
})();
/*
* @description extend
*/
function extend(child, parent) {
    for(var p in parent){
        if(parent.hasOwnProperty(p)){
            var v = parent[p];
            child[p] = v;
        }
    }
};

var ERROR = 'error';
var GATEWAY_FAIL = 'gateway_fail';
var GATEWAY_SUCCESS = 'gateway_success';
var SENDMESSAGE_SUCCESS = 'sendmessage_success';
var SENDMESSAGE_FAIL = 'sendmessage_fail';
var CHECKMESSAGE_SUCCESS = 'checkmessage_success';
var CHECKMESSAGE_FAIL = 'checkmessage_fail';
function Error(){}
// pre_gateway 加载失败
Error.pre_gateway_net = function(err){
    return { code: 100};
};
// pre_gateway 返回result不会0
Error.pre_gateway_result = function(err){
    return { code: 101};
};
// operator_url 加载失败
Error.pre_getmobile_net = function(err){
    return { code: 102};
};
// operator_url 返回result不会0
Error.pre_getmobile_result = function(err){
    return { code: 103};
};
// check_gateway 加载失败
Error.check_gateway_net = function(err){
    return { code: 104};
};
// check_gateway 返回result不会0
Error.check_gateway_result = function(err){
    return { code: 105};
};
// send_message 加载失败
Error.send_message_net = function(err){
    return { code: 106};
};
// send_message 返回result不会0
Error.send_message_result = function(err){
    return { code: 107};
};
// check_message 加载失败
Error.check_message_net = function(err){
    return { code: 108};
};
// check_message 返回result不会0
Error.check_message_result = function(err){
    return { code: 109};
};
// jsonp方法
var TIMEOUT = 30000;
var TIMEOUT_ERROR = '网络不给力';

var loadJS = function (url, timeout) {
    return new _Promise(function (resolve, reject) {
        var head = document.getElementsByTagName('head')[0];
        var s = document.createElement('script');        
        s.onload = s.onreadystatechange = function () {
            if (!s.readyState
                || s.readyState === "loaded"
                || s.readyState === 'complete') {                
                resolve(s);
            }
        };
        s.onerror = function (e) {
            reject(TIMEOUT_ERROR);
        };
        s.src = url;        
        head.appendChild(s);
        // 
        setTimeout(function () {            
            reject(TIMEOUT_ERROR);
        }, timeout || TIMEOUT);
    });
};

var normalizeDomain = function (domain) {
    return domain.replace(/^https?:\/\/|\/$/g, '');
};
var normalizePath = function (path) {
    path = path.replace(/\/+/g, '/');
    if (path.indexOf('/') !== 0) {
        path = '/' + path;
    }
    return path;
};
var normalizeQuery = function (query) {
    if (!query) {
        return '';
    }
    var q = '?';
    for(var p in query){
        if(query.hasOwnProperty(p)){
            var v = query[p];
            q = q + encodeURIComponent(p) + '=' + encodeURIComponent(v) + '&';            
        }
    }
    if (q === '?') {
        q = '';
    }
    return q.replace(/&$/, '');
};
var makeURL = function (protocol, domain, path, fullurl) {
    if(fullurl === true){
        return path
    }
    protocol = protocol || location.protocol + '//';
    domain = normalizeDomain(domain);

    var url = normalizePath(path);
    if (domain) {
        url = protocol + domain + url;
    }

    return url;
};


/*
* @description ajax请求
* @param {Object} urlobj
* @remark urlobj = {
    protocol: https://
    doamin: onepass.geetest.com,
    path: send_message
    query: {},
    get: true,
    timeout: 30000,
    fullurl: true // true不用拼接URL， false需要根据protocol和domain拼接URL
}
*/
var jsonp = function (urlobj) {    
    var url = makeURL(urlobj.protocol, urlobj.domain, urlobj.path, urlobj.fullurl);
    var query = urlobj.query;
    // 支持POST
    if (ajax._canAjax() && !urlobj.get) {        
        return new _Promise(function (resolve, reject) {
            ajax._post(
                url,
                query,
                function (res) {
                    resolve(res);
                }, function (err) {
                    reject(err)
                },
                urlobj.timeout || TIMEOUT
            );
        });
    }
    // GET
    return new _Promise(function (resolve, reject) {
        var cb = urlobj.cb || 'geetest_' + uid();        
        if(urlobj.cb){
            cb = urlobj.cb;
        }else{
            query.callback = cb;
        }
        var whole_url = url + normalizeQuery(query);
        window[cb] = function (data) {
            if(urlobj && urlobj.recordurl){
                data = data || {};
                data.url = whole_url;
            }
            resolve(data);
            window[cb] = undefined;
            try {
                delete window[cb];
            } catch (e) {
            }
        };        
        loadJS(whole_url, urlobj.timeout || TIMEOUT)._then(function () {
        }, function (reason) {
            reject(reason);
        });
    });
};
function Onepass(config){
    extend(this, config);
    this.phone = 0;
    this.process_id = "";
    this.operator = 'CT';
    this.clientType = '2';
    this.gtapi_domain = 'onepass.geetest.com';
    this._event = new PureEvent();

    // this.custom = config.custom;
    // this.checkGatewayUrl = config.checkGatewayUrl;
    // this.checkMessageUrl = config.checkMessageUrl;
}
Onepass.prototype = {
    constructor: Onepass,
    _gateway:function(options){
        var that = this;
        var event = that._event;
        this.phone = options.phone;
        this.process_id = options.process_id;
        var cb = 'geetest_' + uid();
        jsonp({
                protocol: this.protocol,
                domain: this.gtapi_domain,
                path:'pre_gateway',                
                query:{ phone: this.phone, operator: this.operator, process_id: this.process_id, custom: this.custom, clientType: this.clientType, callback: cb },
                timeout: this.timeout                
        })._then(function(data){
            if(data && data.result === 0){
                that._preGetMobile(data, cb);
            } else {
                event._emitEvent(GATEWAY_FAIL, Error.pre_gateway_result())
            }
        }, function(){
            event._emitEvent(GATEWAY_FAIL, Error.pre_gateway_net())
        });
    },
    _preGetMobile:function(options, cb){
        var that = this;
        var event = that._event;
        jsonp({
            path: options.operator_url.CT,
            query: options.sign,
            fullurl: true,
            get:true,
            timeout: this.timeout,
            cb: cb,
            recordurl: true,
        })._then(function(data){            
            if(data && data.result === 0){
                that._checkGateway(data);
            } else {
                that._log(data);
                event._emitEvent(GATEWAY_FAIL, Error.pre_getmobile_result());
            }
        }, function(){
            that._log({msg:'request failed'});
            event._emitEvent(GATEWAY_FAIL, Error.pre_getmobile_net());
        })
    },
    _checkGateway:function(options){
        var event = this._event;
        jsonp({
            query:{
                custom: this.custom,
                phone:this.phone,
                process_id: this.process_id,
                accesscode: options.data
            },
            path:this.checkGatewayUrl,
            timeout: this.timeout,
            fullurl: true
        })._then(function(data){            
            if(data && data.result === 0){
                event._emitEvent(GATEWAY_SUCCESS);
            } else {
                event._emitEvent(GATEWAY_FAIL, Error.check_gateway_result());
                //TODO 如果gateway失败直接调用短信
            }
        }, function(){
            event._emitEvent(GATEWAY_FAIL, Error.check_gateway_net())
        })
    },
    _sendMessage:function(options){
        var that = this;
        this.phone = options.phone;
        this.process_id = options.process_id;
        var event = this._event;
        jsonp({
            protocol:this.protocol,
            domain: this.gtapi_domain,
            query:{phone: this.phone, process_id: this.process_id, custom: this.custom},
            path:"send_message",
            timeout: this.timeout
        })._then(function(data){
            if(data && data.result === 0){
                that.message_id = data.message_id;                
                event._emitEvent(SENDMESSAGE_SUCCESS);
            } else {
                event._emitEvent(SENDMESSAGE_FAIL, Error.send_message_result())
            }
        }, function(){            
            event._emitEvent(SENDMESSAGE_FAIL, Error.send_message_net())
        })
    },
    _checkMessage:function(msg){
        var event = this._event;
        jsonp({
            query:{phone: this.phone, process_id: this.process_id, message_number: msg, message_id: this.message_id, custom: this.custom},
            path:this.checkMessageUrl,
            fullurl: true,
            timeout: this.timeout
        })._then(function(data){
            if(data && data.result === 0){
                event._emitEvent(CHECKMESSAGE_SUCCESS);
            } else {
                event._emitEvent(CHECKMESSAGE_FAIL, Error.check_message_result());
            }
        }, function(){
            event._emitEvent(CHECKMESSAGE_FAIL, Error.send_message_net());
        })        
    },
    _reset:function(){
        this.process_id = "";
        this.message_id = "";
    },
    _addEvent: function (type, cb) {        
        this._event._addEvent(type, cb);
        return this;
    },
    _log:function(loginfo){
        jsonp({
            protocol: this.protocol,
            domain: this.gtapi_domain,
            query:{process_id: this.process_id, data: loginfo},
            path:'/client/h5',
            timeout: this.timeout
        });
    }
};
function GTOP(config){
    var o = this;
    o._cid = uid();
    o._exist = true;
    data._set(o._cid, new Onepass(config));    
}
GTOP.version = "1.0";
GTOP.prototype = {
    gateway: function(ops){
        this._exist && data._get(this._cid)._gateway(ops);
        return this;
    },
    sendMessage: function(ops){
        this._exist && data._get(this._cid)._sendMessage(ops);
        return this;
    },
    checkMessage: function(ops){
        this._exist && data._get(this._cid)._checkMessage(ops);
        return this;
    },
    reset:function(){
        this._exist && data._get(this._cid)._reset();
        return this;
    },
    onGatewaySuccess:function(cb){
        this._exist && data._get(this._cid)._addEvent(GATEWAY_SUCCESS, cb);
        return this;
    },
    onGatewayFail:function(cb){
        this._exist && data._get(this._cid)._addEvent(GATEWAY_FAIL, cb);
        return this;
    },
    onSendMessageSuccess:function(cb){
        this._exist && data._get(this._cid)._addEvent(SENDMESSAGE_SUCCESS, cb);
        return this;
    },
    onSendMessageFail:function(cb){
        this._exist && data._get(this._cid)._addEvent(SENDMESSAGE_FAIL, cb);
        return this;
    },    
    onCheckMessageSuccess:function(cb){
        this._exist && data._get(this._cid)._addEvent(CHECKMESSAGE_SUCCESS, cb);
        return this;
    },
    onCheckMessageFail:function(cb){
        this._exist && data._get(this._cid)._addEvent(CHECKMESSAGE_FAIL, cb);
        return this;
    },    
    onError:function(cb){        
        this._exist && data._get(this._cid)._addEvent(ERROR, cb);
        return this;
    }
}

    return GTOP;
});