<?php
$con=mysqli_connect("127.0.0.1","root","","shops");
mysqli_query($con,"set names utf8");
$shopNum="SELECT * FROM  car ";
    $result2=mysqli_query($con,$shopNum);
    $snum=mysqli_num_rows($result2);

    echo  json_encode('{"totalRow":'.$snum.'}',true);
?>