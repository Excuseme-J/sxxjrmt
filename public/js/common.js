/**
 * ajax获取数据公共接口
 * 默认同步请求，如果需要异步，请设置第三个参数为true
 */
/*function ajax(url, callback, async, title, method, data){
    title = title || '载入数据中，请稍候';
	method = method || 'GET';
	if(data){
		data = httpBuild(data);
	} else {
		data = null;
	}
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
   // var host = '/sxdj/apps/index.php';
    //xmlHttp.open("GET", '/povertyRelief/index.php'+url, async);
    xmlHttp.open(method, host+url, async);
	if(method == 'POST'){
		xmlHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	}
    xmlHttp.send(data);
}*/



function ajax(url, callback, async, title, method, data){
    title = title || '载入数据中，请稍候';
    method = method || 'GET';
    if(data){
        data = httpBuild(data);
    } else {
        data = null;
    }
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
    var host = 'http://192.168.1.99:8020/setup/Interface/';
    //xmlHttp.open("GET", '/povertyRelief/index.php'+url, async);
    xmlHttp.open(method, host+url, async);
    if(method == 'POST'){
        xmlHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    }
    xmlHttp.send(data);
}
 

function httpBuild(params){
	var query = '';
	for(var x in params){
		query += '&'+x+'='+params[x];
	}
	
	return query.slice(1);
}

/**
 * 使用子串替换指定位置的字符串
 *   如果start大于字符串长度则直接返回
 *   如果start和子串长度和大于字符串长度，则只替换到字符串结尾
 * @param str     字符串
 * @param replace 子串
 * @param start   开始替换位置
 * 
 * @return string 替换后的字符串
 */
function replaceStr(str, replace, start, len){
    var strlen = str.length;
    
    if(len == '' || typeof len == 'undefined'){
        len = replace.length;
    }
    
    if(start > strlen){
        return str;
    }
    
    if((start + len) > strlen){
        return str.substring(0, start) + replace.substring(0, strlen - start);
    }
    
    return str.substring(0, start) + replace + str.substring(start + len);
}

/**
 * 根据条件跳转到索引对应的内容页
 *
 * @param data     当前点击焦点的对象数据
 * @param backurl  相对于模板文件夹的当前页面地址
 * 
 * @return void
 */
function goContentPage(data, backurl){
    var htm = '#';
    var type = data.type;
    var js_path = data.js_path;
    
    if(type == '2'){
        //监控
        location.href = data.tv_play_url;
    }else if(type == '7'){
        //TODO 如何播放视频
        location.href = data.tv_play_url;
		
    }else{
    
        switch(type){
            case "1": // 图文
                htm = 'content.htm';
                break;
            case "3": // 相册
                htm = 'album.htm';
                break;
            case "4": // 有图征询
                htm = 'consultPic.htm';
                break;
            case "5": // 无图征询
                htm = 'consult.htm';
                break;
            case "6": // 答题
                htm = 'answer.htm';
                break;
            case "8": // 窗口视频
                htm = 'video2c.htm';
                break;
        }
        
        
        
        if(htm == '#'){
            return;
        }
        
        if(type == 4 ||type == 5 || type == 6){
            location.href = url+'?conId='+data.id+'&backurl='+encodeURIComponent(backurl);
        }else{
            location.href = url+'?jsPath='+encodeURIComponent(js_path)+'&backurl='+encodeURIComponent(backurl);
        }
    }
  
}

function addClick(ret){
	
}

/**
 * 简化版getElementById
 */
function $(_id){
    return document.getElementById(_id);
}

function $$(_class){
	return document.getElementsByClassName(_class)[0] ;
}
/**
 * 获取STBID公共接口
 */
function getStbid(){
    try{        
        if(navigator.userAgent.indexOf('Mozilla/5.0')!=-1){
            return SysInfo.STBSerialNumber;
        }else if(navigator.appVersion.indexOf("EIS iPanel 3.0") != -1){
            return iPanel.System.product.serial;  
        }
    }catch(e){
        return false;
    }
}

/**
 * 生成alert类型的对话框
 * alert类型对话框默认3s自动隐藏，如果不想让其隐藏，可第三个参数传入0
 */
function showTips(tips, id, time){
    var id = id || "showTips";
    
    $(id).innerHTML = '';
    
    var html = '<div style="z-index:500;position:absolute; left:0px;  top:0px; width:1280px;height:720px;background:url(/sxdj/sxdj_latest/public/img/tishi1.png) no-repeat;display:;">';
    html += '<div style="position:absolute; left:370px; top:295px; width:541px; height:186px;font-size:28px;line-height:150%;color:#000000;text-align:left;">'+tips+'</div>';
    html += '</div>';
    
    $(id).style.display = 'none';
    
    $(id).innerHTML = html;
    
    $(id).style.display = 'block';
    if(time !== 0){
        var time = time || 2000;
        setTimeout(function(){
            $(id).style.display = "none";
        }, time);
    }
}

