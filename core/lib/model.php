<?php	
	namespace core\lib;
	
	class model extends \PDO
	{
		public function __construct()
		{
			$database_info = 'mysql:host=localhost;dbname=music;charset=utf8';
    		$username = 'root';
    		$password = '';
			$opation=array(
			//让默认取出的数组中只包含键值
				parent::ATTR_DEFAULT_FETCH_MODE => parent::FETCH_ASSOC
			);
			$db = parent::__construct($database_info,$username,$password,$opation);
			return $db;
		}
	}

//namespace core\lib;
//	
//	class model extends \PDO
//	{
//		public function __construct()
//		{
//			$database_info = 'mysql:host=localhost;dbname=music';
//  		$username = 'root';
//  		$password = '';
//			$opation=array(
//				parent::ATTR_DEFAULT_FETCH_MODE => parent::FETCH_ASSOC
//			);
//			$db = parent::__construct($database_info,$username,$password,$opation);
//			return $db;
//		}
//	}