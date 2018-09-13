// JavaScript Document
var top_Pos = 0;      //左边位置
var R_pos = null;   //右边位置
var area = 0;       //0 btn  1 tm
var top_btnPos = 0;      //左边位置
var Total = 5;      //栏目数
var wordSize = 19;
var posArray = [0,0,0,0,0,0,0,0,0,0,0]; //记录pos位置
var arr0 = [];
var video_pos = 0;
var section_pos = 0;
var c_url = window.location.href;
var stbid = getStbid() || '0000';
c_url = c_url.split("/");
c_url.reverse();
var curIndex=0; 
//var token;
var index_carousel;
function $(id){
	return document.getElementById(id);
}
var token1;
var token2;
var token3;
var arr = mainArray.node;
var pageArr = [];
var homeArr = [];
var marqueeArr = [];
var sectionData = [];
for (var i = 0; i < arr.length; i++) {//获取TYPE是COLUMN的NODE
	if( arr[i].type == 'column' ){
		pageArr.push( arr[i] );
	}else{
		if( arr[i].type != 'marquee' )
		homeArr.push( arr[i] );
		else
		marqueeArr = arr[i];
	}
};

 sectionData=[
	{
		"name":"茶坊街道",
		"code":1
	},
	{
		"name":"羊泉镇",
		"code":2
	},
	{
		"name":"张村驿镇",
		"code":3
	},
	{
		"name":"张家湾镇",
		"code":4
	},
	{
		"name":"直罗镇",
		"code":5
	},
	{
		"name":"牛武镇",
		"code":6
	},
	{
		"name":"寺仙镇",
		"code":7
	},
	{
		"name":"北道德乡",
		"code":8
	},
	{
		"name":"钳二便民服务中心",
		"code":9
	}
];

//机顶盒登录:
function bossLogin(){
	var url =  "bossLogin";
	/*var data = stbid;*/
	var data = {
		stb_id:stbid,
		temp_name:"sxxjrmt-43"

	}
   ajax(url, bossLoginData, true, '', 'POST', data);
}

function bossLoginData(_ret){
	var ret = JSON.parse(_ret);
	var sessionToken = ret.data.token;
	var bind_regionname = ret.data.bind_regionname;
	var bind_regionid = ret.data.bind_regionid;
	var Interface_userID = ret.data.Interface_userID;
	setSession('sessionToken', sessionToken); 
	setSession('bind_regionname', bind_regionname);
	setSession('bind_regionid', bind_regionid);
}
//所属区域:
function getUserRegionNameById(){
   var url = "getUserRegionNameById";
   var sessionToken = getSession('sessionToken');
   var bind_regionid = getSession('bind_regionid');
   var data = {
   	 regionId:bind_regionid,
   	 TOKEN:sessionToken
   };
   ajax(url, getUserRegionNameCb, true, '', 'POST', data);
}

function getUserRegionNameCb(ret){
	ret = eval('('+ret+')');
	var regionData = ret.data;
	$("cityName").innerHTML = regionData.cityName;
	$("countryName").innerHTML = regionData.countyName;
	$("code0").innerHTML = regionData.countyName;
	$("code1").innerHTML = regionData.townName;
	$("code2").innerHTML = regionData.villageName;

}


//获取首页栏目:
function getIndexNode(){
	var url = "getNode";
	var sessionToken = getSession('sessionToken'); 
	var data = {
		TOKEN:sessionToken
	};
	ajax(url, getNode, true, '', 'POST', data);
}

function getNode(ret){
	console.log(ret);
}

//获取天气:
function getWeather(){
	var url = "getWeather";
	var sessionToken = getSession('tokenMsg');
	var data = {
		TOKEN:sessionToken
	};
	ajax(url, getWeatherCb, true, '', 'POST', data);
}
function getWeatherCb(ret){
	ret = eval('('+ret+')');
	$("weatherType").innerHTML = ret.data.wea_style;
	$("temp").innerHTML = ""+ret.data.min_tem+"-"+ret.data.max_tem;
}
//获取滚动getIndexMarquee:
function getIndexMarquee(){
	var url = "getIndexMarquee";
	var sessionToken = getSession('tokenMsg');
	var bind_regionid = getSession('bind_regionid');
	var data = {
		TOKEN:sessionToken,
		marqueeId:2,
		conType:"tv"
	};
	ajax(url, getIndexMarqueeCb, true, '', 'POST', data);
}

