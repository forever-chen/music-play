$(function(){
	
	
	localStorage.state='open';
	$(window).on('unload',function(){
		localStorage.state='closed';
	})

	$(window).on('storage',function(e){
		var album_id=e.originalEvent['newValue'];
		$.ajax({
			url:'/QQ-music/index.php/index/getmusic/id/'+album_id,
			success:function(data){
				musics=musics.concat(JSON.parse(data));
//				console.table(musics)
				render();
				update();
			}
		})
	})
	var musics=[];
	function render(){
		$('.middle .left .lists').remove();
		$.each(musics,function(i,k){
			$(`<ul class="lists"><div class="first" address="${k['music_address']}"><div class="kuang"><input type="checkbox" name="" id="" value="" /></div><div class="song"><span><div class="jump"></div><p>${i+1}</p></span><p>${k['musics_name']}</p></div><div class="singer">${k['artists_name']}</div><div class="time">${k['musics_time']}</div><div class="yin"><span></span><span></span><span></span><span></span></div></div></ul>`).appendTo($('.middle .left'));
		})
		var add=$('.lists .first').eq(0).attr('address');
		$('.broadcast').attr('src',add);
	}
	
	
	
	//小方框点击画钩
	function update(){
		$('.first .kuang').click(function(){
			$(this).toggleClass('back');
		})	
		var l=$('.first .kuang').length;
		console.log(l);
		$('.first .kuang').eq(0).click(function(){		
			var att=$('.first .kuang').attr('class');
			$('.left .kuang').toggleClass('back');
		})
	}
	
	//暂停播放按钮
	var audio=$('.broadcast').get(0);
	$('.dibu .high').click(function(){
		if(audio.paused) {
			audio.play();
		} else {
			audio.pause();
		}
	})
	
	//时间轴进行变化
	audio.ontimeupdate=function(){
		var width=audio.currentTime/audio.duration * 100+'%';
		$('.dibu .time .long .nei').width(width);
		console.log(audio.currentTime);
		$('.play .shijian .currentTime').html((audio.currentTime/60).toFixed(2));
	}
		$('.play .shijian .totleTime').html(audio.duration);

	
})	
