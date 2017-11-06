$(function(){
	var state={
		now:0,
		next:0,
		dir:null
	}
	var move=function(dir){
		if(state.dir=='left'){
			state.next=state.now+1;
			if(state.next>=3){
				state.next=0;
			}
		}
		if(state.dir=='right'){
			state.next=state.now-1;
			if(state.next<0){
				state.next=2;
			}
		}
		$('.singerbox').removeClass('appear left-in left-out right-in right-out');
		$('.singerbox').eq(state.now).addClass('appear '+dir+'-out');
		$('.singerbox').eq(state.next).addClass('appear '+dir+'-in');
		$('.btnbox .btn .line').eq(state.now).removeClass('opacity');
		$('.btnbox .btn .line').eq(state.next).addClass('opacity');
		state.now=state.next;
		console.log(state.now,state.next);
	}
	$('.button').eq(0).click(function(){
		state.dir='right';
		move(state.dir);
	})
	$('.button').eq(1).click(function(){
		state.dir='left';
		move(state.dir);
	})
	//btn点击跳转
	
	for(var i=0;i<3;i++){
		(function(n){
			$('.btnbox .btn').eq(n).click(function(){
				var j=0;
				var count=Math.abs(n-state.now);
				if(n>state.now){	
					state.dir="left";
				}else if(n<state.now){
					state.dir="right";
				}
				if(count>0){
					var t=setInterval(function(){
						j++;
						if(j>=count){clearInterval(t);}
						move(state.dir);
					},300);
				}	
			})
		})(i)
		
	}
	
	//选项卡
	for(var i=0;i<5;i++){
		(function xuan(n){
			$('.navbox span').eq(n).click(function(){
				$('.navbox span').css({color:'#777'});
				$(this).css({color:'white'});
				$('.singerbox').removeClass('appear left-out left-in right-out right-in');
				$('.singerbox').eq(n).addClass('appear');
			})
		})(i)
	}
	
	//点击跳转页面
	localStorage.id=0;
	$('.singerbox').on('click','.sing',function(){
		localStorage.id=$(this).attr('album_id');
		if(localStorage.state=='open'){
			return false;
		}else{
			window.open('/QQ-music/index.php/index/play');	
		}	
	})

	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
})



//return false阻止默认事件和阻止冒泡事件
//loacalstorage事件是在其它页面修改值时才会触发，但是在本页面不会触发
//字符串连接``之间可以写变量用${}

//切换歌曲个关键 audio.currentTime=0;
