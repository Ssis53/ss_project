window.onload = function () {
    (function indexSliderPic () {
        var SliderOne = new Swiper('.index-main-sliderPic',{
            autoplay: 2000,
            loop: true,
            autoplayDisableOnInteraction : false,
            speed: 2000,
            pagination : '.first-slider-bullets',
            paginationType : 'bullets',
            paginationClickable :true,
        });
    } )();

    //循环放入英雄头像的函数
    (function pushHeroHead () {
        var $li = $('.index-main-hero-ul li');
        for ( var i = 1 ; i <= 25 ; i ++ ) {
            $li.eq(i-1).find('.heros-head').css({
                background: 'url(./image/hero_head/' + i + '.png)',
                backgroundSize: 'auto 100%',
                backgroundPosition: '50% 50%'
            })
        }
    })();

    //英雄的鼠标放上事件
    ( function heroMouseOver () {
        //取到名字,简介，图片
        var $heroName = $('#hero-name');
        var $heroSummary = $('#hero-summary');
        var $superHero = $('#super-hero');
        //取到所有的li节点
        var $li = $('.index-main-hero-ul li');
        var heros = [];
        heros.push(new Hero('末日铁拳','一位利用个人头脑、魅力和蛮力来创建一个更强大世界的战术家。','./image/hero_pic/1.png'));
        heros.push(new Hero('源氏','一名致命的半机械忍者，通过他的机械躯体寻得了身心的和谐。','./image/hero_pic/2.png'));
        heros.push(new Hero('麦克雷','一名亡命天涯的神枪手，以自己的方式伸张正义。','./image/hero_pic/3.png'));
        heros.push(new Hero('法老之鹰','一名恪守岗位的战士，用实验性的“猛禽”作战服确保天空的安全。','./image/hero_pic/4.png'));
        heros.push(new Hero('死神','一名无情的杀手，一直在追杀前守望先锋的特工们。','./image/hero_pic/5.png'));
        heros.push(new Hero('士兵：76','一名试图自己将守望先锋敌人绳之于法的独行侠。。','./image/hero_pic/6.png'));
        heros.push(new Hero('黑影','臭名昭著的黑客，沉迷于揭秘——及其带来的权力。','./image/hero_pic/7.png'));
        heros.push(new Hero('猎空','一名前守望先锋特工，同时也是可以穿梭时间的充满正义的冒险家。','./image/hero_pic/8.png'));
        heros.push(new Hero('堡垒','一名可以切换形态的机器人，为自然着迷而探索世界，同时也对人类保持着戒心。','./image/hero_pic/9.png'));
        heros.push(new Hero('半藏','一名强大而致命的弓箭大师。','./image/hero_pic/10.png'));
        heros.push(new Hero('狂鼠','一名满脑子都是爆炸的变态疯子，只为了混乱和破坏而活。','./image/hero_pic/11.png'));
        heros.push(new Hero('美','一名能够操控天气，为了保护环境而选择战斗的科学家。','./image/hero_pic/12.png'));
        heros.push(new Hero('托比昂','一名天才工程师，可以在战场上打造武器系统。','./image/hero_pic/13.png'));
        heros.push(new Hero('黑百合','一名完美的杀手：耐心、果断、无情。没有任何情感且事后毫无悔意。','./image/hero_pic/14.png'));
        heros.push(new Hero('D.Va','一名前职业玩家，而现在则利用自己的技巧驾驶一台尖端机甲保卫国家。','./image/hero_pic/15.png'));
        heros.push(new Hero('奥丽莎','维护努巴尼秩序并保护努巴尼人民的维和机器人。','./image/hero_pic/16.png'));
        heros.push(new Hero('莱因哈特','一名属于过去的勇士，时刻铭记着骑士的信条：无畏、公正、勇敢。','./image/hero_pic/17.png'));
        heros.push(new Hero('路霸','一名残暴的杀手，因残忍和肆意破坏而臭名昭著。','./image/hero_pic/18.png'));
        heros.push(new Hero('温斯顿','一只经过基因改造，拥有高等智慧的大猩猩，也是一位出色的科学家和代表着人类潜力的勇士。','./image/hero_pic/19.png'));
        heros.push(new Hero('查莉娅','世界上最强壮的女性之一。为了保卫祖国，毅然放弃了个人荣誉。','./image/hero_pic/20.png'));
        heros.push(new Hero('安娜','守望先锋的创始成员之一，“起死回生”重返战场保护亲人和朋友。','./image/hero_pic/21.png'));
        heros.push(new Hero('卢西奥','一位国际名人，通过音乐和巡演激发社会正能量。','./image/hero_pic/22.png'));
        heros.push(new Hero('天使','一名集顶尖的治疗者、出色的科学家和坚定的和平主义者于一身的守护天使。','./image/hero_pic/23.png'));
        heros.push(new Hero('秩序之光','名通过控制高强度光束，将世界改造成她心目中完美、有序的模样的光子建筑师。','./image/hero_pic/24.png'));
        heros.push(new Hero('禅雅塔','一位游走于世界寻找灵魂升华之道的机械僧侣。','./image/hero_pic/25.png'));

        for (var i = 0; i < $li.length; i++ ) {
            //循环绑定事件
            $li[i].index = i;

            //鼠标放上事件
            $li[i].onmouseenter = function () {
                var $oldCheck = $('.index-main-hero-ul li.check');
                if ( !($(this).hasClass('check'))) {
                    $(this).addClass('check');
                    $oldCheck.removeClass('check');
                    //找到有focus的那个元素，focus的那个英雄就是要放上name,summary,img上的
                    var $focus = $('.index-main-hero-ul li.check');
                    $heroName.html(heros[this.index].name);
                    $heroSummary.html(heros[this.index].summary);
                    $superHero.css({
                        backgroundImage: 'url(' + heros[this.index].img + ')'
                    });
                }


            }

            //点击英雄加入购物车的事件
            $li[i].onclick = function () {
                if (!localStorage.getItem('userLocal')) {
                    //说明本地缓存失效重新登录
                    var confir = confirm('您还未登录，是否现在登录？')
                    if (confir) {
                        console.log('跳转登录页')
                        location.href = './html/login.html';
                        return false;
                    }
                } else {
                    //本地缓存没失效，检查服务器设置的cookie
                    var nowUser = localStorage.getItem('userLocal')
                    $.ajax({
                        type: 'post',
                        url: 'http://localhost/over_watch/php/check_user.php',
                        data: {
                            userLocal: nowUser
                        },
                        success: function (resp) {
                            if (!resp.ret) {
                                //服务器的cookie失效
                                var confir = confirm('您还未登录，是否现在登录？')
                                if (confir) {
                                    console.log('跳转登录页')
                                    location.href = './html/login.html';
                                    return false;
                                }
                            } else {

                            }
                        },
                        error: function (error) {
                            console.error(error);
                        }
                    })
                }

                //用户登陆了，将点击的英雄加入购物车
                //在数据库的id为this.index + 1;
                var heroId = this.index + 1;
                var userLocal = localStorage.getItem("userLocal")
                //发送一个ajax
                $.ajax({
                    type: 'post',
                    url: './php/buy.php',
                    data: {
                        heroId: heroId,
                        userLocal: userLocal
                    },
                    success: function (resp) {
                        if (resp.ret) {
                            //插入成功
                            alert('该英雄加入购物车成功')
                        } else {
                            alert(resp.reason);
                        }
                    },
                    error: function (error) {
                        console.error(error);
                    }
                })
                return false;
            }
        }
    })();
}