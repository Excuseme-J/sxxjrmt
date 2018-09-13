// JavaScript Document

var curIndex=0; //右侧轮换图片
//时间间隔 单位毫秒
var wordSize_tu = 15; 
var timeInterval=3000; 
setInterval(tu,timeInterval); 
var arrayImg = new Array();

console.log(arrayImg);
/*var arrayImg=[{
	"img":"public/img/news.png"
},{
	"img":"public/img/news.png"
},{
	"img":"public/img/news.png"
}];*/
function lunbo(){
	var url = "getIndexMarquee";
	var token = getSession('sessionToken');
	var bind_regionid = getSession('bind_regionid');
	var data = {
		TOKEN:token,
		focusPicId:122,
		conType:"tv"
	};
	ajax(url, lunboCb, true, '', 'POST', data);
}
function lunboCb(ret){
    ret = eval('('+ret+')');
    console.log(ret);
    arrayImg = ret.data.index_carousel; 
    console.log(arrayImg);
    var curIndex=0; //右侧轮换图片
	//时间间隔 单位毫秒
	var wordSize_tu = 15; 
	var timeInterval=3000; 
	 

}
function tu(){
	console.log(arrayImg);
	document.getElementById("num"+curIndex).style.backgroundImage = "url(public/img/num.png)";//
	var obj=document.getElementById("showpic");
	if (curIndex>=arrayImg.length-1) { 
		curIndex=0; 
	}else{ 
		curIndex+=1; 
	} 
	var pic = arrayImg[curIndex];
	if(pic==""){
		pic = "public/img/news.png";
	}else{
		pic = arrayImg[curIndex];
	}
	obj.src = pic;
	document.getElementById("num"+curIndex).style.backgroundImage = "url(public/img/numFocus.png)";
} 