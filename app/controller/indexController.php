<?php
//namespace app\controller;
//use core\uek;
//class index extends uek
//{
//	public function index()
//	{		
//		$pdo=new \PDO(
//			'mysql:host=localhost;dbname=music;charset=utf8',
//			'root',''
//		);
//		$pdo->setAttribute(\PDO::ATTR_DEFAULT_FETCH_MODE,\PDO::FETCH_ASSOC);
//		$con=$pdo->prepare('select * from categories');
//		$con->execute();
//		$rows=$con->fetchAll();
////		print_r(json_encode($rows));
//		$this->assign('lists',$rows);	
//		$con1=$pdo->prepare('select * from artists')	;
//		$rows1=$con1->fetchAll();
//		p($rows1);
//		$this->display (APP.'views/index.html');	
//	}
//	public function play(){
//		$this->display (APP.'views/play.html');	
//	}
//}

namespace app\controller;
use core\uek;
use core\lib\model;
class index extends uek
{
	public function index()
	{	
		$pdo=new model();
		//连接		
		$con=$pdo->prepare('select * from categories');
		//执行sql语句
		$con->execute();
		$rows=$con->fetchAll();
		$this->assign('lists',$rows);
//		print_r(json_encode($rows));
		$sql='select * from artists,album where artists.magnum_id=album_id';
		$con=$pdo->prepare($sql);
		$con->execute();
		$m=$con->fetchAll();
//		$output = array_slice($input, 0, 3);数组截取
		$one=array_slice($m,0,4);
		$two=array_slice($m,4,8);
		$three=array_slice($m,8,12);
		
		$this->assign('lists1',$one);
		$this->assign('lists2',$two);
		$this->assign('lists3',$three);
		$this->display (APP.'views/index.html');	
	}
	public function play(){
		$this->display (APP.'views/play.html');	
	}
	public function getmusic(){
		$album_id=$_GET['id'];
		$pdo=new model();
		$sql="select musics_name,album_name,musics_time,artists_name,music_address,magnum_pic from musics,album,artists where musics.album_id={$album_id} and musics.artists_id=artists.artists_id and musics.album_id=album.album_id";
		$con=$pdo->prepare($sql);
		//$con=$pdo->prepare("select * from musics where musics.album_id=?");
		//$con->bindValue(1,$album_id);
		//执行sql语句
		$con->execute();
		$rows=$con->fetchAll();
		print_r(json_encode($rows));
		//json是一种数据交换格式(把php中的数组转换成为类似js中的数组的字符串)
		//全称是JavaScript object natation
	}
	public function music(){
		$this->display(APP.'views/music.html');
	}
}