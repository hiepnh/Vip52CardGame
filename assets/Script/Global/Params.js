// var command = cc.Enum({
//     LOGIN: 1,   
//     LOGOUT: 2,
//     JOINROOM:3,//[3, zoneName:String, roomId:Integer, password:String]
//     LeaveRoom:4,// [4,zoneName:String, roomId:Int]
//     RoomPluginMessage:5,// [5, zoneName:String, roomId:Int, params:JsonObject]
//     ZonePluginMessage:6,
//     PingMessage:7,
//     PingResponse:6,//zonePlugin never tra ve nhe
// });
var command = {
    LOGIN: 1,   
    LOGOUT: 2,
    JOINROOM:3,//[3, zoneName:String, roomId:Integer, password:String]
    LeaveRoom:4,// [4,zoneName:String, roomId:Int]
    RoomPluginMessage:5,// [5, zoneName:String, roomId:Int, params:JsonObject]
    ZonePluginMessage:6,
    PingMessage:7,
    PingResponse:6,//zonePlugin never tra ve nhe
};

module.exports = {
    command: command
};