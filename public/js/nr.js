
var menuPos = 0;  //菜单当前位置
var listPos = 0;  //条目当前位置
var nrPos = 0;  //条目当前位置
var btnPos = 0;
var area=0;

//传值
/*var url = window.location.href;
if(url.indexOf("?") > -1){
	url = url.substr(url.indexOf("?")+1);
	url = url.split("&");
	menuPos = parseInt(url[0]);
	listPos = parseInt(url[1]);
}*/

var contentId = window.location.href.split("?")[1].split("=")[1];

function getNodeContent(){
	var url = "getContentDetails";
	var token = getSession('sessionToken'); 
	var bind_regionid = getSession('bind_regionid'); 
	console.log(bind_regionid);
	var data = {
		TOKEN:token,
		conId:contentId,
		conType:"tv"
	};
   ajax(url, getNodeContentCb, true, '', 'POST', data);
}

function getNodeContentCb(ret){
	ret = eval('('+ret+')');
	var nrTitle = getSession('nrTitle'); 
	console.log(nrTitle);
    var contentDetail = ret.data;
    $("nr_title").innerHTML = nrTitle;
    $("contentTitle").innerHTML = contentDetail["title"];
	$("contentScroll").innerHTML = contentDetail["contents"];
    console.log(ret);
    console.log(menuPos);
}
var btnArray = [
	["../public/img/btn2_0.png","../public/img/btn2_1.png"], //返回
	["../public/img/btn3_0.png","../public/img/btn3_1.png"] //首页
];


/*function showContent(){
	$("nr_title").innerHTML = mainArray[menuPos]["menuTitle"];
	$("contentTitle").innerHTML = mainArray[menuPos]["listArray"][listPos]["title"];
}*/

function nrFocus(__num){
	$("nr").style.backgroundImage = "url()";
	$("nr").style.color = "#000000";
	nrPos+=__num;
	$("nr").style.backgroundImage = "url(../public/img/nr_focus.png)";
}

function scrollTo(length){
	i=0;
	obj = document.getElementById('contents');
	function scrollCount(i){
		setTimeout(function(){
			obj.scrollTop += length / 6 ;
			i++;
			if (i<6)
				scrollCount(i);
			console.log(i+","+length);
			return i;
		},12);
	}
	scrollCount(i);
}

//判断在当前页中btnPos所在的位置
function focusPos(){
	if(INDEX_URL==""&&BACK_URL!=""){ //第一页
		btnPos = 0;
		btnFocus(0);
	}
	else if(BACK_URL!=""&&INDEX_URL!=""){ //中间页
		btnPos = 0;
		btnFocus(0);
	}
	else if(INDEX_URL!=""&&BACK_URL==""){ //最后一页
		btnPos = 0;
		//$("btn1").src = "tm.gif";
		btnFocus(0);
	}
	else if(INDEX_URL==""&&NEXT_URL==""){ //只有一页
		btnPos = 0;
		btnFocus(0);
	}

}

function $(id){
	return document.getElementById(id);
}

/*function btnFocus(__num){
	$("btn"+btnPos).src = btnArray[btnPos][0];

	btnPos+=__num;
	if(btnPos<0)btnPos=0;
	else if(btnPos>btnArray.length-1)btnPos = btnArray.length-1;

	$("btn"+btnPos).src = btnArray[btnPos][1];
}*/

function init(){
	nrFocus();
	/*showContent();*/
	getNodeContent();
}

function doSelect(){
	if(area==1){
		if(btnPos==0){
			location.href = BACK_URL;
		}else if(btnPos==1){
			location.href = INDEX_URL;
		}
	}
}

function eventHandler(e,type){
	var key_code = e.code;
	//alert(key_code);
	switch(key_code){
		case "KEY_UP":
			if(area==0){
				scrollTo(-492);
			}else if(area==1){
				btnFocus(-1);
			}
			return 0;
			break;
		case "KEY_DOWN":
			if(area==0){
				scrollTo(492);
			}else if(area==1){
				btnFocus(1);
			}
			return 0;
			break;
		case "KEY_LEFT":
			if(area==1){
				area=0;
				nrFocus(0);
				$("btn"+btnPos).src = btnArray[btnPos][0];
			}
			return 0;
			break;
		case "KEY_RIGHT":
			if(area==0){
				area=1;
				btnFocus(0);
				$("nr").style.backgroundImage = "url()";
			}
			return 0;
			break;
		case "KEY_SELECT":
			doSelect();			
			return 0;
			break;
	}
}