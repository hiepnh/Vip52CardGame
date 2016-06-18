// var Game = require('Game');

cc.Class({
    extends: cc.Component,

    properties: {
        panelLogin: cc.Node,
        panelRegister: cc.Node,
        panelPhoneVerify: cc.Node,
        editBoxLoginName : cc.EditBox,
         editBoxLoginPass : cc.EditBox,
    },
    onLoad: function () {
         var ls = cc.sys.localStorage;
        //This should save value "foo" on key "bar" on Local Storage
        //cc.log('=========' +ls.getItem('editBoxLoginName'));
        this.editBoxLoginName.string = ls.getItem('editBoxLoginName');
        this.editBoxLoginPass.string = ls.getItem('editBoxLoginPass');
    },
    // use this for initialization
    init: function (betDuration) {
        this.panelLogin.active = true;
        this.panelRegister.active = false;
        this.panelPhoneVerify.active = false;
        // this.resultTxt.enabled = false;
    },

   showPhoneVerifyState: function () {
        this.panelLogin.active = false;
        this.panelRegister.active = false;
        this.panelPhoneVerify.active = true;
    },

    showLoginState: function () {
        this.panelLogin.active = true;
        this.panelRegister.active = false;
        this.panelPhoneVerify.active = false;
    },

    showRegisterState: function () {
        this.panelLogin.active = false;
        this.panelRegister.active = true;
        this.panelPhoneVerify.active = false;
    },

    toggleChbox: function () {
        //this.panelChat.active = !this.panelChat.active;
    },
    getInputEditLogin: function () {
         var username = this.editBoxLoginName.string;
         var pass = this.editBoxLoginPass.string;
        //Handle for quick access to Cocos2D's implementation of Local Storage:
        var ls = cc.sys.localStorage;

        //This should save value "foo" on key "bar" on Local Storage
        ls.setItem('editBoxLoginName', username);
         ls.setItem('editBoxLoginPass', pass);
 
        return [username, pass];
        
        
    },
   

    // called every frame
    update: function (dt) {
       
    },
});
