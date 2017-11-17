<template lang="html">
    <footer>
        {{check()}}
        <div class="login">
            <span @click='jumpLogin' v-if="!isLogin">登录</span>
            <b v-if="isLogin">你好: {{nowUser}}</b>
        </div>
        <div class="search" v-if="search">
            <input type="text" placeholder="搜索主播、房间号" v-model="sear" @keyup="startS" @focus="jump" >
        </div>
        <div class="register">
            <span v-if="!isLogin" @click='jumpRegister'>注册</span>
            <b v-if="isLogin" @click='logout'>注销</b>
        </div>
    </footer>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
    name: 'my-footer',
    data: function() {
        return {
            searchIsShow: null,
            sear: '',
            isLogin: null,
            nowUser: ''
        }
    },
    computed: {
        search: function() {
            this.searchIsShow = this.$route.fullPath
            if(this.searchIsShow == '/' || this.searchIsShow == '/all') {
                return true;
            } else {
                return false;
            }
        }
    },
    methods: {
        startS: function() {
            this.$store.dispatch('setSear', this.sear);
        },
        jump: function() {
            // location.href = '/#/all';
            this.$router.push({name: 'All'})
        },
        jumpRegister: function() {
            //todo检查是否已经登录

            // location.href = '/#/register';
            this.$router.push({name: 'Register'});
        },
        jumpLogin: function() {

            // location.href = '/#/login';
            this.$router.push({name: 'Login'});
        },
        check: function() {
            //验证登录状态
            var that = this;
            axios.get('/users/check').then(function(res) {
                if(res.data.ret) {
                    that.isLogin = true;
                    that.nowUser = localStorage.getItem('user');
                } else {
                    that.isLogin = false;
                }
            }).catch(function(err) {
                console.log(err);
            })
        },
        logout: function() {
            var that = this;
            axios.get('/users/logout').then(function(res) {
                if(res.data.ret) {
                    setTimeout(function() {
                        // location.href = '/#/';
                        that.$router.push({name: 'Home'});
                    }, 1000)
                    Toast({
                      message: '成功注销',
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
    footer {
        height: .5rem;
        background: rgba(0, 0, 0, .8);
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        display: flex;
        justify-content: space-between;
        flex-wrap: nowrap;
        line-height: .5rem;
        box-sizing: border-box;
        padding: 0 .1rem;
    }

    footer b {
        color: #fff;
        width: .8rem;
        background-color: rgba(28,207,158,.62);
        display: inline-block;
        text-align: center;
        height: .25rem;
        line-height: .25rem;
        border-radius: .05rem;
        /*overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;*/
    }

    footer span {
        color: #fff;
        font-size: 15px;
    }

    footer .search {
        width: 1.5rem;
    }

    footer .search input {
        width: 100%;
        border: .01rem solid #ccc;
        border-radius: .08rem;
        height: .2rem;
        outline: none;
        box-sizing: border-box;
        padding: 0 .05rem;
    }

    .login span {
        text-align: center;
        height: .3rem;
        width:.75rem;
        line-height: .3rem;
        background: #ff5253;
        border-radius: .05rem;
        display: inline-block;
    }

    .login, .register {
        height: .5rem;
        line-height: .5rem;
    }

    .register span {
        text-align: center;
        height: .3rem;
        width:.75rem;
        line-height: .3rem;
        background: #ff5253;
        border-radius: .05rem;
        display: inline-block;
    }
</style>
