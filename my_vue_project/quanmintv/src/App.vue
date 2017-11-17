<template>
  <div id="app">
    <my-header></my-header>
    <router-view/>
    <my-footer></my-footer>
  </div>
</template>

<script>
export default {
  name: 'app'

}
</script>

<style>
    body {
        font-size: 13px;
    }

    body, h1, h2, h3, h4, h5, h6, ul, ol, ul, li, dl ,dd, dt, img, p, table, figure, figcaption, header, main {
        margin: 0;
        padding: 0;
    }

    .l {
        float: left;
    }

    .r {
        float: right;
    }

    a {
        color: #34373b;
        text-decoration: none;
    }

    header, mian, figure, aside, article, footer nav {
        display: block;
    }

    ul, li, ol {
        list-style: none;
    }

    .img {
        font-size: 0;
    }

    #app {
        background: #f4fbff;
    }
</style>
