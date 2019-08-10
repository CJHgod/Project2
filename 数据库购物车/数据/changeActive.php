<?php
$con=mysqli_connect("127.0.0.1","root","","shops");
mysqli_query($con,"set names utf8");


$goodsid=$_REQUEST["goodsid"];
$active=$_REQUEST["isActive"];
// echo $goodsid;

// $sql="UPDATE `car` SET `isActive` = '$active' WHERE `car`.`goodsid` = $goodsid";
// $result=mysqli_query($con,$sql);


if($active==3){
    $sql="UPDATE `car` SET `isActive` = '1'";
}elseif($active==4){
    $sql="UPDATE `car` SET `isActive` = '0'";
}else{
$sql="UPDATE `car` SET `isActive` = '$active' WHERE `car`.`goodsid` = $goodsid";

}
$result=mysqli_query($con,$sql);

// echo "修改数据库成功";
?>