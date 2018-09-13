function $(_id){
    return document.getElementById(_id);
}
var SiHua_Event = {
    mapping: function(__event){    
        var keycode = __event.which||__event.keyCode;    
        alert(keycode);
        var code = "";
        var name = "";
        var args = {};        
        if(keycode < 58 && keycode > 47){//脢脳录眉rgs = {modifiers: __event.modifiers, value: (keycode - 48), type: 0, isGlobal: false};
            code = "KEY_NUMERIC"+keycode;
        } else {
            var args = {modifiers: __event.modifiers, value: keycode, type: 0, isGlobal: false};
            switch(keycode){
            
                case 1:
                case 38:
                case 28: //??调试用键值, 可删除
                    code = "KEY_UP";
                    break;
                case 2:
                case 40:
                case 31: //??调试用键值, 可删除
                    code = "KEY_DOWN";
                    break;
                case 37:
                case 29: //??调试用键值, 可删除
                    code = "KEY_LEFT";
                    break;
                case 3:
                    code = "KEY_LEFT";
                    break;
                case 39:
                case 30: //??璋冭瘯鐢ㄩ敭鍊? 鍙垹闄?
                    code = "KEY_RIGHT";
                    break;
                case 4:
                    code = "KEY_RIGHT";
                    break;
                case 13:
                case 4097:
                    code = "KEY_SELECT";
                    break;
                case 5:
                case 33:
                case 372:
                    code = "PAGE_UP";
                    break;
                case 6:
                case 34:
                case 373:
                    code = "PAGE_DOWN";
                    break;
                case 27:
                    code = "KEY_EXIT";
                    break;
                case 258:
                    code="KEY_STANDBY";
                    args.type = 1;
                    break;
                case 8:
                case 340:
                case 4096:
                    code = "KEY_BACK";
                    break;
                /*case 372:
                    code = "KEY_PAGE_UP";
                    break;
                case 373:
                    code = "KEY_PAGE_DOWN";
                    break;*/
                case 512:
                    code = "KEY_HOMEPAGE";
                    break;
                case 513:
                    code = "KEY_MENU";
                    break;
                case 514:
                    code = "KEY_EPG";
                    break;
                case 515:
                    code = "KEY_HELP";
                    break;
                case 517:
                    code = "KEY_VOD";
                    break;
                case 518:
                    code = "KEY_NVOD";
                    break;
                case 771:
                    code = "KEY_F4";
                    break;
                case 520:
                    code = "KEY_STOCK";
                    break;
                case 769:
                    code = "KEY_F2";
                    break;
                case 770:
                    code = "KEY_F3";
                    break;
                case 768:
                    code = "KEY_F1";
                    break;
                case 515:
                    code = "KEY_HELP";
                    break;
                case 521:
                    code="KEY_MAIL";
                    break;
                case 561://脢脠路篓
                    code = "KEY_IME";
                    break;
                case 562:
                    code = "KEY_BROADCAST";
                    break;
                case 563:
                    code = "KEY_TV";
                    break;
                case 564:
                    code = "KEY_AUDIO";
                    break;
                case 567:
                    code = "KEY_INFO";
                    break;
                case 570:
                    code = "KEY_FAVORITE";
                    break;
                case 595:
                    code="KEY_VOLUME_UP";
                    break;
                case 596:
                    code="KEY_VOLUME_DOWN";
                    break;
                case 593:
                    code = "KEY_CHANNEL_UP";
                    break;
                case 594:
                    code = "KEY_CHANNEL_DOWN";
                    break;
                case 597:
                    code = "KEY_MUTE";
                    args.type = 1;
                    break;
                case 802:
                case 598:
                    code = "KEY_AUDIO_MODE";
                    break;
                case 832:
                    code = "KEY_RED";
                    break;
                case 833:
                    code = "KEY_GREEN";
                    break;
                case 834:
                    code = "KEY_YELLOW";
                    break;
                case 835:
                    code = "KEY_BLUE";
                    break;
                case 269:
                    code = "269";
                    break;
            }
            
        }
        return {code: code, args: args, name: name};
    }
};
document.onkeydown=function (__event) {
    __event=__event||window.event;    
    try
    {            
        g_delayExit.stop();
    }
    catch( E )
    {
        //alert( 'doPageLoad() say:\n\n' + E.message );
    }
    return typeof eventHandler == 'function' ? eventHandler(SiHua_Event.mapping(__event), 1) : true;
};
document.onirkeypress = function (__event) {
    __event=__event||window.event;
    return  eventHandler ? eventHandler(Event.mapping(__event), 1) : true;
};
document.onsystemevent = function (__event) {
    __event=__event||window.event;
    return eventHandler ? eventHandler(Event.mapping(event), 2) : true;
};

