var Utils = require('Utils');
// var GlobalData = require('GlobalData');
var globalData = require('GlobalData').getInstance();
var PopupLobbyUI = cc.Class({
    extends: cc.Component,

    properties: {
        panelLoaidng: cc.Node,
        
    },
    onLoad: function () {
  
        
        if ('touches' in cc.sys.capabilities) {
            //cc.log('touches popupLobbyUI');
            cc.eventManager.addListener({
                event: cc.EventListener.TOUCH_ALL_AT_ONCE,
                onTouchesEnded: function(touches, event){
                   
                }
            }, this.node);
        } else if ('mouse' in cc.sys.capabilities){
             //cc.log('mousemous popupLobbyUI');
             var listener1 = cc.EventListener.create({
                event: cc.EventListener.MOUSE,
                onMouseDown: function(event){
                    event.stopPropagation();
                  
                },
                onMouseUp: function(event){
                    // cc.log('mousemousemouse onMouseUp popupLobbyUI');
                     event.stopPropagation();
                   
                }
            });
            
            cc.eventManager.addListener(listener1, this.node);
            
        }
  
    },
    /*
    close lan luot thi popup top -> bot        
    */
    closeDialog: function (event) {
        if(!Utils.isComponentOfTopPopUp(event.getCurrentTarget())) return;
        
        //pop() returns the last element and removes it from the array
       // var topPopUp = this.arrayOpenDialog.pop();
        var topPopUp = globalData.popUpNode.pop();
        //topPopUp.active = false;
        // this.panelUserInfo.setScale(1);
         var timeAction = 1;
         var scaleDownAction = cc.scaleTo(timeAction,0.1).easing(cc.easeBackIn());
         var callFun = cc.callFunc(this.activePanel, topPopUp,  false);
         var fadeIn = cc.fadeOut(timeAction);
         
         var seq = cc.sequence(cc.spawn( scaleDownAction, fadeIn), callFun);
        topPopUp.runAction(seq);
        
        //if(globalData.popUpNode.length ===0)  this.panelBgColor.active =false;
        
    },
     closeLoading: function () {
       // if(!Utils.isComponentOfTopPopUp(event.getCurrentTarget())) return;
        //pop() returns the last element and removes it from the array
       // var topPopUp = this.arrayOpenDialog.pop();
       if(globalData.popUpNode && globalData.popUpNode.length){
           var topPopUp = globalData.popUpNode.pop();
        //topPopUp.active = false;
        // this.panelUserInfo.setScale(1);
         var timeAction = 1;
         var scaleDownAction = cc.scaleTo(timeAction,0.1).easing(cc.easeBackIn());
         var callFun = cc.callFunc(this.activePanel, topPopUp,  false);
         var fadeIn = cc.fadeOut(timeAction);
         
         var seq = cc.sequence(cc.spawn( scaleDownAction, fadeIn), callFun);
        topPopUp.runAction(seq);
       }
        
        
        //if(globalData.popUpNode.length ===0)  this.panelBgColor.active =false;
        
    },
    activePanel: function (node ,value){
        //close PopUp A but imediatly reOpen it
        // prevent for action not finish
        //if(Utils.isTopPopUp(node) )  return;
        node.active = value;
    },

   showLoading: function () {
       if(globalData.popUpNode.length !== 0) return;

        
        this.panelLoaidng.active = true;
         this.panelLoaidng.scale =1;
          this.panelLoaidng.opacity =255;
        // this.panelRegister.active = false;
        // this.panelPhoneVerify.active = false;
         var repeat = cc.repeatForever(cc.rotateBy(1.0, 360));
             
        this.panelLoaidng.stopAllActions();
        this.panelLoaidng.runAction(repeat);
         globalData.popUpNode.push(this.panelLoaidng);
    },
   
    animShowPopUp: function(panel){
        panel.stopAllActions();
        panel.setScale(0.1);
         var timeAction = 1;
        var scaleUpAction =cc.spawn(cc.scaleTo(timeAction, 1).easing(cc.easeBackOut()), cc.fadeIn(timeAction));
       panel.runAction(scaleUpAction);
        globalData.popUpNode.push(panel);
        
      //  this.panelBgColor.active =true;
    },
    

    // called every frame
    update: function (dt) {
       
    },
});
