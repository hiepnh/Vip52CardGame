
// the minimum and maximum number of points : min 0 max 21
function getMinMaxPoint (cards) {
    var hasAce = false;
    var min = 0;
    for (var i = 0; i < cards.length; i++) {
        var card = cards[i];
        if (card.point === 1) {
            hasAce = true;
        }
        min += Math.min(10, card.point);
    }
    var max = min;
    // 如果有 1 个 A 可以当成 11
    if (hasAce && min + 10 <= 21) {
        // （如果两个 A 都当成 11，那么总分最小也会是 22，爆了，所以最多只能有一个 A 当成 11）
        max += 10;
    }

    return {
        min: min,
        max: max
    };
}

function isBust (cards) {
    var sum = 0;
    for (var i = 0; i < cards.length; i++) {
        var card = cards[i];
        sum += Math.min(10, card.point);
    }
    return sum > 21;
}
function isComponentOfTopPopUp(node){
    var globalData = require('GlobalData').getInstance();
    if(globalData.popUpNode && globalData.popUpNode.length){
                var topPopUp = globalData.popUpNode[globalData.popUpNode.length -1];
                //Returns true if this node is a child, deep child or identical to the given node.
                
                if(topPopUp &&  !node.isChildOf(topPopUp))
                return false;
    }else{
        return false;
    }
    return true;
}
function isTopPopUp(node){
    var globalData = require('GlobalData').getInstance();
    if(globalData.popUpNode){
                var topPopUp = globalData.popUpNode[globalData.popUpNode.length -1];
                //Returns true if this node is a child, deep child or identical to the given node.
                
                if(topPopUp &&  node === topPopUp)
                return true;
    }else{
        return false;
    }
    return false;
}

/**
 * return string with json format
 * */
var encode = function(obj) {
       return JSON.stringify(obj);
   };
 /**
 * return json obj js
 * */
var decode = function(obj) {
    try {
      return JSON.parse(obj);
    } catch (e) {
        return null;
    }
    
    return null;
};

var isMobile = function () {
    return cc.sys.isMobile;
};

var convertNumberToShortFormat = function (num) {
    //toFixed(0);// ko lay sau dau phay?
    var kq = num;
     var sodu;
   if(num >= Math.pow(10, 9)){
       //1 ti?
        sodu = num%Math.pow(10, 9);
       if(sodu >0)
            kq= `${num/Math.pow(10, 9)}.${sodu.toFixed(2)}B`;
       else
            kq= `${num/Math.pow(10, 9)}B`;
   }else if(num >= Math.pow(10, 6)){
       //1 m
        sodu = num%Math.pow(10,6);
       if(sodu >0)
            kq= `${num/Math.pow(10, 6)}.${sodu.toFixed(2)}M`;
        else 
            kq= `${num/Math.pow(10, 6)}M`;
   }else if(num >= Math.pow(10, 3)){
       //1 k
        sodu = num%Math.pow(10,3);
        if(sodu >0)
            kq= `${num/Math.pow(10, 3)}.${sodu.toFixed(2)}K`;
        else 
            kq= `${num/Math.pow(10, 3)}K`;
   }
   return kq;
   
};

module.exports = {
    encode:encode,
    decode:decode,
    isBust: isBust,
    getMinMaxPoint: getMinMaxPoint,
    isMobile: isMobile,
    isComponentOfTopPopUp:isComponentOfTopPopUp,
    convertNumberToShortFormat:convertNumberToShortFormat,
    isTopPopUp:isTopPopUp
};
