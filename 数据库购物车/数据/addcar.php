<?php



$con=mysqli_connect("127.0.0.1","root","","shops");
mysqli_query($con,"set names utf8");
$goodsid=$_REQUEST["goodsid"];
$price=$_REQUEST["price"];

$sql="SELECT * FROM `car` WHERE goodsid ='$goodsid'";
$result=mysqli_query($con,$sql);
// $data=mysqli_fetch_all($result);
// echo json_encode($data);

//获得相对应数据后，再插入到购物车的数据库

$row=mysqli_num_rows($result);
// echo $row;

if($row==0){
    $insetSql="INSERT INTO `car` (`id`, `goodsid`, `price`, `num`, `sum`, `isActive`) VALUES (NULL, '$goodsid', '$price', 1, '$price', 1)";
    mysqli_query($con,$insetSql);
}else if($row==1){
    $data = mysqli_fetch_all($result, MYSQLI_ASSOC);
    // echo json_encode($data,true);
    $num = $data[0]["num"] + 1;
    $sum = $data[0]["price"] * $num;
    $updateSql = "UPDATE car SET num='$num', sum='$sum' WHERE goodsid=' $goodsid'";
    mysqli_query($con, $updateSql);

}

$shopNum="SELECT * FROM  car ";
    $result2=mysqli_query($con,$shopNum);
    $snum=mysqli_num_rows($result2);

    echo  json_encode('{"totalRow":'.$snum.'}',true);

?>