// JavaScript Document
var area = 0;
var top_btnPos = 0;
var btnPos = 1;
var btnPos1 = 1;
var menuPos = 0;  //菜单当前位置
var listPos = 0;  //条目当前位置               top_btnFocus
var top_Pos  = 0;
var wordSize = 20;
var wordSize2 = 28;
var listSize = 6;
var posArray = [0,0,0,0,0,0,0,0,0,0,0]; //记录pos位置
var node_id = location.href.split("?")[1].split("&")[1].split("=")[1];
var listArray;
var mainArrayNew;
var type;

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

function getNodeContentCb(ret){
	ret = eval('('+ret+')');
    mainArrayNew = ret.data.nodelists;
    console.log(ret);
    console.log(mainArrayNew);
    console.log(menuPos);
    console.log(mainArrayNew[menuPos]["name"]);
	console.log(mainArrayNew[menuPos]["id"]);
	console.log(mainArrayNew[menuPos]);
	
	if(area==0)	menuFocus(0);
	//else if(area==1)listFocus(0);
	showMenu();
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

function getNodeContentListCb(ret){
	ret = eval('('+ret+')');
	console.log(ret.data.items.length);

	if(ret.data.items.length>0){
		listArray = ret.data.items;
	}else{
		listArray = [{"title":"暂无内容","icon_path":"/newVillage/webRoot/img/default_title_pic_1.jpg"}];
	}
	console.log(listArray);
	
	/*if(listArray && listArray.length>0){
		 if(type==0){
	    	showList();
	    }else{
	    	showList1();
	    }
	}*/
	type = mainArrayNew[menuPos]["display_style"];
	if(type == 0){
		//listSize = mainArray[menuPos].listArray.length;
		showList();
		$("list0").style.display = "block";
		$("list1").style.display = "none";
	}else{//left_menuPos！=0时，centerList显示的内容
		//listSize = mainArray[menuPos].listArray.length;
		showList1();
		$("list1").style.display = "block";
		$("list0").style.display = "none";
	}
   if(area==1)listFocus(0);
}


//上一页、下一页
var btnArray = [
	["../public/../public/img/btn_previous0.png","../public/img/btn_previous1.png"], //上一页
	["../public/img/btn_next0.png","../public/img/btn_next1.png"]
];

function btnFocus(__num){
	$("btn"+btnPos).src = btnArray[btnPos][0];
	btnPos+=__num;

	if(btnPos<0)btnPos=0;
	else if(btnPos>btnArray.length-1)btnPos = btnArray.length-1;
	$("btn"+btnPos).src = btnArray[btnPos][1];
};

function btnFocus1(__num){
	$("btn1_"+btnPos1).src = btnArray[btnPos1][0];
	btnPos1+=__num;

	if(btnPos1<0)btnPos1=0;
	else if(btnPos1>btnArray.length-1)btnPos1 = btnArray.length-1;
	$("btn1_"+btnPos1).src = btnArray[btnPos1][1];
};

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
};

function doSelect(){
	setGlobalVar("MENU1",menuPos);/////////////////////////////////////////
	setGlobalVar("LIST1",listPos);//////////////////////////////////////////////
	if(area==0){
		/*alert(menuPos);*/
	}
	else if(area==1){
		console.log(mainArrayNew);
		console.log(menuPos);
		console.log(listArray);
		console.log(listPos);
		console.log(listArray[listPos]["id"]);
		location.href = '../templet/nr.html?contentId='+listArray[listPos]["id"];
	}
	/*else if(area==2){
		if(btnPos==0)pageUp();
		else if(btnPos==1) pageDown();
	}else if(area==4){
		if(btnPos1==0)pageUp();
		else if(btnPos1==1) pageDown();
	}else if(area==3){
		setGlobalVar("MENU1",null);/////////////////////////////////////////
		setGlobalVar("LIST1",0);//////////////////////////////////////////////
		if(top_btnPos==0) location.href = BACK_URL;
		else if(top_btnPos==1) location.href = INDEX_URL;
	}*/
}

function $(id){
	return document.getElementById(id);
}



