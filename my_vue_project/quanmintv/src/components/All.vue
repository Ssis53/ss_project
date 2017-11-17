<template lang="html">
    <div>
        <nav>
            <div class="menu">
                <div class="wangzhe">
                    <span>王者荣耀</span>
                </div>
                <div class="yingxiong">
                    <span>英雄联盟</span>
                </div>
                <div class="quanmin">
                    <span>全民星秀</span>
                </div>
                <div class="showing">
                    <span>Showing</span>
                </div>
            </div>
            <div class="btn"></div>
        </nav>
        <mt-loadmore  :top-method="loadTop" :bottom-method="loadBottom"  ref="loadmore">
        <div class="block" v-if="this.$store.state.detailCon">
            <div class="pic-right" v-for="key in this.$store.state.detailCon" v-if="key && key.uid && key.nick && key.title" v-show="key.uid.indexOf($store.state.sear) != -1 || key.nick.indexOf($store.state.sear) != -1 || key.title.indexOf($store.state.sear) != -1">
                <router-link :to="{ name: 'Detail', params: {uid: key.uid} }">
                    <div class="pic">
                        <img :src="key.live_thumb" alt="">
                        <!-- <img v-else :src="key.list[second].live_thumb" alt=""> -->
                        <span v-if="key.view/10000 < 1">{{key.view}}</span>
                        <span v-else>{{(key.view/10000).toFixed(1)}}万</span>
                    </div>
                    <div class="liver">
                        <div class="liver-head">
                            <img :src="key.avatar" alt="">
                        </div>
                        <div class="liver-info">
                            <p class="liver-name">{{key.nick}}</p>
                            <p class="liver-sumary">{{key.title}}</p>
                        </div>
                    </div>
                </router-link>
            </div>
        </div>
        </mt-loadmore>
    </div>
</template>

<script>
export default {
    name: 'all',
    methods: {
        getDetailCon: function() {
            var that = this;
            axios.get('/json/play/list.json').then(function(res) {
                console.log(res);
                that.$store.dispatch('setDetailCon', res.data.data);
                that.$refs.loadmore.onTopLoaded();
            }).catch(function(err) {
                console.log(err);
            })
        },
        loadTop() {
            this.getDetailCon();
        },
        loadBottom() {
            this.getDetailCon();
        }
    },
    mounted: function() {
        var that = this;
        this.$nextTick(function() {
            that.getDetailCon();
        })
    }
}
</script>

<style lang="css" scoped>

    nav {
        box-sizing: border-box;
        padding: 0 .1rem;
        height: .4rem;
        line-height: .4rem;
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-between;
        background-color: #fff;
    }

    nav .menu {
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-between;
        flex: 1;
    }

    .wangzhe, .yingxiong, .quanmin, .showing {
        flex: 1;
    }

    .wangzhe span, .yingxiong span, .quanmin span, .showing span {
        display: inline-block;
        width: .65rem;
        height: .21rem;
        border: .01rem solid #bbb;
        line-height: .21rem;
        text-align: center;
        border-radius: .5rem;
        font-size: 12px;
        color: #000;
    }

    nav .btn {
        width: .53rem;
        height: .4rem;
        background: url('../../static/images/btn.png') no-repeat center;
        background-size: .35rem .35rem;
    }

    .block {
        /*display: flex;*/
        box-sizing: border-box;
        padding: 0 5px;
        background-color: #fff;
    }

    .block .pic {
        height: .97rem;
        position: relative;
    }

    .pic > span {
        position: absolute;
        background: rgba(0,0,0,.38);
        color: #c2c3c4;
        border-radius: 0.04rem;
        font-size: 10px;
        left: .04rem;
        bottom: .04rem;
        padding: 0 .1rem;
    }

    .block .liver-head img {
        width: 100%;
        height: 100%;
    }

    .block .liver-head {
        width: .32rem;
        height: .32rem;
        border-radius: 50%;
        overflow: hidden;
    }

    .pic-right {
        flex: 1;
        width: 50%;
        float: left;
        margin-top: 12px;
    }

    .block img {
        width: 100%;
        height: 100%;
    }

    .liver {
        display: flex;
        flex-wrap: nowrap;
    }

    .liver .liver-info {
        flex: 1;
        box-sizing: border-box;
        padding-left: .1rem;
        overflow: hidden;
    }

    .pic-right {
        box-sizing: border-box;
        padding: 0 5px;
    }

    .liver {
        margin-top: .1rem;
    }

    .liver-info > p:first-child {
        height: .2rem;
        color: #34373b;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 13px;
    }

    .liver-info > p:last-child {
        height: .13rem;
        line-height: .13rem;
        color: #ccc;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 11px;
    }
</style>
