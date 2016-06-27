
const BUNDLE = 'com.netviet.vip52';
const APPNAME = 'vip52';
const BASE_URL = 'http://v1.api1bai247.info';
const DISTRIBUTOR_URL = `${BASE_URL}/distributor`;//'http://v1.api1bai247.info/distributor';
const ACS_URL = `${BASE_URL}/acs`;
const COMMAND = 'command';
const VERSION_ID = '2';
const PLATFORM_ID = '1';// change to 4 (web) when server config 4 done


function getLinkDistributor(){
    var link = `${DISTRIBUTOR_URL}?${COMMAND}=regdis&bundle=${BUNDLE}&appName=${APPNAME}`
    return link;
}
function getLinkACS(distId, appId){
    var link = `${ACS_URL}?${COMMAND}=get-bid&distId=${distId}&versionId=${VERSION_ID}`
              +`&platformId=${PLATFORM_ID}&appId=${appId}`
    return link;
}
//http://v1.api1bai247.info/id?command=login&username=hiepnh&password=hiep123
function getLinkSignature(name, pass){
    var link = `${BASE_URL}/id?${COMMAND}=login&username=${name}&password=${pass}`;
    return link;
}
function  getLinkRegister(name, pass, deviceId, platformId, os){
    //http://v1.api1bai247.info/id?command=register&username=hehe167
    //&password=kaka123&deviceId=111&platformId=4&os=web&alsoLogin=true
    var link = `${BASE_URL}/id?${COMMAND}=register&username=${name}&password=${pass}&deviceId=${deviceId}`
              + `&platformId=${platformId}&os=${os}&alsoLogin=true`;
    return link;
}
function getLinkGuestPlay(deviceId, platformId, os){
    //http://v1.api1bai247.info/id?command=loginQuickPlay&deviceId=181c3ed6a95f25879a29b59801148222a&platformId=4&os=web
    var link = `${BASE_URL}/id?${COMMAND}=loginQuickPlay&deviceId=${deviceId}`
              + `&platformId=${platformId}&os=${os}`;
    return link;
}
module.exports = {
// 	BUNDLE: BUNDLE,
// 	APPNAME: APPNAME,
	getLinkDistributor: getLinkDistributor,
	getLinkACS: getLinkACS,
	getLinkSignature:getLinkSignature,
	getLinkRegister:getLinkRegister,
	getLinkGuestPlay:getLinkGuestPlay
};