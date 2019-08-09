<?php
// header("content-type:text/html;charset=utf-8");
// $query = "set names utf8";
// $result = $conn->query($query);
$connect=mysqli_connect("localhost","root","","shoplist");
$json=file_get_contents("./商品数据.json");
$datas=json_decode($json,true);
// print_r($datas);
for($i=0;$i<count($datas);$i++){
  $shopName= $datas[$i]["shop"] ;
  $prices=  $datas[$i]["prices"] ;
  $prices2=  $datas[$i]["prices2"] ;
  $imgs=  $datas[$i]["img"] ;
//   echo $shopName;

// // $sql="INSERT INTO `list1` (`id`,`t1`, `t2`, `img`) VALUES ('$i','11', '22', '33')";
$sql="INSERT INTO `list1` (`id`, `shop`, `prices`, `prices2`, `img`) VALUES ('$i','$shopName', '$prices', '$prices2',  '$imgs')";
echo $sql;
// mysqli_query("SET NAMES 'utf8'");
mysqli_query($connect,$sql);
// mysqli_query("set names utf8", $connect);

};


?>