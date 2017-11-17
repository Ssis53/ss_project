<template lang="html">
    <div class="head">
        <div>{{headerFocus}}</div>
        <h1 class="logo"><img src="../../static/images/logo.png" alt=""></h1>
        <div class="groom">
            <router-link :to="{ name: 'Home', params: {} }">
                <span :class="{checked: tIsChecked}" @click="tChange">推荐</span>
            </router-link>
        </div>

        <div class="all">
            <router-link :to="{ name: 'All'}">
                <span :class="{checked: qIsChecked}" @click="qChange">全部</span>
            </router-link>
        </div>

        <div class="recharge">
            <button @click="recharge" v-if="!isRecharge">充值</button>
            <button @click="jumpToCart" v-if="isRecharge" style="color: rgb(218,145,244); border: 1px solid rgb(100,145,244); background: rgba(38,218,207,.19)">cart</button>
        </div>
    </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
    name: 'my-header',
    data: function() {
        return {
            tIsChecked: true,
            qIsChecked: false,
            isRecharge: false
        }
    },
    methods: {

        tChange: function() {
            this.tIsChecked = true;
            this.qIsChecked = false;
        },
        qChange: function() {
            this.tIsChecked = false;
            this.qIsChecked = true;
        },
        recharge: function() {
            //验证是否登录
            var that = this;
            axios.get('/users/check').then(function(res) {
                if(res.data.ret) {
                    // location.href = '/#/recharge';
                    that.$router.push({name: 'Recharge'});
                } else {
                    setTimeout(function() {
                        // location.href = '/#/login';
                        that.$router.push({name: 'Login'});

                    }, 3000);
                    Toast({
                      message: '您还未登录，请先登录再执行该操作',
                      position: 'middle',
                      duration: 3000
                    });
                }
            })
        },
        jumpToCart: function() {
            //验证是否登录
            var that = this;
            axios.get('/users/check').then(function(res) {
                if(res.data.ret) {
                    // location.href = '/#/cart';
                    that.$router.push({name: 'Cart'});
                } else {
                    setTimeout(function() {
                        // location.href = '/#/login';
                        that.$router.push({name: 'Login'});
                    }, 3000);
                    Toast({
                      message: '您还未登录，请先登录再执行该操作',
                      position: 'middle',
                      duration: 3000
                    });
                }
            })
        }

    },
    computed: {
        headerFocus: function() {
            var path = this.$route.fullPath
            if(path == '/recharge') {
                this.isRecharge = true;
            } else {
                this.isRecharge = false;
            }
            if( path == '/') {
                this.tIsChecked = true;
                this.qIsChecked = false;
            } else if ( path == '/all') {
                this.tIsChecked = false;
                this.qIsChecked = true;
            }
        }
    }
}
</script>

<style lang="css" scoped>
    .head {
        height: .45rem;
        font-size: 16px;
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-between;
        background-color: #fff;
    }

    .logo {
        flex: 1;
        box-sizing: border-box;
        padding: .12rem .15rem;
        text-align: center;
        font-size: 0;
    }

    .head span {
        display: block;
        text-align: center;
        line-height: .45rem;
    }

    .logo img {
        width: 100%;
        height: 100%;
        display: inline-block;
    }

    .all {
        flex: 1;
    }

    .recharge {
        flex: 1;
        line-height: .45rem;
        text-align: center;
    }

    .groom {
        flex: 1
    }

    .recharge button {
        display: inline-block;
        width: .58rem;
        height: .24rem;
        color: #aaa;
        border: 0.01rem solid #aaa;
        border-radius: 1rem;
        font-size: 15px;
        text-align: center;
        background-color: #fff;
    }

    .checked {
        color: #f04442;
        position: relative;
    }

    .checked::after {
        display: block;
        content: "";
        position: absolute;
        bottom: 0.02rem;
        width: .5rem;
        height: 0.03rem;
        background: #f04442;
        border-radius: 0.06rem;
        left: 50%;
        margin-left: -.25rem
    }
</style>
