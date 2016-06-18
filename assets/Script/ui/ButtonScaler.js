var GlobalData = require('GlobalData').getInstance();
cc.Class({
    extends: cc.Component,

    properties: {
        pressedScale: 0.95,
        transDuration: 0.1
    },

    // use this for initialization
    onLoad: function () {
        var self = this;
        var audioMng = cc.find('Menu/AudioMng') || cc.find('Game/AudioMng')
        if (audioMng) {
            audioMng = audioMng.getComponent('AudioMng');
        }
        self.initScale = this.node.scale;
        self.button = self.getComponent(cc.Button);
        self.scaleDownAction = cc.scaleTo(self.transDuration, self.pressedScale);
        self.scaleUpAction = cc.scaleTo(self.transDuration, self.initScale);
        self.scaleDownAction.setTag(1);
        self.scaleUpAction.setTag(2);
        function onTouchDown (event) {
            cc.log('onTouchDown');
            if(GlobalData.popUpNode){
                var topPopUp = GlobalData.popUpNode[GlobalData.popUpNode.length -1];
                //Returns true if this node is a child, deep child or identical to the given node.
                if(topPopUp &&  !self.node.isChildOf(topPopUp)){
                    cc.log('onTouchDown  reject *******************');
                     return;
                }
                
            }
             self.node.stopActionByTag (1);
             self.node.stopActionByTag (2);
            // self.node.stopAllActions();
            if (audioMng) audioMng.playButton();
            self.node.runAction(self.scaleDownAction);
            
        }
        function onTouchUp (event) {
             cc.log('onTouchup');
            if(self.node.getScale() != 1){
                 self.node.stopActionByTag (1);
             self.node.stopActionByTag (2);
                self.node.runAction(self.scaleUpAction);   
            }
        }
        this.node.on('touchstart', onTouchDown, this.node);
        this.node.on('touchend', onTouchUp, this.node);
        this.node.on('touchcancel', onTouchUp, this.node);
    }
});
