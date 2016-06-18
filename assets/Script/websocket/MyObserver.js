
function Observer () {
    // // 总共几副牌
    // this._numberOfDecks = numberOfDecks;
    // // 还没发出去的牌
    // this._cardIds = new Array(numberOfDecks * 52);

    // this.reset();
    this.observers= [];
}  
  
Observer.prototype.addObserver = function(topic, observer) {
      this.observers[topic] || (this.observers[topic] = [])

      this.observers[topic].push(observer);
      //cc.log('addObserver '+topic);
};
Observer.prototype.removeObserver= function(topic, observer) {
      if (!this.observers[topic])
        return;

      var index = this.observers[topic].indexOf(observer);

      if (~index) {
        this.observers[topic].splice(index, 1);
        //cc.log('----------------removeObserver '+topic);
      }
};

Observer.prototype.notifyObservers = function(topic, message) {
        if (!this.observers[topic])
        return;

          for (var i = this.observers[topic].length - 1; i >= 0; i--) {
            this.observers[topic][i](message);
          }
};
// Observer.addObserver('cart', function(message){
//   console.log("First observer message:" + message)
// })

// Observer.addObserver('notificatons', function(message){
//   console.log("Second observer message:" + message)
// })

// Observer.notifyObservers('cart', 'test 1')
// // First observer message:test 1 

// Observer.notifyObservers('notificatons', 'test 2')
// // Second observer message:test 2
module.exports = Observer;
// module.exports = {
// 	MyObserver: Observer
// };
