var DetailLobby = require('DetailLobbyScene');
const LIST_GAME_IMG = require('Config').LIST_GAME_IMG;
var GlobalData = require('GlobalData').getInstance();
const CONSTANT = require('Constant');
var Utils = require('Utils');
cc.Class({
    extends: cc.Component,

    properties: {
        //  mainScene: cc.Node,
        // labelCard: cc.Label,
        // cardPhoto: cc.SpriteFrame
        // ...
        labelMucCuoc : cc.Label,
        labelSoNguoi : cc.Label,
        labelTienVaoBan: cc.Label,
        labelLoaiBan: cc.Label
    },
 // use this for initialization
    onLoad: function () {
        var self = this ;
        function onTouchDown (event) {
            
        }
        function onTouchUp (event) {
          
            if(GlobalData.popUpNode.length === 0) self.clickRow();
        }
        this.node.on('touchstart', onTouchDown, this.node);
        this.node.on('touchend', onTouchUp, this.node);
    
        
        
    },
    // use this for initialization
    init: function (jsonObj, id,  typeRoom) {
        this.roomIndex = jsonObj[CONSTANT.ROOM.ROOM_ID];
        this.roomObj = jsonObj;
        this.labelMucCuoc.string =  Utils.convertNumberToShortFormat(jsonObj[CONSTANT.ROOM.MUC_CUOC]);
        this.labelSoNguoi.string  =jsonObj[CONSTANT.ROOM.USER_COUNT] ;
        this.labelTienVaoBan.string  = Utils.convertNumberToShortFormat(jsonObj[CONSTANT.ROOM.MIN_MONEY]) ;
        if(typeRoom == CONSTANT.ASSET_ID.CHIP)
            this.labelLoaiBan.string  ='Bàn Thường';
        else if(typeRoom == CONSTANT.ASSET_ID.GOLD)
            this.labelLoaiBan.string  ='Bàn VIP';
        var texture;
        if(id %2 ===0)
             texture = cc.textureCache.addImage( 'res/raw-assets/Texture/img/detailLobby/ds1.png' );
        else
            texture = cc.textureCache.addImage( 'res/raw-assets/Texture/img/detailLobby/ds2.png' );
       
        var spriteFrame = new cc.SpriteFrame( texture );
         this.getComponent(cc.Sprite).spriteFrame=spriteFrame;
    },

    // called every frame
    update: function (dt) {

    },
   
    clickRow: function () {
        // if(!Utils.isComponentOfTopPopUp(this)) return;
       //cc.log('clickview Bot');
       DetailLobby.instance.onJoinRoom(this.roomObj);//this.roomIndex);
    },
});
