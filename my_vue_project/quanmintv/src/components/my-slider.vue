<template lang="html">
    <div class="slider">
        <mt-swipe :auto="3000" v-if="$store.state.sliderImg">
            <mt-swipe-item v-for="sliderPic in $store.state.sliderImg" :key='123'>
                <img :src="sliderPic.thumb" alt="">
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>

<script>
export default {
    name: 'my-slider',
    methods: {
        getSlider: function() {
            let that = this;
            axios.get('/json/page/app_images.json').then(function(res) {
                console.log(res);
                for(var key in res.data) {
                    if( key == 'android-focus') {
                        that.$store.dispatch('setSlider', res.data[key]);
                    }
                }

            }).catch(function(err) {
                console.log(err);
            })
        }
    },
    mounted: function() {
        let that = this;
        this.$nextTick(function() {
            that.getSlider();
        })
    }
}
</script>

<style lang="css" scoped>
    .slider {
        height: 1.15rem;
    }

    .slider img {
        width: 100%;
        height: 100%;
    }
</style>
