/**
 * Created by Steve on 08/05/14.
 */
/**
 * Rest methods for IShopShape
 * @author Jan Nosul, jan.nosul@strawberries.nl
 */


MyRest	=	{
	tmp_data:	null,
    isTestMode:false
};



MyRest.getJSON	=	function(_url, successCallback, errorCallback) {

    //if is in test mode
    if(this.isTestMode)
    {
        //return a predefined answer
        if(this[_url])
        {
            result = this[_url];
            callback = result.code==200?successCallback:errorCallback;

            if(callback)
            {
                callback(result.result);
                return;
            }
            else{
                return result.result;
            }
        }
    }

	var sync = false;
	if(successCallback){
		sync=true;
	}
	$.ajax({
		async: sync,
        cache:false,
		dataType: "json",
		url: _url,
		success:    function(data) {
            if(data.data)
                data = data["data"]
			if(successCallback) {
				successCallback(data);
			} else {
				this.tmp_data	=	data;
			}
		},
		error: function(error)
		{
			if(errorCallback)
				errorCallback(error);
			else {
				console.log("ERROR:"+error);
			}
		}
	});
	return MyRest.tmp_data;
};

MyRest.sendJSON	=	function(_url, _object, _method, successCallback, errorCallback) {
    //if is in test mode
    if(this.isTestMode)
    {

        //check if any verifications callbacks are apliable
        if(this.expected)
        {
            if(this.expected[_url])
            {
                console.log("POST:"+_url);
                console.log("sent:")
                console.log(_object);
                console.log("expected:")
                console.log(this.expected[_url]);
                compareRecursively(_object, this.expected[_url]);
            }
        }

        //return a predefined answer
        if(this[_url])
        {
            result = this[_url];
            callback = result.code==200?successCallback:errorCallback;

            if(callback)
            {
                callback(result.result)
                return;
            }
            else{
                return result.result;
            }
        }
    }



	var sync = false;
	if(successCallback){
		sync=true;
	}
	_j = JSON.stringify(_object);
	$.ajax({
		async: sync,
        cache:false,
		type: _method,
		url: _url,
		data: _j,
		dataType: 'json',
		contentType:    'application/json',
		success:    function(data) {
            if(data.data)
                data = data["data"]
            if(successCallback) {
				successCallback(data);
			} else {
				MyRest.tmp_data	=	data;
			}
		},
		error: function(error)
		{
			if(errorCallback) {
				errorCallback(error.responseText);
			} else {
				console.log("ERROR:"+error);
			}
		}
	});
	return MyRest.tmp_data;
};

MyRest.sendEmptyJSON	=	function(_url, _method, successCallback, errorCallback) {
    //if is in test mode
    if(this.isTestMode)
    {
        //return a predefined answer
        if(this[_url])
        {
            result = this[_url];
            callback = result.code==200?successCallback:errorCallback;

            if(callback)
            {
                callback(result.result)
                return;
            }
            else{
                return result.result;
            }
        }
    }





	var sync = false;
	if(successCallback){
		sync=true;
	}
    $.ajax({
		async: sync,
		type: _method,
        cache:false,
		url: _url,
		dataType: 'json',
		contentType:    'application/json',
		success:    function(data) {
            if(data.data)
                data = data["data"]
            if(successCallback) {
				successCallback(data);
			} else {
				MyRest.tmp_data	=	data;
			}
//
//            if(data.data)
//                data = data["data"]
//            IShopRest.tmp_data	=	data;
		},
        error: function(error)
		{
			if(errorCallback) {
				errorCallback(error.responseText);
			} else {
				console.log("ERROR:"+error);
			}
		}
	});
	return MyRest.tmp_data;
};

MyRest.sendString	=	function(_url, _string, _method) {
	$.ajax({
		type: _method,
		url: _url,
		data: _string,
		dataType: 'json',
		contentType:    'application/json'
	});

};


/*
MyRest.getUsers = function() {
	return this.getJSON('/users/');
};

MyRest.getSettings = function(successCallback, errorCallback) {
    return this.getJSON('/service/settings', successCallback, errorCallback);
};

MyRest.setLanguage = function(lang_id, successCallback, errorCallback){
    //return this.sendEmptyJSON('/service/set_language/'+lang_id, 'POST', successCallback)
	return this.sendJSON('/service/set_language/'+lang_id, lang_id, 'POST', successCallback, errorCallback)
};


MyRest.getUsers = function(successCallback, errorCallback) {
    return this.getJSON('/service/users', successCallback, errorCallback);
};


MyRest.delete_user = function(user_id){
    return this.sendEmptyJSON('/service/user/'+user_id, 'DELETE')
};

MyRest.saveUser = function(user, successCallback, errorCallback) {
    return this.sendJSON('/service/user', user, 'POST', successCallback, errorCallback);
};
*/