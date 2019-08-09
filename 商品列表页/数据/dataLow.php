<?php

$con =mysqli_connect("127.0.0.1","root","","shops");
mysqli_query($con,"set names utf8");
$classname=$_REQUEST["className"];

$sql="SELECT * FROM `shoplist` WHERE class='$classname' ORDER BY `shoplist`.`prices` ASC LIMIT 0,8";

$result=mysqli_query($con,$sql);
$data = mysqli_fetch_all($result,MYSQLI_ASSOC);


echo json_encode($data,true);
// echo "222";

?>