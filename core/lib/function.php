<?php
function p($var)
{
//判断变量是否为布尔类型
  if( is_bool($var) ){
    var_dump($var);
  }else if( is_null ($var) ){
    var_dump($var);
  }else{
    echo print_r($var, true);
  }
}


?>