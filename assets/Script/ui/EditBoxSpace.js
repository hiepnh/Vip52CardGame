cc.Class({
    extends: cc.EditBox,

    properties: {
        pressedScale: 1,
        transDuration: 0
    },

    // use this for initialization
    onLoad: function () {
       
        this.delegate = this;
        //this.setMargins(10,10);
        //this.getComponent('_edTxt').style.padding = "10";
    },
    
    editBoxEditingDidBegin: function (editBox) {
        cc.log("editBox  DidBegin !");
    },

    editBoxEditingDidEnd: function (editBox) {
        cc.log("editBox  DidEnd !");
    },

    editBoxTextChanged: function (editBox, text) {
        cc.log("editBox  TextChanged, text: " + text.trim());
        //editBox.string = 'test';
    },

    editBoxReturn: function (editBox) {
        cc.log("editBox  was returned !");
    },
});
