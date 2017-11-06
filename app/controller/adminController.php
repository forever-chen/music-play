<?php
namespace app\controller;
use core\uek;
use core\lib\model;
class admin extends uek
{
	public function index()
	{
		$pdo=new model();
		$sql='select * from categories';
		$con=$pdo->prepare($sql);
		$con->execute();
		$result=$con->fetchAll();
		$this->assign('cate',$result);
		$this->display(APP.'views/admin/category.html');
	}
	public function addmusic()
	{
		$pdo = new model();
		$sql = 'insert into categories (cate_name) values (" ")';
		$con = $pdo->prepare($sql);
		$con ->execute();
		$id = $pdo -> lastInsertId();
		$result = $con->fetchAll();
		echo $id;
	}
	public function del(){
		$pdo = new model();
		$sql = 'delete from categories where cate_id = ?';
		$con = $pdo->prepare($sql);
		$con -> bindValue(1,$_GET['id']);
		$con -> execute();
		$result = $con->fetchAll();
	}
	public function update(){
		$pdo = new model();
		$sql = 'update categories set cate_name=? where cate_id = ?';
		$con = $pdo->prepare($sql);
		$con -> bindValue(1,$_POST['value']);
		$con -> bindValue(2,$_POST['cate_id']);
		$con -> execute();
		$result = $con->fetchAll();
	}
	//////////////////////////////////歌手
	
	
	public function artists(){
		$pdo=new model();
		$sql='select * from artists order by artists_id asc';
		$con=$pdo->prepare($sql);
		$con->execute();
		$result=$con->fetchAll();
		$this->assign('artists',$result);
		$this->display(APP.'views/admin/artists.html');
	}
	public function add_art(){
		$pdo=new model();
		$sql='insert into artists (artists_name,artists_birth,magnum_id,magnum_pic) values ("","","","")';
		$con=$pdo->prepare($sql);
		$con->execute();
		$id = $pdo -> lastInsertId();
		echo $id;
	}
	public function del_art(){
		$pdo = new model();
		$sql = 'delete from artists where artists_id = ?';
		$con = $pdo->prepare($sql);
		$con -> bindValue(1,$_GET['id']);
		$con -> execute();;
	}
	public function update_art(){
		$pdo = new model();
		$sql = 'update artists set '.$_POST['cate'].' = ? where artists_id = ?';
		//
		$con = $pdo->prepare($sql);
		$con -> bindValue(1,$_POST['value']);
		$con -> bindValue(2,$_POST['art_id']);
		$con -> execute();
	}
//form表单把图片上传到指定位置
	public function upload(){
		$src=$_FILES['file']['tmp_name'];
		$dist=UEK.'/static/images/'.$_FILES['file']['name'];//用绝对路径
		move_uploaded_file($src,$dist);
		$pdo = new model();
		$sql = 'update artists set magnum_pic =?  where artists_id=?';
		$con = $pdo ->prepare($sql);
		$con -> bindValue(1,'/QQ-music/static/images/'.$_FILES['file']['name']);
		$con -> bindValue(2,$_POST['art_id']);
		$con -> execute();
		echo '/QQ-music/static/images/'.$_FILES['file']['name'];
	}
///////////////////////////////////////////////////////////////////////专辑
	public function album(){
		
		$pdo = new model();
		$sql = 'select * from album_list order by album_id asc';
		$con = $pdo ->prepare($sql);
		$con ->execute();
		$result = $con ->fetchAll();
		$this->assign('album',$result);
		
		///////////////
		$sql1 = 'select * from categories';
		$con1 = $pdo ->prepare($sql1);
		$con1 ->execute();
		$r = $con1 ->fetchAll();
		$this->assign('cate',$r);
		$this -> display(APP.'views/admin/album.html');
	}
	public function get_cate()
	{
		$pdo=new model();
		$sql='select * from categories';
		$con=$pdo->prepare($sql);
		$con->execute();
		$result=$con->fetchAll();
		echo json_encode($result);
	}
	public function add_album(){
		$pdo=new model();
		$sql='insert into album (album_name,artists_id,cate_id) values ("","1","1")';
		$con=$pdo->prepare($sql);
		$con->execute();
		$id=$pdo->lastInsertId();
		echo $id;
	}
	public function album_xiala(){
		$pdo=new model();
		$sql='select * from '.$_POST['id'].' where '.$_POST['id'].'_name'.' like ?';
		$con=$pdo->prepare($sql);//注意语句的顺序问题
		$con->bindValue(1,'%'.$_POST['value'].'%');
		$con->execute();
		$result=$con->fetchAll();
		p(json_encode($result));
	}
	public function album_vary(){
		$pdo=new model();
		$sql='update album  set album_name=?, cate_id=?,album_resume=? where album_id=?';
//		$sql='update album inner join artists on album.artists_id=artists.artists_id set album_name=?, artists_name=?, cate_id=?,album_resume=? where album_id=?';
//		$sql = 'update artists set magnum_pic = '.'/QQ-music/static/images/'.$_FILES['file']['name'].' where artists_id=?';
		$con=$pdo->prepare($sql);//注意语句的顺序问题
		$con->bindValue(1,$_POST['album_val']);
		$con->bindValue(2,$_POST['cate_id']);
		$con->bindValue(3,$_POST['text_val']);
		$con->bindValue(4,$_POST['album_id']);
		$con->execute();
	}
	public function album_upload(){
		$src=$_FILES['file']['tmp_name'];
		$dist=UEK.'/static/images/'.$_FILES['file']['name'];//用绝对路径
		move_uploaded_file($src,$dist);
		$pdo = new model();
		$sql = 'update artists set magnum_pic =?  where artists_id=?';
		$con = $pdo ->prepare($sql);
		$con -> bindValue(1,'/QQ-music/static/images/'.$_FILES['file']['name']);
		$con -> bindValue(2,$_POST['img_id']);
		$con -> execute();
		echo '/QQ-music/static/images/'.$_FILES['file']['name'];
	}
	public function del_row(){
		$pdo = new model();
		$sql = 'delete from album where album_id = ?';
		$con = $pdo->prepare($sql);
		$con -> bindValue(1,$_GET['id']);
		$con -> execute();
	}
//专辑内部歌手选择
	public function album_art(){
		$pdo = new model();
		$sql = 'update album set artists_id = ? where album_id=?';
		$con = $pdo->prepare($sql);
		$con -> bindValue(1,$_POST['artists_id']);
		$con -> bindValue(2,$_POST['album_id']);
		$con -> execute();
	}
//上传专辑图片
	
//UPDATE product p 
//LEFT JOIN productPrice pp 
//ON p.productId = pp.productId 
//SET p.deleted = 1 
//WHERE pp.productId IS null 
//通过表单元素上传文件
//表单的method只能用post,表单中有文件需要上传时,form需要添加属性enctype='multipart/form-data'
//input元素使用form提交时必须要写name属性
//php不会把发过来的文件放在$_POST中,而是放在$_FILES里
//$src=$_FILES['wenjian']['temp_name']
//$dist=APP.'static/images/'.$_FILES['wenjian']['name']
//修改文件位置:move_upload_file($src,$dist)
//var forData=new FormData($(this)).parent().get(0))\
//contentType:false;
//processData:false
//data:formData;
//type:post
//formData.append('id',)

}
?>