//菜单
function showMenu(){
	for(var i=0; i<mainArray.length; i++){
		$("menu"+i).innerHTML = mainArray[i].menuTitle;	;	
		$("menu"+i).style.background = "";
		$("menu"+i).style.color = "#F6EEA8";
	}

}

function menuFocus(__num){
	$("menu"+menuPos).style.background = "";
	$("menu"+menuPos).style.color = "#F6EEA8";
	
	menuPos+=__num;	
	if(menuPos<0||menuPos> mainArray.length-1){
		menuPos=0;
		
	}
	
	$("menu"+menuPos).style.background = "#EBA10E";
	$("menu"+menuPos).style.color = "#000";
	
	type = mainArrayNew[menuPos]["display_style"];
	//alert('type : ' + type)
	if(type == 0){
		listSize = 6;
		showList();
		$("list0").style.display = "block";
		$("list1").style.display = "none";
	}else if(type ==1 ){//left_menuPos！=0时，centerList显示的内容
		listSize = 6;
		showList1();
		$("list1").style.display = "block";
		$("list0").style.display = "none";
	}

	getNodeContentList(menuPos);
	setSession("nrTitle",mainArrayNew[menuPos]["name"]);
	
}

//条目
function showList(){
	//listPos = posArray[menuPos];
	var position = (parseInt((listPos+listSize)/listSize)-1)*listSize; //当前页的第一个	
    console.log(listArray);
	for(i=0; i<listArray.length; i++){
		 //有内容
		if(position+i<listArray.length){

			$("title0_"+i).style.color = "#F6EEA8";
			$("title0_"+i).style.background = "";
			$("title0_"+i).innerHTML = listArray[i].title.slice(0,wordSize);
			$("title0_"+i).innerHTML = "　◎　"+mainArray[menuPos].listArray[position+i].title.slice(0,wordSize);
		}
		else {
			//没有内容
			$("title0_"+i).style.color = "#F6EEA8";
			$("title0_"+i).style.background = " ";
			$("title0_"+i).innerHTML = "　";
		}
	}
	/*pageNum();*/
}
//条目
/*function showList1(){
	var position = (parseInt((listPos+listSize)/listSize)-1)*listSize; //当前页的第一个	
	for(i=0; i<listSize; i++){
		if(position+i<mainArray[menuPos].listArray.length){
			$("list1_"+i).style.background = "../public/image/pic_bg.png";
			$("title1_"+i).innerHTML = mainArray[menuPos].listArray[position+i].title.slice(0,wordSize2);
			$("img1_"+i).src = mainArray[menuPos].listArray[position+i].img;
		}
		else {
			$("list1_"+i).style.background = ""
			$("title1_"+i).innerHTML = "";
			$("img1_"+i).src = "../public/img/tm.png";
		}
	}
}*/

//条目新:
function showList1(){
	var position = (parseInt((listPos+listSize)/listSize)-1)*listSize; //当前页的第一个	
	console.log(listArray);
	for(i=0; i<listSize; i++){
		if(position+i<listArray.length){
			$("list1_"+i).style.background = "../public/image/pic_bg.png";
			$("title1_"+i).innerHTML =listArray[i].title.slice(0,wordSize2);
			if(listArray[i].icon_path){
				$("img1_"+i).src = listArray[i].icon_path;
			}else{
				$("img1_"+i).src = "../public/image/ceshi.jpg";
			}
			$("pic1_"+i).style.background= "";
		}
		else {
			$("list1_"+i).style.background = ""
			$("title1_"+i).innerHTML = "";
			$("img1_"+i).src = "../public/img/tm.png";
			$("pic1_"+i).style.background= "";
		}
	}
}

