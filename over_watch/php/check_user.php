<?php
    //检查用户登录状态是否过期
    $userCookieName = $_COOKIE["userCookie"];
    $userLocalName = $_POST["userLocal"];
    header("content-type: text/json");
    $result = array("ret"=>false);
    if ($userCookieName == $userLocalName) {
        $result["ret"] = true;
        echo json_encode($result);
        return;
    } else {
        echo json_encode($result);
    }
 ?>
