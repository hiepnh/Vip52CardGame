var Utils = require('Utils');
// var GlobalData = require('GlobalData');
var globalData = require('GlobalData').getInstance();
var PopupLobbyUI = cc.Class({
    extends: cc.Component,

    properties: {
        panelUserInfo: cc.Node,
        panelChangePass: cc.Node,
        panelBgColor: cc.Node,
        // panelPhoneVerify: cc.Node,
        // editBoxLoginName : cc.EditBox,
        //  editBoxLoginPass : cc.EditBox,
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
                     // cc.log('mousemousemouse down popupLobbyUI');
                      
                    // cc.log(self.node.width +' :'+self.node.height);
                    // cc.log(event.getLocation().x +' onTouchUp'+event.getLocation().y);
                   // event.getCurrentTarget().addNewSpriteWithCoords(event.getLocation());
                  // event.getCurrentTarget().checkIntesect(event.getLocation());
                  
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
        
        if(globalData.popUpNode.length ===0)  this.panelBgColor.active =false;
        
    },
    activePanel: function (node ,value){
        //close PopUp A but imediatly reOpen it
        // prevent for action not finish
        //if(Utils.isTopPopUp(node) )  return;
        node.active = value;
    },
    // pushTopPopup: function(node){
    //     //  this.arrayOpenDialog.push(node);
    // },
   showUserInfo: function () {
       if(globalData.popUpNode.length !== 0) return;

        
        this.panelUserInfo.active = true;
        // this.panelRegister.active = false;
        // this.panelPhoneVerify.active = false;

        this.animShowPopUp(this.panelUserInfo);
        
        
    },
    showPopUpChnagePass: function (event){
       // if(globalData.popUpNode.length !== 0) return;
       cc.log('sender ==> ' +event.getCurrentTarget().name);
       
    //   if(globalData.popUpNode){
    //             var topPopUp = globalData.popUpNode[globalData.popUpNode.length -1];
    //             //Returns true if this node is a child, deep child or identical to the given node.
                
    //             if(topPopUp &&  !event.getCurrentTarget().isChildOf(topPopUp))
    //             return;
    //     }
    
    if(!Utils.isComponentOfTopPopUp(event.getCurrentTarget())) return;
        this.panelChangePass.active = true;
        this.animShowPopUp(this.panelChangePass);
    },
    animShowPopUp: function(panel){
        panel.stopAllActions();
        panel.setScale(0.1);
         var timeAction = 1;
        var scaleUpAction =cc.spawn(cc.scaleTo(timeAction, 1).easing(cc.easeBackOut()), cc.fadeIn(timeAction));
       panel.runAction(scaleUpAction);
        globalData.popUpNode.push(panel);
        
        this.panelBgColor.active =true;
    },
    // showLoginState: function () {
    //     this.panelLogin.active = true;
    //     this.panelRegister.active = false;
    //     this.panelPhoneVerify.active = false;
    // },

    // showRegisterState: function () {
    //     this.panelLogin.active = false;
    //     this.panelRegister.active = true;
    //     this.panelPhoneVerify.active = false;
    // },

    // toggleChbox: function () {
    //     //this.panelChat.active = !this.panelChat.active;
    // },
    
   

    // called every frame
    update: function (dt) {
       
    },
});
