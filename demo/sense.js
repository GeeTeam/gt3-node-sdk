"use strict";

var crypto = require('crypto'),
    request = require('request'),
    os = require('os');

var md5 = function (str) {
    return crypto.createHash('md5').update(String(str)).digest('hex');
};

var api_url = "http://api.geetest.com/gt_verify";
var TIMEOUT = 2000;
var ID = "48a6ebac4ebc6642d68c217fca33eb4d";
var private_key = "4f1c085290bec5afdc54df73535fc361";

function verify(query, callback) {
    
    request({
        url: api_url,
        method: 'POST',
        timeout: TIMEOUT,
        json: true,
        form: {
            id: ID,
            seccode: md5(private_key+query.challenge),
            challenge: query.challenge,
            idType: query.idType,
            idValue: query.idValue,
            user_ip: getIp(),
            timestamp: new Date().getTime()
        }
    }, function (err, res, data) {
        if (err || !data) {
            console.log(err);
            callback(false)
        } else {
            callback(null, data)
        }
    });
}

function getIp(){
	var ips = [];
	var ifaces = os.networkInterfaces();
	Object.keys(ifaces).forEach(function (ifname) {
	  var alias = 0;

	  ifaces[ifname].forEach(function (iface) {
	    if (('IPv4' !== iface.family && 'IPv6' !== iface.family) || iface.internal !== false) {
	        // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
	        return;
        }
	    ips.push(iface.address)	    
	  });
	});
	return ips.join();
}

module.exports = { verify: verify }