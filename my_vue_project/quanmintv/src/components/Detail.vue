<template lang="html">
    <div class="detail">
        <div class="detail-con">
            <div class="detail-pic" v-if="liveRoom">
                <img v-if="liveRoom.data" :src="liveRoom.data.thumb" alt="">
                <img v-if="liveRoom.data.thumb" class="play" src="../../static/images/play.png">
            </div>
            <div class="detail-liver" v-if="liveRoom">
                <div class="avatar">
                    <div class="avatar-pic">
                        <img v-if="liveRoom.data.avatar" :src="liveRoom.data.avatar" alt="">
                    </div>
                    <div class="avatar-info">
                        <p>{{liveRoom.data.title}}</p>
                        <p>主播:{{liveRoom.data.nick}}</p>
                    </div>
                </div>
                <div class="info">
                    <p>全民号:{{liveRoom.data.no}}</p>
                    <p>观看人数:{{liveRoom.data.view}}</p>
                </div>
            </div>
            <div class="detail-nav">
                <div class="detail-left">
                    <span>聊天</span>
                    <span>精彩推荐</span>
                </div>
                <div class="detail-right">
                    <span>关注</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'detail',
    data: function() {
        return {
            liveRoom: null
        }
    },
    methods: {
        getLiveRoom: function() {
            var that = this;
            axios.get(`/json/rooms/${this.$route.params.uid}/noinfo6.json`).then(function(res) {
                console.log(res);
                that.liveRoom = res;
                console.log(that.liveRoom);
            }).catch(function(err) {
                console.log(err);
            })
        }
    },
    mounted: function() {
        var that = this;
        this.$nextTick(function() {
            that.getLiveRoom();
        })
    }
}
</script>

<style lang="css" scoped>

    html, body {
        height: 100%;
    }

    .detail-con {
        height: 6.67rem;
    }

    .detail-pic img {
        height: 2rem;
        width: 100%;
    }

    .detail-pic {
        position: relative;
    }

    .detail-pic::before {
        content: "";
        display: block;
        z-index: 2;
        position: absolute;
        width: 100%;
        height: 2rem;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, .2);
    }

    .detail-pic .play {
        position: absolute;
        width: .58rem;
        height: .58rem;
        top: 50%;
        margin-top: -.29rem;
        left: 50%;
        margin-left: -.29rem;
    }

    .detail-liver {
        height: .29rem;
        padding: .075rem .15rem;
        border-bottom: 1px solid #ccc;
        font-size: 12px;
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-between;
        background-color: #fff;
    }

    .avatar-pic img {
        height: 30px;
        width: 30px;
        border-radius: 50%;
    }

    .avatar-pic {
        height: 30px;
        width: 30px;
        float: left;
        margin-right: .1rem;
    }

    .avatar-info {
        height: .3rem;
        width: 1.5rem;
        overflow: hidden;
    }

    .avatar-info p:first-child {
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .info {
        font-size: 12px;
        color: #bbb
    }

    .detail-nav {
        height: .35rem;
        display: flex;
        flex-wrap: nowrap;
        background-color: #fff;
    }

    .detail-nav .detail-left {
        flex: 1;
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-around;
        height: .3rem;
        line-height: .3rem;
        color: #999
    }

    .detail-nav .detail-right {
        width: .8rem;
        height: .3rem;
    }

    .detail-right span {
        text-align: center;
        height: .3rem;
        line-height: .3rem;
        color: #fff;
        display: block;
        background: #f14443;
    }
</style>
