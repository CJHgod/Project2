<?php
$con=mysqli_connect("127.0.0.1","root","","shops");
mysqli_query($con,"set names utf8");

$goodsid=$_REQUEST["goodsid"];

// print_r($goodsid);

// DELETE FROM `car` WHERE `car`.`id` in (12,13,14)
$sql="DELETE FROM `car` WHERE `car`.`goodsid` in $goodsid";
$result=mysqli_query($con,$sql);

// echo "修改数据库成功";
?>