function getIndexMarqueeCb(ret){
	ret = eval('('+ret+')');
	//$("marqueeContent").innerHTML = ret.data.marquee;
}
//获取轮播图:
function lunbo(){
	var url = "getIndexMarquee";
	var sessionToken = getSession('tokenMsg');
	var bind_regionid = getSession('bind_regionid');
	var data = {
		TOKEN:sessionToken,
		focusPicId:122,
		conType:"tv"
	};
	ajax(url, lunboCb, true, '', 'POST', data);
}
function lunboCb(ret){
    ret = eval('('+ret+')');
    console.log(ret);
     index_carousel = ret.data.index_carousel;
    setGlobalVar('index_carousel', index_carousel); 
    console.log(index_carousel);
}



function rightMark(){
	$("regionMark").style.background="url(./public/img/lu.png)";
	$("localtime").innerHTML = "16:24";
};

function doSelect(){
	setGlobalVar("TOP", top_Pos);
	setGlobalVar("R", R_Pos);

	if(area==1){
			var type = pageArr[top_Pos].node[R_Pos].type;
			var dir = pageArr[top_Pos].node[R_Pos].dir;
			var level = pageArr[top_Pos].node[R_Pos].level;
			var node_code = pageArr[top_Pos].node[R_Pos].node_code;
			var page_url = pageArr[top_Pos].node[R_Pos].url;
			if( type == 'column' ) {
				try{
					window.imagelistener.openImage(null,6);
				}catch(e){}
				
				location.href = dir + '/index.html?level='+level+'&nodeId='+node_code;
			} else if (type == 'focusPic') {
				try{
					window.imagelistener.openImage(null,6);
				}catch(e){}
				location.href = dir + '/index.html?level='+level+'&nodeId='+node_code;
			}		
	}else if(area==0){

		if(top_Pos==1 || top_Pos==2){
			$("choiceSection").style.display = "block";
			area = 3;
			showSection();
			sectionFocus(0);
		}
	}else if(area == 2){
		if(video_pos == 0){
			window.imagelistener.openImage(null,2);
		}else if(video_pos == 1){
			window.imagelistener.openImage(null,0);

		}else if(video_pos == 2){
			window.imagelistener.openImage(null,1);

		}
	}else if(area == 4){
		$("choiceSection").style.display = "none";
		area = 0;
	}
/////////////////////////////////////////定位请0//////////////////////////////	
	setGlobalVar("MENU",null);
	setGlobalVar("LIST",0);
}


//上面的一级标题显示
function showtop(){
	for(var i=0; i<pageArr.length; i++){
		var bind_regionname = getGlobalVar("bind_regionname");
		//$("code"+i).innerHTML = pageArr[i].title;
		$("img"+i).src = pageArr[i].icon_blur;
		console.log(pageArr[i].icon_blur);
		$("top"+i).style.backgroundImage = "url()";
	}
	divHid();
}

//右边部分，当前显示，其他隐藏
function divHid(){
	for(i=0;i<pageArr.length;i++){
		$("R"+i).style.visibility = "hidden";
	}
	$("R"+top_Pos).style.visibility = "visible";
}


