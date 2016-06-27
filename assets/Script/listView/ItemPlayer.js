var DetailLobby = require('DetailLobbyScene');
const LIST_GAME_IMG = require('Config').LIST_GAME_IMG;
var GlobalData = require('GlobalData').getInstance();
const CONSTANT = require('Constant');
var Utils = require('Utils');
cc.Class({
    extends: cc.Component,

    properties: {
        timeDanhBai: cc.ProgressBar,
        avatar : cc.Button,
        lblTotalTS : cc.Label,//gold or chip
        iconHost: cc.Sprite,
        btnKick: cc.Button,
        iconPlatform: cc.Sprite,
        chbReady: cc.Sprite,
        animLayer: cc.Node,
        textPlayer: cc.Label
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
    
        this.init();
        
    },
    // use this for initialization
    init: function (jsonObj, id,  typeRoom) {
        this.isloadingCounting = true;
        this.timeDanhBai.progress=0;
    },
    startCountdown: function() {
        if (this.timeDanhBai) {
            this.isloadingCounting = true;
        }
    },

    resetCountdown: function() {
        if (this.timeDanhBai) {
            this.isloadingCounting = false;
            this.timeDanhBai.progress = 0;
        }
    },
    // called every frame
    update: function (dt) {
        if (this.isloadingCounting ) {
            // cc.log('update barrrr');
            this.timeDanhBai.progress += 0.01;
            
            if ( this.timeDanhBai.progress >= 1) {
               // this.isloadingCounting = false;
                this.timeDanhBai.progress = 0;
               // cc.log('load all img done');
              // this.getDistributor();
               
            }
        }else{
            // cc.log(this.isloadingCounting + ' update' + this.loadingConfig);
        }
    },
   
    onKick: function (event) {
         if(!Utils.isComponentOfTopPopUp(this)) return;
       cc.log('onKick ');
      
    },
    onInviteOrShowInfo: function (event) {
         if(!Utils.isComponentOfTopPopUp(this)) return;
       cc.log('onInvite');
      
    },
    onShowProgressTurn: function (event) {
        // if(!Utils.isComponentOfTopPopUp(this)) return;
         cc.log('onShowProgressTurn');
      
    },
});
