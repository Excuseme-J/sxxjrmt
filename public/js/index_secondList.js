var area = 0;
var topPos = 0;
var btnPos = 0;
var menuPos = 0;  //菜单当前位置
var listPos = 0;  //条目当前位置
var top_btnPos = 0;
var btnPos = 1;
var mainArrayNew;
var menuArray;
var listArray;
var menuSize = 4; //条目数
var listSize = 1; //条目数
var stbid = getStbid() || '0000';
var wordSize = 8;
var wordSize1 = 20;
var wordSize_1 = 120;
var wordSize2 = 120;
var posArray = [0,0,0,0,0,0,0,0,0,0,0]; //记录pos位置
var type ;
var node_id = location.href.split("?")[1].split("&")[1].split("=")[1];
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
	["../public/img/btn0_0.png","../public/img/btn0_1.png"], //返回
	["../public/img/btn1_0.png","../public/img/btn1_1.png"] //首页
];
/*function top_btnFocus(__num){
	$("top_btn"+top_btnPos).src = top_btnArray[top_btnPos][0];
	top_btnPos+=__num;

	if(top_btnPos<0)top_btnPos=0;
	else if(top_btnPos>top_btnArray.length-1)top_btnPos = top_btnArray.length-1;
	$("top_btn"+top_btnPos).src = top_btnArray[top_btnPos][1];
}*/

function doSelect(){
	setGlobalVar("TOP2",topPos);/////////////////////////////////////////
	setGlobalVar("MENU2",menuPos);/////////////////////////////////////////
	if(area==1){
		
	}else if(area==2){
			location.href = '../templet/nr.html?contentId='+listArray[listPos]["id"];
	}
	else if(area==3){
		if(btnPos==0)pageUp();
		else if(btnPos==1) pageDown();
	}else if(area==4){
		setGlobalVar("TOP2",null);///
		setGlobalVar("MENU2",0);///////////////////////////////////////////////////////////////////////////////
		if(top_btnPos==0) location.href = BACK_URL;
		else if(top_btnPos==1) location.href = INDEX_URL;
	}
}

function $(id){
	return document.getElementById(id);
}



function getNodeContent(){
	var url = "getNodeContents";
	var token = getSession('sessionToken');  
	var bind_regionid = getSession('bind_regionid');
	console.log(bind_regionid);
	var data = {
		TOKEN:token,
		regionId:bind_regionid,
		nodeCode:node_id,
		conType:"tv",
		flag:"no"
	};
   ajax(url, getNodeContentCb, true, '', 'POST', data);
}

function getNodeContentCb(_ret){
	ret = JSON.parse(_ret);
    mainArrayNew = ret.data.nodelists;
    console.log(ret);
    console.log(mainArrayNew[menuPos]["name"]);
	console.log(mainArrayNew[menuPos]["id"]);
	console.log(mainArrayNew[menuPos]);
	setGlobalVar("nrTitle",mainArrayNew[menuPos]["name"]);
}


function getNodeContentList(pos){
	var url = "getNodeContents";
	var token = getSession('sessionToken');  
	var bind_regionid = getSession('bind_regionid');
	var data = {
		TOKEN:token,
		regionId:bind_regionid,
		nodeCode:mainArrayNew[pos]["id"],
		conType:"tv",
		flag:"no"
	};
   ajax(url, getNodeContentListCb, true, '', 'POST', data);
}

function getNodeContentListCb(_ret){
	ret = JSON.parse(_ret);
	console.log(ret);
    menuArray = ret.data.nodelists;
    type = menuArray[topPos]["display_style"];
    console.log(type);
	console.log(menuArray);
}

function getNodeContentSecList(pos){
	var url = "getNodeContents";
	var token = getSession('sessionToken');  
	var bind_regionid = getSession('bind_regionid');
	var data = {
		TOKEN:token,
		regionId:bind_regionid,
		nodeCode:menuArray[pos]["id"],
		conType:"tv",
		flag:"no"
	};
   ajax(url, getNodeContentSecListCb, true, '', 'POST', data);
}

function getNodeContentSecListCb(_ret){
	ret = JSON.parse(_ret);
	console.log(ret);
	if(ret.data.items.length>0){
		 listArray = ret.data.items;
	}else{
		listArray = [{"title":"暂无内容","icon_path":"/newVillage/webRoot/img/default_title_pic_1.jpg"}];
	}
    type = menuArray[topPos]["display_style"];
   if(listArray && listArray.length>0){
		 if(type==0){
	    	showList();
	    }else{
	    	showList1();
	    }
	}
	
}