//上面标题聚焦
function topFocus(__num){
   $("top"+top_Pos).style.border = "";
   $("img"+top_Pos).src = pageArr[top_Pos].icon_blur;
   $("top"+top_Pos).style.color = "#fff";
	top_Pos+=__num;	
	if(top_Pos<0||top_Pos> pageArr.length-1){
		top_Pos=0;
	}
   // $("top"+top_Pos).style.backgroundImage = "url(public/img/top_focus.png)";
	$("top"+top_Pos).style.border = "";
	$("img"+top_Pos).src = pageArr[top_Pos].icon_fcs;
	$("top"+top_Pos).style.color="#F8AD07";
	divHid();
}
//右侧内容的显示
function listFocus(__num){
	//$("R"+top_Pos +"_"+ R_Pos).style.border = "";
	$("div" + top_Pos +"_"  + R_Pos).style.backgroundImage  = "url()";
	/*$("video0").style.backgroundImage = "url()";
	$("video1").style.backgroundImage = "url()";
	$("video2").style.backgroundImage = "url()";*/
	R_Pos +=__num;

	if(R_Pos > pageArr[top_Pos]["node"].length-1 || R_Pos<0)R_Pos = 0;
	/*var width  = $("R"+top_Pos +"_"+ R_Pos).width;
	var height = $("R"+top_Pos +"_"+ R_Pos).height;
	console.log(width);
	console.log(height);
	$("R"+top_Pos +"_"+ R_Pos).style.position = "absolute";
	$("R"+top_Pos +"_"+ R_Pos).style.width = width*1.2+"px";
	$("R"+top_Pos +"_"+ R_Pos).style.height = height*1.2+"px";*/
	
	if(top_Pos==0){
		if(R_Pos==6){
			$("videokuang").style.border = "1px solid #F8AD07";
		}else if(R_Pos==7){
			$("zhibo").style.border = "1px solid #F8AD07";
		}else if(R_Pos==8){
			$("dianbo").style.border = "1px solid #F8AD07";
		}else{
			//$("R"+top_Pos +"_"+ R_Pos).style.backgroundImage = pageArr[top_Pos].node[R_Pos].icon_fcs;//right_focus1.png
			$("div" + top_Pos +"_" + R_Pos).style.backgroundImage = "url(" + pageArr[top_Pos].node[R_Pos].icon_fcs + ")";//right_focus1.png
		}
	}else if(top_Pos==1){
		if(R_Pos==5){
			$("videokuang").style.border = "1px solid #F8AD07";
		}else if(R_Pos==6){
			$("zhibo").style.border = "1px solid #F8AD07";
		}else if(R_Pos==7){
			$("dianbo").style.border = "1px solid #F8AD07";
		}else{
			//$("R"+top_Pos +"_"+ R_Pos).style.border = "1px solid #F8AD07";
			$("div" + top_Pos +"_"  + R_Pos).style.backgroundImage = "url(" + pageArr[top_Pos].node[R_Pos].icon_fcs + ")";
		}
	}else if(top_Pos==2){
		if(R_Pos==3){
			$("videokuang").style.border = "1px solid #F8AD07";
		}else if(R_Pos==4){
			$("zhibo").style.border = "1px solid #F8AD07";
		}else if(R_Pos==5){
			$("dianbo").style.border = "1px solid #F8AD07";
		}else{
			//$("R"+top_Pos +"_"+ R_Pos).style.border = "1px solid #F8AD07";
			$("div" + top_Pos +"_"  + R_Pos).style.backgroundImage = "url(" + pageArr[top_Pos].node[R_Pos].icon_fcs + ")";
		}
	}
}
//初始化
function init(){

	try{
		window.imagelistener.openImage(null,7);
	}catch(e){}
	bossLogin();
	var token1 = getGlobalVar('token1');
   	var token2 = getGlobalVar('token2');
   	var token3 = getGlobalVar('token3');
	getIndexNode();
	getWeather();
	getIndexMarquee();
	getUserRegionNameById();
	lunbo();
	var t = getGlobalVar("TOP");
	var r = getGlobalVar("R");
    var bind_regionname = getGlobalVar("bind_regionname");
    
	if( !t || typeof(t) == "undefined" || t == null || t == 'null'){
		top_Pos=0;
		R_Pos=0;
	}else{
		area=1;
		top_Pos=parseInt(t);
		R_Pos =parseInt(r);
	}
	showtop();
	rightMark();
//	tu();
	if(area==0){
		topFocus(0);
	}else if(area==1){
		listFocus(0);
	}else if(area ==3){
		sectionFocus(0);
	}
	tick();

	//window.imagelistener.openImage(null,7);
	/*try{
		
	}catch(e){}*/
}

function getIndexImgJson(_ret) {
	if (_ret && _ret != '') {
		arr0 = eval('(' + _ret + ')')
	}
}

