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
        background: $THEME_BG_COLOR;
        z-index: 99;
        display: flex;
        justify-content: center;
        align-items: center;

        .ball-clip-rotate-multiple {
            >div {
                border: 2px solid $THEME_TINT_COLOR;
                border-bottom-color: transparent;
                border-top-color: transparent;
                height: 150px;
                width: 150px;
                left: -75px;
                top: -75px;
            }
        }
    }
</style>
