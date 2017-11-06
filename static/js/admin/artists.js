//添加一行;

$(document).ajaxStart(function(){
	$('.progress .inner').show().animate({width:'30%'},0);
//	console.log('start')
})
$(document).ajaxSend(function(){
	$('.progress .inner').animate({width:'60%'});
//	console.log('send')
})
$(document).ajaxSuccess(function(){
	$('.progress .inner').animate({width:'90%'});
//	console.log('success')
})
$(document).ajaxComplete(function(){
//	console.log('complete')
	$('.progress .inner').animate({width:'100%'}).queue(function(){
		$(this).hide().css({width:0}).dequeue();
		
	});
})
$('#add').on('click',add);
function add(){
	$.ajax({
		url:'/QQ-music/index.php/admin/add_art',
		success:function(id){
			var artists_id=id;
			$(`
				<tr style="cursor: pointer;" art_id='${artists_id}'>
				<td>${artists_id}</td>
				<td><input type="text" value="" style="border: 0;background: transparent;" id='artists_name'/></td>
				<td><input type="text" value="" style="border: 0;background: transparent;" id='artists_birth'/></td>
				<td><input type="text" value="" style="border: 0;background: transparent;" id='magnum_id'/></td>
				<td class='parent'>
					<form  enctype="multipart/form-data" method='post'>
						<label for="ab" id='pic'>+</label>
						<input type="file" id="ab" style="display: none;" name='file'/>
					</form>
					<img src="" alt="" width=30 height=30/>
				</td>	
				<td><span class="glyphicon glyphicon-remove" style='color: red;'  id='delete'></td>
				</tr>
			`).appendTo($('#contain'));
		}
	})
};
//删除一行
$('.table').on('click','#delete',del);
function del(){
	var tr=$(this).closest('tr');
	var artists_id=tr.attr('art_id');
	$.ajax({
		url:'/QQ-music/index.php/admin/del_art/id/'+artists_id,
		success:function(){
			tr.delay(1000).queue(function(){
				$(this).remove().dequeue();
			})
		}
	})
}
//更新数据
$('.table').on('change','input:text',update);
function update(){
	var cate = $(this).attr('id');
	var tr = $(this).closest('tr');
	var art_id = tr.attr('art_id');
	var value = $(this).val();
	$.ajax({
		type:"post",
		data:{cate:cate,art_id:art_id,value:value},
		url:"/QQ-music/index.php/admin/update_art"
	})
}
//上传文件

$('.table').on('change','input:file',upload);
function upload(){
	
	var tr = $(this).closest('tr');
	tr.find('img').attr('src','');
	var id = tr.attr('art_id');
	var formData = new FormData($(this).parent().get(0));
	formData.append('art_id',id);
	$.ajax({
		url:'/QQ-music/index.php/admin/upload',
		processData:false,
		contentType:false,
		type:'post',                                                                 
		data:formData,
		success:function(src){
			tr.find('img').attr({src:src});
		}
	})	
}
//通过表单元素上传文件
//表单的method只能用post,表单中有文件需要上传时,form需要添加属性enctype='multipart/form-data'
//input元素使用form提交时必须要写name属性
//php不会把发过来的文件放在$_POST中,而是放在$_FILES里
//$src=$_FILES['wenjian']['temp_name']
//$dist=APP.'static/images/'.$_FILES['wenjian']['name']
//修改文件位置:move_upload_file($src,$dist)
//视图	CREATE VIEW album_list AS $sql
