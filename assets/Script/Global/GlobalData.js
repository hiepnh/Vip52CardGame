  var Utils = require('Utils');
//  var MyObserver = require('MyObserver');
//  var myObserver = new MyObserver();
//  var command = require('Params').command;
//  var constant = require('Constant');

/**
 *  each scene when destroy need to clear popUpnode prevent opup exist in another scene
 * 
 */
var GlobalData = (function () {
    var instance;
 
    function createInstance() {
        var popUpNode =[];
        var roomPluginMsg =''; //private
        var playerData = {  uid:-1,
                            avatar:'',
                            gold:0,
                            chip:0, 
                            vip:0, 
                            playerName:'',
                            gender:0,
                            phone:'',
                            phoneVerify:false,
                            broastCastArr:[],
            
                         };
        var _serversData = { id:-1,
                            udtPort:0,
                            tcpPort:0,
                            ip:'', 
                            webSocketPort:'', 
                         }; 
        var servers = []; 
        var currentServer;
        var service;
        // {"data":{"signature":string,"expireIn":int,"accessToken":string,"refreshToken":string,
        // "info":{"userId":"de173b1b-4fc1-4a89-a818-7ce2b14f5ddd","username":"hiepnh","timestamp":1466471755093}},"status":0}
        var signatureData ={};
        
        var isConnectedWS =false;
        var  socket=null;
        var gameID;// tlmn, phom,...
         var setGameId = function(s){
            gameID = s;
        };
        var getGameId = function(){
            return gameID;
        };
        var setWS = function(s){
            socket = s;
        };
        var getWS = function(){
            return socket;
        };
         var setConnectedWS = function(s){
            isConnectedWS = s;
        };
        var getConnectedWS = function(){
            return isConnectedWS;
        };
        var setSignatureData = function(s){
            signatureData = s;
        };
        var getSignatureData = function(){
            return signatureData;
        };
        var setService = function(s){
            service = s;
        };
        var getService = function(){
            return service;
        };
        var setCurrentServer = function(serverCurrent){
            currentServer = serverCurrent;
        };
        var getCurrentServer = function(){
            return currentServer;
        };
        var setServers = function(serverArray){
            servers = serverArray;
        };
        var getServers = function(){
            return servers;
        };
        
        var getServerById = function(id){
            for(var i = 0; i < servers.length ; i++){
                if(servers[i].id === id){
                    
                    return servers[i];
                }
            }
        };
        var getRandomServer = function(){
            return servers[Math.floor(Math.random()*servers.length)];
        };
         var setRoomPluginMsg = function(msg){
             roomPluginMsg = msg;    
         };
         var getRoomPluginMsg = function(){
             return roomPluginMsg;
         };
         var setPlayerData = function(data){
             playerData = data;    
         };
         var getPlayerData = function(){
             return playerData;
         };
         var clearPopUpNode = function(){
              popUpNode =[];
         };
         return {
                setRoomPluginMsg: setRoomPluginMsg,
                getRoomPluginMsg: getRoomPluginMsg,
                setPlayerData: setPlayerData,
                getPlayerData: getPlayerData,
                popUpNode:popUpNode,
                clearPopUpNode:clearPopUpNode,
                setServers: setServers,
                getServers: getServers,
                setCurrentServer: setCurrentServer,
                getCurrentServer: getCurrentServer,
                getRandomServer: getRandomServer,
                getServerById: getServerById,
                setService: setService,
                getService: getService,
                setSignatureData:setSignatureData,
                getSignatureData:getSignatureData,
                setConnectedWS:setConnectedWS,
                getConnectedWS:getConnectedWS,
                setWS:setWS,
                getWS:getWS,
                setGameId:setGameId,
                getGameId:getGameId
         };
        
    }
 
    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        },
       
       
    };
})();
function getInstance() {
    var instances = GlobalData.getInstance();
    return instances;
}
module.exports = {
	GlobalData: GlobalData,
	getInstance:getInstance
};
