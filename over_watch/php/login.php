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
        //连接数据库失败
        die("连接数据库失败");
    }

    //否则成功了
    $checkLogin = array("ret"=>false,"reason"=>"");
    $sql = "SELECT `user` , `password` FROM `member`";
    $result = mysqli_query($conn, $sql);

    if( $result->num_rows > 0) {
        while ($ret = $result->fetch_assoc()) {
            if ( $ret['user'] == $userName ) {
                if( $ret['password'] == $userPass) {
                    $checkLogin["ret"] = true;
                    $checkLogin["reason"] = "登陆成功";
                    setcookie("userCookie","$userName",time()+3600*72);
                    echo json_encode($checkLogin);
                    return;
                }
            }
        }
    }
    $checkLogin["reason"] = "密码错误";
    echo json_encode($checkLogin);
 ?>