function getIndexNewsJson(_ret) {
	if (_ret && _ret != '') {
		xwArray = eval('(' + _ret + ')')
	}
}

function videoFocus(_num){
	$("video" + video_pos).style.backgroundImage = "url()";
	video_pos += _num;
	if(video_pos >= 2){video_pos = 2;}
	else if(video_pos <= 0){video_pos = 0;}
	$("video" + video_pos).style.backgroundImage = "url(" + homeArr[video_pos].icon_src+ ")";
}

function showSection(){
	$("contentSection").innerHTML = "";
	$("closeType").src = "public/img/close_nom.png";
	for(var i=0;i<sectionData.length;i++){
		oDiv = document.createElement("div");
		oDiv.setAttribute("id","contentList_"+i);
		oDiv.setAttribute("class","contentList");
		oDiv.setAttribute("codeData",sectionData[i]["code"]);
		oDiv.innerHTML = sectionData[i]["name"];
		$("contentSection").appendChild(oDiv);
	}
}

function sectionFocus(_num){
	$("contentList_" + section_pos).style.background = "url()";
	section_pos += _num;
	if(section_pos >= 8){section_pos = 8;}
	else if(section_pos <= 0){section_pos = 0;}
	$("contentList_" + section_pos).style.backgroundImage = "url(public/img/index_list.png)";
}

