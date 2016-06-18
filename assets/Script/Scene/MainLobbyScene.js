var MyWebSocket = require('MyWebSocket');
var BaseScene = require('BaseScene');
var GlobalData = require('GlobalData');
var globalData = GlobalData.getInstance();
var MainLobbySence =cc.Class({
    extends: BaseScene,

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
        layoutUI: cc.Node,
        popupUI: cc.Node,
        scrollViewGame: cc.ScrollView,
        listItem: cc.Prefab,
        lblServerBroastCast: cc.Label,
        lblTotalGold: cc.Label,
        lblTotalChip: cc.Label,
        lblUserName: cc.Label,
        lblUserId: cc.Label,
    },
    statics: {
        instance: null
    },

    // use this for initialization
    onLoad: function () {
        MainLobbySence.instance = this;
        this.layoutUIComponent = this.layoutUI.getComponent('LayoutUI');
        this.popupUIComponent = this.popupUI.getComponent('PopupLobbyUI');
        this.content = this.scrollViewGame.content;
        this.populateList();
        
        this.showBroastCastMsg();
       
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
         for (var i = 0; i < totalGame/2; ++i) {
               var item = cc.instantiate(this.listItem);
               //item.getComponent('Item').mainGame = this;
              //item.getComponent('ItemSprite').init(i);
             item.getComponent('Item').init(i);
               item.setTag(i);
                
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
        //console.log("onMSG onPing in MainLobby SCENCE:" + message);
        cc.director.getScheduler().unscheduleCallbackForTarget(this, MyWebSocket.pingServer);
         cc.director.getScheduler()
              .scheduleCallbackForTarget(this, MyWebSocket.pingServer, 5, 0, 0, false );//cc.REPEAT_FOREVER
    },
   
   onRoomPluginMessageFunc: function (message) {
        console.log("onMSG onRoomPluginMessageFunc in MainLobby SCENCE:" + message);
        //[5,{"uid":"de173b1b-4fc1-4a89-a818-7ce2b14f5ddd","a":"","As":{"gold":0,"chip":0,"vip":0},"u":"hiepnh","g":0,"ph":"","dn":"hiepnh","cmd":100,"id":581848,"pvr":false,"bcm":["Chào mừng bạn đến với VIP52"]}]
    //   var jObj= message[1];
    //   cc.log('' + jObj);
       
    //     cc.log('jObj uid' + jObj.uid);
        this.showBroastCastMsg();
    },
   
    connectWsCallBack : function() {
    console.log('inherit abstract done**************');
        MyWebSocket.addObserver('onLogin',this.onLoginFunc);    
        MyWebSocket.addObserver('onLogout',this.onLogoutFunc);
        MyWebSocket.addObserver('onPing',this.onPingFunc);
        MyWebSocket.addObserver('onRoomPluginMessage',this.onRoomPluginMessageFunc);
        
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
        cc.log('onPlayGame '+ idGame);
    },
    onBack: function (message) {
        if(globalData.popUpNode.length !== 0) return;
        cc.log('onBack ');
        cc.director.loadScene('LoginScene');
        this.disConnect();
        // cc.director.loadScene('MainLobbyScene');
        
    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
   
});


