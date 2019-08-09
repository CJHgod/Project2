<?php
// mysqli_query($con,"set names 'utf8'");解决乱码语句 放在连接数据库后

$con= mysqli_connect("127.0.0.1","root","","users");
// var_dump($con) ;
mysqli_query($con,"set names 'utf8'");

$username=$_REQUEST["username"];
$password=$_REQUEST["password"];
$phoneNum=$_REQUEST["phoneNum"];

$sql="INSERT INTO `userlist` ( `userName`, `password`, `phoneNum`) VALUES ( '$username', '$password', '$phoneNum')";
// echo $sql;
$result=mysqli_query($con,$sql);

// $sql1 = "SELECT * FROM  userlist WHERE username = '$username'";
// $result1=mysqli_query($con,$sql1);
// echo $result1;


$data = array("status"=>"", "msg"=>"", "data"=>"");
if($result)
{
  $data["status"] = "success";
  $data["msg"] = "恭喜你，注册成功！";
}else{
  $data["status"] = "error";
  $data["msg"] = "抱歉，用户名或者手机号码已经被注册了！";
}
echo json_encode($data,true);

?>