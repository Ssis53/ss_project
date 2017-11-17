<?php
    //获取到本地存储的用户信息
    $userCookieName = $_COOKIE["userCookie"];
    $userLocalName = $_POST["userLocal"];
    $heroId = $_POST["heroId"];
    if ( !($userCookieName == $userLocalName)) {
        die("登录信息有误");
    }

    //登录信息有效
    //连接数据库，将用户的购物信息插入购物车表

    $server_name = "localhost";
    $dbms_username = "root";
    $dbms_password = "";
    $db_name = "over_watch";
    header("content-type: text/json");

    $conn = new mysqli($server_name, $dbms_username, $dbms_password, $db_name);

    if($conn->connect_error) {
        die("数据库连接失败");
    }

    $result = array("ret"=>false,"reason"=>"");

    //查找此用户的id
    $sql = "SELECT `id` FROM `member` WHERE `user`='" . $userCookieName . "'";
    $checkId = mysqli_query($conn, $sql);
    if ($checkId->num_rows > 0) {
        //成功
        //取出用户的id
        $row = $checkId->fetch_assoc();
        $userId = $row["id"];

    }

    //查找该用户的购物车表，取出该用户的所有英雄，看有没有重复添加的
    $sql = "SELECT `heroid`, `id` FROM `cart` WHERE `userid`='" . $userId . "'";
    $checkHero = mysqli_query($conn, $sql);
    if($checkHero->num_rows > 0) {
        //表明用户此时有商品，遍历所有商品找与这次传来的heroId重复的
        while ( $rHI = $checkHero->fetch_assoc()) {
            if ($rHI['heroid'] == $heroId) {
                //如果有重复的，就改变购物车中这个用户的这个英雄的count而不是重新插入
                $thisId = $rHI['id'];
                //找到这个购物车商品的count
                $sql = "SELECT `count` FROM `cart` WHERE `id`='" . $thisId . "'";
                $getCount = mysqli_query($conn, $sql);
                $rC = $getCount->fetch_assoc();
                $theCount = $rC['count'];
                $theCount = ((int)$theCount) + 1;
                //将新的count属性修改回去
                $sql = "UPDATE `cart` SET `count`='" . $theCount . "' WHERE `cart`.`id`='" . $thisId . "'";
                $set = mysqli_query($conn, $sql);
                if ($set) {
                    //修改成功
                    $result["ret"] = true;
                    echo json_encode($result);
                    return;
                } else {
                    //修改失败
                    $result["reason"] = "修改失败";
                    echo json_encode($result);
                    return;
                }


            }
        }
    }

    //否则直接插入英雄到购物车列表
    $sql = "INSERT INTO `cart`
            (`id`, `userid`, `heroid`, `count`)
            VALUES
            (NULL, '$userId', '$heroId', '1')";

    $insert = mysqli_query($conn, $sql);
    //查看结果
    if ($insert) {
        //插入成功
        $result["ret"] = true;
        echo json_encode($result);
        return;
    }
    //否则插入失败
    $result["reason"] = "插入失败";
    echo json_encode($result);








 ?>
