var MyWebSocket = require('MyWebSocket');

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
    //call start before first update() in lifecycle
    start:function () {
        this.connectWsCallBack();
    },
    onDestroy: function () {
         cc.log('------------------------onDestroy BaseScene');
        MyWebSocket.removeObserver('onLogin',  this.onLoginFunc);    
        MyWebSocket.removeObserver('onLogout',  this.onLogoutFunc);
        MyWebSocket.removeObserver('onPing',  this.onPingFunc);
        MyWebSocket.removeObserver('onRoomPluginMessage',  this.onRoomPluginMessageFunc);
        
    },
   
 	
    connectWsCallBack: function () {
        
    },
    onConnectWebSocket: function (name, pass) {
        var socket =  MyWebSocket.connect(name,pass);
        //cc.log('abstract class connect');
        // this.connectWsCallBack();
        // MyWebSocket.addObserver('onLogin', function(message){
        //     console.log("onMSG login in Login SCENCE:" + message)
        // });    
        // MyWebSocket.addObserver('onLogout', function(message){
        //     console.log("onMSG logout in Login SCENCE:" + message)
        // });
        // MyWebSocket.addObserver('onPing', function(message){
        //     console.log("onMSG onPing in Login SCENCE:" + message)
        // });
    },
    disConnect: function () {
         MyWebSocket.disConnect();
    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
/**
 @abstract
 */
// BaseScene.prototype.connectWsCallBack = function() {
//     //throw new Error("Abstract method!");
// }