function setGlobalVar(sName, sValue){    
    try{
        iPanel.setGlobalVar(sName, sValue);
    }
    catch(e){
        document.cookie = escape(sName) + "=" + escape(sValue);
    }
}

// 读 cookie
function getGlobalVar(sName){
    var result = null;
    try{
        result = iPanel.getGlobalVar(sName);
    }
    catch(e){
        var aCookie = document.cookie.split("; ");
        for (var i = 0; i < aCookie.length; i++) {
            var aCrumb = aCookie[i].split("=");
            if (escape(sName) == aCrumb[0]) {
                result = unescape(aCrumb[1]);        
                break;
            }
        }        
    }
    return result;
}

/**
 * ajax获取数据公共接口
 * 默认同步请求，如果需要异步，请设置第三个参数为true
 */
function ajax(url, callback, async, title){
    title = title || '载入数据中，请稍候';
    //showTips(title, 'showMsg', 0);
    var xmlHttp=new XMLHttpRequest();
    xmlHttp.onreadystatechange = function(){
        if (xmlHttp.readyState == 4) {
            //closeTips();
            if (xmlHttp.status == 200) {
                callback(xmlHttp.responseText);
            }else{
                callback(false);
            }
        }
    }
    
    if(!async) async = true;
    else async = false;
    
    xmlHttp.open("GET", '/povertyRelief/index.php'+url, async);
    xmlHttp.send(null);
}

function showMsg( _msg ){
    $('showMsg').style.display = '';
    $('showText').innerHTML = _msg;
}

function closeMsg(){
    $('showMsg').style.display = 'none';
}

function scrollTos( length , _id ){
    i=0;
    var obj = document.getElementById(_id);
    function scrollCount(i){
        setTimeout(function(){
            obj.scrollTop += length / 5 ;
            i++;
            if (i<5) scrollCount(i);
            return i;
        },12);
    }
    
    scrollCount(i);
}

/**
 * 获取STBID公共接口
 */
function getStbid(){
    try{
        return iPanel.System.product.serial;
    }catch(e){
        return false;
    }
}

/**
 * 生成alert类型的对话框
 * alert类型对话框默认3s自动隐藏，如果不想让其隐藏，可第三个参数传入0
 */
function showTips(tips, id, time){
    var id = id || "showMsg";
    
    $(id).innerHTML = '';
    
    var html = '<div style="z-index:500;position:absolute; left:0px;  top:0px; width:1280px;height:720px;background:url(/povertyRelief/web/public/img/msg.png) no-repeat;display:;">';
    html += '<div style="position:absolute; left:370px; top:295px; width:541px; height:186px;font-size:28px;line-height:150%;color:#000000;text-align:left;">'+tips+'</div>';
    html += '</div>';
    
    $(id).style.display = 'none';
    
    $(id).innerHTML = html;
    
    $(id).style.display = 'block';
    if(time !== 0){
        var time = time || 3000;
        setTimeout(function(){
            $(id).style.display = "none";
        }, time);
    }
}

function closeTips(id){
    var id = id || "showMsg";
    
    $(id).style.display = 'none';
}
