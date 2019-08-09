<?php

$con=mysqli_connect("127.0.0.1","root","","shops");
mysqli_query($con,"set names utf8");

$json=file_get_contents("./datas.json");
$data=json_decode($json,true);
// print_r($data);
// echo $data[0]["title"];

for($i=0;$i<count($data);$i++){
    
    $goodsId=$data[$i]["productId"];
    $classname=$data[$i]["type"];
    $shopname=$data[$i]["shopname"];
    $price=$data[$i]["price"];
    $img=$data[$i]["img"];
    $sql="INSERT INTO `shoplist` (`id`, `goodsId`, `class`, `shopname`, `prices`, `num`, `img`) VALUES 
    (NULL, ' $goodsId', '$classname', '$shopname', '$price', '1', '$img')";
mysqli_query($con,$sql);
echo $sql;

}




// var_dump( $con);


// print_r($data);

?>