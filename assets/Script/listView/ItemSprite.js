var MainLobby = require('MainLobbyScene');
const LIST_GAME_IMG = require('Config').LIST_GAME_IMG;
cc.Class({
    extends: cc.Component,

    properties: {
        //  mainScene: cc.Node,
        // labelCard: cc.Label,
        // cardPhoto: cc.SpriteFrame
        // ...
       
    },
 // use this for initialization
    onLoad: function () {
        // this.idGameTop=-1;
        // this.idGameBot=-1;
    },
    // use this for initialization
    init: function (id) {
         this.idGameTop =id;
         this.idGameBot = id+ LIST_GAME_IMG.length/2;
         var textureUrlTop = (LIST_GAME_IMG[id]);//cc.url.raw
         var textureUrlBot = LIST_GAME_IMG[id+ LIST_GAME_IMG.length/2];
     
        // cc.log(" length => "+LIST_GAME_IMG.length);
        cc.log(" textureUrlTop => "+textureUrlTop);
        cc.log(" textureUrlBot => "+textureUrlBot);
        var texture = cc.textureCache.addImage( textureUrlTop );
        //var sprite = this.node.getComponent( cc.Sprite );
        var spriteFrameTop = new cc.SpriteFrame( texture );
        this.getComponent(cc.Sprite).spriteFrame = spriteFrameTop;
       
        
       
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
