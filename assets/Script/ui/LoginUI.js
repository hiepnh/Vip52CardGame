// var Game = require('Game');

cc.Class({
    extends: cc.Component,

    properties: {
        panelLogin: cc.Node,
        panelRegister: cc.Node,
        panelLoadingPopUp: cc.Node,
        panelPhoneVerify: cc.Node,
        editBoxLoginName : cc.EditBox,
        editBoxLoginPass : cc.EditBox,
        chkSavePass : cc.Button,
        loadingSpin : cc.Sprite,
        registerBtnList: {
            default: [],
            type: [cc.EditBox]
         },
         labelError : cc.Label
       
    },
    onLoad: function () {
         var ls = cc.sys.localStorage;
        //This should save value "foo" on key "bar" on Local Storage
        //cc.log('=========' +ls.getItem('editBoxLoginName'));
        var nameStr = ls.getItem('username');
        var pasStr = ls.getItem('password');
        var isSavePass = ls.getItem('savePassword');
       if(nameStr) this.editBoxLoginName.string = nameStr;
       if(isSavePass){
          // cc.log('checkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk');
            this.chkSavePass.node.getComponent('ButtonScaler').check(true); 
            if(pasStr) this.editBoxLoginPass.string = pasStr;
       }else{
           // cc.log('noooooooooooooooo');
            this.chkSavePass.node.getComponent('ButtonScaler').check(false); 
            this.editBoxLoginPass.string = '';
       }
        this.keyboardLisntener();
    },
    // use this for initialization
    init: function (betDuration) {
        this.panelLogin.active = true;
        this.panelRegister.active = false;
        this.panelPhoneVerify.active = false;
        // this.resultTxt.enabled = false;
    },
    keyboardLisntener: function (){
        var self = this;
            // var x = window.document.getElementsByTagName("input").length;
            // cc.log('length '+x);
            // x.focus();
 
       //  if( 'keyboard' in cc.sys.capabilities ) {
            cc.eventManager.addListener({
                event: cc.EventListener.KEYBOARD,
                onKeyPressed:function(key, event) {
                    cc.log('key '+ key.toString());
                	switch(key) {
                	case cc.tab:
                	   // self.editBoxLoginPass = true;
                		
                	//	self.editBoxLoginPass.focus() ;//= true;//(true);
                	//		self.editBoxLoginPass.enable = true;//(true);
                		break;
                	case cc.enter:
                		
                		break;
                	}
                },
                onKeyReleased:function(key, event) {
                   // this.editBoxLoginPass+=
                	switch(key) {
                    	case cc.tab:
                    	//	alert('tab click');
                    		break;
                    	case cc.enter:
                    	//	alert('enter click');
                    		break;
                    }
                }
            }, this.node);
       // }  
    },

   showPhoneVerifyState: function () {
        this.panelLogin.active = false;
        this.panelRegister.active = false;
        this.panelPhoneVerify.active = true;
        this.panelLoadingPopUp.active = false;
    },

    showLoginState: function () {
        this.panelLogin.active = true;
        this.panelRegister.active = false;
        this.panelPhoneVerify.active = false;
        this.panelLoadingPopUp.active = false;
    },

    showRegisterState: function () {
        this.panelLogin.active = false;
        this.panelRegister.active = true;
        this.panelPhoneVerify.active = false;
        this.panelLoadingPopUp.active = false;
    },
    showLoading: function (isShow){
        this.panelLoadingPopUp.active = isShow;
        if(isShow){
            var repeat = cc.repeatForever(cc.rotateBy(1.0, 360));
             this.loadingSpin.node.runAction(repeat);
        }else{
             this.loadingSpin.node.stopAllActions();
        }
    },
    

    
    getInputEditLogin: function () {
         var username = this.editBoxLoginName.string;
         var pass = this.editBoxLoginPass.string;
        //Handle for quick access to Cocos2D's implementation of Local Storage:
        var ls = cc.sys.localStorage;

        //This should save value "foo" on key "bar" on Local Storage
        var isSavePass = ls.getItem('savePassword');
        ls.setItem('username', username);
        if(isSavePass) ls.setItem('password', pass);
        else localStorage.removeItem('password');
 
        return [username, pass];
        
        
    },
    toogleSavePass: function(event){
        var btn = event.getCurrentTarget();
       var isCheck = btn.getComponent('ButtonScaler').getCheckStatus() ;
       cc.log('save pass click ' +isCheck); 
        var ls = cc.sys.localStorage;
        if(isCheck) localStorage.setItem('savePassword','1');  
        else localStorage.removeItem('savePassword');  
    },
    getInputEditRegister: function () {
          var username = this.registerBtnList[0].string;
         var pass = this.registerBtnList[1].string;
         var confirmPass =this.registerBtnList[2].string;
         var returnVaule = null;
         if(!username ){  this.labelError.string ='chua nhap ten tai khoan';
         }else if(!pass ){  this.labelError.string ='chua nhap mat khau';
         }else if(!confirmPass ){  this.labelError.string ='chua xac nhan lai mat khau';
         }else if(pass !== confirmPass ){
            this.labelError.string ='mat khau va xac nhan mat khau ko khop';
         }else{
              this.labelError.string ='';
             returnVaule = [username, pass, confirmPass]; 
         }  
        
         return returnVaule;
        
        
    },
   

    // called every frame
    update: function (dt) {
       
    },
});
