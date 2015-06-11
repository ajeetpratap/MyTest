/** \file webService.js
 * @author Ajeet Maurya
 * Javascript file to call JSON webService and XMLRPC webService.
 */

/*
 * Adding xml2json module for XMLRPC call, for common output for JSON and XMLRPC call
 */
// var xml2json = require('m2serveSDK/xml2json');

/** function: callWebServiceJSON
 * Used to call JSON webService
 *
 * Parameters :
 * httpRequest - variable to hold the type of request(POST or GET etc).
 * endpoint - webService URL
 * param - Parameter to be send with webService call
 * (function) callback - A callback function that will return the webService responce.
 *
 * Returns:
 * webService response.
 */
exports.callWebServiceJSON = function(httpRequest, endpoint, param, header,data_type, fileUpload, callback,isRest)
{
    /*
     * Checking Network connection
     */
    
    if (Titanium.Network.networkType === Titanium.Network.NETWORK_NONE) {
        var alertDialog = Titanium.UI.createAlertDialog({
            title : 'Error!',
            message : 'Error reaching to Server.No internet connectivity',
            buttonNames : ['OK']
        });
        alertDialog.show();
        return;
    }

    var xhr = Titanium.Network.createHTTPClient({

        onload : function(e) {
            callback(JSON.parse(this.responseText));
            //alert(this.responseText);
        },

        onerror : function(e) {
            Ti.API.info(xhr.statusText);
            callback(this.responseText);
        },

        timeout : 20000

    });
    xhr.open(httpRequest, endpoint);
    if(header.length >0 ){
        var header_string = "";
        var len = header.length;
        var name;
        var data;
        for(var i=0; i<len; i++ )
        {
            name = header[i].name;
            data = header[i].data;
            if(name == "Cookie")
            {
                xhr.setRequestHeader(name,name+"="+data);
            }
            else
            {                
                xhr.setRequestHeader(name,data);
            }  
      }
    }
    if(data_type != "plain")
    {
       if((isRest == true)||(isRest == undefined))
        {
            xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        }
    }

    if(fileUpload == true)
    {
        xhr.setRequestHeader("enctype", "multipart/form-data");
    }

    if(param ==="")
    {
        xhr.send();
    }
    else
    {
        if((isRest == true)||(isRest == undefined))
        {
            xhr.send(JSON.stringify(param));
        }
       else if(isRest == false)
        {
            xhr.send(param);

        }
    }
};
/** function: callWebServiceXMLRPC
 * Used to call XMLRPC webService
 *
 * Parameters :
 * httpRequest - variable to hold the type of request(POST or GET etc).
 * endpoint - webService URL
 * param - Parameter to be send with webService call
 * (function) callback - A callback function that will return the webService responce.
 *
 * Returns:
 * webService response.
 */
exports.callWebServiceXMLRPC = function(httpRequest, endpoint, param, header,data_type, fileUpload, callback) {
    var response = {};
    if (Titanium.Network.networkType == Titanium.Network.NETWORK_NONE) {
        var alertDialog = Titanium.UI.createAlertDialog({
            title : 'Error!',
            message : 'Error reaching to Server.No internet connectivity',
            buttonNames : ['OK']
        });
        alertDialog.show();
        return;
    }
    var jsonData = [];


    var xhr = Titanium.Network.createHTTPClient({

        onload : function(e) {
             var result = this.responseXML;
            Titanium.API.info("onload response is " + this.responseXML);
            callback(result.documentElement);

        },
        onerror : function(e) {

            Titanium.API.info("Error response is" + this.responseText);
            callback(this.responseText);
        },
        timeout : 20000

    });

    xhr.open(httpRequest, endpoint);
  //  xhr.clearCookies(endpoint);
    if(header.length >0 ){
        var header_string = "";
        var len = header.length
        var name;
        var data;
        for(var i=0; i<len; i++ )
        {
            name = header[i].name;
            data = header[i].data;
            xhr.setRequestHeader('"' + name + '"','"' + data + '"');
      }
    }
    xhr.setRequestHeader("Content-Type", "application/xml; charset=utf-8");
    if(fileUpload == true)
    {
        xhr.setRequestHeader("enctype", "multipart/form-data");
    }

    //creating the xml format for webService
    Ti.API.info("param is :" + param);
    if(param ==="")
    {
        Ti.API.info('got you');
          xhr.send();
    }
    else
    {
        
        xhr.send(param);
        
    }
};