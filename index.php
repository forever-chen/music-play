<?php
//整个框架所在根目录
define ('UEK',realpath('./'));
//核心所在目录
define ('CORE',UEK.'/core/');
//APP开发目录
define ('APP',UEK.'/app/');
define ('CSS_PATH','/QQ-music/static/css/');
define ('JS_PATH','/QQ-music/static/js/');
define ('IMG_PATH','/QQ-music/static/images/');
//是否开启调试模式
define ('DEBUG',true);
if (DEBUG){
	ini_set('display_errors','On');
}else{
	ini_set('display_errors','Off'); 
}
//引入公用库
include CORE.'/lib/function.php';
//引入框架核心类
include CORE.'uek.php';
// 如果new一个不存在的类，则调用\core\uek类中的load方法
spl_autoload_register('\core\uek::load');

//启动run方法整个框架
\core\uek::run();

//浏览器在什么情况下会向服务发送一次http请求
//	http://协议   www.baidu.com:发送地方    80:端口    /?dsafas要什么东西通过传数据的方式
//1.在地址栏输入地址回车
//服务器一般会回应一个html的字符串
//浏览器开始解析html文件在解析的过程中如果碰到link的href、script的src、img的src、碰到audio的src碰到iframe的src等会指定地址的html标签
//link href发起的请求会得到一个css格式的字符串，在css中碰到background又会发起一次请求
//script src发起的请求会得到一个js格式的字符串，解析js的时候也可能会再次发起一次http请求，XMLHttpRequest
//////////////////


//2.浏览器地址栏因为a链接或者form的作用更换了地址会发起http请求(进静态阶段)
//css:hover 的时候某个div的背景图片发生变化或者字体发生变化也会发起http请求
//js事件函数中可能有XMLHttpRequest也会发起http请求
//js操作dom会也有可能发起http请求(给dom中添加图片等有地址类的文件)
//GET 利用端口号之后的部分高速服务器客户端需要什么资源
//POST 隐秘发送数据，不能通过url看出究竟发送了什么给服务器

///////////////////////常见的请求
//Apache这个程序	专门处理发送到自己电脑上的http请求
//请求根目录()	下的静态文件(Apache把自己机器上的某个文件夹通过网络分享给了全世界)
//根目录可以更换
//单入口模式

