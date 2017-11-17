<template lang="html">
    <div class="recharge">
        <div class="recharge-user">
            充值账户
        </div>
        <div class="recharge-num">
            <div class="num">{{nowUser}}</div>
            <div class="line"></div>
            <div class="confirm">确认</div>
        </div>
        <div class="how-get">
            如何获得全民号？
        </div>
        <div class="choice">
            选择充值金额
        </div>
        <ul class="recharge-list" @click="userChecked">
            <li class="btn">
                <div class="user-checked">
                    <p>100牛币</p>
                    <p>10元</p>
                </div>
            </li>
            <li class="btn">
                <div>
                    <p>250牛币</p>
                    <p>25元</p>
                </div>
            </li>
            <li class="btn">
                <div>
                    <p>500牛币</p>
                    <p>50元</p>
                </div>
            </li>
            <li class="bottom btn">
                <div>
                    <p>1000牛币</p>
                    <p>100元</p>
                </div>
            </li>
            <li class="bottom btn">
                <div>
                    <p>5000牛币</p>
                    <p>500元</p>
                </div>
            </li>
            <li class="bottom btn">
                <div>
                    <p>10000牛币</p>
                    <p>1000元</p>
                </div>
            </li>
        </ul>
        <div class="sum-price">金额： {{thePrice}}元</div>
        <section class="add">
            <button @click="addCart" @touchstart="changeColor" @touchend="changeBack">加入购物车</button>
        </section>
    </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
    name: 'recharge',
    data: function() {
        return {
            thePrice: 10,
            theOne: ''
        }
    },
    beforeRouteEnter(to, from, next){
        next(vm=>{
            // console.log(vm);
        })
    },
    methods: {
        userChecked: function(e) {
            var $target = $(e.target);
            if($target.hasClass('btn')) {
                //取消所有的user-checked类
                //给被点击的这个加上
                $(e.currentTarget).find('li>div').removeClass('user-checked');
                $target.find('div').addClass('user-checked');

                //更新价格
                this.thePrice = parseInt($target.find('div p:last-child').html());
            }
        },
        addCart: function() {
            // TODO: 拿到数据加入数据库，存上user名字
            var goodsName = $('.recharge-list>li').find('div.user-checked p:first-child').html();
            var goodsPrice = parseInt($('.recharge-list>li').find('div.user-checked p:last-child').html())
            var user = this.theOne;

            axios.post('/goods/add', {
                goodsName: goodsName,
                goodsPrice: goodsPrice,
                username: user
            }).then(function(res) {
                if(res.data.ret) {
                    Toast({
                      message: '★添加成功',
                      position: 'middle',
                      duration: 2000,
                      className: 'my-toast'
                    });
                } else {
                    Toast({
                      message: '添加失败请稍后再试',
                      position: 'middle',
                      duration: 2000,
                      className: 'my-toast'
                    });
                }
            }).catch(function(err) {
                console.log(err);
            })
        },
        changeColor: function(e) {
            $(e.currentTarget).css({
                background: 'rgba(221,11,105,.56)'
            })
        },
        changeBack: function(e) {
            var $this = $(e.currentTarget)
            setTimeout(function() {
                $this.css({
                    background: '#ff5253'
                })
            }, 100)
        }
    },
    computed: {
        nowUser: function() {
            var user = localStorage.getItem('user');
            this.theOne = user;
            return user;
        }
    }
}
</script>

<style lang="css" scoped>
    .recharge {
        /*box-sizing: border-box;*/
        overflow: hidden;
    }

    .recharge-user {
        height: .4rem;
        line-height: .4rem;
        width: 100%;
        background: #fff;
        font-family: PingFangSC-Medium;
        font-size: .15rem;
        color: #4c4c4c;
        box-sizing: border-box;
        padding-left: .15rem;
        border-bottom: #e7edf0 solid .0001rem;
        border-top: #e7edf0 solid .0001rem;
    }

    .recharge-list {
        overflow: hidden;
    }

    .recharge-list li .user-checked p {
        color: #fff;
    }

    .recharge-list li .user-checked {
        background-color: #ff5253;
    }

    .recharge-num {
        height: .5rem;
        background-color: #fff;
        box-sizing: border-box;
        padding: .05rem .15rem;
        line-height: .5rem;
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-between;
        margin: 1px 0;
    }

    .recharge-num .line {
        width: .01rem;
        height: .4rem;
        background: #e7edf0;
    }

    .recharge-num .confirm {
        width: .9rem;
        height: .4rem;
        font-family: PingFangSC-Medium;
        font-size: .15rem;
        color: #fe655e;
        line-height: .4rem;
        text-indent: .2rem;
    }

    .recharge-num .num {
        flex: 1;
        color: #d0d0d0;
        font-size: .15rem;
        height: .4rem;
        line-height: .4rem;
    }

    .how-get {
        height: .35rem;
        font-size: .12rem;
        color: #fe655e;
        line-height: .35rem;
        text-indent: .5rem;
        background: url('../../static/images/bulr.png') no-repeat .2rem center #fff;
        background-size: 17.5px;
        margin: .05rem 0;
        border-top: #e7edf0 solid .0001rem;
        border-bottom: #e7edf0 solid .0001rem;
    }

    .choice {
        height: .44rem;
        line-height: .44rem;
        background-color: #fff;
        box-sizing: border-box;
        padding: 0 .15rem;
        border-bottom: 1px solid #e7edf0;
        color: #4c4c4c;
        font-size: .15rem;
    }

    .recharge-list {
        box-sizing: border-box;
        padding: .15rem .05rem;
        background-color: #fff;
    }

    .recharge-list > li {
        width: 33.333%;
        box-sizing: border-box;
        padding: 0 10px;
        float: left;
        height: .6rem;
        position: relative;
    }

    .recharge-list > li::before {
        content: "";
        display: block;
        position: absolute;
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
    }

    li p:first-child {
        font-size: .15em;
        color: #fe655e;
        text-align: center;
        margin-top: .085rem;
        font-weight: 400;
    }

    li p:last-child {
        font-size: .15em;
        color: #fe655e;
        text-align: center;
    }

    li p:last-child {
        color: #999b9d;
        font-size: .12rem;
    }

    .recharge-list > li > div {
        border: 1px solid #ff5253;
        border-radius: .02rem;
        height: 100%;
        box-sizing: border-box;
    }

    .recharge-list > .bottom {
        margin-top: .2rem;
    }

    .sum-price {
        height: .5rem;
        box-sizing: border-box;
        padding: 0 .1rem;
        line-height: .5rem;
        margin-top: .03rem;
        border-top: 0.0001rem solid #ccc;
        background-color: #fff;
        color: #4c4c4c;
        font-size: .14rem;
    }

    .add {
        width: 3.45rem;
        height: .5rem;
        margin: .2rem auto 1rem;
        text-align: center;
    }

    .add button {
        height: .5rem;
        width: 100%;
        border: 1px solid #ff5253;
        border-radius: .5rem;
        box-sizing: border-box;
        line-height: .5rem;
        background: #ff5253;
        text-align: center;
        color: #fff;
        display: block;
        font-size: .18rem;
        outline: none;
    }

    .my-toast {
        height: 1rem;
        height: 1rem;
        font-size: .16rem;
        font-weight: 700;
    }
</style>
