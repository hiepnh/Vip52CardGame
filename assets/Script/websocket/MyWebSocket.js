  var Utils = require('Utils');
// KO REQUIRE  ApiClient because in  ApiClient already require MYWEBSOCKET
//  var ApiClient = require('ApiClient');
 var MyObserver = require('MyObserver');
//  var myObserver = new MyObserver();
 var command = require('Params').command;
 var constant = require('Constant');
  var GlobalData = require('GlobalData');
  var globalData=GlobalData.getInstance();
 var idPing =0;
 var isListening = false;

var Singleton = (function () {
    var instance;
    var socket;
    
    // so lan retry connect den 1 server nhat dinh
        // khi doi server thi reset numberRetry
        var numberRetry=0;
 
    function createInstance() {
        
        var firstCreate =false;
        var isListnerWsCallBck = false;
        var myObserver = new MyObserver();
        // cc.log('Xxxxxxxxxxxxxxxxxxxxxxxxx'+constant.CONSTANT.WEB_SOCKET);
         //socket = new WebSocket(constant.CONSTANT.WEB_SOCKET);
         //return socket;
        var addObserver = function(topic, observer){
           myObserver.addObserver(topic, observer);
        };
        var removeObserver= function(topic, observer){
           myObserver.removeObserver(topic, observer);
        };
        var notifyObservers= function(topic, data){
            cc.log('notifyObservers ' +topic);
           myObserver.notifyObservers(topic, data);
        };
        
        var isFirstCreate= function () {
            return firstCreate;
        };
        var destroy= function () {
            instance =null;
            //numberRetry=0;
            socket =null;
            isListnerWsCallBck=false;
            firstCreate = false;
            isListening=false;
            globalData.setConnectedWS(false);
        };
        var setFirstCreate= function (value) {
            firstCreate = value;
        };
      
        return {
                addObserver: addObserver,
                removeObserver: removeObserver,
                notifyObservers: notifyObservers,
                
                isFirstCreate:isFirstCreate,
                destroy:destroy,
                setFirstCreate: setFirstCreate,
                isListnerWsCallBck: isListnerWsCallBck,
                //connect:connect
                
         };
         
    }
 
    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
                instance.setFirstCreate(true);
                //firstCreate=    true;
            }else{
               // firstCreate= false;
               instance.setFirstCreate(false);
            }
            return instance;
        },
        getWs:function( connectType){
            //  NORMAL  : 0,// 
            //  RECONNECT : 1,// bi mat ket noi, ket noi lai
            //  CHANGE_RADOM_SERVER : 2,// ket noi den server bat ki trong cac server hien co
            //  CHANGE_SERVER_SPECIFC  :3 
            //cc.log(`isListening ${isListening}  socket ${socket}`);
             if (!isListening || !socket) {//globalData
                numberRetry++;
                 var server =globalData.getRandomServer();
                //var server ;//=globalData.getServerById(2);
                switch(connectType){
                    case constant.CONNECT_TYPE.NORMAL:
                        server =globalData.getServerById(1);//getRandomServer
                        numberRetry = 1;
                        break;
                    case constant.CONNECT_TYPE.RECONNECT:
                        if(numberRetry>2){
                            //retry 1 lan truoc day roi ma ko connect duoc
                            //=> doi server random
                             server =globalData.getServerById(1);//getRandomServer();
                             numberRetry=1;
                        }else{
                             server =globalData.getCurrentServer();
                            if(!server) server =globalData.getRandomServer();    
                        }
                        
                        break;   
                    case constant.CONNECT_TYPE.CHANGE_RADOM_SERVER:
                         server =globalData.getRandomServer();
                         numberRetry=1;
                        break; 
                    case constant.CONNECT_TYPE.CHANGE_SERVER_SPECIFC:
                         server =globalData.getServerById(1);
                         numberRetry=1;
                        break;    
                }
           
                globalData.setCurrentServer(server);
                var webIp = `ws://${server.ip}:${server.webSocketPort}/ws`;
                //cc.log(numberRetry +' webIp =>' +webIp);
                socket = new WebSocket(webIp);
                //getInstance().isListnerWsCallBck=false;
                // socket = new WebSocket(constant.CONSTANT.WEB_SOCKET);
             }
            return socket;
        },
        isSocketConnect:function(){
            if(socket) return true;
            return false;
        }
        
    };
})();
function addObserver(topic, observer){
    // myObserver.addObserver(topic, observer);
    getInstance().addObserver(topic, observer);
}
function removeObserver(topic, observer){
    // myObserver.removeObserver(topic, observer);
    getInstance().removeObserver(topic, observer);
}
function pingServer(){
    //JsonArray = [7, zoneName:String, id:Int, timstamp:Long]
    if(!isListening ||  !globalData.getConnectedWS()) {
        //cc.log(' isListening socket = false');
        return;
    }
     var socket   =  Singleton.getWs(constant.CONNECT_TYPE.NORMAL);//globalData.getWS
    var ping = [
                    command.PingMessage,
                    constant.CONSTANT.ZONE_NAME, 
                    ++idPing, 
                    new Date().getTime()
	           ];
    var msg =Utils.encode(ping);// `[${command.LOGIN},Simms, usernamej, password, {}]`;
    socket.send(msg);
    console.log("*********on ping send:"+ msg); 
    
    
}
function notifyEvent(event, data){
     myObserver.notifyObservers(event, data);
}
function dispatchEvent(data){
    var cmd = data[0];
    switch(cmd){
        case command.LOGIN:
             getInstance().notifyObservers(constant.OBSERVER_EVENT.ON_LOGIN, 'data=> '+data);
            
            getInstance().notifyObservers(constant.OBSERVER_EVENT.ON_PING,data);
            break;
         case command.LOGOUT:
             getInstance().notifyObservers(constant.OBSERVER_EVENT.ON_LOGOUT, data);
            break;
        case command.JOINROOM:
             getInstance().notifyObservers(constant.OBSERVER_EVENT.ON_JOINROOM, data);
            break;    
        case command.PingResponse:
             getInstance().notifyObservers(constant.OBSERVER_EVENT.ON_PING, data);
             // window.setTimeout(pingServer, constant.CONSTANT.PING_DELAY);//5s
            break;  
        case command.RoomPluginMessage:
           
            
            //  console.log("*****************onMSG onRoomPluginMessageFunc in Webservice SCENCE:" +Utils.encode(data) );
            //[5,{"uid":"de173b1b-4fc1-4a89-a818-7ce2b14f5ddd","a":"","As":{"gold":0,"chip":0,"vip":0},
            //"u":"hiepnh","g":0,"ph":"","dn":"hiepnh","cmd":100,"id":581848,"pvr":false,
            //"bcm":["Chào mừng bạn đến với VIP52"]}]
        //   var jObj= data[1];
        //   //cc.log('jObj ' + jObj);
        //   var uid = jObj.uid;
        //   var avatar = jObj.a;
        //   var info = jObj['As'];
        //      cc.log('info '+ Utils.encode(info));
        //   // cc.log('info ' + info['gold']);
        //     // cc.log('info ' + info[gold]);
        //   var gold = info.gold;
        //   var chip = info.chip;
        //   var vip =  info.vip;
        //   var playerName  =  jObj.u;
        //   var gender = jObj.g;
        //   var phone = jObj.ph;
        //   var phoneVerify = jObj.pvr;
        //   var broastCastArr = jObj.bcm;
        //   var playerData = {uid, avatar, gold, chip, vip, playerName, gender, phone, phoneVerify, broastCastArr};
        //   globalData.setPlayerData(playerData);
           
            // cc.log('jObj         uid' + jObj.uid);
            // cc.log('player data  uid' + globalData.getPlayerData().uid);
            //  cc.log('player data  bcm' + globalData.getPlayerData().broastCastArr);
           
            getInstance().notifyObservers(constant.OBSERVER_EVENT.ON_ROOM_PLUGIN_MSG, data);
            break;
            
    }
   
}
function connectWithSignatureData(){
    connect(null, null, constant.CONNECT_TYPE.NORMAL);
}

