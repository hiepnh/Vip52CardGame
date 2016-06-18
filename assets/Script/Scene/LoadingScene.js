//https://github.com/airbnb/javascript#properties
const players = require('Config').players;// way 1
var Test = require('Config');// way 2
const cards = require('Config').cards;
const resouceGame = require('Config').resouceGame; 
const LOADING_BAR_WIDTH = 900;
cc.Class({
    extends: cc.Component,

    properties: {
        // label: {
        //     default: null,
        //     type: cc.Label
        // },
        text: 'Hello, World!',
        loadingCounter: cc.ProgressBar,
        loadingGlow: cc.Node,
    },
     init: function () {
        this.loadingTimer = 0;
        this.isloadingCounting = true;
        this.loadingCounter.progress=0;
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
                 cc.log('newX =>'+newX +' === '+self.loadingCounter.getComponent( cc.Sprite ).node.getContentSize().with);
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
  
        
 
    },
    loadingCallBack:function (obj) {
        ++this._numberOfLoadedSprites;
        cc.log('num img =>'+this._numberOfLoadedSprites);
 
    },
    enterLoginScene:function () {
        // cc.director.runScene('LoginScene');
        cc.director.loadScene('LoginScene');
 
    },
    // called every frame
    update: function (dt) {
        if (this.isloadingCounting) {
            this.loadingCounter.progress += 0.01;
             this.loadingGlow.setPositionX(this.loadingCounter.progress*LOADING_BAR_WIDTH );
             //cc.log('progress '+ this.loadingCounter.progress);
          // this.loadingTimer += dt;
            if ( this.loadingCounter.progress >= 1) {
                this.isloadingCounting = false;
                this.loadingCounter.progress = 1;
               // cc.log('load all img done');
                this.enterLoginScene();
            }
        }
    },
});
