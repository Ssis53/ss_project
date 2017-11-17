<?php
    $userName = $_POST['user'];
    $userPass = $_POST['password'];
    header("content-type: text/json");



    //连接数据库
    $server_name = "localhost";
    $dbms_username = "root";
    $dbms_password = "";
    $db_name = "over_watch";

    $conn = new mysqli($server_name, $dbms_username, $dbms_password, $db_name);

    if ($conn->connect_error) {
        //连接错误
        die('数据库连接失败');
    }

    //否则连接成功
    //检测用户名是否存在
    $checkRet = array("ret"=>false,"reason"=>"");
    $sql = "SELECT * FROM `member` WHERE `user`='" . $userName . "'";
    $ret = mysqli_query($conn,$sql);
    if ($ret->num_rows > 0) {
        //说明存在
        $checkRet["reason"] = "用户名已存在";
        echo json_encode($checkRet);
        return;
    }

    //否则说明不存在
    //执行插入操作
    $sql = "INSERT INTO `member`
    (`id`, `user`, `password`)
    VALUES
    (NULL, '$userName', '$userPass')";
    $ret = mysqli_query($conn, $sql);
    if ($ret) {
        //插入成功
        $checkRet["ret"] = true;
    } else {
        $checkRet["reason"] = "插入失败";
    }
    echo json_encode($checkRet);
 ?>
