

<?php

$con= mysqli_connect("127.0.0.1","root","","users");
mysqli_query($con,"set names 'utf8'");

$username=$_REQUEST["username"];

$sql = "SELECT * FROM  userlist WHERE username = '$username'";
$result=mysqli_query($con,$sql);

$rows=mysqli_num_rows($result);

$data = array("status" => "", "msg" => "", "data" => "");

if($rows==0){
    $data["status"] = "error";
    $data["msg"] = "登录失败：该用户不存在";
}else{
    
        $data["status"] = "success";
    $data["msg"] = "用户存在！";
    
}

echo json_encode($data, true);
?>