function connect(user, pass, connectType) {
    
    if(isListening && globalData.getConnectedWS()){
        //da connect ws roi ma tiep tuc login
        // eg: login sai pass bjo login lai => ON_CONNECTED_WS = > goi ham check user-pass again
        cc.log('da connect ws roi ma tiep tuc login');
        getInstance().notifyObservers(constant.OBSERVER_EVENT.ON_CONNECTED_WS, [user, pass]);//[USER, PASS]
        return;        
                    
    }
    
    var socket   = Singleton.getWs(connectType);
    isListening =true;
    if(getInstance().isListnerWsCallBck) return;
    getInstance().isListnerWsCallBck = true;

            socket.onopen = function() {
                    console.log("*********on connected:");  
                    globalData.setConnectedWS(true);
                    globalData.setWS(socket);
                    if(!user && !pass){
                        //register with alseLogin = true
                        // = > connect WS xong thi login with signature luon
                        authenGameServer(user, pass);
                    }else{
                        getInstance().notifyObservers(constant.OBSERVER_EVENT.ON_CONNECTED_WS, [user, pass]);//[USER, PASS]
                     
                    }
                    
            };
            socket.onmessage = function (e) {
                console.log("on onmessage:"+e.data); 
               var data =  e.data;
               //data = data.split("#").join("");
                // console.log("ws.onmessage():"+data);
                if(data!==null || data !== 'undefined')
                { 
                      var jsondata = Utils.decode(data);
                      dispatchEvent(jsondata);
                   
                }
                
            };
            socket.onclose = function (e) {
                    cc.log('*********************socket close');
                    globalData.setConnectedWS(false);
                  globalData.setWS(null);
                    getInstance().notifyObservers(constant.OBSERVER_EVENT.ON_CLOSE, 'data'+e.data);
                    getInstance().destroy();
                     isListening = false;
                     getInstance().isListnerWsCallBck=false;
                  
                      
                   
            };
            socket.onerror = function (e) {
                 cc.log('*********************socket ERROR');
                  globalData.setConnectedWS(false);
                   globalData.setWS(null);
                  getInstance().notifyObservers(constant.OBSERVER_EVENT.ON_ERROR, 'data'+e.data);
                  getInstance().destroy();
                  isListening = false;
                  getInstance().isListnerWsCallBck=false;
                   
            };
     console.log("*********set up connect we:"); 
    
}
function disConnect() {
     var socket   =Singleton.getWs(constant.CONNECT_TYPE.NORMAL);// globalData.getWS();//
    var logoutSend = [
                        command.LOGOUT,
                        constant.CONSTANT.ZONE_NAME, 
                       
	                 ];
    var msg =Utils.encode(logoutSend);// `[${command.LOGIN},Simms, usernamej, password, {}]`;
    socket.send(msg);
    // socket.close();
     getInstance().destroy();
     globalData.setConnectedWS(false);
     globalData.setWS(null);
     getInstance().isListnerWsCallBck=false;
    isListening = false;
    
}
function authenGameServer(user ,pass) {
    var socket   =  Singleton.getWs(constant.CONNECT_TYPE.NORMAL) ;//globalData.getWS();
    //[1, zoneName,username:String, password:String, JsonObject:params]
    // dung signature(json obj) thi ko can user -pass
    var signatureData  = globalData.getSignatureData();
    var signature = signatureData.data.signature;
    var info = signatureData.data.info;
    //getSignatureData
    var loginSend = [
        command.LOGIN,
        constant.CONSTANT.ZONE_NAME, 
        user, 
        pass, 
        signatureData
        // {
        //     signature,
        //     info,
        //     pid: constant.CONSTANT.PLATFORM//4 la plaft form id web
       
        // }
     ];
    var msg =Utils.encode(loginSend);// `[${command.LOGIN},Simms, usernamej, password, {}]`;
    if(!globalData.getConnectedWS()){
        //notify mat mang
        aleart('Ket noi may chu that bai. Vui long thu lai');
        return;
    }
    socket.send(msg);
    console.log("**********send authenGameServer:"+msg);  
}
function sendMsg(msgObj) {
    if(!globalData.getConnectedWS()){
        //notify mat mang
        aleart('Ket noi may chu that bai. Vui long thu lai');
        return;
    }
    
    var socket   =  Singleton.getWs(constant.CONNECT_TYPE.NORMAL) ;//globalData.getWS();
    var msg =Utils.encode(msgObj);// `[${command.LOGIN},Simms, usernamej, password, {}]`;
    socket.send(msg);
    console.log("**********send sendMsg:"+msg);  
}


function getInstance() {
    var instances = Singleton.getInstance();
    return instances;
}
module.exports = {
	MyWebSocket: Singleton,
	getInstance:getInstance,
	authenGameServer:authenGameServer,
    connect: connect,
    disConnect:disConnect,
    addObserver: addObserver,
    removeObserver:removeObserver,
    notifyEvent:notifyEvent,
    pingServer:pingServer,
    connectWithSignatureData:connectWithSignatureData,
    sendMsg:sendMsg
};
