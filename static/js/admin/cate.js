//添加一行;
$('#add').on('click',add);
function add(){
	$.ajax({
		url:'/QQ-music/index.php/admin/addmusic',
		success:function(id){
			var cate_id=id;
			$(`<tr style="cursor: pointer;" cateid='${cate_id}'>
				<td>${cate_id}</td>
				<td><input type="text" name="" id="" value="" style='border:0;background: transparent;'/></td>
				<td><span class="glyphicon glyphicon-remove" style='color: red;' id='delete'></td>
			</tr>`).appendTo($('#contain'));
		}
	})
	
};
//删除一行
$('.table').on('click','#delete',del);
function del(){
	var tr=$(this).closest('tr');
	var cate_id=tr.attr('cateid');
	$.ajax({
		url:'/QQ-music/index.php/admin/del/id/'+cate_id,
		success:function(){
			tr.remove();
		}
	})
}
//更新数据
$('.table').on('change','input',update);
function update(){
	var tr=$(this).closest('tr');
	var cate_id=tr.attr('cateid');
	var value=$(this).val();
	console.log(cate_id);
	$.ajax({
		type:"post",
		data:{cate_id:cate_id,value:value},
		url:"/QQ-music/index.php/admin/update"
	});
}
