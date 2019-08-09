<?php



$con=mysqli_connect("127.0.0.1","root","","shops");
mysqli_query($con,"set names utf8");
$classname=$_REQUEST["className"];

$page=$_REQUEST["page"]*8;

$sql = "SELECT * FROM `shoplist` WHERE class ='$classname' LIMIT $page,8";
$result= mysqli_query($con,$sql);
$data = mysqli_fetch_all($result,MYSQLI_ASSOC);

echo json_encode($data,true);


?>