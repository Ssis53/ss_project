$(window).on('load',function () {
   //验证码,注册按钮点击事件
    (function checknum () {
        var verifyCode = new GVerify('v_container');
        $('.submit button').on('click.register',function () {
            var ret = verifyCode.validate(document.getElementById("checknum").value);
            if (ret) {
                //验证通过，发送请求
                var user = $('#username').val();
                var password = $('#password').val();
                $.ajax({
                    type: 'post',
                    url: '../php/register.php',
                    data: {
                        user: user,
                        password: password
                    },
                    success: function (resp) {
                        if (resp.ret) {
                            //注册成功
                            //跳转
                            alert('注册成功,点击确定跳转登录页面。')
                            location.href = "./login.html";
                        } else {
                            //注册失败用户名重复
                            alert(resp.reason);
                            location.reload(false);
                        }

                    },
                    error: function (error) {
                        console.error(error);
                    }
                });
            } else {
                alert('验证码错误');
            }
        })
    })();

    //跳转主页
    ( function jumpIndex () {
        $('.log h1').on('click',function () {
            location.href = '../index.html';
        })
    })();
});