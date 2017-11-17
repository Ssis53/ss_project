$(window).on('load', () => {

    //加载时判断session来更新登录注册按钮的变化
    (function state () {
        var nowUser = localStorage.getItem('user')
        var xhr = new XMLHttpRequest();
        var $login = $('#regi-in button:first-child');
        var $regist = $('#regi-in button:last-child');
        xhr.onreadystatechange = function () {
            if (xhr.readyState !== 4) {
                return;
            }
            if (xhr.status >= 200 && xhr.status <= 300) {
                if (JSON.parse(xhr.responseText).ret) {
                    $login.prop('data-toggle','');
                    $login.attr('data-toggle','');
                    $regist.prop('data-toggle','');
                    $regist.attr('data-toggle','');
                    $login.html(`你好，${nowUser}`).css({
                        border: 'none'
                    });
                    $regist.html('注销').css({
                        border: 'none'
                    });
                    $regist.on('click.logout', function() {
                        localStorage.removeItem('user');
                        alert('您已成功注销');
                        location.href = '/';
                    })
                } else {
                    $login.prop('data-toggle','modal');
                    $login.attr('data-toggle','modal');
                    $regist.prop('data-toggle','modal');
                    $regist.attr('data-toggle','modal');
                    $login.html(`登录`).css({
                        border: '1px solid #ccc'
                    });
                    $regist.html('注册').css({
                        border: '1px solid #ccc'
                    });
                    $regist.off('click.logout');
                }
            } else {
                console.log('ajax发送失败');
            }
        }
        xhr.open('post', '/users/checkStates', false);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(`user=${nowUser}`);
    })();

    //手动跳转管理界面时判断登录状态
    (function toManage () {
        $toJump = $('.toManage');
        //判断登录状态
        $toJump.on('click', function(){
            var nowUser = localStorage.getItem('user')
            var xhr = new XMLHttpRequest();
            // var $login = $('#regi-in button:first-child');
            // var $regist = $('#regi-in button:last-child');
            xhr.onreadystatechange = function () {
                if (xhr.readyState !== 4) {
                    return;
                }
                if (xhr.status >= 200 && xhr.status <= 300) {
                    if (JSON.parse(xhr.responseText).ret) {
                        // $login.prop('data-toggle','');
                        // $login.attr('data-toggle','');
                        // $regist.prop('data-toggle','');
                        // $regist.attr('data-toggle','');
                        // $login.html(`你好，${nowUser}`).css({
                        //     border: 'none'
                        // });
                        // $regist.html('注销').css({
                        //     border: 'none'
                        // });
                        // $regist.on('click.logout', function() {
                        //     localStorage.removeItem('user');
                        //     alert('您已成功注销');
                        //     location.reload(false);
                        location.href = '/manage';

                    } else {
                        // $login.prop('data-toggle','modal');
                        // $login.attr('data-toggle','modal');
                        // $regist.prop('data-toggle','modal');
                        // $regist.attr('data-toggle','modal');
                        // $login.html(`登录`).css({
                        //     border: '1px solid #ccc'
                        // });
                        // $regist.html('注册').css({
                        //     border: '1px solid #ccc'
                        // });
                        // $regist.off('click.logout');
                        alert('您还未登录，请先登录');
                        $('#myLoginModal').modal('toggle');

                    }
                } else {
                    console.log('ajax发送失败');
                }
            }
            xhr.open('post', '/users/checkStates', false);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.send(`user=${nowUser}`);
        });
    })();

    //注册函数
    (function regist () {
        var $user = $('#username input');
        var $pass = $('#userpass input');
        var $confirmPass = $('#confirmpass input');
        var $email = $('#email input');
        var $allInput = $('#myRegisterModal .content input');
        //检测两次密码是否一致的函数
        function checkPass () {
            if ($pass.val() !== $confirmPass.val()) {
                $('.content span').removeClass('hideSpan');
                $('#register').prop('disabled', true);
                return;
            }
            $('.content span').addClass('hideSpan');
            $('#register').prop('disabled', false);
        }

        //检测字段并且负责发送ajax的核心函数
        function carry () {
            //注册按钮的功能

            //定义一个开关量判断是否所有都不为空
            var allNotEmpty = true;

            //如果点击提交按钮后
            //判断四个输入框是不是为空,
            //为空则触发对应的isEmpty事件
            for (var i = 0; i < $allInput.length; i++ ) {
                if($allInput.eq(i).val() === '') {
                    $allInput.eq(i).trigger('isEmpty', $allInput.eq(i));
                    allNotEmpty = false;
                    continue;
                } else {
                    $allInput.eq(i).trigger('isNotEmpty', $allInput.eq(i));
                }
            }

            if (!allNotEmpty) {
                return;
            }
            //todo:
            //是时候来一波ajax了
            $.ajax({
                type: 'post',
                url: '/users/register',
                datatype: 'json',
                data: {
                    username: $user.val(),
                    password: $pass.val(),
                    email: $email.val()
                },
                success: function (resp) {
                    if(resp.ret === 'repeat') {
                        $('#username b').removeClass('hideb');
                        return;
                    }
                    if(resp.ret) {
                        //注册成功
                        //todo
                        $allInput.val('');
                        $('#myRegisterModal').modal('toggle');
                        alert('注册成功，请登录');
                        $('#myLoginModal').modal('toggle');

                    }
                },
                error: function (err) {
                    console.log(err);
                }
            })

        }


        //绑定密码输入框失焦检查函数
        $confirmPass.on('blur', function () {
            checkPass();
            $pass.on('blur', function () {
                checkPass();
            })
        })

        //绑定四个输入框的isEmpty事件
        $allInput.on('isEmpty', function (e) {
            $(e.target).prev().find('i').removeClass('hidei');
        })

        $allInput.on('isNotEmpty', function (e) {
            $(e.target).prev().find('i').addClass('hidei');
        })

        //绑定注册按钮的事件
        $('#register').on('click', function () {
            carry();
        });

    })();

    //登录函数
    (function login () {
        var $user = $('#usernameL input');
        var $pass = $('#userpassL input');
        var $allInput = $('#myLoginModal .content input');

            //检测字段并且负责发送ajax的核心函数
            function carry () {
                //注册按钮的功能

                //定义一个开关量判断是否所有都不为空
                var allNotEmpty = true;

                //如果点击提交按钮后
                //判断四个输入框是不是为空,
                //为空则触发对应的isEmpty事件
                for (var i = 0; i < $allInput.length; i++ ) {
                    if($allInput.eq(i).val() === '') {
                        $allInput.eq(i).trigger('isEmpty', $allInput.eq(i));
                        allNotEmpty = false;
                        continue;
                    } else {
                        $allInput.eq(i).trigger('isNotEmpty', $allInput.eq(i));
                    }
                }

                if (!allNotEmpty) {
                    return;
                }
                //todo:
                //是时候来一波ajax了
                $.ajax({
                    type: 'post',
                    url: '/users/login',
                    datatype: 'json',
                    data: {
                        username: $user.val(),
                        password: $pass.val(),
                    },
                    success: function (resp) {
                        if (!resp.ret) {
                            $('#usernameL span').removeClass('hideSpan');
                            return;
                        }
                        $('#myLoginModal').modal('toggle');
                        localStorage.setItem('user', $user.val());
                        alert('成功登录，您现在可以进入管理系统');
                        location.href = '/manage';
                    },
                    error: function (err) {
                        console.log(err);
                    }
                })

            }

            //绑定两个输入框的isEmpty事件
            $allInput.on('isEmpty', function (e) {
                $(e.target).prev().find('i').removeClass('hidei');
            })

            $allInput.on('isNotEmpty', function (e) {
                $(e.target).prev().find('i').addClass('hidei');
            })


            //绑定注册按钮的事件
            $('#login').on('click', function () {
                carry();
            });
    })();
})
