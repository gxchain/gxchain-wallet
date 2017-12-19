<template>
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
        <circle class="path circle" fill="none" :stroke="color" stroke-width="10" stroke-miterlimit="10" cx="100" cy="100" r="80"
        />
        <polyline class="path check" fill="none" :stroke="color" stroke-width="10" stroke-linecap="round" stroke-miterlimit="10"
            points="135.2,80.2 86.5,128.8 64.8,107.5 " />
        <circle class="spin" fill="none" :stroke="color" stroke-width="6" stroke-miterlimit="10" stroke-dasharray="12.2175,12.2175"
            cx="100" cy="100" r="95" />
    </svg>
</template>
<script>
    export default {
        props: {
            color: {
                type: String,
                default: '#7ad4cb'
            }
        }
    };
</script>
<style lang="scss" scoped="">
    svg {
        width: 125px;
        display: block;
        margin: 0 auto;
    }

    .path {
        stroke-dasharray: 1000;
        stroke-dashoffset: 0;
        &.circle {
            -webkit-animation: dash .9s ease-in-out;
            animation: dash .9s ease-in-out;
        }
        &.line {
            stroke-dashoffset: 1000;
            -webkit-animation: dash .9s .35s ease-in-out forwards;
            animation: dash .9s .35s ease-in-out forwards;
        }
        &.check {
            stroke-dashoffset: -100;
            -webkit-animation: dash-check .9s .35s ease-in-out forwards;
            animation: dash-check .9s .35s ease-in-out forwards;
        }
    }

    @keyframes dash {
        0% {
            stroke-dashoffset: 1000;
        }
        100% {
            stroke-dashoffset: 0;
        }
    }

    @keyframes dash-check {
        0% {
            stroke-dashoffset: -100;
        }
        100% {
            stroke-dashoffset: 900;
        }
    }

    .spin {
        animation: spin 2s;
        -webkit-animation: spin 2s;
        transform-origin: 50% 50%;
        -webkit-transform-origin: 50% 50%;
    }

    @keyframes spin {
        0% {
            -webkit-transform: rotate(0deg);
        }
        100% {
            -webkit-transform: rotate(360deg);
        }
    }
</style>