function listFocus(__num){
	//show
	if(type == 0){
		$("list0_"+listPos%listSize).style.backgroundImage = " ";
		$("title0_"+listPos%listSize).innerHTML = listArray[listPos].title.slice(0,wordSize);
		$("title0_"+listPos%listSize).style.color = "#F6EEA8";
		$("title0_"+listPos%listSize).style.background = "";
	}else if(type == 1){
		$("list1_"+listPos%listSize).style.backgroundImage = "";
		$("title1_"+listPos%listSize).innerHTML = listArray[listPos].title.slice(0,wordSize2);
		if(listArray[listPos].icon_path.length>0){
				$("img1_"+listPos%listSize).src = listArray[listPos].icon_path;
			}else{
				$("img1_"+listPos%listSize).src = "../public/image/ceshi.jpg";
			}
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
			}
			else btnFocus(1);
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
				//area=2;
				//btnFocus(0);
			}else{
				tempPos = listPos;
				//listPos = tempPos;
				showList1();
				listFocus(0);
				return;
				//area=4;
				//btnFocus1(0);
			}
			return;
		}
	}
	
	//focus
	if(type == 0){
		$("list0_"+listPos%listSize).style.backgroundImage = "";
		$("title0_"+listPos%listSize).style.color = "#F6EEA8";
		$("title0_"+listPos%listSize).style.background = "url(../public/image/listFocus.png)";
		if(mainArray[menuPos].listArray[listPos].title.length>wordSize){
				$("title0_"+listPos%listSize).innerHTML = '<marquee direction="left" width="98%" scrollamonut="3" scrolldelay="100"">'+ listArray[listPos].title.slice(0,wordSize) +'</marquee>';
		}
	}else{
		$("pic1_"+listPos%listSize).style.background= "url(../public/image/listPicFocus1.png)";
		if(listArray[listPos].icon_path.length>0){
				$("img1_"+listPos%listSize).src = listArray[listPos].icon_path;
			}else{
				$("img1_"+listPos%listSize).src = "../public/image/ceshi.jpg";
			}
		if(mainArray[menuPos].listArray[listPos].title.length>wordSize2){
			$("title1_"+listPos%listSize).innerHTML = '<marquee direction="left" width="99%" scrollamonut="3" scrolldelay="100"">'+ listArray[listPos].title.slice(0,wordSize) +'</marquee>';
		}
	}
	//posArray[menuPos] = listPos;
}


//上一页
/*function pageUp(){
	listPos-=listSize;

	if(listPos<0){
		listPos+=listSize;	
	}
	posArray[menuPos] = listPos;
	var type = mainArray[menuPos].type;
	if(type == 0){
		showList();
	}else{
		showList1();
	}
}

//下一页
function pageDown(){
	listPos+=listSize;
	
	if(listPos>mainArray[menuPos].listArray.length-1){
		if(parseInt(listPos/listSize)!=parseInt((mainArray[menuPos].listArray.length-1+listSize)/listSize))listPos = mainArray[menuPos].listArray.length-1;
		else listPos-=listSize;
	}
	posArray[menuPos] = listPos;
	var type = mainArray[menuPos].type;
	if(type == 0){
		showList();
	}else{
		showList1();
	}
}*/

//当前页最后一个
/*function pagelast(){
	listPos = (parseInt((listPos+listSize)/listSize)-1)*listSize+listSize-1;//当前页的第一个	
	if(listPos>mainArray[menuPos].listArray.length-1)listPos=mainArray[menuPos].listArray.length-1;
}

//页码
function pageNum(){
	//listPos = posArray[menuPos];
	var type = mainArray[menuPos].type;
	if(type == 0){
		var currPage = parseInt((listPos+listSize)/listSize);//当前第几页
		var allPage = parseInt((mainArray[menuPos].listArray.length-1+listSize)/listSize);//总共多少页
		$("page").innerHTML = currPage+"/"+allPage; 
	}else{
		var currPage = parseInt((listPos+listSize)/listSize);//当前第几页
		var allPage = parseInt((mainArray[menuPos].listArray.length-1+listSize)/listSize);//总共多少页
		$("page1").innerHTML = currPage+"/"+allPage; 
	}
}*/

function init(){
	var c = getGlobalVar("MENU1");
	var l = getGlobalVar("LIST1");
	if(typeof(c)=="undefined" || c==null || c=='null' || c=='NULL'){
		menuPos=0;
		listPos=0;
	}else{
		area=1;	
		menuPos=parseInt(c);
		listPos =parseInt(l);
	}
	getNodeContent();
	getNodeContentList(menuPos);
	console.log(mainArrayNew);
	console.log(menuPos);
	//type = mainArrayNew[menuPos]["display_style"];
	console.log(type);
	/*if(type == 0){
		//listSize = mainArray[menuPos].listArray.length;
		showList();
		$("list0").style.display = "block";
		$("list1").style.display = "none";
	}else{//left_menuPos！=0时，centerList显示的内容
		//listSize = mainArray[menuPos].listArray.length;
		showList1();
		$("list1").style.display = "block";
		$("list0").style.display = "none";
	}*/
	/*pageNum();*/
	//if(area==0)	menuFocus(0);
	//else if(area==1)listFocus(0);

}
//返回