/**
 * 生成confirm类型的对话框
 * 需要注意的事，此处没有加回掉，是因为电视端需要按确定键才能执行相应的动作
 * 因此，在调用该函数时，保证相应页面的doselect有处理相关按键事件
 */
function showConfirm(tips, id){
    var id = id || "showTips";
    
    var html = '<div style="z-index:500;position:absolute; left:0px;  top:0px; width:1280px;height:720px;background:url(/pro_public/img/tishi1.png) no-repeat;display:;">';
    html += '<div style="position:absolute; left:370px; top:225px; width:541px; height:186px;font-size:30px;line-height:186px;color:#000000;text-align:center;">'+tips+'<div style="position: absolute; left: 144px; top: 181px; height: 43px; width: 220px;"><table width="100%" border="0" cellpadding="0" cellspacing="0"><tbody><tr><td width="113" align="left"><img src="/pro_public/img/btn0_0.png" width="101" height="49" id="tipbtn0"></td><td width="113" align="left"><img src="/pro_public/img/btn1_0.png" width="101" height="49" id="tipbtn1"></td></tr></tbody></table></div></div></div>';
    html += '</div>';
    
    $(id).innerHTML = html;
    
    $(id).style.display = 'block';
}

/**
 * 设置全域变量
 */
/*function setGlobalVar(sName, sValue){    
    try{
        iPanel.setGlobalVar(sName, sValue);
    }
    catch(e){
           document.cookie = escape(sName) + "=" + escape(sValue)+";path=/";

    }
}*/

/**
 * 读取全域变量
 */
/*function getGlobalVar(sName){
    var result = '';
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
}*/


/*
 * 设置过期时间:*/
function setCookie(cname, cvalue, exdays) {
		var d = new Date();
		d.setTime(d.getTime() + (exdays * 24 * 60 * 60));
		var expires = "expires=" + d.toUTCString();
		document.cookie = cname + "=" + cvalue + "; " + expires + "; path=/"
}
		
		
function getCookie(cname) {
	    var name = cname + "=";
	    var ca = document.cookie.split(';');
	    for(var i = 0; i < ca.length; i++) {
	        var c = ca[i];
	        while(c.charAt(0) == ' ') c = c.substring(1);
	        if(c.indexOf(name) != -1) return c.substring(name.length, c.length);
	    }
	    return "";
}

function showMsg( _msg ){
    $('showMsg').style.display = '';
    $('showText').innerHTML = _msg;
}

function closeMsg(){
    $('showMsg').style.display = 'none';
} 

/**
 * 删除字符串前后的空格
 */
function trim(s){
    return s.replace(/(^\s*)|(\s*$)/g, "");
}

/**
 * 滚动内容
 * @param step 滚动距离，默认“100”像素
 * @param id 需要滚动的内容id，默认“contents”
 */
function scrollTo(step, id){
    var i=0;
    var step = step || 100;
    var id = id || 'contents';
    obj = document.getElementById(id);
    function scrollCount(i){
        setTimeout(function(){
            obj.scrollTop += step / 20 ;
            i++;
            if (i<20)
                scrollCount(i);
            return i;
        },10);
    }
    scrollCount(i);
}

function createAdNums(len, id){
    var id = id || 'adPos';
    if(typeof len == "undefined" || len == ""){
        len = 3;
    }
    
    var html = '<div class="ad"><img id="showpic" src="" class="pics" /></div>';
    html += '<div class="nums">';
    html += '<table width="100%" border="0" cellspacing="0" cellpadding="0" style="color:#000;text-align:center;">';
    html += '<tr><td height="19" colspan="9"></td></tr>';
    html += '<tr>';
    
    html += '<td width="80" height="10" align="center"></td>';
    for(var x=0;x<len;x++){
        html += '<td id="num'+x+'" height="10" align="center" style="background:url(/pro_public/img/num.png) no-repeat center center"></td>';
        html += '<td width="10" height="10" align="center"></td>';
    }
    html += '<td width="80" height="10" align="center"></td>';
    
    html += '</tr>';
    html += '<tr><td height="19" colspan="9"></td></tr>';
    html += '</table></div>';
    
    $(id).innerHTML = html;
    
    return true;
}


/**
 * 移除数组中type类型为focusPic的元素，并返回新数组
 */
function removeFocusPicAttr(arr){
    for(var x in arr){
        if(arr[x].type == 'focusPic'){
            arr.splice(x, 1);
        }
    }
    
    return arr;
}