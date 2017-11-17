<template lang="html">
    <div class="register">
        <div class="regWin">
            <div class="title">
                <h1>登录</h1>
            </div>
            <ul>
                <li>
                    <span>帐号:</span>
                    <input type="text" name="" value="" v-model="user">
                </li>
                <li>
                    <span>密码:</span>
                    <input type="password" v-model="psw">
                </li>
                <li>
                    <span @click="login">登录</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
    name: 'login',
    data: function() {
        return {
            user: '',
            psw: ''
        }
    },
    methods: {
        login: function() {
            var that = this;
            axios.post('/users/login', {
                username: that.user,
                password: that.psw
            }).then(function(res) {
                if(res.data.ret) {
                    that.$store.dispatch('setUser', that.user);
                    localStorage.setItem('user', that.user);
                    setTimeout(function() {
                        // location.href = '/#/';
                        that.$router.push({name: 'Home'});
                    }, 4000)
                    Toast({
                      message: '登录成功，即将跳转到首页',
                      position: 'middle',
                      duration: 4000
                    });
                } else {
                    Toast({
                      message: '用户名或密码错误',
                      position: 'middle',
                      duration: 3000
                    });
                }
            }).catch(function(err) {
                console.log(err);
            })
        }
    }
}
</script>

<style lang="css" scoped>
    .title {
        margin-bottom: .3rem;
    }

    .title h1 {
        font-weight: 300;
        font-size: 40px;
        color: rgba(228,158,21,.64);
        text-align: center;
        margin: 0;
    }

    .register {
        height: 668px;
    }

    .regWin {
        width: 3rem;
        margin: 1rem auto;
    }

    .regWin li {
        margin-bottom: .4rem;
        display: flex;
        flex-wrap: nowrap;
        line-height: .3rem;
        height: .3rem;
        text-align: center;
    }

    .regWin li span {
        width: .35rem;
        display: inline-block;
        font-weight: 700;
    }

    .regWin li input {
        height: .3rem;
        border: 1px solid rgba(199,46,138,.51);
        border-radius: .03rem;
        box-sizing: border-box;
        padding: 0 .1rem;
        flex: 1;
    }

    .regWin li:last-of-type {
        display: block;
    }

    .regWin li:last-of-type span{
        width: 80%;
        display: inline-block;
        background-color: rgba(20,231,161,.8);
        border-radius: .5rem;
        color: #fff;
        font-size: 15px;
        height: 100%;
    }
</style>
