<?php



$con= mysqli_connect("127.0.0.1","root","","users");
mysqli_query($con,"set names 'utf8'");

$username=$_REQUEST["username"];
$password=$_REQUEST["password"];

$sql = "SELECT * FROM  userlist WHERE username = '$username'";

$result=mysqli_query($con,$sql);

$data = array("status" => "", "msg" => "", "data" => "$username,$password");

$rows=mysqli_num_rows($result);
$arr=mysqli_fetch_array($result);

// print_r($result);
// print_r($arr["password"]);



if($rows==0){
    $data["status"] = "error";
    $data["msg"] = "登录失败：该用户不存在";
}else{
    if($password!=$arr["password"]){
        $data["status"] = "error";
        $data["msg"] = "登录失败：密码不正确！";
    }else{
        $data["status"] = "success";
    $data["msg"] = "恭喜你，登录成功！";
    }
}

echo json_encode($data, true);

?>