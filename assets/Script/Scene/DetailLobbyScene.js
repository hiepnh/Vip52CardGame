var MyWebSocket = require('MyWebSocket');
var BaseScene = require('BaseScene');
var EventGame  = require('Constant').OBSERVER_EVENT;
var Constant = require('Constant');
var Params = require('Params');
var GlobalData = require('GlobalData');
var globalData = GlobalData.getInstance();
var Utils = require('Utils');
var GameTLMNScene = require('GameTLMNScene');

var DetailLobbySence =cc.Class({
    extends: BaseScene,

    properties: {
        layoutUI: cc.Node,
        popupUI: cc.Node,
        scrollViewGame: cc.ScrollView,
        listItem: cc.Prefab,
        lblServerBroastCast: cc.Label,
        lblTotalGold: cc.Label,
        lblTotalChip: cc.Label,
        lblUserName: cc.Label,
        lblUserId: cc.Label,
        lblGameName: cc.Label,
        lblLatancy : cc.Label,
        
        btnList:{
            default:[],
            type:cc.Button
        }
    },
    statics: {
        instance: null
    },

    // use this for initialization
    onLoad: function () {
        // this.transitNode = this.node;//.getChildByName('Canvas');
        // cc.game.addPersistRootNode(this.transitNode);
        DetailLobbySence.instance = this;
        this.layoutUIComponent = this.layoutUI.getComponent('LayoutUI');
        this.popupUIComponent = this.popupUI.getComponent('PopupDetailLobbyUI');
        this.content = this.scrollViewGame.content;
        this.gameId = globalData.getGameId();
        this.lblGameName.string = Constant.GAME_NAME_ARRAY[ this.gameId];
        this.roomData = [];
        
        this.showBroastCastMsg();
        this.typeRoom =Constant.ASSET_ID.CHIP; 
        //0 la btnGold 
         this.btnList[0].getComponent('ButtonScaler').check(false); 
        this.btnList[1].getComponent('ButtonScaler').check(true); 
    },
    start:function(){
        this._super.apply(this, arguments);  
        this.getListRoom();
    },
     onSocketErrorFunc: function (message) {
        //console.log("onMSG onSocketErrorFunc in Base SCENCE:" + message)
        DetailLobbySence.instance.popupUIComponent.closeLoading();
    },
     onSocketCloseFunc: function (message) {
        //console.log("onMSG onSocketCloseFunc in Base SCENCE:" + message)
        DetailLobbySence.instance.popupUIComponent.closeLoading();
    },
    changeListRoomType: function (event){
        //if(!Utils.isComponentOfTopPopUp(event.getCurrentTarget())) return;
        
        var btn = event.getCurrentTarget();
        if(btn.name == 'btnGold'){
            if(this.typeRoom == Constant.ASSET_ID.GOLD){
                btn.getComponent('ButtonScaler').check(true); 
                return;
            } 
            //unpress btnChip
             this.typeRoom =Constant.ASSET_ID.GOLD; 
           this.btnList[1].getComponent('ButtonScaler').check(false); 
           this.btnList[0].getComponent('ButtonScaler').check(true);
        }else if(btn.name == 'btnChip'){
            if(this.typeRoom == Constant.ASSET_ID.CHIP){
                btn.getComponent('ButtonScaler').check(true); 
                return;
            } 
             //unpress btnChip
              this.typeRoom =Constant.ASSET_ID.CHIP; 
           this.btnList[0].getComponent('ButtonScaler').check(false); 
           this.btnList[1].getComponent('ButtonScaler').check(true);  
        }
        this.getListRoom();
    },
    getListRoom: function (){
        // [6, zoneName:String, pluginName:String, params:PuObject]
        this.popupUIComponent.showLoading();
        var msgObj = {
            cmd:Constant.CMD_RESULT.LIST_ROOM,
            gid:Constant.GAME_ID.TLMN,
            aid:this.typeRoom
        };
        var sendObj = [
             6,
             Constant.CONSTANT.ZONE_NAME,
             'channelPlugin',
             msgObj
            ];
        MyWebSocket.sendMsg(sendObj);
    },
   
    onJoinRoom: function (roomInfo){
         if(globalData.popUpNode.length !== 0) return;
         cc.log('onJoinRoom '+roomInfo[Constant.ROOM.ROOM_ID]);
         //var roomInfo= DetailLobbySence.instance.roomData[indexRow];
         //alert(roomInfo);
        //  JSonArray = [3, zoneName:String, roomId:Integer, password:String]

         var joinRoomMsg = [
                            Params.command.JOINROOM, 
                            roomInfo[Constant.ROOM.ZONE_NAME],
                            roomInfo[Constant.ROOM.ROOM_ID],
                            ''
                            ];
                                
                                // 	cmd: Constant.CMD_RESULT.JOIN_ROOM,
                                // 	ri: {
                                //         rid: roomInfo[Constant.ROOM.ROOM_ID],
                                // 		sid: roomInfo[Constant.ROOM.SERVER_ID],
                                // 		aid: DetailLobbySence.instance.typeRoom,
                                // 		rn: roomInfo[Constant.ROOM.ROOM_NAME],
                                // 		gid: Constant.GAME_ID.TLMN,
                                // 		zn: roomInfo[Constant.ROOM.ZONE_NAME],
                                // 		b:  roomInfo[Constant.ROOM.MUC_CUOC]
                          
        //alert(Utils.decode(joinRoomMsg));
        MyWebSocket.sendMsg(joinRoomMsg);                    
         
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
       DetailLobbySence.instance.popupUIComponent.closeLoading();
        DetailLobbySence.instance.content.removeAllChildren();
      DetailLobbySence.instance.roomData.forEach(function myFunction(value, index) {
                              var item = cc.instantiate(DetailLobbySence.instance.listItem);
                              item.getComponent('ItemRoom').init(value, index,DetailLobbySence.instance.typeRoom);
                              item.setTag(index);
                              DetailLobbySence.instance.content.addChild(item);
                              //cc.log('item '+index);
                            });
                      
  
    },
    
    
     onLoginFunc: function (message) {
        console.log("onMSG login in DetailLobby SCENCE:" + message);
       // this.onGotoDetailLobby(message);
    },
    onLogoutFunc : function (message) {
        console.log("onMSG logout in DetailLobby SCENCE:" + message);
    },
    onPingFunc: function (message) {
        //console.log("onMSG onPing in DetailLobby SCENCE:" + message);\
        var now = new Date().getTime();
        var diff =now - message[2] ;
        DetailLobbySence.instance.lblLatancy.string = 'Latancy : '+diff;
        
        cc.director.getScheduler().unscheduleCallbackForTarget(this, MyWebSocket.pingServer);
         cc.director.getScheduler()
              .scheduleCallbackForTarget(this, MyWebSocket.pingServer, 5, 0, 0, false );//cc.REPEAT_FOREVER
    },
   
   
   onRoomPluginMessageFunc: function (dataObj) {
       //str.replace("Microsoft", "W3Schools");
        cc.log("onMSG onRoomPluginMessageFunc in DetailLobby SCENCE:" + dataObj[1]);
        cc.log(dataObj[1][Constant.CONSTANT.CMD] +' '+Constant.CMD_RESULT.ROOM_INFO );
        //var roomID  = this.roomId;
       if(dataObj[1][Constant.CONSTANT.CMD] == Constant.CMD_RESULT.ROOM_INFO){
             cc.director.loadScene('GameTLMNScene',function(err, data){
                 GameTLMNScene.instance.initDataFromLobby( DetailLobbySence.instance.roomID, dataObj[1]);
                 
             });
            // var self = this;
            //  cc.director.loadScene('GameTLMNScene',function(err, data){
            //     var node = cc.director.getScene();
            //     var container = node.getChildByName('Canvas').getChildByName('container');
            //     container.setPositionX(1280);
            //     var sequence = cc.spawn(cc.moveBy(.5, cc.p(-1280, 0)), 
            //         cc.callFunc(function () {
            //             cc.game.removePersistRootNode(self.transitNode);
            //         }
            //     ));
            //      self.transitNode.runAction(cc.spawn(sequence, 
            //         cc.callFunc(function () {
            //                 var action2 =  cc.moveBy(.5, cc.p(-1280, 0));
            //                 container.runAction(action2);
            //             })
            //     ));
            //     // var dataStr = 'string data';
            //     //  LoginSence.instance.initDataFromLoading(dataStr);
            // });
            
            
           
        }else if(dataObj[1][Constant.CONSTANT.CMD] == Constant.CMD_RESULT.LIST_ROOM){
               DetailLobbySence.instance.roomData = dataObj[1].rs;
               DetailLobbySence.instance.populateList();
               
        }
    },
    onJoinRoomFunc: function (data) {
       //str.replace("Microsoft", "W3Schools");
        cc.log("onMSG onJoinRoomFunc in DetailLobby SCENCE:" + Utils.encode(data));
        
       if(data[1] == true){
            //cc.director.loadScene('GameTLMNScene');
            DetailLobbySence.instance.roomID   = data[3];
        }else{
            alert(`${data[4]}`);
        }
    },
    connectWsCallBack : function() {
    console.log('connectWsCallBack DetailLobby');
        this._super.apply(this, arguments);
        //add observer custom event here//base event add in basecase
        MyWebSocket.getInstance().addObserver(EventGame.ON_JOINROOM,this.onJoinRoomFunc);    
       
        
    },
   onDestroy: function () {
       this._super();
       MyWebSocket.getInstance().removeObserver(EventGame.ON_JOINROOM,this.onJoinRoomFunc);   
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
        // cc.director.loadScene('DetailLobbyScene');
    },
    onBack: function (message) {
        if(globalData.popUpNode.length !== 0) return;
        //cc.log('onBack ');
        //this.disConnect();
        cc.director.loadScene('MainLobbyScene');
        
        // cc.director.loadScene('DetailLobbyScene');
        
    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
   
});


