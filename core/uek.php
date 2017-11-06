<?php
namespace core;
class uek
{
	
	public static function run()
	{
		include (CORE.'lib/route.php');
		$route = new \core\lib\route();		
		$controller = $route->controller;
    	$action = $route->action;    	
    	include (APP.'controller/'.$controller.'controller.php');  	
		$class_name = '\\app\\controller\\'.$controller;
      	$t = new $class_name;
	//可变函数
      	$t->$action();  	
	}
	//自动加载类
	public static function load($class)
	{
		$path  = UEK . '/' . str_replace('\\', '/', $class) . '.php';
		if(is_file($path)){
			include $path;
		}else{
			throw new \Exception('文件不存在');
		}
	}
	
	public $data=array();
	public function assign($key,$value){
      	$this->data[$key]=$value;  	
    }
    public function display($file){
    	extract ($this->data);
    	include($file);
    }
}
?>