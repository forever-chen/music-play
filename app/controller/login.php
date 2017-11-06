<?php
namespace app\controller;
use core\uek;
class login extends uek
{
	public function login()
	{
		$this->display (APP.'views/login/cyh_denglu.html');
	}
	public function find()
	{
		$this->display (APP.'views/login/cyh_find.html');
	}
	public function revise()
	{
		$this->display (APP.'views/login/cyh_revise.html');
	}
	public function zhuce()
	{
		$this->display (APP.'views/login/cyh_zhuce.html');
	}
}
?>