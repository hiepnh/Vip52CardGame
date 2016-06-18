var MainLobby = require('MainLobbyScene');
const LIST_GAME_IMG = require('Config').LIST_GAME_IMG;
var GlobalData = require('GlobalData').getInstance();
cc.Class({
    extends: cc.Component,

    properties: {
        //  mainScene: cc.Node,
        // labelCard: cc.Label,
        // cardPhoto: cc.SpriteFrame
        // ...
        btnTop : cc.Button,
        btnBot : cc.Button,
        labelBtnTop: cc.Label
    },
 // use this for initialization
    onLoad: function () {
        var self = this ;
        function onTouchDown (event) {
            
        }
        function onTouchUp (event) {
          
            if(GlobalData.popUpNode.length === 0) self.clickItemTop();
        }
        this.btnTop.node.on('touchstart', onTouchDown, this.btnTop.node);
        this.btnTop.node.on('touchend', onTouchUp, this.btnTop.node);
      // this.node.on('touchcancel', onTouchUp, this.node);
       
      function onTouchDownBot (event) {
            
        }
        function onTouchUpBot (event) {
         //   cc.log('click item node.onTouch '+GlobalData.popUpNode.length);
        //   cc.log('node.onTouch '+event.getLocation().x +'=>'+event.getLocation().y);
            if(GlobalData.popUpNode.length === 0) self.clickItemBot();
        }
        this.btnBot.node.on('touchstart', onTouchDownBot, this.btnBot.node);
        this.btnBot.node.on('touchend', onTouchUpBot, this.btnBot.node);
        
        
    },
    // use this for initialization
    init: function (id) {
         this.idGameTop =id;
         this.idGameBot = id+ LIST_GAME_IMG.length/2;
         var textureUrlTop = (LIST_GAME_IMG[id]);//cc.url.raw
         var textureUrlBot = LIST_GAME_IMG[id+ LIST_GAME_IMG.length/2];
     
        // cc.log(" length => "+LIST_GAME_IMG.length);
        // cc.log(" textureUrlTop => "+textureUrlTop);
        // cc.log(" textureUrlBot => "+textureUrlBot);
        var texture = cc.textureCache.addImage( textureUrlTop );
        //var sprite = this.node.getComponent( cc.Sprite );
        var spriteFrameTop = new cc.SpriteFrame( texture );
        this.btnTop.getComponent(cc.Sprite).spriteFrame=spriteFrameTop;
        var textureBot = cc.textureCache.addImage( textureUrlBot );
        var spriteFrameBot = new cc.SpriteFrame( textureBot );
        this.btnBot.getComponent(cc.Sprite).spriteFrame=spriteFrameBot;

        
       
    },

    // called every frame
    update: function (dt) {

    },
    clickItemTop: function () {
        // MainLobby.instance.....
       cc.log('clickview Top'+this.idGameTop);
       MainLobby.instance.onPlayGame(this.idGameTop);
       //maingame set trong populateListview in Hellowrod
       //this.mainGame.pickCard(this.cardId, this.cardStr);

       
    },
    clickItemBot: function () {
       cc.log('clickview Bot');
       MainLobby.instance.onPlayGame(this.idGameBot);
    },
});
