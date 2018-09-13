var xmlHttp;
var nums;
function showHint(carhead,carbody,classno){
	//获取xmlHttpObject对象，如果为空，提示浏览器不支持ajax
	xmlHttp=GetXmlHttpObject()
	if (xmlHttp==null){
		alert ("Browser does not support HTTP Request")
		return
	} 
	//获取url
	var url="/ConService/getWeiZhangInfo/carhead/"+carhead+"/carbody/"+carbody+'/classno/'+classno;
	//url=url+"?q="+str
	//url=url+"&sid="+Math.random()
	//回调函数，执行动作
	xmlHttp.onreadystatechange=stateChanged 
	//open
	//nums=xmlHttp.responseText;
	xmlHttp.open("GET",url,true);
	xmlHttp.send(null);
}
function stateChanged() { 
	if (xmlHttp.readyState == 4) { // 判断对象状态  
		if (xmlHttp.status == 200) { // 信息已经成功返回，开始处理信息 

			if(xmlHttp.responseText==1){
				$('showText').innerHTML="无该条件下数据，3秒后自动返回";
				setTimeout("locations()",3000);
			}else{
				contentArr=eval('(' + xmlHttp.responseText + ')');
				if(contentArr['count'] == '0'){
					$('showText').innerHTML="无该条件下数据，3秒后自动返回";
					setTimeout("locations()",3000);
				}else{
					$('showMes').style.display="none";
					$('showContents').style.display="block";
					area=1;
					btnFocus(1);
					showContent(0);
					$("total").innerHTML='违章次数：'+contentArr['count']+' 总扣分：'+contentArr['total_score']+' 总罚款：'+contentArr['total_money'];
				}
			}
		}
	}  
}

//获取xml对象
function GetXmlHttpObject(){
	var xmlHttp=null;
	try{
	// Firefox, Opera 8.0+, Safari
		xmlHttp=new XMLHttpRequest();
	}
	catch (e){
	// Internet Explorer
		try{
			xmlHttp=new ActiveXObject("Msxml2.XMLHTTP");
		}
		catch (e){
		xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
		}
	}
	return xmlHttp;
}// JavaScript Document
function locations(){
	location.href="../index.htm";
}