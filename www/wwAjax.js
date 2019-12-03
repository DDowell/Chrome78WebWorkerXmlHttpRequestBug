/**
 * Created by daniel.gjorwell on 2018-03-09.
 */
var messageHandler = function(event){
    if (event.data.type === "POST") {
        post(event.data, function(result){
            postMessage(result);
        });
    } else if (event.data.type === "GET") {
        get(event.data, function(result){
            postMessage(result);
        });
    }
};

var post = function(data, responseCallback) {
	
	try {
		var http = new XMLHttpRequest();
		var url = data.url;
		var body = data.data;
		http.open("POST", url, true);

		//Send the proper header information along with the request
		http.setRequestHeader("Content-Type", "text/plain; charset=UTF-8");
		
		if (http.addEventListener) {
			http.addEventListener("loadend",function() {
				if (http.status == 200) {
					responseCallback({status: http.status, response: http.responseText});
				}
				self.close();
			});
		} else {
			http.onloadend = function() {
				if (http.status == 200) {
					responseCallback({status: http.status, response: http.responseText});
				}
				self.close();
			}
		}

		console.log(body);
		http.send(body);
	} catch (e) {
		errorCallback(0);
		self.close();
	}
};

var get = function(data, responseCallback) {
	try {
		var http = new XMLHttpRequest();
		var url = data.url;
		http.open("GET", url, true);
		http.onreadystatechange = function() {//Call a function when the state changes.
			if(http.readyState == 4) {
				if (http.status == 200) {
					responseCallback({status: http.status, response: http.responseText});
				}
				//console.log("wwAjax closing: "+http.status);
				self.close();
			}
		};
		http.send();
	} catch (e) {
		self.close();
	}
};


onmessage = messageHandler;