var MyWebSocket = require('MyWebSocket');
var BaseScene = require('BaseScene');
// var onLoginFunc= function (message) {
//         console.log("onMSG login in Login SCENCE:" + message)
// };
// var onLogoutFunc = function (message) {
//         console.log("onMSG logout in Login SCENCE:" + message)
//     };
// var    onPingFunc= function (message) {
//         console.log("onMSG onPing in Login SCENCE:" + message)
//     };
var LoginSence =cc.Class({
    extends: BaseScene,//cc.Component,

    properties: {
        // foo: {
        //    default: null,
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        loginUI: cc.Node,
    },
    statics: {
        instance: null
    },

    // use this for initialization
    onLoad: function () {
        LoginSence.instance = this;
        this.loginUIComponent = this.loginUI.getComponent('LoginUI');
        
        
    },
   
    // onDestroy: function () {
    //      cc.log('------------------------onDestroy LoginScene');
    //     // MyWebSocket.removeObserver('onLogin',  this.onLoginFunc());    
    //     // MyWebSocket.removeObserver('onLogout',  this.onLogoutFunc());
    //     // MyWebSocket.removeObserver('onPing',  this.onPingFunc());
    // },
    onCallHotLine: function () {
        cc.log('hotline ');
    },
    onLogin: function () {
        cc.log('login ');
        this.loginUIComponent.showPhoneVerifyState();
    },
    onRegister: function () {
        cc.log('onRegister ');
         this.loginUIComponent.showRegisterState();
    },
    onGuestPlay: function () {
        cc.log('onGuestPlay ');
        var loginData = this.loginUIComponent.getInputEditLogin();
        cc.log(`name ${loginData[0]}  pass ${loginData[1]}`);
        //call supper function
        this.onConnectWebSocket(loginData[0],loginData[1]);//'hiepnh','hiep123'
        // var socket =  MyWebSocket.connect('hiepnh','hiep123');
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
   
    onChangeScene: function (message) {
        cc.log('onGotoMainLobby');
        cc.director.loadScene('MainLobbyScene');
 
    
    // cc.AssetLibrary.queryAssetInfo('5a40729a-0026-4b21-8fb7-6d88b593c38a' ,  function (error, url, raw, ctorInEditor ) {
    //         //cc.director.runScene(sceneAsset);
    //         cc.log('bbbbbb error =>'+error );
    //         cc.log('bbbbbb url =>'+url );
    //         cc.log('bbbbbb raw =>'+error );
    //         cc.log('bbbbbb ctorInEditor =>'+ctorInEditor );
     
    // });
   
        
    },
     onLoginFunc: function (message) {
        console.log("onMSG login in Login SCENCE:" + message);
        // this.onChangeScene(message);
        LoginSence.instance.onChangeScene(message);
    },
    onLogoutFunc : function (message) {
        console.log("onMSG logout in Login SCENCE:" + message);
    },
    onPingFunc: function (message) {
        console.log("onMSG onPing in Login SCENCE:" + message);
        cc.director.getScheduler().unscheduleCallbackForTarget(this, MyWebSocket.pingServer);
         cc.director.getScheduler()
              .scheduleCallbackForTarget(this, MyWebSocket.pingServer, 5, 0, 0, false );//cc.REPEAT_FOREVER
    },
    onRoomPluginMessageFunc: function (message) {
        console.log("onMSG onRoomPluginMessageFunc in Login SCENCE:" + message);
        //[5,{"uid":"de173b1b-4fc1-4a89-a818-7ce2b14f5ddd","a":"","As":{"gold":0,"chip":0,"vip":0},"u":"hiepnh","g":0,"ph":"","dn":"hiepnh","cmd":100,"id":581848,"pvr":false,"bcm":["Chào mừng bạn đến với VIP52"]}]
    //   var jObj= message[1];
    //   cc.log('' + jObj);
       
    //     cc.log('jObj uid' + jObj.uid);
    },
   
    connectWsCallBack : function() {
    console.log('inherit abstract done**************');
        MyWebSocket.addObserver('onLogin',this.onLoginFunc);    
        MyWebSocket.addObserver('onLogout',this.onLogoutFunc);
        MyWebSocket.addObserver('onPing',this.onPingFunc);
        MyWebSocket.addObserver('onRoomPluginMessage',this.onRoomPluginMessageFunc);
        
    },
    onFBLogin: function () {
        cc.log('onFBLogin ');
        FB.login(function(response) {
        if (response.authResponse) {
         console.log('Welcome!  Fetching your information.... ');
         FB.api('/me', function(response) {
           console.log('Good to see you, ' + response.name + '.');
           alert(`welcome ${response.name}`);
         });
        } else {
         console.log('User cancelled login or did not fully authorize.');
        }
        });
    },
    onForgetPass: function () {
        cc.log('onForgetPass ');
        // cc.director.runScene('LoginScene');
        cc.director.loadScene('LoadingScene');
        
        
        
    },
    onchbSavePass: function () {
        cc.log('onchbSavePass ');
    },
    onRegisterCancel: function () {
        cc.log('onRegisterCancel ');
        this.loginUIComponent.showLoginState();
    },
    onRegisterSend: function () {
        cc.log('onRegisterSend ');
    },
     onPhoneVerifyCancel: function () {
        cc.log('onPhoneVerifyCancel ');
        this.loginUIComponent.showLoginState();
    },
    onPhoneVerifySend: function () {
        cc.log('onPhoneVerifySend ');
    },
    
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
    // connectWsCallBack:function () {
    //     cc.log('connectWsCallBack from subclass ');
    //     console.log('inherit abstract done**************');
    //     MyWebSocket.addObserver('onLogin', function(message){
    //         console.log("onMSG login in Login SCENCE:" + message)
    //     });    
    //     MyWebSocket.addObserver('onLogout', function(message){
    //         console.log("onMSG logout in Login SCENCE:" + message)
    //     });
    //     MyWebSocket.addObserver('onPing', function(message){
    //         console.log("onMSG onPing in Login SCENCE:" + message)
    //     });
    // },
});


/**
 *  overidden abstract mesthod of BaseScene
 */
// LoginSence.prototype.connectWsCallBack = function() {
//     //console.log('inherit abstract done**************');
//     MyWebSocket.addObserver('onLogin', function(message){
//             console.log("onMSG login in Login SCENCE:" + message)
//         });    
//         MyWebSocket.addObserver('onLogout', function(message){
//             console.log("onMSG logout in Login SCENCE:" + message)
//         });
//         MyWebSocket.addObserver('onPing', function(message){
//             console.log("onMSG onPing in Login SCENCE:" + message)
//         });
    
    
// }
