document.onkeypress = grabEvent;
document.onsystemevent = grabEvent;
document.onirkeypress=grabEvent;
function grabEvent(){
		var key_code = event.which;
		switch(key_code){
			case 5202:
			media.AV.play();
			return 0;
			break;	
		}
	}

//小视频框
function vodPlay(playUrl) {
	media.AV.close();
	/*	if(playUrl){
	 if(playUrl.indexOf("rtsp") > -1){
	 var type = "VOD";
	 }else if(playUrl.indexOf("http") > -1){
	 var type = "HTTP";
	 }
	 }	*/
	modeChange(playUrl);
	media.AV.open(playUrl, type);

//	iPanel.Media.videoControl("repeat",-1);
//	media.AV.open(playUrl,17);
	media.video.setPosition(78, 213, 383, 259);
//	media.AV.play(0);
}
var i = 0;
function showStatus() {
	i++;
	/*var statusAv=media.AV.duration+2;
	 if(i==statusAv){
	 i=0;
	 vodPlay("http://192.168.38.21:8080/movies/sanXinYaLongWan2.mp4");
	 }*/
	//document.getElementById("shows").innerHTML=i;
	setTimeout("showStatus()", 1000);
}