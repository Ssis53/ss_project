$(window).on('load.base',function () {



    //nav自动跟踪的函数
    (function navMove () {
        window.onscroll = function () {
            if ($('a.to-top').length === 0) {
                $('<a>Top</a>').appendTo('body').addClass('to-top').on('click',function () {
                    toTop();
                });
            }

            var hei = document.body.scrollTop || document.documentElement.scrollTop;
            function toTop () {
                var speed = 30;
                var timer = window.setInterval(function() {
                    var hei = document.body.scrollTop || document.documentElement.scrollTop;
                    height = hei - speed;
                    document.body.scrollTop = document.documentElement.scrollTop = height;
                    if ( hei === 0 ) {
                        window.clearInterval(timer);
                    }
                },10)
            }
            if (hei >= 65) {
                $('a.to-top').removeClass('hide');
                $('nav').addClass('super-nav');
            } else {
                $('nav').removeClass('super-nav');
                $('a.to-top').addClass('hide');
            }
        }
    })();

    //注册登录按钮
    (function passId () {
        $theATag = $('header .header-last-ul.r li:last-of-type a');
        $theATag.on('click.noUser',function () {
            if ($('.headerBar-modals .headerBar-modals-passid').hasClass('hide')) {
                $('.headerBar-modals .headerBar-modals-passid').removeClass('hide');
                $theATag.html('你的通行证∧');
            } else {
                $('.headerBar-modals .headerBar-modals-passid').addClass('hide');
                $theATag.html('你的通行证∨');
            }
            return false;
        })
        $(window).on('click',function () {
            if (!($('.headerBar-modals .headerBar-modals-passid').hasClass('hide'))) {
                $('.headerBar-modals .headerBar-modals-passid').addClass('hide');
                $theATag.html('你的通行证∨');
            }
        })
    })();
    //加载时判断一下用户的登录状态
    (function userNow () {
        var nowUser;
        if (nowUser = localStorage.getItem('userLocal')) {
           //向服务器发送请求验证登录信息是否有效
            $.ajax({
                type: 'post',
                url: 'http://localhost/over_watch/php/check_user.php',
                data: {
                    userLocal: nowUser
                },
                success: function (resp) {
                    if (resp.ret) {
                        //登录状态有效
                        $('header .header-last-ul.r li:last-of-type a').html('尊敬的：' + nowUser + ' 您好！').off('click.noUser');
                    }
                },
                error: function (error) {
                    console.error(error);
                }
            })

        } else {

        }
    })();

    //登录按钮的跳转
    (function locationLogin () {
        $('.headerBar-modals-con>div>button').on('click',function () {
            location.href = "./html/login.html";
        })
    })();


})

