var cate=[];
$.ajax({
	url:'/QQ-music/index.php/admin/get_cate',
	success:function(data){
		cate=JSON.parse(data);
//		console.log(cate);
	}
})
$('#add').on('click',function(){
	$.ajax({
		url:"/QQ-music/index.php/admin/add_album",
		success:function(data){
				var eq=$(
		`
		<div class="media" id='${data}'>
		<a class="media-left" herf='#' style='position: relative;width=100px;'>
			<img src="" alt="" class="img-circle" width=100 height=100 style="margin: auto;"/>
			<label for="plus${data}">
				<div class="change"">
					<span class="glyphicon glyphicon-plus"></span>
				</div>
			</label>
			<form action="" style="display: none;">
				<input type="file" name="file" id="plus${data}" value="" />
			</form>
		</a>
		<div class="media-body row">
			<div class="all"><!-- Button trigger modal -->
				<button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal">
					查看详情
				</button>

				<!-- Modal -->
				<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
					 aria-hidden="true">
					<div class="modal-dialog">
						<div class="modal-content">
							<div class="modal-header">
								<button type="button" class="close" data-dismiss="modal"><span
										aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
								<h4 class="modal-title" id="myModalLabel">Modal title</h4>
							</div>
							<div class="modal-body">
								...
							</div>
							<div class="modal-footer">
								<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
								<button type="button" class="btn btn-primary">Save changes</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="del_row"><button type="button" class="btn btn-danger">删除专辑</button></div>
			<dl class="dl-horizontal col-xs-5 col-md-7">
				<dt>专辑名</dt>
				<dd><input type="text" value="" class="form-control input-sm" id='album'/></dd>
				<dt>歌手</dt>
				<dd><input type="text" value="" class="form-control input-sm" id='artists'/></dd>
				<dt>分类</dt>
				<dd>
					<select name="" class="form-control input-sm">
					</select>
				</dd>
				<dt>简介</dt>
				<dd><textarea name="" cols="" class="form-control" style="display:block;white-space:nowrap; overflow:hidden; text-overflow:ellipsis;resize: none;width: 100%;"></textarea></dd>
			</dl>
		</div>
	</div>	
		`
	).appendTo($('.content'));	
	$.each(cate,function(i,k){
		$(`<option ${a=i==0?'selected':""} value="${k['cate_id']}">${k['cate_name']}</option>`).appendTo(eq.find('select'));
	})
		}
	});

	
})
//专辑名,分类,简介数据更新
//$('.content').on('blur','input:text,select,textarea',function(){
//	var xiala=$(this).next();
//	xiala.empty();
//})
$('.content').on('change','#album,select,textarea',function(){
	var value=$(this).val();
	var that=$(this);
	var xiala=$(this).next();
	xiala.empty();
	$.ajax({
		type:"post",
		data:{
			album_id:$(this).closest('.media').attr('id'),
			album_val:$(this).closest('.media-body').find('.album').val(),
			cate_id:$(this).closest('.media-body').find('select option:selected').val(),
			text_val:$(this).closest('.media-body').find('textarea').val()
		},
		url:"/QQ-music/index.php/admin/album_vary"
	});
})
//歌手信息更改
//下拉框出现
$('.content').on('keyup','#artists',function(){
	var that=$(this);
	var id=$(this).attr('id');
	var xiala=$(this).next();	
	$.ajax({
		type:'post',
		data:{value:that.val(),id:id},
		url:"/QQ-music/index.php/admin/album_xiala",
		success:function(data){
			xiala.empty();
			var data=JSON.parse(data);
//			var name=id+'_name';//因为这里已经加引号,下面${k[name]}就不用加引号;
//			var d=id+'_id'
			$.each(data,function(i,k){
				$(`<li id='${k['artists_id']}'>${k['artists_name']}</li>`).appendTo(xiala);
			})
			
		}
	});
	xiala.on('click','li',function(){
		artists_id=$(this).attr('id');
		that.val($(this).text());
		album_id=$(this).closest('.media').attr('id');
		console.log(artists_id,album_id)
		$.ajax({
			type:'post',
			data:{artists_id:artists_id,album_id:album_id},
			url:"/QQ-music/index.php/admin/album_art",
			success:function(){
				xiala.empty();
			}
		});
	})
})
//上传专辑图片
$('.content').on('change','input:file',album_upload);
function album_upload(){
	var med = $(this).closest('.media');
//	var id = med.attr('id');
	var img_id = med.find('img').attr('id');
	var formData = new FormData($(this).parent().get(0));
	formData.append('img_id',img_id);
	$.ajax({
		url:'/QQ-music/index.php/admin/album_upload',
		processData:false,
		contentType:false,
		type:'post',                                                                 
		data:formData,
		success:function(src){
			med.find('label').addClass('position');
			med.find('img').attr({src:src}).css({display:'block'});
			console.log(src);
		}
	})	
}
//删除专辑
$('.content').on('click','.del_row',del_row);
function del_row(){
	var med=$(this).closest('.media');
	var album_id=med.attr('id');
	$.ajax({
		url:'/QQ-music/index.php/admin/del_row/id/'+album_id,
		success:function(){
			med.remove();
		}
	});
}