function eventHandler(e,type){
	var key_code = e.code;
	type = mainArrayNew[menuPos].display_style;
	switch(key_code){
		case "KEY_UP":	
			if(area==0){
				if(menuPos == 0){
					menuFocus(0);
				}else{
					listPos = 0;
					menuFocus(-1);
				}
			}else if(area==1){
					if(listPos==0){
						area=0;
						menuFocus(0);
						if(type==0){
							$("title0_"+listPos%listSize).style.background = "";
						}else if(type==1){
							$("pic1_"+listPos%listSize).style.background= "";
						}
					}else{
						if(type==0){
							listFocus(-1);
						}else if(type==1){
							listFocus(-2);
						}
					}
				/*if(type==0){
					if(listPos==0){
						area=0;
						menuFocus(0);
						$("title0_"+listPos%listSize).style.background = "";
					}else{
						listFocus(-1);
					}
				}else if(type==1){
					if(listPos==0 || listPos==1){
						alert(11);
						area=0;
						menuFocus(0);
						$("pic1_"+listPos%listSize).style.background= "";
					}else{
						listFocus(-2);
					}
				}*/
			}
			return 0;
			break;
		case "KEY_DOWN":
			if(area==0){
				area = 1;
				listFocus(0);
			}else if(area==1){
				if(type==0){
					if(listPos==listArray.length-1){
						listFocus(0);
					}else{
						listFocus(1);
					}
				}else if(type==1){
					if(listPos==listArray.length-1||listPos==listArray.length-2){
						listFocus(0);
					}else{
						listFocus(2);
					}
				}
			}
			return 0;
			break;
		case "KEY_LEFT":
		    if(area == 0){
		    	if(menuPos==0){
		    		menuFocus(0);
		    	}else{
		    		menuFocus(-1);
		    	}
		    	
		    }
			if(area==1){
				if(type==0){
					listFocus(0);
				}else if(type==1){
					if(listPos%2==0){
						listFocus(0);
					}else{
						listFocus(-1);
					}
				}
				
				/*var type = mainArray[menuPos].type;
				if(type==0){
					if((listPos%listSize)%2 == 0){
						area = 0;
						menuFocus(0);
						$("list0_"+listPos%listSize).style.backgroundImage = "";
						$("title0_"+listPos%listSize).innerHTML = "　◎　"+mainArray[menuPos].listArray[listPos].title.slice(0,wordSize);
						$("title0_"+listPos%listSize).style.color = "#ffffff";
					}else{
						listFocus(-1);
					}
				}else{
					if(listPos%listSize == 0 || listPos%listSize == 5){
						area = 0;
						menuFocus(0);
						$("list1_"+listPos%listSize).style.backgroundImage = "";
						$("title1_"+listPos%listSize).innerHTML = mainArray[menuPos].listArray[listPos].title.slice(0,wordSize2);
					}else{
						listFocus(-1);
					}
				}*/
			}
			return 0;
			break;
		case "KEY_RIGHT":
			if(area==0){
				if(menuPos==3){
					menuFocus(0);
				}else{
					menuFocus(1);
				}
			}else if(area==1){
				if(type==0){
					listFocus(0);
				}else if(type==1){
					/*alert("右");
					if(listPos%2!=0 || listPos==listArray.length-1){
						listFocus(0);
					}else{
						listFocus(1);
					}*/
					if (parseInt(listPos % 2) == 1 || listPos==listArray.length-1) {
						return;
					} else {
						listFocus(1);
					}
				}
			}
			return 0;
			break;
		case "KEY_SELECT":
			setGlobalVar("MENU1",0);
			setGlobalVar("LIST1",0);
			doSelect();			
			return 0;
			break;
	}
}