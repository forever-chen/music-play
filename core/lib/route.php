<?php
namespace core\lib;
class route 
{
	public $controller;
	public $action;
	//new本类时自动运行的方法,构造函数
	public function __construct()
	{
		$path=$_SERVER['REQUEST_URI'];
		$params=explode('/', $path);
		$this->controller=$params[3];
		if(empty($params[4])){
			
			$this->action='index';
		}else{
			
			$this->action=$params[4];
		}
		if(isset($params[5])&&isset($params[6])){
			//get是全局变量收进去之后在其它地方就都可以用                                                
			$_GET[$params[5]]=$params[6];
		}
	}
}
