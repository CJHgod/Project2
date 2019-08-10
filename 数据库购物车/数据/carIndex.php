<?php

$con=mysqli_connect("127.0.0.1","root","","shops");
mysqli_query($con,"set names utf8");

$sql="SELECT car.*,shoplist.shopname,shoplist.prices,shoplist.img FROM car , shoplist WHERE car.goodsId = shoplist.goodsId";

$result=mysqli_query($con,$sql);
// // print_r($result) ;

$data=mysqli_fetch_all($result,MYSQLI_ASSOC);
echo json_encode($data,true);
?>