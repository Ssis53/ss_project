<template lang="html">
    <div class="cart">
        <div class="check-all">
            <label for="">
                <span>全选：</span>
                <input id="parentCheck" type="checkbox" v-model="checkedAll" @change="checkAll">
            </label>
        </div>
        <div class="goods-title">
            <p>选择</p>
            <p>商品</p>
            <p>数量</p>
            <p>单价</p>
            <p>总价</p>
            <p>操作</p>
        </div>
        <ul class="user-goods">
            <li v-for="(item, index) in goods" v-if="item" class="list">
                <div class="select">
                    <input type="checkbox" v-model="checkedChild[index]" @change="checkChoice">
                </div>
                <div class="goodsName">
                    {{item.goodsName}}
                </div>
                <div class="count">
                    {{item.count}}
                </div>
                <div class="goodsPrice">
                    {{item.goodsPrice}}
                </div>
                <div class="sumPrice">
                    {{item.count * item.goodsPrice}}
                </div>
                <div class="remove">
                    <button @click="remove" :goodsId="item._id">删除</button>
                </div>
            </li>

        </ul>
        <div class="calculate">
            <span>已选中：<b>{{sumCount}}</b></span>
            <span>总价：<b>{{sumPrice}}</b></span>
        </div>

        <div class="buy">
            <div class="r">结算</div>
        </div>
    </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
    name: 'cart',
    data: function() {
        return {
            checkedAll:false,
            goods: [],
            checkedChild: [],
            sumCount: 0,
            sumPrice: 0
        }
    },
    mounted: function() {
        //取出当前用户的数据
        this.getGoodsData();
    },
    methods: {
        getGoodsData: function() {
            var user = localStorage.getItem('user');
            var that = this;
            axios.post('/goods/getGoods', {
                username: user
            }).then(function(res) {
                if(res.data.ret) {
                    //成功取到数据
                    that.goods = res.data.result.slice();

                    //初始化商品被选列表的初始值为false
                    that.init(res.data.result.length);

                } else {
                    //获取数据失败
                    Toast({
                      message: '您的购物车空空如也~',
                      position: 'middle',
                      duration: 3000
                    });
                }
            }).catch(function(err) {
                console.log(err);
            })
        },
        checkAll: function(e) {
            if(this.checkedAll) {
                for(var i = 0; i < this.checkedChild.length; i++) {
                    this.checkedChild[i] = true;
                }
            } else {
                for(var i = 0; i < this.checkedChild.length; i++) {
                    this.checkedChild[i] = false;
                }
            }
            this.calculateSum();
        },
        init: function(len) {
            for(var i = 0; i < len; i++) {
                this.checkedChild[i] = false;
            }
        },
        checkChoice: function() {
            var count = 0;
            var len = this.checkedChild.length
            for(var i = 0; i < len; i++) {
                if(this.checkedChild[i]) {
                    count++;
                    continue;
                }
            }
            if(count === len) {
                this.checkedAll = true;
            } else {
                this.checkedAll = false;
            }
            this.calculateSum();
        },
        calculateSum: function() {
            var $lists = $('.list');
            var len = $lists.length;
            var tempCount = 0;
            var tempPrice = 0;
            for(var i = 0; i < len; i++) {
                if(this.checkedChild[i]) {
                    tempCount += parseInt($lists.eq(i).find('.count').html());
                    tempPrice += parseInt($lists.eq(i).find('.sumPrice').html())
                }
            }
            this.sumCount = tempCount;
            this.sumPrice = tempPrice;
        },
        remove: function(e) {
            //ajax删除
            //取出当前用户的数据
            var user = localStorage.getItem('user');
            var id = $(e.target).attr('goodsId');
            var that = this;
            axios.post('/goods/remove', {
                goodsId: id
            }).then(function(res) {
                if(res.data.ret) {
                    //删除成功，重新取数据
                    that.getGoodsData();
                }
            }).catch(function(err) {
                console.log(err);
            })
        }
    }
}
</script>

<style lang="css" scoped>
    input {
        padding: 0;
        margin: 0;
        font-size: 0;
    }
    .check-all {
        height: .4rem;
        background-color: #fff;
        box-sizing: border-box;
        padding: 0 .1rem;
        line-height: .4rem;
    }

    .goods-title {
        margin: .05rem 0;
        border-top: 0.001rem solid #ddd;
        border-bottom: 0.001rem solid #ddd;
        height: .5rem;
        line-height: .5rem;
        background-color: #fff;
        display: flex;
        justify-content: space-between;
        flex-wrap: nowrap;
    }

    .goods-title p {
        flex: 1;
        text-align: center;
    }

    .user-goods li {
        margin-top: .03rem;
        border-top: 0.001rem solid #ddd;
        border-bottom: 0.001rem solid #ddd;
        background-color: #fff;
        display: flex;
        justify-content: space-between;
        flex-wrap: nowrap;
        height: .35rem;
        line-height: .35rem;
    }

    .user-goods li div {
        flex: 1;
        text-align: center;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }

    .user-goods li div button {
        background: rgba(168,106,73,.24);
        border-radius: .04rem;
        border: 0.01rem solid rgba(168,106,73,.24);
    }

    .calculate {
        height: .35rem;
        line-height: .35rem;
        border-top: 0.001rem solid rgba(214,50,129,.25);
        border-bottom: 0.001rem solid rgba(214,50,129,.25);
        background-color: #fff;
        box-sizing: border-box;
        padding: 0 .15rem;
    }

    .calculate span:first-child {
        margin-right: .1rem;
    }

    .calculate span b {
        color: red;
    }

    .buy {
        margin-top: .3rem;
        box-sizing: border-box;
        padding: 0 .2rem;
    }

    .buy div {
        text-align: center;
        height: .3rem;
        width: 1rem;
        line-height: .3rem;
        background: #ff5253;
        border-radius: .05rem;
        display: inline-block;
        font-size: 15px;
        font-weight: 700;
        color: #fff;
    }

</style>