function showTop(){
	for(var i=0; i<mainArray.length; i++){
		$("top"+i).innerHTML = mainArray[i].topTitle;	
		$("top"+i).style.background = "";
	}
}

function topFocus(__num){	
	$("top"+topPos).style.background = "";
	$("top"+topPos).style.color = "#F6EEA8";
	topPos+=__num;	
	if(topPos<0)
	topPos=mainArray.length-1;
	else if(topPos>mainArray.length-1)
	topPos=0;
	$("top"+topPos).style.background= "#EBA10E";
	$("top"+topPos).style.color = "#2b1602";
	$("top"+topPos).innerHTML = mainArray[topPos].topTitle;
	showMenu();
	showList();
	getNodeContentList(topPos);
	getNodeContentSecList(menuPos);
}
function leftShow(data){
	console.log(data);
	var text = "";
	for (var i = 0; i < data.length; i++) {
		text += " <div style=\"\" class=\"menuSecond\" id=\"menuSecond"+ i +"\">";
		text += "           <div class=\"itemSecond\" id=\"menu_title"+ i +"\"></div>";
		text += "        </div>";

	}
	$("left1").innerHTML = text;
}
//菜单
function showMenu(){
	var position = (parseInt((menuPos+menuSize)/menuSize)-1)*menuSize; //当前页的第一个	
	for(var i=0; i<menuSize; i++){
		if(position+i<mainArray[topPos].showArr.length){
			$("menuSecond"+i).style.background = "";
			//$("menu_title"+i).style.backgroundImage = "url(../public/img/tm1.png)";
			$("menu_title"+i).innerHTML = mainArray[topPos].showArr[position+i].menuTitle.slice(0,wordSize);	
			//$("menu_img"+i).src = mainArray[topPos].showArr[position+i].img;	
		}else{
			$("menuSecond"+i).style.background = "";
			//$("menu_title"+i).style.backgroundImage = "url()";
			$("menu_title"+i).innerHTML = "";	
			//$("menu_img"+i).src = "../public/img/tm.png";
			
		}
	}
	/*pageNum();*/
}

function menuFocus(__num){

	$("menuSecond"+menuPos%menuSize).style.background = "";
	
	var tempPos = menuPos;
	menuPos+=__num;	
	console.log(mainArrayNew);
	console.log(menuArray);
	var len = menuArray.length;

	if(menuPos<0) menuPos=0;
	else if(menuPos > len-1){
		console.log(menuPos,tempPos)
		menuPos = tempPos;
		console.log(menuPos,tempPos)
		// area = 3;
		// btnFocus(0);
		return;
	}
	//如果翻了页，条目重新输出
	if(parseInt((menuPos+menuSize)/menuSize)!=parseInt((tempPos+menuSize)/menuSize)){
		if(__num<0){
			//console.log("a")
			showMenu();	
		}
		else{

			tempPos = menuPos;
			showMenu();
			menuFocus(menuPos);

		}
	}
	$("menuSecond"+menuPos%menuSize).style.background = "#F6EEA8";
	$("menu_title"+menuPos%menuSize).innerHTML = mainArray[topPos].showArr[menuPos].menuTitle.slice(0,wordSize);
	 type = menuArray[topPos]["display_style"];
	//leftShow( mainArray[topPos]["showArr"]);

	if(type == 0){
		listSize = 6;
		showList();
		$("list0").style.display = "block";
		$("list1").style.display = "none";
	}else{//left_menuPos！=0时，centerList显示的内容
		listSize = 6;
		showList1();
		$("list1").style.display = "block";
		$("list0").style.display = "none";
	}
	getNodeContentSecList(menuPos);
}

//上一页
/*function pageUp(){
	menuPos-=menuSize;

	if(menuPos<0){
		menuPos+=menuSize;	
	}
	posArray[menuPos] = menuPos;
	showMenu();
}

//下一页
function pageDown(){
	menuPos+=menuSize;
	
	if(menuPos>mainArray[topPos].showArr.length-1){
		if(parseInt(menuPos/menuSize)!=parseInt((mainArray[topPos].showArr.length-1+menuSize)/menuSize))menuPos = mainArray[topPos].showArr.length-1;
		else menuPos-=menuSize;
	}
	posArray[menuPos] = menuPos;
	showMenu();
}

//当前页最后一个
function pagelast(){
	menuPos = (parseInt((menuPos+menuSize)/menuSize)-1)*menuSize+menuSize-1;//当前页的第一个	
	if(menuPos>mainArray[topPos].showArr.length-1)menuPos=mainArray[topPos].showArr.length-1;
}*/

