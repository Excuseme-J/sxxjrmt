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
function vodPlay(playUrl){	
	media.AV.close();
	if(playUrl){
		if(playUrl.indexOf("rtsp") > -1){
			var type = "VOD";
		}else if(playUrl.indexOf("http") > -1){
			var type = "HTTP";
		}
	}	
	modeChange(playUrl);
	media.AV.open(playUrl,type);
	media.video.setPosition(295,185,502,280);
	media.AV.play(0);
}
var i=0;
function showStatus(){
	i++;
	var statusAv=media.AV.duration+2;
	if(i==statusAv){
		i=0;
		vodPlay("http://10.27.159.200:8080/video/lbfzgg_0.mp4");
		
	}
	setTimeout("showStatus()",1000);
}
//修改VOD mode(播放视频前判断)
function modeChange(rtsp_url){
	if (typeof(rtsp_url)!="undefined"){
		if(rtsp_url.indexOf("isIpqam=")!= -1){
			if( rtsp_url.indexOf("isIpqam=1")!= -1){
				vod_mode = "DVB";
			}else{
				vod_mode = "IP";
			}
		}else{
			if( rtsp_url.indexOf(".ts")!= -1){
				vod_mode = "IP";
			}else{
				vod_mode = "IP";
			}
		}
	}
	if(vod_mode == "DVB"){
		VOD.changeServer("isma_v2","dvb");
	}else{
		var __providerName = hardware.STB.provider;
		if(__providerName.indexOf("摩托") != -1){	//第三方VOD的点播模式切换
			VOD.changeServer("sihua_3rd","ip");
		}else{
			VOD.changeServer("isma_v2","ip");
		}			
	}	
}

