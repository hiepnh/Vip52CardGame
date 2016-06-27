//https://github.com/airbnb/javascript#properties
var EventGame  = require('Constant').OBSERVER_EVENT;
var BaseScene = require('BaseScene');
var ApiClient = require('ApiClient');
var MyWebSocket = require('MyWebSocket').getInstance();
const players = require('Config').players;// way 1
var Test = require('Config');// way 2
const cards = require('Config').cards;
const resouceGame = require('Config').resouceGame; 
const LOADING_BAR_WIDTH = 900;
var LoginSence = require('LoginScene');
var LoadingScene = cc.Class({
    extends: BaseScene,

    properties: {
        // label: {
        //     default: null,
        //     type: cc.Label
        // },
        text: 'Hello, World!',
        loadingCounter: cc.ProgressBar,
        loadingGlow: cc.Node,
        statusPostLabel: cc.Label,
        responseLabel: cc.Label,
        loadingLabel: cc.Label
        
    },
    statics: {
        instance: null
    },

     init: function () {
         LoadingScene.instance = this;
        this.loadingTimer = 0;
        this.isloadingCounting = true;
        this.loadingCounter.progress=0;
        this.loadingConfig =false;
    },
    startCountdown: function() {
        if (this.loadingCounter) {
            this.loadingTimer = 0;
            this.isloadingCounting = true;
        }
    },

    resetCountdown: function() {
        if (this.loadingCounter) {
            this.loadingTimer = 0;
            this.isloadingCounting = false;
            this.loadingCounter.progress = 0;
        }
    },
   
    _startLoading: function () {
        //cc.log(`${this._numberOfLoadedSprites} = ${this._numberOfSprites}`);
        if(this._numberOfLoadedSprites != this._numberOfSprites ){
            var self = this;
        self.unschedule(self._startLoading);
        
        
        var res = resouceGame;
        // for(var i =2;i<100;i++){
        //     cc.log(`img path res/raw-assets/Texture/img/hiepnh/girl - Copy (${i}).png`);
        //      res.push(`res/raw-assets/Texture/img/hiepnh/girl - Copy (${i}).png`);
        // }
       
        //  cc.log('START... '+res.length);
        cc.loader.load(res,
            function (result, count, loadedCount) {
                 self._numberOfLoadedSprites++;
                //  cc.log("Loading total " + self._numberOfLoadedSprites );
                //load den 80% roi fake load 20 % cuoi
                var percent = ( self._numberOfLoadedSprites /  self._numberOfSprites );// | 0;
                percent = Math.min(percent, 0.8);// Math.min(percent, 1);
                 self.loadingCounter.progress = percent;
                 var newX = percent*LOADING_BAR_WIDTH;
                // cc.log('newX =>'+newX +' === '+self.loadingCounter.getComponent( cc.Sprite ).node.getContentSize().with);
                 self.loadingGlow.setPositionX(newX);
                 
                // cc.log("Loading... " + self.loadingCounter.progress + "%");
                // cc.log("unix time "+ Math.round(+new Date()/1000));
            }, function () {
                //cc.log('done loading all img');
                var percent =  0.8;
                self.loadingCounter.progress = percent;
                self.loadingGlow.setPositionX(percent*LOADING_BAR_WIDTH );
                self.startCountdown();
                
        });
        }
        
    },
    // use this for initialization
    onLoad: function () {
        // transitNode chưa scripting phải có lvl ngang canvas thi moi duoc
        this.transitNode = this.node;//.getChildByName('Canvas');
        //alert( this.transitNode.uuid);
        //perist node for transit scene - remove later
        cc.game.addPersistRootNode(this.transitNode);
        // cc.log('===============================================');
        //this.label.string = this.text;
        this._numberOfLoadedSprites=0;
        this._numberOfSprites = resouceGame.length;
        var texCache = cc.textureCache;
        // load textrues
        // var declare not inside this class not need use this
        this.init();
        //   resouceGame.forEach(imgRes => { texCache.addImageAsync(imgRes, this.loadingCallBack, this)});
        var self = this;
        
        // cc.eventManager.addCustomListener(cc.Director.EVENT_PROJECTION_CHANGED, function(){
        //     _cc.loaderScene._updateTransform();
        // });
         this._startLoading();
  
        this.getServerInfo();
       
     
    },
    onDestroy: function () {
         cc.log('------------------------onDestroy Loading scence');
        MyWebSocket.removeObserver(EventGame.ON_LOAD_CONFIG,  this.onLoadConfig);    
        // this.super();
          this._super.apply(this, arguments);
    },
    onLoadConfig: function (msg) {
         
          LoadingScene.instance.loadingConfig = true;
        console.log("ON_LOAD_CONFIG in Login SCENCE done:" +  LoadingScene.instance.loadingConfig);
    },
    getServerInfo: function(){
        MyWebSocket.addObserver(EventGame.ON_LOAD_CONFIG, this.onLoadConfig); 
        
        ApiClient.getServerInfo(this.loadingLabel, null, null);
        // ApiClient.getServerInfo(this.statusPostLabel, this.responseLabel);
       // cc.log('aaaaaaaaaaaaaaaaaaaaaaaaaaa');
    },
    loadingCallBack:function (obj) {
        ++this._numberOfLoadedSprites;
        // cc.log('num img =>'+this._numberOfLoadedSprites);
 
    },
    enterLoginScene:function () {
        //  cc.director.loadScene('LoginScene');
        var self = this;
         cc.director.loadScene('LoginScene',function(err, data){
                var loginNode = cc.director.getScene();
                var containerLogin = loginNode.getChildByName('Game').getChildByName('container');
                containerLogin.setPositionX(1280);
                var sequence = cc.spawn(cc.moveBy(.5, cc.p(-1280, 0)), 
                    cc.callFunc(function () {
                        cc.game.removePersistRootNode(self.transitNode);
                    }
                ));
                 self.transitNode.runAction(cc.spawn(sequence, 
                    cc.callFunc(function () {
                            var action2 =  cc.moveBy(.5, cc.p(-1280, 0));
                            containerLogin.runAction(action2);
                        })
                ));
                var dataStr = 'string data';
                 LoginSence.instance.initDataFromLoading(dataStr);
        });
 
    },
    test:function(err, data){
        cc.log('==> áaa'+err);
        cc.log('==>  data'+ data);
        
        var scene = cc.director.getScene();
        
         LoginSence.instance.test();
    },
    // called every frame
    update: function (dt) {
        if (this.isloadingCounting && this.loadingConfig) {
            // cc.log('update barrrr');
            this.loadingCounter.progress += 0.01;
             this.loadingGlow.setPositionX(this.loadingCounter.progress*LOADING_BAR_WIDTH );
             //cc.log('progress '+ this.loadingCounter.progress);
          // this.loadingTimer += dt;
            if ( this.loadingCounter.progress >= 1) {
                this.isloadingCounting = false;
                this.loadingCounter.progress = 1;
               // cc.log('load all img done');
              // this.getDistributor();
                this.enterLoginScene();
            }
        }else{
            // cc.log(this.isloadingCounting + ' update' + this.loadingConfig);
        }
    },
});