function scrollTo(length){
	i=0;
	obj = document.getElementById('contentSection');
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
//处理按键和区域
function eventHandler(e,type){
	var key_code = e.code;
	switch(key_code){
		case "KEY_UP":	
			if(area == 1){
				console.log(R_Pos);
				if(top_Pos==0){
					if(R_Pos==0||R_Pos==1||R_Pos==2){
						area = 0;
						topFocus(0);
						$("div"  + top_Pos +"_" + R_Pos).style.backgroundImage = "url()";
						R_Pos=0;
						leftPos=0;
					}else if(R_Pos==3||R_Pos==4||R_Pos==5){
						listFocus(-3);
					}else if(R_Pos==7){
						listFocus(-1);
					}else if(R_Pos==8){
						listFocus(-2);
					}else {
						listFocus(0);
					}
				}else if(top_Pos==1){
					if(R_Pos==0||R_Pos==1||R_Pos==5){
						area = 0;
						topFocus(0);
						$("div"  + top_Pos +"_" + R_Pos).style.backgroundImage = "url()";
						R_Pos=0;
						leftPos=0;
					}else if(R_Pos==2||R_Pos==7){
						listFocus(-2);
					}else if(R_Pos==3||R_Pos==4){
						listFocus(-3);
					}else if(R_Pos==6){
						listFocus(-1);
					}else{
						listFocus(0);
					}
				}else if(top_Pos==2){
					if(R_Pos==0||R_Pos==1||R_Pos==3){
						area = 0;
						topFocus(0);
						$("div"  + top_Pos +"_" + R_Pos).style.backgroundImage = "url()";
						R_Pos=0;
						leftPos=0;
					}else if(R_Pos==2||R_Pos==5){
						listFocus(-2);
					}else if(R_Pos==4){
						listFocus(-1);
					}
				}
			}else if(area == 2){
				if(video_pos == 2){
					videoFocus(-2);
				}else if(video_pos == 0){
					area=0;
					topFocus(0);
					$("video" + video_pos).style.backgroundImage = "url()";
				}
				else{
					videoFocus(-1);
				}
			}else if(area==0){
				topFocus(0);
				/*area = 3;
				$("top"+top_Pos).style.border = "";*/
			}else if(area ==3){
				if(section_pos==0){
					area = 4;
					$("closeType").src = "public/img/close_foc.png";
					$("contentList_" + section_pos).style.background = "";
				}else{
					$("closeType").src = "public/img/close_nom.png";
					sectionFocus(-1);
					scrollTo(-50);
				}
			}
			return 0;
			break;
		case "KEY_DOWN":
			if(area==0){
				area=1;
				$("top"+top_Pos).style.border = "";
				listFocus(0);
				//$("top"+top_Pos).style.backgroundImage = "url(public/img/top_focus2.png)";
			}else if(area==1){

				if(top_Pos==0){

					if(R_Pos==0||R_Pos==1||R_Pos==2){
						listFocus(3);
					}else if(R_Pos==6){//??目标考核下来
						listFocus(1);
					}else{
						listFocus(0);
					}
				}else if(top_Pos==1){
					if(R_Pos==0){
						listFocus(2);
					}else if(R_Pos==1){//??目标考核下来
						listFocus(3);
					}else if(R_Pos==5){//??目标考核下来
						listFocus(1);
					}
					else{
						listFocus(0);
					}
				}else if(top_Pos==2){
					if(R_Pos==0){
						listFocus(2);
					}else if(R_Pos==3){
						listFocus(1);
					}else{
						listFocus(0);
					}
				}
			}else if(area == 2){
				videoFocus(1);
			}else if(area ==3){
				scrollTo(50);
				sectionFocus(1);
			}else if(area ==4){
				area = 3;
				$("closeType").src = "public/img/close_nom.png";
				sectionFocus(0);
			}
			return 0;
			break;
		case "KEY_LEFT":
			if(area ==0){
				topFocus(-1);
			}else if(area ==1){
				
				if(top_Pos==0){

					if(R_Pos==6||R_Pos==7){
						listFocus(0);
					}else if(R_Pos==0){
						area = 2;
						$("div"  + top_Pos +"_"  + R_Pos).style.backgroundImage = "url()";
						videoFocus(0);
					}else if(R_Pos==3){
						area = 2;
						$("div"  + top_Pos +"_"  + R_Pos).style.backgroundImage = "url()";
						videoFocus(2);

					}else{
						listFocus(-1);
					}
				}else if(top_Pos==1){
					if(R_Pos==0||R_Pos==2){
						area = 2;
						$("div"  + top_Pos +"_"  + R_Pos).style.backgroundImage = "url()";
						videoFocus(0);
					}else if(R_Pos==2){
						listFocus(-1);
					}else if(R_Pos==5||R_Pos==6){
						listFocus(0);
					}else{
						listFocus(-1);
					}
				}else if(top_Pos==2){
					if(R_Pos==3||R_Pos==4){
						listFocus(0);
					}else if(R_Pos==0 || R_Pos==2){
						area = 2;
						$("div"  + top_Pos +"_"  + R_Pos).style.backgroundImage = "url()";
						videoFocus(0);
					}else{
						listFocus(-1);
					}
				}
			}else if(area == 2){
				if(video_pos == 0 || video_pos == 1){
					return;
				}else{
					videoFocus(-1);
				}
				
			}
			return 0;
			break;
		case "KEY_RIGHT":

			if(area==0){
				topFocus(1);
			}else if(area==1){

				if(top_Pos==0){
					console.log(R_Pos)
					if(R_Pos==2||R_Pos==5){
						listFocus(0)
					}else if(R_Pos==6){
						listFocus(-6);
					}else if(R_Pos==8){
						listFocus(-5);
					}else{
						listFocus(1);
					}
				}else if(top_Pos==1){
					if(R_Pos==1||R_Pos==4){
						listFocus(0)
					}else if(R_Pos==5){
						listFocus(-5);
					}else{
						listFocus(1);
					}	
				}else if(top_Pos==2){
					if(R_Pos==1){
						listFocus(0);
					}else if(R_Pos==2){
						listFocus(-1);
					}else if(R_Pos==3 || R_Pos==5){
						listFocus(-3);
					}else{
						listFocus(1);
					}
				}
			}else if(area == 2){
				if(video_pos == 0 || video_pos == 2){
					area = 1;
					$("video" + video_pos).style.backgroundImage = "url()";
					listFocus(0);
				}else{
					
					videoFocus(1);
					
				}
			}
			return 0;
			break;
		case "KEY_SELECT":
			doSelect();
			return 0;
			break;
		case "KEY_BACK":
			try{
				window.imagelistener.openImage(null,5);
			}catch(e){

			}

			
			return 0;
			break;
		case "KEY_EXIT":
			setGlobalVar("TOP",null);/////////////////////////////////////////
			setGlobalVar("R",0);
			return 0;
			break;
	}
}
