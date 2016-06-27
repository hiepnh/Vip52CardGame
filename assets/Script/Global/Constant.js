
const CONSTANT = {
     ZONE_NAME  : 'Simms',
     WEB_SOCKET : 'ws://115.84.179.241:8892/ws',
     PING_DELAY : 5000,//5s
     SIGNATURE  :'signature',
     INFO       :'info',
     PLATFORM   : 4, // WEB
     CMD        : 'cmd'
};
const GAME_ID = {
    TLMN  : 1,
    SAM : 2,
    BACAY : 3,
    MAUBINH : 4,
    LIENG : 5,
    POKER : 6,
    XITO : 7,
    PHOM : 8,
    XOCDIA : 9,
	CHAN:10
};
const GAME_ID_ARRAY = [
    GAME_ID.TLMN ,
	GAME_ID.PHOM,
	GAME_ID.BACAY,
	GAME_ID.POKER,
	GAME_ID.XOCDIA,
	GAME_ID.LIENG,
	GAME_ID.XITO,
	GAME_ID.SAM,
	GAME_ID.MAUBINH,
	GAME_ID.CHAN
    
];
const GAME_NAME_ARRAY = [// name theo id tuong ung tren GAME_ID_ARRAY
	'',// vi GAME_ID start from 1
    'Tiến lên MN' ,
	'Sâm',
	'Ba Cây',
	'Mậu Binh',
	'Liêng',
	'Poker',
	'Xì Tố',
	'Phỏm',
	'Xóc Đĩa',
	'Chắn'
 
];
const CMD_RESULT = {
	 ROOM_INFO  : 202,
     LIST_ROOM  : 300,
	 JOIN_ROOM  : 308, 
    //  WEB_SOCKET : 'ws://115.84.179.241:8892/ws',
};
const GAME_STATE = {
     WAITING_USER  : 1,// 
     WAITING_USER_READY : 2,// 
     READY_TO_START : 3,// 
     PLAYING  :4 // 
     
};
const ROOM = {
    ROOM_ID  : 'rid',
    ROOM_NAME  : 'rn',
    MAX_USER  : 'Mu',
    USER_COUNT  : 'uC',
    ZONE_NAME  : 'zn',
    SERVER_ID  : 'sid',
    MIN_MONEY  : 'mM',
	MUC_CUOC   : 'b'
};

const ASSET_ID = {
     GOLD  : 1,// 
     CHIP : 2
};
const CONNECT_TYPE = {
     NORMAL  : 0,// 
     RECONNECT : 1,// bi mat ket noi, ket noi lai
     CHANGE_RADOM_SERVER : 2,// ket noi den server bat ki trong cac server hien co
     CHANGE_SERVER_SPECIFC  :3 // ket noi den 1 sever chi dinh. case : vao phong` nao do, hoac vao server nhat dinh
     
};

const OBSERVER_EVENT = {
     ON_CONNECTED_WS  : 'ON_CONNECTED_WS',
     ON_LOAD_CONFIG  : 'ON_LOAD_CONFIG',
     ON_GET_SIGNATURE : 'ON_GET_SIGNATURE',
     ON_REGISTER_SUCCESS: 'ON_REGISTER_SUCCESS',
     ON_LOGIN:'onLogin',
     ON_LOGOUT:'onLogout',
	 ON_JOINROOM:'onJoinRoom',
     ON_PING:'onPing',
     ON_ROOM_PLUGIN_MSG:'onRoomPluginMessage',
     ON_CLOSE:'onClose',
     ON_ERROR:'onError'
};
const STATUS = {
     SUCCESS  : 0,
     SYS_ERROR  : 1,
     WRONG_PASS : 100,
     USER_NOT_EXIST  : 101,
     IF_NOT_ALLOW  : 201,
     DISPLAY_NAME_EXIST : 203,
     USER_NAME_TUC_TIU : 204,    // username chữa nội dung bị cấm (tục tĩu)
     PASS_TOO_EASY : 205, //Passsword quá dễ đoán
     USER_TOO_SHORT : 206 //user name toi thieu 6 ky tu
};
module.exports = {
	CONSTANT : CONSTANT,
	OBSERVER_EVENT:OBSERVER_EVENT,
	STATUS:STATUS,
	CONNECT_TYPE: CONNECT_TYPE,
	GAME_ID:GAME_ID,
	GAME_ID_ARRAY: GAME_ID_ARRAY,
	GAME_NAME_ARRAY:GAME_NAME_ARRAY,
	ASSET_ID:ASSET_ID,
	CMD_RESULT:CMD_RESULT,
	ROOM:ROOM,
	GAME_STATE:GAME_STATE
	
};