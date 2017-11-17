<template lang="html">
    <mt-loadmore  :top-method="loadTop" :bottom-method="loadBottom"  ref="loadmore">
    <div class="con">
        <section class="content"  v-for="key in $store.state.indexCon" v-if="key != undefined && key.list && key.list[first] && key.list && key.list[second]">
            <div class="con-head">
                <h3 class="l">{{key.name}}</h3>
                <p class="r">更多</p>
            </div>
            <div class="block">
                <div class="pic-left">
                    <router-link :to="{ name: 'Detail', params: {uid: key.list[first].uid} }">
                        <div class="pic">
                            <img v-if="key.list[first].beauty_cover" v-lazy="key.list[first].beauty_cover" alt="">
                            <img v-else-if="key.list[first].live_thumb" v-lazy="key.list[first].live_thumb" alt="">
                            <img v-else v-lazy="key.list[first].block_image" alt="">
                            <span v-if="key.list[first].view/10000 < 1">{{key.list[first].view}}</span>
                            <span v-else>{{(key.list[first].view/10000).toFixed(1)}}万</span>
                        </div>
                        <div class="liver">
                            <div class="liver-head">
                                <img v-lazy="key.list[first].avatar" alt="">
                            </div>
                            <div class="liver-info">
                                <p class="liver-name">{{key.list[first].nick}}</p>
                                <p class="liver-sumary">{{key.list[first].title}}</p>
                            </div>
                        </div>
                    </router-link>
                </div>

                <div class="pic-right">
                    <router-link :to="{ name: 'Detail', params: {uid: key.list[first].uid} }">
                        <div class="pic">
                            <img v-if="key.list[second].beauty_cover" :src="key.list[second].beauty_cover" alt="">
                            <img v-else-if="key.list[second].live_thumb" :src="key.list[second].live_thumb" alt="">
                            <img v-else :src="key.list[second].avatar" alt="">
                            <span v-if="key.list[second].view/10000 < 1">{{key.list[second].view}}</span>
                            <span v-else>{{(key.list[second].view/10000).toFixed(1)}}万</span>
                        </div>
                        <div class="liver">
                            <div class="liver-head">
                                <img :src="key.list[second].avatar" alt="">
                            </div>
                            <div class="liver-info">
                                <p class="liver-name">{{key.list[second].nick}}</p>
                                <p class="liver-sumary">{{key.list[second].title}}</p>
                            </div>
                        </div>
                    </router-link>
                </div>
            </div>
        </section>
    </div>
    </mt-loadmore>
</template>

<script>
export default {
    name: 'my-index-con',
    data: function() {
        return {
            first: '0',
            second: '1'
        }
    },
    methods: {
        getIndexCon: function() {
            var that = this;
            axios.get('/json/app/index/recommend/list-iphone.json').then(function(res) {
                console.log(res);
                that.$store.dispatch('setIndexCon', res.data.room);
                that.$refs.loadmore.onTopLoaded();
            }).catch(function(err) {
                console.log(err);
            })
        },
        loadTop() {
            this.getIndexCon();
        },
        loadBottom() {
            this.getIndexCon();
        }
    },
    mounted: function() {
        var that = this;
        this.$nextTick(function() {
            that.getIndexCon();
        })
    }
}
</script>

<style lang="css" scoped>
    .content {
        margin-bottom: 15px;
    }

    .con-head {
        padding: .15rem 0;
        height: .15rem;
        font-size: 15px;
        color: #34373b;
        background-color: #fff;
    }

    .con-head h3 {
        font-size: 15px;
        height: .15rem;
        border-left: .03rem solid #ff4646;
        line-height: .15rem;
        padding-left: .1rem;
    }

    .con-head p {
        color: #919191;
        font-size: 13px;
        height: .15rem;
        line-height: .15rem;
        padding-right: .1rem;
    }

    .block {
        display: flex;
        flex-wrap: nowrap;
        box-sizing: border-box;
        padding: 0 5px;
        background-color: #fff;
        justify-content: space-between;
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

    .pic-left {
        flex: 1;
        width: 50%;
    }

    .pic-right {
        flex: 1;
        width: 50%;
    }

    .block img {
        width: 100%;
        height: 100%;
    }

    image[lazy=loading] {
        width: 100%;
        height: 100%;
    }

    /*image[lazy=loading] {
      width: 100%;
      height: 100%;
      margin: auto;
    }*/

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

    .pic-left, .pic-right {
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
        color: #bbb;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 11px;
    }
</style>
