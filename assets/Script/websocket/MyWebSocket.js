  var Utils = require('Utils');
 var MyObserver = require('MyObserver');
 var myObserver = new MyObserver();
 var command = require('Params').command;
 var constant = require('Constant');
  var GlobalData = require('GlobalData');
  var globalData=GlobalData.getInstance();
 
 var idPing =0;
 var isListening = true;

var MyWebSocket = (function () {
    var instance;
    var firstCreate =false;
 
    function createInstance() {
        // var object = new Object("I am the instance");
        // return object;
        
         var ws = new WebSocket(constant.CONSTANT.WEB_SOCKET);
         return ws;
    }
 
    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
                firstCreate=    true;
            }else{
                firstCreate= false;
            }
            return instance;
        },
        isFirstCreate: function () {
            return firstCreate;
        },
        destroy: function () {
            instance =null;
            firstCreate = false;
        }
    };
})();
function addObserver(topic, observer){
   // MyObserver.testAddObserver(topic, observer);
    myObserver.addObserver(topic, observer);
}
function removeObserver(topic, observer){
    myObserver.removeObserver(topic, observer);
}
function pingServer(){
    //JsonArray = [7, zoneName:String, id:Int, timstamp:Long]
    if(!isListening) {
        cc.log(' isListening socket = false');
        return;
    }
    var socket = MyWebSocket.getInstance();
    var ping = [
                    command.PingMessage,
                    constant.CONSTANT.ZONE_NAME, 
                    ++idPing, 
                    new Date().getTime()
	           ];
    var msg =Utils.encode(ping);// `[${command.LOGIN},Simms, usernamej, password, {}]`;
    socket.send(msg);
    //console.log("*********on ping send:"+ msg); 
    
    
}
function dispatchEvent(data){
    var cmd = data[0];
    switch(cmd){
        case command.LOGIN:
             myObserver.notifyObservers('onLogin', 'data=> '+data);
             //pingServer();
             //ping 1st time
             //window.setTimeout(pingServer, constant.CONSTANT.PING_DELAY);//5s
             //cc.director.scheduleOnce(pingServer, constant.CONSTANT.PING_DELAY);
            // cc.director.getScene().getScheduler().scheduleCallbackForTarget(this, pingServer, 5, cc.REPEAT_FOREVER, 0, false );
            //   cc.director.getScheduler()
            //   .scheduleCallbackForTarget(this, pingServer, 5, cc.REPEAT_FOREVER, 0, false );
            myObserver.notifyObservers('onPing', 'data=> '+data);
            break;
         case command.LOGOUT:
             myObserver.notifyObservers('onLogout', 'data=> '+data);
            break;
        case command.PingResponse:
             myObserver.notifyObservers('onPing', 'data=> '+data);
             // window.setTimeout(pingServer, constant.CONSTANT.PING_DELAY);//5s
            break;  
        case command.RoomPluginMessage:
           
            
            //console.log("onMSG onRoomPluginMessageFunc in Webservice SCENCE:" + message);
            //[5,{"uid":"de173b1b-4fc1-4a89-a818-7ce2b14f5ddd","a":"","As":{"gold":0,"chip":0,"vip":0},
            //"u":"hiepnh","g":0,"ph":"","dn":"hiepnh","cmd":100,"id":581848,"pvr":false,
            //"bcm":["Chào mừng bạn đến với VIP52"]}]
           var jObj= data[1];
           //cc.log('jObj ' + jObj);
           var uid = jObj.uid;
           var avatar = jObj.a;
           var gold = jObj.As.gold;
           var chip = jObj.As.chip;
           var vip =  jObj.As.vip;
           var playerName  =  jObj.u;
           var gender = jObj.g;
           var phone = jObj.ph;
           var phoneVerify = jObj.pvr;
           var broastCastArr = jObj.bcm;
           var playerData = {uid, avatar, gold, chip, vip, playerName, gender, phone, phoneVerify, broastCastArr};
           globalData.setPlayerData(playerData);
           
            // cc.log('jObj         uid' + jObj.uid);
            // cc.log('player data  uid' + globalData.getPlayerData().uid);
            //  cc.log('player data  bcm' + globalData.getPlayerData().broastCastArr);
             myObserver.notifyObservers('onRoomPluginMessage', 'data=> '+data);
            
            break;
            
    }
   
}
function connect(user, pass) {
    var socket = MyWebSocket.getInstance();
    isListening =true;
    if(!MyWebSocket.isFirstCreate()) return;
    
            socket.onopen = function() {
                    console.log("*********on connected:");  
                     // [1, username:String, password:String, JsonObject:params]
                    var loginSend = [
                        command.LOGIN,
                        constant.CONSTANT.ZONE_NAME, 
                        user, 
                        pass, 
                        {}
	                 ];
                    var msg =Utils.encode(loginSend);// `[${command.LOGIN},Simms, usernamej, password, {}]`;
                    socket.send(msg);
                    console.log("**********on onopen:"+msg);  
            };
            socket.onmessage = function (e) {
               // console.log("on onmessage:");  
                console.log("ws.onmessage():"+e.data);
                if(e.data!==null || e.data !== 'undefined')
                { 
                      var jsondata = Utils.decode(e.data);
                      dispatchEvent(jsondata);
                   
                }
                
            };
            socket.onclose = function (e) {
                    cc.log('*********************socket close');
                    myObserver.notifyObservers('onClose', 'data'+e.data);
                    MyWebSocket.destroy();
                     isListening = false;
                   
            };
            socket.onerror = function (e) {
                  myObserver.notifyObservers('onError', 'data'+e.data);
                  MyWebSocket.destroy();
                  isListening = false;
            };
    
    
   // var instance2 = MyWebSocket.getInstance();
   // alert("Same instance? " + (instance1 === instance2));  
}
function disConnect() {
    var socket = MyWebSocket.getInstance();
    var logoutSend = [
                        command.LOGOUT,
                        constant.CONSTANT.ZONE_NAME, 
                       
	                 ];
    var msg =Utils.encode(logoutSend);// `[${command.LOGIN},Simms, usernamej, password, {}]`;
    socket.send(msg);
     socket.close();
     MyWebSocket.destroy();
    isListening = false;
}
module.exports = {
	MyWebSocket: MyWebSocket,
    connect: connect,
    disConnect:disConnect,
    addObserver: addObserver,
    removeObserver:removeObserver,
    pingServer:pingServer
};
