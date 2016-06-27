var MyWebSocket = require('MyWebSocket');
var EventGame  = require('Constant').OBSERVER_EVENT;
var GlobalData = require('GlobalData').getInstance();
var BaseScene= cc.Class({
    extends: cc.Component,

    properties: {
        
    },
    // ctor: function () {
    //     if (this.constructor === BaseScene) {
    //       throw new Error("Can't instantiate abstract class!");
    //     }
    // },
    // use this for initialization
    onLoad: function () {
        //cc.game.addPersistRootNode(this);
        
    },
     onChangeScene: function (message) {
        cc.log('onGotoMainLobby BaseScene');
        // cc.director.runScene('LoginScene');
        //cc.director.loadScene('MainLobbyScene');
    },
   onLoginFunc: function (message) {
        console.log("onMSG login in Base SCENCE:" + message)
    },
    onLogoutFunc: function (message) {
        console.log("onMSG logout in Base SCENCE:" + message)
    },
    onPingFunc: function (message) {
        console.log("onMSG onPing in Base SCENCE:" + message)
    },
    onRoomPluginMessageFunc: function (message) {
        console.log("onMSG onRoomPluginMessageFunc in Base SCENCE:" + message)
    },
     onSocketErrorFunc: function (message) {
        console.log("onMSG onSocketErrorFunc in Base SCENCE:" + message)
    },
     onSocketCloseFunc: function (message) {
        console.log("onMSG onSocketCloseFunc in Base SCENCE:" + message)
    },
    //call start before first update() in lifecycle
    start:function () {
        // cc.game.addPersistRootNode(this.node);
        this.connectWsCallBack();
    },
    onDestroy: function () {
         cc.log('------------------------onDestroy BaseScene');
        MyWebSocket.getInstance().removeObserver(EventGame.ON_LOGIN,  this.onLoginFunc);    
        MyWebSocket.getInstance().removeObserver(EventGame.ON_LOGOUT,  this.onLogoutFunc);
        MyWebSocket.getInstance().removeObserver(EventGame.ON_PING,  this.onPingFunc);
        MyWebSocket.getInstance().removeObserver(EventGame.ON_ROOM_PLUGIN_MSG,  this.onRoomPluginMessageFunc);
        MyWebSocket.getInstance().removeObserver(EventGame.ON_ERROR,  this.onSocketErrorFunc);
        MyWebSocket.getInstance().removeObserver(EventGame.ON_CLOSE,  this.onSocketCloseFunc);
        
        ///
        GlobalData.clearPopUpNode();
        
    },
   
 	
    connectWsCallBack: function () {
        MyWebSocket.getInstance().addObserver(EventGame.ON_LOGIN,this.onLoginFunc);    
        MyWebSocket.getInstance().addObserver(EventGame.ON_LOGOUT,this.onLogoutFunc);
        MyWebSocket.getInstance().addObserver(EventGame.ON_PING,this.onPingFunc);
        MyWebSocket.getInstance().addObserver(EventGame.ON_ROOM_PLUGIN_MSG,this.onRoomPluginMessageFunc);
        MyWebSocket.getInstance().addObserver(EventGame.ON_ERROR,this.onSocketErrorFunc);    
        MyWebSocket.getInstance().addObserver(EventGame.ON_CLOSE,this.onSocketCloseFunc);
    },
    onConnectWebSocket: function (name, pass, connectType) {
          MyWebSocket.connect(name,pass, connectType);
        
    },
    onConnectWebSocketWithSignatureData: function () {
          MyWebSocket.connectWithSignatureData();
        
    },
    disConnect: function () {
         MyWebSocket.disConnect();
    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
