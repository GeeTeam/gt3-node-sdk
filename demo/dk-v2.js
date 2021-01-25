/*
 * @Author: ziming
 * @Date: 2020-11-20 18:28:52
 * @LastEditors: ziming
 * @LastEditTime: 2021-01-25 14:53:21
 */
"use strict";

var request = require('request'),
    jwt = require('jsonwebtoken');

function verify(query, callback) {

    const dkTestUrl = 'https://baixinbank.geetest.com';
    const secret = '4e62e1b2994969a47b629840f71553d1'; //撒盐：加密的时候混淆
            
    //jwt生成token
    const token = jwt.sign({
        user_id: query.session_id,
        scene: 'demo',
        session_id: query.session_id,
        attr:{
            nick_name: "geetest"
        }
    }, secret);
    // console.log(token);
    //解密token
    // jwt.verify(token, secret, function (err, decoded) {
    // if (!err){
    //         console.log(decoded.name);  //会输出123，如果过了60秒，则有错误。
    //     }
    // })

    request({
        url: `${dkTestUrl}/deepknow/v2/verify`,
        method: "POST",
        header: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: token
    }, function(error, response, data) {
        if (error || !data) {
            console.log(error);
            callback(false)
        } else {
            callback(null, data)
        }
    });
}

module.exports = { verify: verify }