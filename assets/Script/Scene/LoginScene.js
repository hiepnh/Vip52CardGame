var MyWebSocket = require('MyWebSocket');
var BaseScene = require('BaseScene');
var EventGame  = require('Constant').OBSERVER_EVENT;
var ApiClient = require('ApiClient');
var constant = require('Constant');
var globalData = require('GlobalData').getInstance();
// var ServerConfig = require('ServerConfig');

var LoginSence =cc.Class({
    extends: BaseScene,//cc.Component,

    properties: {
        // foo: {O
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
        this.transitNode = this.node;//.getChildByName('Canvas');
        cc.game.addPersistRootNode(this.transitNode);
        
        LoginSence.instance = this;
        this.loginUIComponent = this.loginUI.getComponent('LoginUI');
        MyWebSocket.addObserver(EventGame.ON_GET_SIGNATURE,  this.onLoadSignature); 
        MyWebSocket.addObserver(EventGame.ON_CONNECTED_WS,  this.onConnectedWS); 
        MyWebSocket.addObserver(EventGame.ON_REGISTER_SUCCESS,  this.onRegisterSuccess); 

        
    },
     onSocketErrorFunc: function (message) {
        console.log("onMSG onSocketErrorFunc in Login SCENCE:" + message);
        LoginSence.instance.loginUIComponent.showLoading(false);
        alert('ket noi toi sever that bai. vui long thu lai');
        
    },
     onSocketCloseFunc: function (message) {
        // console.log("onMSG onSocketCloseFunc in Login SCENCE:" + message);
         LoginSence.instance.loginUIComponent.showLoading(false);
        // //try reconnect
        // cc.log('reconnect **** ');
        
        // var loginData = LoginSence.instance.loginUIComponent.getInputEditLogin();
        // cc.log(`name ${loginData[0]}  pass ${loginData[1]}`);
        // //call supper function
        // if(loginData[0] && loginData[1]){
        //     LoginSence.instance.loginUIComponent.showLoading(true);
        //     LoginSence.instance.onConnectWebSocket(loginData[0],loginData[1], constant.CONNECT_TYPE.RECONNECT);//'hiepnh','hiep123'
            
        // }else
        //   alert('nam va pass ko duoc trong');
    },
    onConnectedWS: function (msg) {
        
        //LoginSence.instance.loadingConfig = true;
        console.log("onConnectedWS in Login SCENCE done:" + msg);
        ApiClient.getSignature(msg[0], msg[1]);
        // var arr =LoginSence.instance.loginUIComponent.getInputEditLogin();
        // ApiClient.getSignature(arr[0], arr[1]);
    },
    onLoadSignature: function (msg) {
         
        //LoadingScene.instance.loadingConfig = true;
        //console.log("onLoadSignature in Login SCENCE done:" +  LoadingScene.instance.loadingConfig);
        var loginData = LoginSence.instance.loginUIComponent.getInputEditLogin();
        MyWebSocket.authenGameServer(loginData[0], loginData[1]);
    },
    onRegisterSuccess: function (isSuccess) {
        if(!isSuccess){
            LoginSence.instance.loginUIComponent.showLoading(false);
            return;
        }
        LoginSence.instance.onConnectWebSocketWithSignatureData();
        
        var registerData = LoginSence.instance.loginUIComponent.getInputEditRegister();
         var ls = cc.sys.localStorage;
        if(registerData && registerData.length >=2){
            //This should save value "foo" on key "bar" on Local Storage
            ls.setItem('username', registerData[0]);
            ls.setItem('password', registerData[1]);
        }
        
        //console.log("onLoadSignature in Login SCENCE done:" +  LoadingScene.instance.loadingConfig);
        // MyWebSocket.authenGameServer();
    },
   onDestroy: function () {
         cc.log('------------------------onDestroy lOGIN scence');
        MyWebSocket.removeObserver(EventGame.ON_GET_SIGNATURE,  this.onLoadConfig);   
         MyWebSocket.removeObserver(EventGame.ON_REGISTER_SUCCESS,  this.onRegisterSuccess);
          MyWebSocket.removeObserver(EventGame.ON_CONNECTED_WS,  this.onConnectedWS); 
        
        // this.super();
          this._super.apply(this, arguments);
    },
    
    onCallHotLine: function () {
        cc.log('hotline ');
    },
    onLogin: function () {
        cc.log('login ');
        // this.loginUIComponent.showPhoneVerifyState();
        
        var loginData = this.loginUIComponent.getInputEditLogin();
        cc.log(`name ${loginData[0]}  pass ${loginData[1]}`);
        //call supper function
        if(loginData[0] && loginData[1]){
            this.loginUIComponent.showLoading(true);
            this.onConnectWebSocket(loginData[0],loginData[1], constant.CONNECT_TYPE.NORMAL);//'hiepnh','hiep123'
            
        }else
          alert('nam va pass ko duoc trong');
    },
    onRegister: function () {
        cc.log('onRegister ');
         this.loginUIComponent.showRegisterState();
    },
    onGuestPlay: function () {
        cc.log('onGuestPlay ');
        //default connect normal
        this.loginUIComponent.showLoading(true);
        ApiClient.guestPlay();
       
    },
   
    onChangeScene: function (message) {
        cc.log('onGotoMainLobby');
        //cc.director.loadScene('MainLobbyScene');
        var self = this;
         cc.director.loadScene('MainLobbyScene',function(err, data){
                var node = cc.director.getScene();
                var container = node.getChildByName('MainLobby').getChildByName('container');
                container.setPositionX(1280);
                var sequence = cc.spawn(cc.moveBy(.5, cc.p(-1280, 0)), 
                    cc.callFunc(function () {
                        cc.game.removePersistRootNode(self.transitNode);
                    }
                ));
                 self.transitNode.runAction(cc.spawn(sequence, 
                    cc.callFunc(function () {
                            var action2 =  cc.moveBy(.5, cc.p(-640, 0));
                            container.runAction(action2);
                        })
                ));
                // var dataStr = 'string data';
                //  LoginSence.instance.initDataFromLoading(dataStr);
        });
 
  
   
        
    },
    initDataFromLoading: function(data){
      cc.log('============================ test');  
    },
     onLoginFunc: function (isSuccess) {
       if(!isSuccess){
            LoginSence.instance.loginUIComponent.showLoading(false);
            return;
        }  
        console.log("onMSG login status in Login SCENCE:" + isSuccess);
        // this.onChangeScene(message);
        LoginSence.instance.onChangeScene(isSuccess);
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
    onRoomPluginMessageFunc: function (data) {
        console.log("onMSG onRoomPluginMessageFunc in Login SCENCE:" + data);
        //[5,{"uid":"de173b1b-4fc1-4a89-a818-7ce2b14f5ddd","a":"","As":{"gold":0,"chip":0,"vip":0},"u":"hiepnh","g":0,"ph":"","dn":"hiepnh","cmd":100,"id":581848,"pvr":false,"bcm":["Chào mừng bạn đến với VIP52"]}]
        var jObj= data[1];
           //cc.log('jObj ' + jObj);
           var uid = jObj.uid;
           var avatar = jObj.a;
           var info = jObj.As;
           
           // cc.log('info ' + info['gold']);
            // cc.log('info ' + info[gold]);
           var gold = info.gold;
           var chip = info.chip;
           var vip =  info.vip;
           var playerName  =  jObj.u;
           var gender = jObj.g;
           var phone = jObj.ph;
           var phoneVerify = jObj.pvr;
           var broastCastArr = jObj.bcm;
           var playerData = {uid, avatar, gold, chip, vip, playerName, gender, phone, phoneVerify, broastCastArr};
           globalData.setPlayerData(playerData);
    },
   
    connectWsCallBack : function() {
    console.log('connectWsCallBack login scene');
        this._super.apply(this, arguments);
        //add specific event here, all base event add in base scene
       // MyWebSocket.addObserver(EventGame.ON_LOGIN,this.onLoginFunc);    
       
        
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
        
         var registerData = this.loginUIComponent.getInputEditRegister();
         if(registerData){
            //  cc.log('onRegisterSend '+registerData[0]);
             this.loginUIComponent.showLoading(true);
              
            ApiClient.registerUser(registerData[0], registerData[1],this.loginUIComponent.labelError);
         }
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
 
});



