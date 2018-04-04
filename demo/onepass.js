"use strict";
var request = require('request');

var PROTOCOL = 'http://',
	API_SERVER = 'onepass.geetest.com',
	GATEWAY_PATH = '/check_gateway.php',
	MESSAGE_PATH = '/check_message.php',
	TIMEOUT = 20000;

var Onepass = {
	check_gateway:function(data, callback){
		var params = data;
		if(typeof data === 'string'){
			params = JSON.parse(data);
		}		
        request.post({
            url: PROTOCOL + API_SERVER + GATEWAY_PATH,                        
            form: {
                custom: params.custom,
                process_id: params.process_id,
                accesscode: params.accesscode,
                phone: params.phone,
                user_id: params.user_id,
                sdk: params.sdk,
                callback: params.callback
            }
        }, function (err, res, data) {        	
			if(typeof data === 'string'){
				data = JSON.parse(data);
			}
            if (err || !data || data.result != 0) {
                callback(null, {
                    result: 1,
                    message: data && data.content || ''
                });
            } else {
                callback(null, {
                    result: 0
                });
            }
        });		
	},

	check_message:function(data, callback){
		var params = data;
		if(typeof data === 'string'){
			params = JSON.parse(data);
		}
        request.post({
            url: PROTOCOL + API_SERVER + MESSAGE_PATH,                        
            form: {
                custom: params.custom,
                process_id: params.process_id,
                message_id: params.message_id,
                message_number: params.message_number,
                phone: params.phone,
                user_id: params.user_id,
                sdk: params.sdk,
                callback: params.callback
            }
        }, function (err, res, data) {        	
			if(typeof data === 'string'){
				data = JSON.parse(data);
			}
            if (err || !data || data.result != 0) {            	
                callback(null, {
                    result: 1,
                    message: data && data.content || ''
                });
            } else {
                callback(null, {
                    result: 0
                });
            }
        });				
	}
}

module.exports = Onepass;