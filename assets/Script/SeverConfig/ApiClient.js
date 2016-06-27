var MyWebSocket = require('MyWebSocket');
var ServerConfig = require('ServerConfig');
var MyWebSer = require('ServerConfig');
var Utils = require('Utils');
var CONSTANT = require('Constant');
var DEVICE_ID = '';
var DIST_ID = '';
var APP_ID ='';
var USER = '';
var PASS ='';
const DIST_RESPONSE =1;
const ACS_RESPONSE =2;
const SIGNATURE_RESPONSE =3;

const REGISTER_RESPONSE =4;

var RESPONSE_TYPE = DIST_RESPONSE;
//http://v1.api1bai247.info/acs?command=get-bid&distId=c43f5ab3-e3a4-4aa6-b8ae-82aea723afcf
// &versionId=2&platformId=1&appId=14a5e5f3-2962-42f9-8a7c-fae36c4b9307
function getServerInfo(loadingLabel ,statusPostLabel, responseLabel){
     getDistributor(loadingLabel, statusPostLabel, responseLabel);
    //  cc.director.getScheduler()
    //           .scheduleCallbackForTarget(this, function() {
    //                                                   getDistributor(statusPostLabel, responseLabel);
    //                                                 }, 1, 0, 0, false );
}
function getDistributor(loadingLabel, statusPostLabel, responseLabel){
    var TYPE ='GET';
    var link = ServerConfig.getLinkDistributor();
     var xhr = cc.loader.getXMLHttpRequest();
        if(statusPostLabel) statusPostLabel.string ='';
        if(responseLabel) responseLabel.string ='';
        RESPONSE_TYPE = DIST_RESPONSE;
        streamXHREventsToLabel(xhr, loadingLabel, statusPostLabel, responseLabel, TYPE);
        xhr.open(TYPE, link);
        //set Content-Type "application/x-www-form-urlencoded" to post form data
        //mulipart/form-data for upload
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        xhr.send();
}
function getACS(distId, appId ,loadingLabel, statusPostLabel, responseLabel){
    var TYPE ='GET';
    var link = ServerConfig.getLinkACS(distId, appId);
    //cc.log('sending '+link);
     var xhr = cc.loader.getXMLHttpRequest();
        if(statusPostLabel) statusPostLabel.string ='';
        if(responseLabel) responseLabel.string ='';
        RESPONSE_TYPE = ACS_RESPONSE;
        streamXHREventsToLabel(xhr,loadingLabel, statusPostLabel, responseLabel, TYPE);
        xhr.open(TYPE, link);
        //set Content-Type "application/x-www-form-urlencoded" to post form data
        //mulipart/form-data for upload
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        xhr.send();
}
// http://v1.api1bai247.info/id?command=login&username=hiepnh&password=hiep123
function getSignature(name, pass){
    USER = name;
    PASS = pass;
    var TYPE ='GET';
    var link = ServerConfig.getLinkSignature(name, pass);
    ////cc.log('sending getSignature '+link);
     var xhr = cc.loader.getXMLHttpRequest();
       
        RESPONSE_TYPE = SIGNATURE_RESPONSE;
        streamXHREventsToLabel(xhr,null, null, null, TYPE);
        xhr.open(TYPE, link);
        //set Content-Type "application/x-www-form-urlencoded" to post form data
        //mulipart/form-data for upload
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        xhr.send();
}
function guestPlay(){
    var TYPE ='GET';
    //http://v1.api1bai247.info/id?command=loginQuickPlay
    // &deviceId=181c3ed6a95f25879a29b59801148222a&platformId=4&os=web
    if(cc.sys.isMobile){
    }else{
    }
    if(DEVICE_ID !==''){
        var link = ServerConfig.getLinkGuestPlay( DEVICE_ID, '4', 'web');
                var xhr = cc.loader.getXMLHttpRequest();
                RESPONSE_TYPE = REGISTER_RESPONSE;
                streamXHREventsToLabel(xhr,null, null, null, TYPE);
                xhr.open(TYPE, link);
                xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
                xhr.send();
    }else{
        var Fingerprint2 = require('fingerprint2.min');
     new Fingerprint2().get(function(deviceId, components){
            DEVICE_ID = deviceId;
              //cc.log('deviceId => '+deviceId); //a hash, representing your device fingerprint
            //   //cc.log('components => '+components); // an array of FP components
              var link = ServerConfig.getLinkGuestPlay( DEVICE_ID, '4', 'web');
               ////cc.log('sending getSignature '+link);
                var xhr = cc.loader.getXMLHttpRequest();
               
                RESPONSE_TYPE = REGISTER_RESPONSE;
                streamXHREventsToLabel(xhr,null, null, null, TYPE);
                xhr.open(TYPE, link);
                xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
                xhr.send();
 
    });
    }
}
function registerUser(name, pass, labelResult){
    var TYPE ='GET';
    //http://v1.api1bai247.info/id?command=register&username=hehe167&password=kaka123&deviceId=111&platformId=4&os=web&alsoLogin=true
    if(cc.sys.isMobile){
    }else{
    }
    if(DEVICE_ID !==''){
        var link = ServerConfig.getLinkRegister(name, pass, DEVICE_ID, '4', 'web');
                var xhr = cc.loader.getXMLHttpRequest();
                RESPONSE_TYPE = REGISTER_RESPONSE;
                streamXHREventsToLabel(xhr,null, null, labelResult, TYPE);
                xhr.open(TYPE, link);
                xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
                xhr.send();
    }else{
        var Fingerprint2 = require('fingerprint2.min');
     new Fingerprint2().get(function(deviceId, components){
            DEVICE_ID = deviceId;
              //cc.log('deviceId => '+deviceId); //a hash, representing your device fingerprint
            //   //cc.log('components => '+components); // an array of FP components
              var link = ServerConfig.getLinkRegister(name, pass, DEVICE_ID, '4', 'web');
               ////cc.log('sending getSignature '+link);
                var xhr = cc.loader.getXMLHttpRequest();
               
                RESPONSE_TYPE = REGISTER_RESPONSE;
                streamXHREventsToLabel(xhr,null, null, labelResult, TYPE);
                xhr.open(TYPE, link);
                xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
                xhr.send();
 
    });
    }
    
    
}
function streamXHREventsToLabel ( xhr, loadingLabel, label, textbox, method ) {
    // Simple events
        ['loadstart', 'abort', 'error', 'load', 'loadend', 'timeout'].forEach(function (eventname) {
            xhr["on" + eventname] = function () {
               if(label) label.string += "\nEvent : " + eventname;
            };
        });

    // Special event
        xhr.onreadystatechange = function () {
            if(loadingLabel){
                var str = 'Distributor';
                if(RESPONSE_TYPE == ACS_RESPONSE) str = 'ACS';
                if (xhr.status >= 200 && xhr.status <= 207) {
                     switch(xhr.readyState){
                        case 0: loadingLabel.string ='request not initialized '; break;
                        case 1: loadingLabel.string ='server connection established'; break;
                        case 2: loadingLabel.string ='request received '; break;
                        case 3: loadingLabel.string ='processing request '; break;
                        case 4: loadingLabel.string ='request finished and response is ready '; break;   
                    }
                    loadingLabel.string+=str;
                }else{
                    loadingLabel.string= ' loading data fail. Auto retry after 1 seconds';
                }
                
                
            }
           
            if (xhr.readyState < 4){                         // while waiting response from server
               //"Loading..."; when call xhr.open all state 1 ->4 will get if api response success
                // readyState
                // 0: request not initialized 
                // 1: server connection established
                // 2: request received 
                // 3: processing request 
                // 4: request finished and response is ready
              
            }else if (xhr.readyState === 4) {                // 4 = Response from server has been completely loaded.
               if (xhr.status >= 200 && xhr.status <= 207) {
                    var httpStatus = xhr.statusText;
                    var response = xhr.responseText;//.substring(0, 100) + "...";
                   
                    
                   if(textbox){
                        var jsondata = Utils.decode(response);
                        textbox.string = 'repsonse ' +jsondata.status;
                        // textbox.string += response;  
                   }
                   if(label)  label.string += "\nStatus: Got " + method + " response! " + httpStatus;
                   
                   var arrayResult =  parseData(response);
                   if(!arrayResult) return;
                    if(RESPONSE_TYPE == DIST_RESPONSE){
                        getACS(arrayResult[0], arrayResult[1], loadingLabel, label, textbox);
                        
                    }else if(RESPONSE_TYPE == ACS_RESPONSE){
                        // call back to Ennter Login Screen
                        var eventLoad = require('Constant').OBSERVER_EVENT;
                        //cc.log('*******notify load config done ' +eventLoad.ON_LOAD_CONFIG);
                        MyWebSocket.getInstance().notifyObservers(eventLoad.ON_LOAD_CONFIG,''); 
                
                    }else if(RESPONSE_TYPE ==SIGNATURE_RESPONSE){
                        var eventLoad1 = require('Constant').OBSERVER_EVENT;
                        //cc.log('*******notify load O_SIGNATURE done ' +eventLoad1.ON_GET_SIGNATURE);
                        MyWebSocket.getInstance().notifyObservers(eventLoad1.ON_GET_SIGNATURE,''); 
                    }else if(RESPONSE_TYPE == REGISTER_RESPONSE){
                        //register done (alselogin = true) => auto tra ve signature luon
                        //=>connect ws luon voi signture va info
                        
                        
                        var eventLoad1 = require('Constant').OBSERVER_EVENT;
                        //cc.log('*******notify load O_SIGNATURE done ' +eventLoad1.ON_REGISTER_SUCCESS);
                        MyWebSocket.getInstance().notifyObservers(eventLoad1.ON_REGISTER_SUCCESS,true); 
                    }
               
                }else{
                    // load api error
                    if(RESPONSE_TYPE == DIST_RESPONSE){
                         cc.director.getScheduler()
                        .unscheduleCallbackForTarget(this);
                        cc.director.getScheduler()
                        .scheduleCallbackForTarget(this, function() {
                                                          //cc.log('**********retry getDist');    
                                                          getDistributor(loadingLabel, label, textbox);
                                                        }, 1, 0, 0, false );
                    }else if(RESPONSE_TYPE == ACS_RESPONSE){
                        cc.director.getScheduler()
                        .unscheduleCallbackForTarget(this);
                         cc.director.getScheduler()
                        .scheduleCallbackForTarget(this, function() {
                                                            //cc.log('**********retry getACS');   
                                                            getACS(DIST_ID, APP_ID, loadingLabel, label, textbox);
                                                        }, 1, 0, 0, false );
                        
                    }else if(RESPONSE_TYPE == SIGNATURE_RESPONSE){
                        cc.director.getScheduler()
                        .unscheduleCallbackForTarget(this);
                         cc.director.getScheduler()
                        .scheduleCallbackForTarget(this, function() {
                                                            //cc.log('**********retry GET SIGNATURE');   
                                                            getSignature(USER, PASS);
                                                        }, 1, 0, 0, false );
                        
                    }
                
                }
            }
            
            //cc.log('readyState ====> '+xhr.readyState +'xhr.status ==>'+xhr.status);
            
        };
}
function parseData(data){
     var jsondata = Utils.decode(data);
     //cc.log('jsondata responeType '+ data);
     if(jsondata !== null){
         var status = jsondata.status;
         if(status != CONSTANT.STATUS.SUCCESS){
             alert(`status ${status} => ${jsondata.data}`);
             if(RESPONSE_TYPE == REGISTER_RESPONSE){
                var eventLoad1 = require('Constant').OBSERVER_EVENT;
                        ////cc.log('*******notify load O_SIGNATURE done ' +eventLoad1.ON_REGISTER_SUCCESS);
                        MyWebSocket.getInstance().notifyObservers(eventLoad1.ON_REGISTER_SUCCESS,false);  
             }else if(RESPONSE_TYPE == SIGNATURE_RESPONSE){
                  var eventLoad1 = require('Constant').OBSERVER_EVENT;
                        MyWebSocket.getInstance().notifyObservers(eventLoad1.ON_LOGIN,false);  
             }
             return null;
         }
         
         
        if(RESPONSE_TYPE == DIST_RESPONSE){
             DIST_ID = jsondata.data.distId;
             APP_ID = jsondata.data.applicationId;
            
            //cc.log('distId => '+DIST_ID);
            //cc.log('applicationId=> '+APP_ID);
            //cc.log('status => '+status); 
            return [DIST_ID, APP_ID];
        }else if(RESPONSE_TYPE == ACS_RESPONSE){
            var GlobalData = require('GlobalData').getInstance();
            GlobalData.setServers(jsondata.data.config.servers);
            GlobalData.setService(jsondata.data.config.services);
             //cc.log('GlobalData.servers => '+GlobalData.getRandomServer().ip);
             
             //cc.log('GlobalData.servers 1 => '+GlobalData.getServerById(1).ip);
             //cc.log('GlobalData.servers 2 => '+GlobalData.getServerById(2).ip);
             
             //cc.log('GlobalData.service login => '+GlobalData.getService().login);
             //cc.log('GlobalData.service register => '+GlobalData.getService().register);
             //cc.log('GlobalData.service loginQP => '+GlobalData.getService().loginQP);
             return [];
        }else if(RESPONSE_TYPE ==SIGNATURE_RESPONSE){
             var GlobalData = require('GlobalData').getInstance();
            GlobalData.setSignatureData(jsondata);
            //cc.log('GlobalData.signature  => '+GlobalData.getSignatureData().data.signature);
             //cc.log('GlobalData.signature  => '+GlobalData.getSignatureData().data.info.username);
             // //cc.log('GlobalData.signature  => '+GlobalData.getSignatureData().data.signature);
            return [GlobalData.getSignatureData().data.signature, GlobalData.getSignatureData().data.info.username];
        }else if(RESPONSE_TYPE == REGISTER_RESPONSE){
            var GlobalData = require('GlobalData').getInstance();
            GlobalData.setSignatureData(jsondata);
            //cc.log('REGISTER GlobalData.signature  => '+GlobalData.getSignatureData().data.signature);
             //cc.log('REGISTER GlobalData.signature  => '+GlobalData.getSignatureData().data.info.username);
             // //cc.log('GlobalData.signature  => '+GlobalData.getSignatureData().data.signature);
            return [GlobalData.getSignatureData().data.signature, GlobalData.getSignatureData().data.info.username];
        }
     }else{
         //cc.log('ApiClient parseData null');
          return [];
     }
     
     
     
     
}

module.exports = {
// 	BUNDLE: BUNDLE,
// 	APPNAME: APPNAME,
	getServerInfo: getServerInfo,
	getSignature:getSignature,
	registerUser:registerUser,
	guestPlay:guestPlay
};