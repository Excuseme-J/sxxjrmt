var area=0;
var menuPos = 0;
var listPos = 0;
var btnPos = 0;
var top_btnPos = 0;
var zx_btnPos = 0;
var zx_btnSize = 2;

function $(id){
	return document.getElementById(id);
}

var btnArray = [
	["../public/img/btn_previous0.png","../public/img/btn_previous1.png"], //上一页
	["../public/img/btn_next0.png","../public/img/btn_next1.png"]
];
function btnFocus(__num){
	$("btn"+btnPos).src = btnArray[btnPos][0];

	btnPos+=__num;
	if(btnPos<0)btnPos=0;
	else if(btnPos>btnArray.length-1)btnPos = btnArray.length-1;

	$("btn"+btnPos).src = btnArray[btnPos][1];
}

//返回、首页
var top_btnArray = [
	["../public/img/btn0_0.png","../public/img/btn0_1.png"], //返回
	["../public/img/btn1_0.png","../public/img/btn1_1.png"] //首页
];
function top_btnFocus(__num){
	$("top_btn"+top_btnPos).src = top_btnArray[top_btnPos][0];
	top_btnPos+=__num;

	if(top_btnPos<0)top_btnPos=0;
	else if(top_btnPos>top_btnArray.length-1)top_btnPos = top_btnArray.length-1;
	$("top_btn"+top_btnPos).src = top_btnArray[top_btnPos][1];
}

function zx_btnFocus(__num){
	$("zx_btn"+zx_btnPos).style.backgroundImage = "url(../public/img/blackBtn00.png)";

	zx_btnPos+=__num;
	if(zx_btnPos<0)zx_btnPos=0;
	else if(zx_btnPos>zx_btnSize-1)zx_btnPos = zx_btnSize-1;

	$("zx_btn"+zx_btnPos).style.backgroundImage = "url(../public/img/blackBtn1.png)";
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


function init(){
	btnFocus(1);
}

function doSelect(){
	if(area==0){
		if(btnPos==0)scrollTo(-190);
		else if(btnPos==1)scrollTo(190);	
	}else if(area==1){
		if(top_btnPos==0) location.href = BACK_URL;
		else if(top_btnPos==1) location.href = INDEX_URL;
	}else if(area==2){
		if(zx_btnPos==0) location.href = UP_URL;
		else if(zx_btnPos==1) location.href = DOWN_URL;
	}
}

function eventHandler(e,type){
	var key_code = e.code;
	//alert(key_code);
	switch(key_code){
		case "KEY_UP":
			if(area==0){
				area = 1;
				top_btnFocus(0);
				$("btn"+btnPos).src = btnArray[btnPos][0];
			}else if(area==2){
				if(zx_btnPos==0){
					area = 0;
					btnFocus(0);
					$("zx_btn"+zx_btnPos).style.backgroundImage = "url(../public/img/blackBtn00.png)";
				}else{
					zx_btnFocus(-1);
				}
			}
			return 0;
			break;
		case "KEY_DOWN":
			if(area==1){
				area = 0;
				btnFocus(0);
				$("top_btn"+top_btnPos).src = top_btnArray[top_btnPos][0];
			}else if(area==2){
				zx_btnFocus(1);
			}else if(area==0){
				area = 2;
				zx_btnFocus(0);
				$("btn"+btnPos).src = btnArray[btnPos][0];
			}
			return 0;
			break;
		case "KEY_LEFT":
			if(area==0){
				btnFocus(-1);
			}else if(area==1){
				top_btnFocus(-1);
			}
			return 0;
			break;
		case "KEY_RIGHT":
			if(area==0){
				btnFocus(1);
			}else if(area==1){
				top_btnFocus(1);
			}
			return 0;
			break;
		case "KEY_SELECT":
			doSelect();			
			return 0;
			break;
		case "KEY_BACK":
			location.href = BACK_URL;
			return 0;
			break;
	}
}