//页码
/*function pageNum(){
	//menuPos = posArray[menuPos];//menu变换时menu的（页码）重新输出
	var currPage = parseInt((menuPos+menuSize)/menuSize);//当前第几页
	var allPage = parseInt((mainArray[topPos].showArr.length-1+menuSize)/menuSize);//总共多少页
	$("page").innerHTML = currPage+"/"+allPage; 
}*/

function showList(){
	//listPos = posArray[menuPos];//menu变换时list重新输出
	var position = (parseInt((listPos+listSize)/listSize)-1)*listSize;
	for(i=0; i<listSize; i++){
		if(position + i<listArray.length){
			//$("list_title").innerHTML = mainArray[topPos].showArr[menuPos].menuTitle.slice(0,wordSize1);	
			$("title0_"+i).innerHTML=listArray[i].title.slice(0,wordSize_1);
			$("title0_"+i).style.background = "";
			//$("img").src =  mainArray[topPos].showArr[menuPos].img;	
		}
		else {
			$("title0_"+i).innerHTML = "";
			//$("img").src = "../public/img/tm.png";
		}
	}
}

//条目
function showList1(){
	//listPos = posArray[menuPos];
	var position = (parseInt((listPos+listSize)/listSize)-1)*listSize; //当前页的第一个	
	for(i=0; i<listSize; i++){
		if(position+i<listArray.length){
			$("list1_"+i).style.background = "../public/image/pic_bg.png";
			$("title1_"+i).innerHTML =listArray[position+i].title.slice(0,wordSize2);
			$("img1_"+i).src = listArray[position+i]["icon_path"];
		}
		else {
			$("list1_"+i).style.background = ""
			$("title1_"+i).innerHTML = "";
			$("img1_"+i).src = "../public/img/tm.png";
		}
	}
	/*pageNum();*/
}


/*function listFocus(__num){
	$("list_gm").src = "../public/img/list_yy0.png";
	
	listPos+=__num;
	var len = mainArray[topPos].showArr[menuPos].listArray.length;
	if(listPos<0) listPos=0;
	else if(listPos > len-1){
		return;
	}
	$("list_gm").src = "../public/img/list_yy1.png";
	$("title").innerHTML = mainArray[topPos].topTitle;

	posArray[menuPos] = listPos;
}*/

function listFocus(__num){
	//前:
	var type = mainArray[topPos].showArr[menuPos].type;

	if(type == 0){
		$("title0_"+listPos%listSize).innerHTML = "　◎　"+listArray[listPos].title.slice(0,wordSize_1);
		$("title0_"+listPos%listSize).style.color = "#F6EEA8";
		$("title0_"+listPos%listSize).style.background = "";
	}else{
		$("list1_"+listPos%listSize).style.backgroundImage = "";
		$("title1_"+listPos%listSize).innerHTML = listArray[listPos].title.slice(0,wordSize2);
		$("pic1_"+listPos%listSize).style.background= "";
	}
	
	var tempPos = listPos;
	listPos+=__num;
	var len = listArray.length;
	if(listPos<0) listPos=0;
	else if(listPos > len-1){
		if(type==0){
			listPos = tempPos;
			//area = 2;
			if(len <=listSize){
				btnPos = 0;
				//btnFocus(1);
			}else {
				btnFocus(1);
			}
		}else{
			listPos = tempPos;
			//area = 4;
			if(len <=listSize){
				btnPos1 = 0;
				//btnFocus1(1);
			}
			else {
				//btnFocus1(1);
			}
		}
		return;
	}
	//如果翻了页，条目重新输出
	if(parseInt((listPos+listSize)/listSize)!=parseInt((tempPos+listSize)/listSize)){
		if(__num<0){
			if(type==0){
				showList();
			}else{
				showList1();
			}
		}
		else{
			if(type==0){
				tempPos = listPos;
				showList();
				listFocus(0);
				return;
			}else{
				tempPos = listPos;
				showList1();
				listFocus(0);
				return;
			}
			return;
		}
	}
	
	//聚焦后
	if(type == 0){

		//$("list0_"+listPos%listSize).style.backgroundImage = "";
		$("title0_"+listPos%listSize).style.color = "#F6EEA8";

		$("title0_"+listPos%listSize).style.background = "url(../public/image/listSecondFocus.png)";
		if(listArray[listPos].title.length>wordSize){
				$("title0_"+listPos%listSize).innerHTML = '<marquee direction="left" width="98%" scrollamonut="3" scrolldelay="100"">'+ listArray[listPos].title +'</marquee>';
		}
	}else{

		//$("list1_"+listPos%listSize).style.backgroundImage = "";
		$("pic1_"+listPos%listSize).style.background= "url(../public/image/listPicSecFocus1.png)";
		if(listArray[listPos].title.length>wordSize2){
			$("title1_"+listPos%listSize).innerHTML = '<marquee direction="left" width="99%" scrollamonut="3" scrolldelay="100"">'+ listArray[listPos].title +'</marquee>';
		}
	}
	//posArray[menuPos] = listPos;
}


