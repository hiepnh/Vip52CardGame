//https://github.com/airbnb/javascript#properties
var EventGame  = require('Constant').OBSERVER_EVENT;
var Constant = require('Constant');
var BaseScene = require('BaseScene');
var ApiClient = require('ApiClient');
var MyWebSocket = require('MyWebSocket').getInstance();
const players = require('Config').players;// way 1
var Test = require('Config');// way 2
const Utils = require('Utils');
const cards = require('Config').cards;
const resouceGame = require('Config').resouceGame; 
const LOADING_BAR_WIDTH = 900;
var GameTLMN = cc.Class({
    extends: BaseScene,

    properties: {
        playerAnchors: {
            default: [],
            type: cc.Node
        },
        prefabPlayer: cc.Prefab,
        turnDuration: 0,
        lblRoomName: cc.Label,
        lblMucCuoc:cc.Label,
        spriteBettingType: cc.Sprite
       
        
    },
    statics: {
        instance: null
    },

     init: function () {
         GameTLMN.instance = this;
        this.selectedCards = [];
        this.player = null;
        this.initPlayer();
        
    },
   
    initPlayer: function (){
        for (var i = 0; i < 4; ++i) {
            var playerNode = cc.instantiate(this.prefabPlayer);
            var anchor = this.playerAnchors[i];
            var switchSide = (i > 2);
            anchor.addChild(playerNode);
            playerNode.position = cc.p(0, 0);
            var actorRenderer = playerNode.getComponent('ItemPlayer');
            actorRenderer.init();

            // var playerInfoPos = cc.find('anchorPlayerInfo', anchor).getPosition();
            // var stakePos = cc.find('anchorStake', anchor).getPosition();
            // var actorRenderer = playerNode.getComponent('ActorRenderer');
            // actorRenderer.init(players[i], playerInfoPos, stakePos, this.turnDuration, switchSide);
            // if (i === 2) {
            //     this.player = playerNode.getComponent('Player');
            //     this.player.init();
            // }
        }
    },
   
 
    
    // use this for initialization
    onLoad: function () {
       this.transitNode = this.node;//.getChildByName('Canvas');
        cc.game.addPersistRootNode(this.transitNode);
        this.init();
  
     
    },
    initDataFromLobby: function( roomId, data){
        //{"b":100,"re":false,"ps":[{"cs":[],"uid":"d7cac132-296d-4103-a94a-996e2e81142f","r":false,"pS":0,
        //"C":true,"pi":false,"rmC":0,"dn":"gts001","pid":4,"m":400000,"sit":0}],"Mu":4,"rmT":0,"cmd":202,"gS":1,"aid":2}
         this.lblRoomName.string = ''+roomId;
         this.lblMucCuoc.string = 'Cược '+Utils.convertNumberToShortFormat(data.b);
        //  this.spriteBettingType.spriteFrame = 'res/raw-assets/Texture/img/button/icon_xu_small.png';
         
         var texture;
        if(data.aid == Constant.ASSET_ID.GOLD)
             texture = cc.textureCache.addImage( 'res/raw-assets/Texture/img/button/icon_vang_small.png' );
        else
            texture = cc.textureCache.addImage( 'res/raw-assets/Texture/img/button/icon_xu_small.png' );
       
        var spriteFrame = new cc.SpriteFrame( texture );
        this.spriteBettingType.spriteFrame=spriteFrame;
         
        var gS = data.gS;//GAME_STATE
        
         //cc.log('initdataFromLobby '+ Utils.encode(data));
     },
    onDestroy: function () {
       
          this._super.apply(this, arguments);
    },
   onClickCard: function(event){
       var clickCard = event.getCurrentTarget();
      
       this.selectedCards =[];
        this.selectedCards.push(clickCard);
       clickCard.runAction(new cc.MoveBy(.5, cc.p(0, 50)));
   },
    onBack: function(){
      cc.director.loadScene('DetailLobbyScene');
   },
    onDanhBai(event){
        var sender = event.getCurrentTarget();
         switch(sender.name){
            case 'btnBoLuot': 
               cc.log('bo luot click');
               break;
            case 'btnDanhBai': 
               cc.log('btnDanhBai click');
               break;   
       } ;
        // if(this.selectedCards && this.selectedCards.length){
        //     this.selectedCards[0].active = false;
        //     cc.log('hide');
        // }
        
       //event.getCurrentTarget().runAction(new cc.MoveBy(.5, cc.p(0, 50)));
   },
    // called every frame
    update: function (dt) {
       
    },
});
