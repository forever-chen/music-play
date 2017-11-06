$(function(){
	var musics=[
//		{
//			id:1,
//			artists:'周杰伦',
//			during:'3:04',
//			address:'/QQ-music/static/musics/1.mp3',
//			pict:'/QQ-music/static/images/1.jpg'
//		},
//		{
//			id:2,
//			artists:'周杰伦1',
//			during:'4:04',
//			address:'/QQ-music/static/musics/2.mp3',
//			pict:'/QQ-music/static/images/2.jpg'
//		},
//		{
//			id:3,
//			artists:'周杰伦3',
//			during:'5:04',
//			address:'/QQ-music/static/musics/3.mp3',
//			pict:'/QQ-music/static/images/3.jpg'
//		}
	];
	var current;
//页面添加数据
	function render(){
		$('.play-lists').empty();
		$.each(musics,function(i,v){
			$(`<li class=${i===current?'active':''}><span>${i+1}</span><span>${musics[i]['musics_name']}</span><span>${musics[i]['artists_name']}</span><span>${musics[i]['musics_time']}</span><span>${musics[i]['music_address']}</span><span class="delete">删除</span></li>`).appendTo($('.play-lists'));
		})
	};
	
//删除歌曲
	$('.play-lists').on('click','.delete',function(){
		var index=$(this).closest('li').index();
		if(index<=current){
			current-=1;
		}
		musics.splice(index,1);
		render();
		playMusic();
		return false;
	})
//播放函数
	function playMusic(){
		$('audio').attr('src',musics[current]['music_address']);
		audio.play();
		$('.control .button').eq(1).text('暂停');
		render();
		change();
	}
//歌曲点击播放
	$('.play-lists').on('click','li',function(){
		var index=$(this).index();
		current=index;
		render();
		playMusic();
	})
//添加歌曲
	$('.addmusic').on('click','div',function(){
		var id=$(this).html();
		$.ajax({
			url:'/QQ-music/index.php/index/getmusic/id/'+id,
			success:function(data){
				musics=musics.concat(JSON.parse(data));
				render();
			}
		})
	})
//播放暂停按钮
	audio=$('audio').get(0);
	$('.control .button').eq(1).on('click',function(){
		if(audio.paused){
			if(audio.src===location.href){
				current=0;
				playMusic();
			}else{
				audio.play();
			}
			$(this).text('暂停');
		}else{
			audio.pause();
			$(this).text('播放');
		}
	})
//上一首歌
	function pre(){
		if(current==0){
				current=musics.length-1;
			}else{
				current-=1;
		}
			playMusic();
	}	
	$('.control .button').eq(0).on('click',function(){
		pre();	
	})
//下一首歌
	function next(){
		if(current==musics.length-1){
			current=0;
		}else{
			current+=1;
		}
			playMusic();
	}	
	$('.control .button').eq(2).on('click',function(){	
		next();
	})
	
//循环方式
	var i=0; 
	var text=$('.control .button').eq(3);
	var arr=['循环播放','随机播放','单曲播放'];
	text.on('click',function(){
		i=i+1>2?0:i+1;
		text.html(arr[i]);
	})
//静音与正常的切换
	var orivol;
	$('.control .button').eq(4).on('click',function(){
		if(audio.volume>0){
			orivol=audio.volume;
			audio.volume=0;
			$(this).html('静音');
		}else{
			audio.volume=orivol;
			$(this).html('正常');
		}
	})
//播放结束
	audio.onended=function(){
		$('.control .button').eq(1).text('播放');
		if(text.html()==arr[0]){
			next();
		}else if(text.html()==arr[1]){
			rand=Math.random()*musics.length;
			current=Math.floor(rand);
			playMusic();
		}else if(text.html()==arr[2]){
			playMusic();
		}
	}
	
	//////////////////////////////////////////
	//进度条拖动
	var progress=$('.progress');
	var proinner=$('.progress .pro-inner');
	var point=$('.pro-inner .point');
	point.on('click',false);
	audio.ontimeupdate=function(){
		proinner.width(audio.currentTime/audio.duration * 100 +'%');
//当前时间
		var m=Math.floor(audio.currentTime/60);
		var s=Math.floor(audio.currentTime%60);
		m=m<10?'0'+m:m;
		s=s<10?'0'+s:s;
		$('.progress .time .currentTime').text(m+':'+s);
	}
	progress.on('click',function(e){
		audio.currentTime=e.offsetX/$(this).width()*audio.duration;
	})
	point.on('mousedown',function(){
		$(document).on('mousemove',function(e){
			audio.currentTime=(e.clientX-progress.offset().left)/$(progress).width()*audio.duration;
			if(e.clientX-progress.offset().left>=$(progress).width()){
				$(progress).width()=e.clientX-progress.offset().left
			}
		})
	})
	document.onmouseup=function(){
		$(this).off('mousemove');
	};
	////////////////////////////////////////////
//音量控制
	var volpro=$('.volprogress');
	var volin=$('.vol-innner');
	var volpoint=$('.vol-point');
	volpoint.on('click',false);
	volpro.on('click',function(e){
		audio.volume=e.offsetX/$(this).width();
		volin.width(audio.volume*$(this).width());
	})
	volpoint.on('mousedown',function(){
		$(document).on('mousemove',function(e){
			volin.width(e.clientX-volpro.offset().left);
			if(volin.width()>=398){volin.width(398)}
			console.log(volin.width(),volpro.width())
			audio.volume=volin.width()/volpro.width();
		})
	})
	$(document).on('mouseup',function(){
		$(this).off('mousemove');
	})
	////////////////////////////////////
//当前时间和总时间
	audio.oncanplay=function(){
		var m=Math.floor(audio.duration/60);
		var s=Math.floor(audio.duration%60);
		m=m<10?'0'+m:m;
		s=s<10?'0'+s:s;
		$('.progress .time .totleTime').text(m+':'+s);
	}
//监听current变化函数改变展示
	function　change(){
		//播放信息展示
		$('.show .pic img').attr('src',musics[current].magnum_pic);
		$('.show .music').text(musics[current]['artists_name']);
		$('.show .album').text(musics[current]['artists_name']);
	}
	render();
	
})
