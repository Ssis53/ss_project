$(window).on('load',function () {
    //登录
    (function login () {

        $('.loginButton button').on('click',function () {
            var user = $('.input #username').val();
            var pass = $('.input #password').val();
            //发送Ajax请求
            $.ajax({
                type: 'post',
                url: '../php/login.php',
                data: {
                  user: user,
                  password: pass
                },
                success: function (resp) {
                    if (resp.ret) {
                        //登录成功
                        //设置一个localstorge
                        localStorage.setItem('userLocal',user);
                        alert('登陆成功，将为您跳转到首页');
                        location.href = '../index.html';
                    } else {
                        //登录失败
                        alert(resp.reason);
                        location.reload(false);
                    }
                },
                error: function (error) {
                    console.error(error);
                }
            })
        })
    })();

    //跳转到注册
    (function jumpRegister () {
        $('.registerButton button').on('click',function () {
            location.href = './register.html';
        })
    })();

    //跳转到主页
    (function jumpIndex () {
        $('.log h1').on('click',function () {
            location.href = '../index.html';
        })
    })();
})