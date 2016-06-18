cc.Class({
    extends: cc.Component,

    properties: {
        pressedScale: 1,
        transDuration: 0
    },

    // use this for initialization
    onLoad: function () {
        var self = this;
         // ca 2 cach deu dung duoc. ko ro cach 1 co work voi jsb ko
        // function onTouchDown (event) {
            
        // }
        // function onTouchUp (event) {
        //   cc.log('node.onTouch '+event.getLocation().x +'=>'+event.getLocation().y);
        // }
        // this.node.on('touchstart', onTouchDown, this.node);
        // this.node.on('touchend', onTouchUp, this.node);
        // this.node.on('touchcancel', onTouchUp, this.node);
        
        if ('touches' in cc.sys.capabilities) {
            cc.log('touchestouchestouches');
            cc.eventManager.addListener({
                event: cc.EventListener.TOUCH_ALL_AT_ONCE,
                // When "swallow touches" is true, then returning 'true' from the onTouchBegan method will "swallow" the touch event, preventing other listeners from using it.
	            swallowTouches: true,
                onTouchBegan: function(touches, event){
                     cc.log('onTouchBegan touches ');
                    return true;
                }
            }, this.node);
        } else if ('mouse' in cc.sys.capabilities){
             
             
              cc.eventManager.addListener({
                event: cc.EventListener.MOUSE,
                // When "swallow touches" is true, then returning 'true' from the onTouchBegan method will "swallow" the touch event, preventing other listeners from using it.
	            swallowTouches: true,
	            onMouseDown: function(event){
	                cc.log('onMouseDown');
                    event.stopPropagation ();
                    // cc.log(self.node.width +' :'+self.node.height);
                    // cc.log(event.getLocation().x +' onTouchUp'+event.getLocation().y);
                   // event.getCurrentTarget().addNewSpriteWithCoords(event.getLocation());
                  // event.getCurrentTarget().checkIntesect(event.getLocation());
                  return true;
                },
                onMouseUp: function(event){
                    cc.log('onMouseUp');
                    event.stopPropagation ();
                    // cc.log(self.node.width +' :'+self.node.height);
                    // cc.log(event.getLocation().x +' onTouchUp'+event.getLocation().y);
                   // event.getCurrentTarget().addNewSpriteWithCoords(event.getLocation());
                  // event.getCurrentTarget().checkIntesect(event.getLocation());
                  
                }
            }, this.node);
        }
           
    },
    
     checkIntesect: function (locationInView) {
        //  var vacham = false;
        // var children = this.node.getChildren();
        // //var point = locationInView;
        // for(var i =0; i < children.length; i++){
        //   var rect = children[i].getBoundingBox();
        //   var point = children[i].convertToNodeSpace(locationInView);
        //     cc.log(rect.x +':'+rect.y+':'+rect.width +':'+rect.height);
        //     cc.log(point.x +':'+point.y);
        //   if (cc.rectContainsPoint(rect, point)) {
        //       // cc.log('va cham');
        //         vacham=true;
        //         break;
        //     } else {
        //       // cc.log(' ko va cham');
        //     } 
        // }
        // if(!vacham){
        //     cc.log('----------------------------closeeeeee');
        // }else{
        //      cc.log('not closeeeeee');
        // }
        
     }
});
