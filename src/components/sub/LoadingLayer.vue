<template>
    <div class="loading-layer">
        <div class="line-scale">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
        <!--<div class="ball-clip-rotate-multiple">-->
        <!--<div></div>-->
        <!--<div></div>-->
        <!--</div>-->
    </div>
</template>
<script>
    import 'loaders.css';
    export default {

    };
</script>
<style lang="scss">
    @import '../../assets/styles/theme.scss';

    .loading-layer {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background: #ffffff;
        z-index: 99;
        display: flex;
        justify-content: center;
        align-items: center;

        .line-scale > div {
            background-color: #6699ff;
            width: 4px;
            height: 35px;
            border-radius: 2px;
            margin: 2px;
            -webkit-animation-fill-mode: both;
            animation-fill-mode: both;
            display: inline-block;
        }
    }
</style>