function init(){
	var t = getGlobalVar("TOP2");
	var c = getGlobalVar("MENU2");
	if(typeof(t)=="undefined" || t==null || t=='null'){
		topPos=0;
		menuPos=0;
	}else{
		area=1;	
		topPos=parseInt(t);
		menuPos=parseInt(c);
	}
	showTop();
	showMenu();
	getNodeContent();
	getNodeContentList(0);
	getNodeContentSecList(0);
	
	if(area==0)	topFocus(0);
	else if(area==1)menuFocus(0);
	else if(area==2)listFocus(0);
	/*pageNum();*/
}
//返回


function eventHandler(e,type){
	type = menuArray[topPos]["display_style"];
	var key_code = e.code;
	//alert(key_code);
	switch(key_code){
		case "KEY_UP":
			if(area==0){
				if(topPos==0){
					area=4;
					//top_btnFocus(0);
					$("top"+topPos).style.background = "";
					$("top"+topPos).style.color = "";
				}else{
					menuPos = posArray[0];
					topFocus(-1);
				}
			}else if(area==1){
				/*area=4;
				top_btnFocus(0);
				$("menu"+menuPos%menuSize).style.backgroundImage = "url(../public/img/top_focus2_2.png)";*/
				if(menuPos==0){
					area = 0 ;
				}else{
					menuFocus(-1);
				}
			}else if(area==2){
				if(type==0){
					if(listPos==0){
						area=1;
						menuFocus(0);
						$("title0_"+listPos%listSize).style.background = "";
					}else{
						listFocus(-1);
					}
				}else if(type==1){
					if(listPos==0 || listPos==1){
						area=0;
						menuFocus(0);
						//$("pic1_"+listPos%listSize).style.background= "";
					}else{
						listFocus(-2);
					}
				}
				/*if(listPos==0){
					if(type==0){
						area=1;
						menuFocus(0);
						$("title0_"+listPos%listSize).style.background = "";
					}else if(type==1){
						area=0;
						menuFocus(0);
						$("pic1_"+listPos%listSize).style.background= "";
					}
				}else{
					if(type==0){
						listFocus(-1);
					}else if(type==1){
						listFocus(-2);
					}
				}*/
			}else if(area==3){
				area = 1;
				pagelast(); //获取当前页最后一个
				menuFocus(0);
				$("btn"+btnPos).src = btnArray[btnPos][0];
			}
			
			return 0;
			break;
		case "KEY_DOWN":
			if(area==0){
				area=1;
				menuFocus(0);
			}else if(area==1){
				if(menuPos == menuArray.length-1){
					menuFocus(0);
				}else{
					menuFocus(1);
				}
			}else if(area==2){
				listFocus(1);
			}else if(area==4){
				area=0;
				topFocus(0);
				$("top_btn"+top_btnPos).src = top_btnArray[top_btnPos][0];
			}
			return 0;
			break;
		case "KEY_LEFT":
			if(area==0){
				menuPos = posArray[0];
				topFocus(-1);
			}
			else if(area==1){
				menuFocus(0);
				
				/*if(menuPos%menuSize==0){
					area = 0;
					topFocus(0);
					$("menu"+menuPos%menuSize).style.backgroundImage = "url(../public/img/top_focus2_2.png)";
				}else{
					menuFocus(-1);
				}*/
			}else if(area==2){
				area=1;
				menuFocus(0);
				if(type==0){
					$("title0_"+listPos%listSize).style.background = "";
				}else if(type==1){
					$("pic1_"+listPos%listSize).style.background= "";
				}
			}
			else if(area==3){
				btnFocus(-1);
			}else if(area==4){
				//top_btnFocus(-1);
			}
			return 0;
			break;
		case "KEY_RIGHT":

			if(area==0){
				//超过4个的情况未考虑
				menuPos = posArray[0];
				topFocus(1);
			}else if(area==1){
				area=2;
				listFocus(0);
			}else if(area==3){
				btnFocus(1);
			}else if(area==4){
				//top_btnFocus(1);
			}
			return 0;
			break;
		case "KEY_SELECT":
			doSelect();
			return 0;
			break;
		case "KEY_BACK":
			setGlobalVar("TOP2",null);///
			setGlobalVar("MENU2",0);///////////////////////////////////////////////////////////////////////////////
			location.href = BACK_URL;
			return 0;
			break;
	}
}