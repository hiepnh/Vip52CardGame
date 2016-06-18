  var Utils = require('Utils');
//  var MyObserver = require('MyObserver');
//  var myObserver = new MyObserver();
//  var command = require('Params').command;
//  var constant = require('Constant');

var GlobalData = (function () {
    var instance;
 
    function createInstance() {
        var isPopUpShow=false;
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
        
         var setRoomPluginMsg = function(msg){
             roomPluginMsg = msg;    
         }
         var getRoomPluginMsg = function(){
             return roomPluginMsg;
         };
         var setPlayerData = function(data){
             playerData = data;    
         }
         var getPlayerData = function(){
             return playerData;
         };
         return {
                setRoomPluginMsg: setRoomPluginMsg,
                getRoomPluginMsg: getRoomPluginMsg,
                setPlayerData: setPlayerData,
                getPlayerData: getPlayerData,
                isPopUpShow:isPopUpShow,
                popUpNode:popUpNode
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
