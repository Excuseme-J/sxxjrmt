var area=0;
var btnPos = 0;
var top_btnPos = 0;

var url = window.location.href;
//上一页、下一页
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
	["../public/img/btn0_2.png","../public/img/btn0_1.png"], //返回
	["../public/img/btn1_2.png","../public/img/btn1_1.png"] //首页
];
function top_btnFocus(__num){
	$("top_btn"+top_btnPos).src = top_btnArray[top_btnPos][0];
	top_btnPos+=__num;

	if(top_btnPos<0)top_btnPos=0;
	else if(top_btnPos>top_btnArray.length-1)top_btnPos = top_btnArray.length-1;
	$("top_btn"+top_btnPos).src = top_btnArray[top_btnPos][1];
}

function $(id){
    return document.getElementById(id);
}

function loopAdEffect(__array,__arrays){
	var object = new Object();
	object.adsPic = __array;
	object.adsText = __arrays;
	object.adsPos = __array.length-1;
	object.change = function(){
		var size = this.adsPic.length;
		$("ad"+this.adsPos).style.color = "#ffffff";
		$("ad"+this.adsPos).style.backgroundColor = "#333333";
		this.adsPos = ((this.adsPos + 1)%size+size)%size;
		$("ad"+this.adsPos).style.color = "#5a1504";
		$("ad"+this.adsPos).style.backgroundColor = "#fff600";
		$("adBox").src = this.adsPic[this.adsPos];
		$("adText").innerText = this.adsText[this.adsPos];
		var self = this;
		window.setTimeout(function(){self.change();}, 2000);
	}
	object.change();
}

function init(){
    btnPos = 1;
    btnFocus(0);
	loopAdEffect(adsPic,adsText);
}

function doSelect(){
	if(area==0){
		if(btnPos==0){
			scrollTo(-180);	
		}else if(btnPos==1){
			scrollTo(180);
		}
	}else if(area==1){
		if(top_btnPos==0) location.href = BACK_URL;
		else if(top_btnPos==1) location.href = INDEX_URL;
	}
}

function scrollTo(length){
	i=0;
	obj = document.getElementById('contents');
	function scrollCount(i){
		setTimeout(function(){
			obj.scrollTop += length / 20 ;
			i++;
			if (i<20)
				scrollCount(i);
			console.log(i+","+length);
			return i;
		},10);
	}
	scrollCount(i);
}

function eventHandler(e,type){
    var key_code = e.code;
    //alert(key_code);
    switch(key_code){
        case "KEY_UP":  
		 	if(area==0){
				area=1;
				top_btnFocus(0);
				$("btn"+btnPos).src = btnArray[btnPos][0];
			}
            return 0;
            break;
        case "KEY_DOWN":
			if(area==1){
				area=0;
				btnFocus(0);
				$("top_btn"+top_btnPos).src = top_btnArray[top_btnPos][0];
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