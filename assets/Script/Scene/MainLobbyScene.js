var MyWebSocket = require('MyWebSocket');
var BaseScene = require('BaseScene');
var Constant = require('Constant');
var EventGame  = require('Constant').OBSERVER_EVENT;
var GlobalData = require('GlobalData');
var globalData = GlobalData.getInstance();
var Utils = require('Utils');
var MainLobbySence =cc.Class({
    extends: BaseScene,

    properties: {
        // foo: {
        //    default: null,
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is trueBACK()
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        layoutUI: cc.Node,
        popupUI: cc.Node,
        scrollViewGame: cc.ScrollView,
        listItem: cc.Prefab,
        lblServerBroastCast: cc.Label,
        lblTotalGold: cc.Label,
        lblTotalChip: cc.Label,
        lblUserName: cc.Label,
        lblUserId: cc.Label
    },
    statics: {
        instance: null
    },
    // use this for initialization
    onLoad: function () {
        //  this.transitNode = this.node;//.getChildByName('Canvas');
        // cc.game.addPersistRootNode(this.transitNode);
        
        MainLobbySence.instance = this;
        this.layoutUIComponent = this.layoutUI.getComponent('LayoutUI');
        this.popupUIComponent = this.popupUI.getComponent('PopupLobbyUI');
        this.content = this.scrollViewGame.content;
        this.populateList();
        
        this.showBroastCastMsg();
       
    },
     start:function(){
        this._super.apply(this, arguments);  
        // this.getListRoom();
    },
    getListRoom: function (){
        // [6, zoneName:String, pluginName:String, params:PuObject]

        var msgObj = {
            cmd:300,
            gid:Constant.GAME_ID.TLMN,
            aid:Constant.ASSET_ID.GOLD
        };
        var sendObj = [
             6,
             Constant.CONSTANT.ZONE_NAME,
             'channelPlugin',
             msgObj
            ];
        MyWebSocket.sendMsg(sendObj);
    },
   
    showBroastCastMsg: function (){
        this.lblUserName.string = globalData.getPlayerData().playerName;
        this.lblUserId.string = globalData.getPlayerData().uid;
        this.lblTotalGold.string = globalData.getPlayerData().gold;
        this.lblTotalChip.string = globalData.getPlayerData().chip;
        
        this.broastCastIndex=0;
        this.lblServerBroastCast.node.stopAllActions();    
        this.brstCastArr = globalData.getPlayerData().broastCastArr;
        //['hello vip 52', 'nap the nhan qua', 'choi tat tay de ^^'];
        this.lblServerBroastCast.string='';
        if(this.brstCastArr.length){
            //cc.log('player data  bcm onLoad' + globalData.getPlayerData().broastCastArr);
            this.lblServerBroastCast.string =this.brstCastArr[0];
            this.winSize = cc.director.getWinSize();
            cc.log(this.winSize.width +' : ' + this.winSize.height);
            this.lblServerBroastCast.node.setPositionX(this.winSize.width);
            var resetCallback = new cc.CallFunc(this.resetPostBroastCast, this);
            var seq = cc.sequence(cc.moveBy(5,-2*this.winSize.width, 0), resetCallback); 
            var repeat = new cc.RepeatForever(seq);
             this.lblServerBroastCast.node.runAction(repeat);
        }  
    },
    resetPostBroastCast: function (){
        this.broastCastIndex++;
        this.broastCastIndex = this.broastCastIndex % this.brstCastArr.length;
        //if(this.broastCastIndex > (brstCastArr.length -1))
        this.lblServerBroastCast.string =this.brstCastArr[this.broastCastIndex];
        this.lblServerBroastCast.node.setPositionX(this.winSize.width);
    },
   populateList: function() {
       var totalGame = 10;
         for (var i = 0; i < totalGame/2; i++) {
               var item = cc.instantiate(this.listItem);
               //item.getComponent('Item').mainGame = this;
              //item.getComponent('ItemSprite').init(i);
             item.setTag(i);  
            item.getComponent('Item').init(i);
              
                
                this.content.addChild(item);
           
         }
    },
    
    
     onLoginFunc: function (message) {
        console.log("onMSG login in MainLobby SCENCE:" + message);
       // this.onGotoMainLobby(message);
    },
    onLogoutFunc : function (message) {
        console.log("onMSG logout in MainLobby SCENCE:" + message);
    },
    onPingFunc: function (message) {
        console.log("onMSG onPing in MainLobby SCENCE:" + message);
        cc.director.getScheduler().unscheduleCallbackForTarget(this, MyWebSocket.pingServer);
         cc.director.getScheduler()
              .scheduleCallbackForTarget(this, MyWebSocket.pingServer, 5, 0, 0, false );//cc.REPEAT_FOREVER
    },
   
   onRoomPluginMessageFunc: function (data) {
        console.log("onMSG onRoomPluginMessageFunc in MainLobby SCENCE:" + Utils.encode(data));
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
           MainLobbySence.instance.showBroastCastMsg();
    },
   
    connectWsCallBack : function() {
    console.log('connectWsCallBack mainlobby');
        this._super.apply(this, arguments);
        //add observer custom event here//base event add in basecase
        //MyWebSocket.getInstance().addObserver(EventGame.ON_LOGIN,this.onLoginFunc);    
       
        
    },
   
    onShowUserInfo: function () {
        if(globalData.popUpNode.length !== 0) return;
            this.popupUIComponent.showUserInfo();
        //cc.log('onPlayGame '+ idGame);
        // this.popupUserInfoUI.activate = true;
        // this.popupUserInfoUI.initScale = 0;
        // var scaleUpAction = cc.scaleTo(.5, 1);
        // this.popupUserInfoUI.node.runAction(scaleUpAction);
        
    },
    
    
    onPlayGame: function (idGame) {
        // no need check  globalData.popUpNode because this func callback from item.class(already check here)
        //if(globalData.popUpNode.length !== 0)
        //cc.log('onPlayGame '+ idGame);
        globalData.setGameId(idGame);//Constant.GAME_ID
         cc.director.loadScene('DetailLobbyScene');
        //  var self = this;
        //  cc.director.loadScene('DetailLobbyScene',function(err, data){
        //         var node = cc.director.getScene();
        //         var container = node.getChildByName('Canvas').getChildByName('container');
        //         container.setPositionX(1280);
        //         var sequence = cc.spawn(cc.moveBy(.5, cc.p(-640, 0)), 
        //             cc.callFunc(function () {
        //                 cc.game.removePersistRootNode(self.transitNode);
        //             }
        //         ));
        //          self.transitNode.runAction(cc.spawn(sequence, 
        //             cc.callFunc(function () {
        //                     var action2 =  cc.moveBy(.5, cc.p(-1280, 0));
        //                     container.runAction(action2);
        //                 })
        //         ));
        //         // var dataStr = 'string data';
        //         //  LoginSence.instance.initDataFromLoading(dataStr);
        // });
    },
    onBack: function (message) {
        if(globalData.popUpNode.length !== 0) return;
        //cc.log('onBack ');
        this.disConnect();
        cc.director.loadScene('LoginScene');
        
        // cc.director.loadScene('MainLobbyScene');
        
    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
   
});


