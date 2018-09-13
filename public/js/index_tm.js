// JavaScript Document
var area = 0;
var top_btnPos = 0;
var btnPos = 1;
var btnPos1 = 1;
var menuPos = 0;  //菜单当前位置
var listPos = 0;  //条目当前位置               top_btnFocus
var top_Pos  = 0;
var wordSize = 27;
var wordSize2 = 28;
var listSize = 6;
var posArray = [0,0,0,0,0,0,0,0,0,0,0]; //记录pos位置

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
}
function doSelect(){
	alert(listPos);
	setGlobalVar("MENU1",menuPos);/////////////////////////////////////////
	setGlobalVar("LIST1",listPos);//////////////////////////////////////////////
	if(area==1){
		location.href = mainArray[menuPos].listArray[listPos].url;
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
		$("menu"+i).innerHTML = mainArray[i].menuTitle;	
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
	
	var type = mainArray[menuPos].type;
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
}

//条目
function showList(){
	//listPos = posArray[menuPos];
	var position = (parseInt((listPos+listSize)/listSize)-1)*listSize; //当前页的第一个	

	for(i=0; i<listSize; i++){
		 //有内容
		if(position+i<mainArray[menuPos].listArray.length){

			$("title0_"+i).style.color = "#F6EEA8";
			$("title0_"+i).style.background = "";
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
function showList1(){
	//listPos = posArray[menuPos];
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
	/*pageNum();*/
}

function listFocus(__num){
	var type = mainArray[menuPos].type;
	//show
	if(type == 0){
		$("list0_"+listPos%listSize).style.backgroundImage = " ";
		$("title0_"+listPos%listSize).innerHTML = "　◎　"+mainArray[menuPos].listArray[listPos].title.slice(0,wordSize);
		$("title0_"+listPos%listSize).style.color = "#F6EEA8";
		$("title0_"+listPos%listSize).style.background = "";
	}else{
		$("list1_"+listPos%listSize).style.backgroundImage = "";
		$("title1_"+listPos%listSize).innerHTML = mainArray[menuPos].listArray[listPos].title.slice(0,wordSize2);
		$("pic1_"+listPos%listSize).style.background= "";
	}
	
	
	var tempPos = listPos;
	listPos+=__num;
	var len = mainArray[menuPos].listArray.length;
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
	if(type == "图文"){
		alert(11);
		$("list0_"+listPos%listSize).style.backgroundImage = "";
		$("title0_"+listPos%listSize).style.color = "#F6EEA8";
		$("title0_"+listPos%listSize).style.background = "url(../public/image/listFocus.png)";
		if(mainArray[menuPos].listArray[listPos].title.length>wordSize){
				$("title0_"+listPos%listSize).innerHTML = '<marquee direction="left" width="98%" scrollamonut="3" scrolldelay="100"">'+ mainArray[menuPos].listArray[listPos].title +'</marquee>';
		}
	}else{
		$("pic1_"+listPos%listSize).style.background= "url(../public/image/listPicFocus1.png)";
		if(mainArray[menuPos].listArray[listPos].title.length>wordSize2){
			$("title1_"+listPos%listSize).innerHTML = '<marquee direction="left" width="99%" scrollamonut="3" scrolldelay="100"">'+ mainArray[menuPos].listArray[listPos].title +'</marquee>';
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
	if(typeof(c)=="undefined" || c==null || c=='null'){
		menuPos=0;
		listPos=0;
	}else{
		area=1;	
		menuPos=parseInt(c);
		listPos =parseInt(l);
	}
	showMenu();
	var type = mainArray[menuPos].type;
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
	/*pageNum();*/
	if(area==0)	menuFocus(0);
	else if(area==1)listFocus(0);

}
//返回


function eventHandler(e,type){
	var key_code = e.code;
	var type = mainArray[menuPos].type;
	//alert(key_code);
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
				if(type==0){
					if(listPos==0){
						area=0;
						menuFocus(0);
						$("title0_"+listPos%listSize).style.background = "";
					}else{
						listFocus(-1);
					}
				}else if(type==1){
					if(listPos==0 || listPos==1){
						area=0;
						menuFocus(0);
						$("pic1_"+listPos%listSize).style.background= "";
					}else{
						listFocus(-2);
					}
				}
			}
			return 0;
			break;
		case "KEY_DOWN":
			if(area==0){
				area = 1;
				listFocus(0);
			}else if(area==1){
				if(type==0){
					if(listPos==mainArray[menuPos].listArray.length-1){
						listFocus(0);
					}else{
						listFocus(1);
					}
				}else if(type==1){
					if(listPos==mainArray[menuPos].listArray.length-1||listPos==mainArray[menuPos].listArray.length-2){
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
					if(listPos%2!=0 || listPos==mainArray[menuPos].listArray.length-1){
						listFocus(0);
					}else{
						listFocus(1);
					}
				}
			}
			return 0;
			break;
		case "KEY_SELECT":
			setGlobalVar("MENU1",null);
			setGlobalVar("LIST1",0);
			doSelect();			
			return 0;
			break;
	}
}