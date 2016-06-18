
/**
 * 
 * cc.url.raw(res/textures/star.png) => res/raw-assets/textures/star.png
 * 
*/
const resouceGame = [
    //'res/raw-assets/Texture/img/bg_noti.png',
    //'res/raw-assets/Texture/img/bg.jpg',
    // 'res/raw-assets/Texture/img/bottom.png',
    // 'res/raw-assets/Texture/img/bound_avt.png',
    // 'res/raw-assets/Texture/img/bubble chat1.png',
    // 'res/raw-assets/Texture/img/bubble chat.png',
    'res/raw-assets/Texture/img/loading_bar1.png',
 
	
];
const LIST_GAME_IMG = [
    'res/raw-assets/Texture/img/mainLobby/sam.png',
    'res/raw-assets/Texture/img/mainLobby/maubinh.png',
    'res/raw-assets/Texture/img/mainLobby/poker.png',
    'res/raw-assets/Texture/img/mainLobby/phom.png',
    'res/raw-assets/Texture/img/mainLobby/chan.png',
    'res/raw-assets/Texture/img/mainLobby/tlmn.png',
    'res/raw-assets/Texture/img/mainLobby/3cay.png',
    'res/raw-assets/Texture/img/mainLobby/lieng.png',
    'res/raw-assets/Texture/img/mainLobby/xito.png',
    'res/raw-assets/Texture/img/mainLobby/xocdia.png',
 
	
];
// const LIST_GAME_IMG = [
//     'res/Texture/img/mainLobby/sam.png',
//     'res/Texture/img/mainLobby/maubinh.png',
//     'res/Texture/img/mainLobby/poker.png',
//     'res/Texture/img/mainLobby/phom.png',
//     'res/Texture/img/mainLobby/chan.png',
//     'res/Texture/img/mainLobby/tlmn.png',
//     'res/Texture/img/mainLobby/3cay.png',
//     'res/Texture/img/mainLobby/lieng.png',
//     'res/Texture/img/mainLobby/xito.png',
//     'res/Texture/img/mainLobby/xocdia.png',
 
	
// ];
// set get dynamic
// class Jedi {
//   constructor(options = {}) {
//     const lightsaber = options.lightsaber || 'blue';
//     this.set('lightsaber', lightsaber);
//   }

//   set(key, val) {
//     this[key] = val;
//   }

//   get(key) {
//     return this[key];
//   }
// }

        // // good
        // const val = Number(inputValue);
        
        // // good
        // const val1 = parseInt(inputValue, 10);
        // cc.log('val '+val1);
        // //best but work only with int  2^31 (max int32 )
        // but Number in js max is 2^61
        // const val3 = inputValue >> 0;


// // bad
// const totalScore = this.reviewScore + ''; // invokes this.reviewScore.valueOf()

// // bad
// const totalScore = this.reviewScore.toString(); // isn't guaranteed to return a string

// // good
// const totalScore = String(this.reviewScore);
//4.4 To convert an array-like object to an array, use Array.from.

// const foo = document.querySelectorAll('.foo');
// const nodes = Array.from(foo);

//const itemsCopy = [...numbers]; copy array from old array : numbers
// access use cards['c1'] example
// or         cards.c1    
var cards = {
    c1:"cardClubsA.png",
    c2:"cardClubsJ.png",
    c3:"cardClubsK.png",
    c4:"cardClubsQ.png",
    c5:"cardDiamonds10.png",
    c6:"cardDiamonds2.png",
    c7:"cardDiamonds3.png",
    c8:"cardDiamonds4.png",
    c9:"cardDiamonds5.png",
    c10:"cardDiamonds6.png",
    c11:"cardDiamonds7.png",
    c12:"cardDiamonds8.png",
    c13:"cardDiamonds9.png",
    c14:"cardDiamondsA.png",
    c15:"cardDiamondsJ.png",
    c16:"cardDiamondsK.png",
    c17:"cardDiamondsQ.png",
    c18:"cardHearts10.png",
    c19:"cardHearts2.png",
    c20:"cardHearts3.png",
    c21:"cardHearts4.png",
    c22:"cardHearts5.png",
    c23:"cardHearts6.png",
    c24:"cardHearts7.png",
    c25:"cardHearts8.png",
    c26:"cardHearts9.png",
    c27:"cardHeartsA.png",
    c28:"cardHeartsJ.png",
    c29:"cardHeartsK.png",
    c30:"cardHeartsQ.png",
    c31:"cardJoker.png",
    c32:"cardSpades10.png",
    c33:"cardSpades2.png",
    c34:"cardSpades3.png",
    c35:"cardSpades4.png",
    c36:"cardSpades5.png",
    c37:"cardSpades6.png",
    c38:"cardSpades7.png",
    c39:"cardSpades8.png",
    c40:"cardSpades9.png",
    c41:"cardSpadesA.png",
    c42:"cardSpadesJ.png",
    c43:"cardSpadesK.png",
    c44:"cardSpadesQ.png",
    c45:"cardClubs10.png",
    c46:"cardClubs2.png",
    c47:"cardClubs3.png",
    c48:"cardClubs4.png",
    c49:"cardClubs5.png",
    c50:"cardClubs6.png",
    c51:"cardClubs7.png",
    c52:"cardClubs8.png",
    c53:"cardClubs9.png",
};


const players = [
	{
		name: '燃烧吧，蛋蛋儿军',
		gold: 3000,
		photoIdx: 0
	},
	{
		name: '地方政府',
		gold: 2000,
		photoIdx: 1
	},
	{
		name: '手机超人',
		gold: 1500,
		photoIdx: 2
	},
	{
		name: '天灵灵，地灵灵',
		gold: 500,
		photoIdx: 3
	},
	{
		name: '哟哟，切克闹',
		gold: 9000,
		photoIdx: 4
	},
	{
		name: '学姐不要死',
		gold: 5000,
		photoIdx: 5
	},
	{
		name: '提百万',
		gold: 10000,
		photoIdx: 6
	}
];

module.exports = {
	players: players,
	resouceGame: resouceGame,
	cards: cards,
	LIST_GAME_IMG:LIST_GAME_IMG
};