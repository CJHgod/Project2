<?php

$connect=mysqli_connect("localhost","root","","shoplist");
$json=file_get_contents("./data2.json");
$datas=json_decode($json,true);
// print_r($datas);
for($i=0;$i<count($datas);$i++){
  
  $t11=  $datas[$i]["t1"] ;
  $t22=  $datas[$i]["t2"] ;
  $imgs=  $datas[$i]["img"] ;

// $sql="INSERT INTO `list1` (`id`,`t1`, `t2`, `img`) VALUES ('$i','11', '22', '33')";
$sql="INSERT INTO `list1` (`id`,`t1`, `t2`, `img`) VALUES ('$i','$t11', '$t22', '$imgs')";
echo $sql;

  mysqli_query($connect,$sql);
};


?>