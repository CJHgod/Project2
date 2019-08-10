<?php
$con=mysqli_connect("127.0.0.1","root","","shops");
mysqli_query($con,"set names utf8");


$goodsid=$_REQUEST["goodsid"];
$changeNum=$_REQUEST["changeNum"];
// echo $goodsid;

$sql="UPDATE `car` SET `num` = '$changeNum' WHERE `car`.`goodsid` = $goodsid";
$result=mysqli_query($con,$sql);

// echo "修改数据库成功";
?>