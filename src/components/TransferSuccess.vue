<template>
    <div class="page-group">
        <div class="page" id="page-wallet-create-success">
            <header class="bar bar-nav">
                <h3 class="title">{{$t('transfer.success.title')}}</h3>
                <router-link :to="link('/transfer')" replace class="icon icon-left"></router-link>
            </header>
            <div class="content">
                <div class="center-content">
                    <div class="content-block">
                        <success-check-mark></success-check-mark>
                        <p class="text-center text-success">{{$t('transfer.success.tip1')}}</p>
                        <p class="text-center">
                            <span>{{$route.query.account}}</span>&nbsp;
                            <span>{{$t('transfer.success.tip2')}}</span>
                        </p>
                        <p class="text-center">
                            <span class="asset">{{$route.query.amount | asset(2)}}</span>&nbsp;{{$route.query.symbol}}</p>
                    </div>
                </div>
                <div class="content-block button-block">
                    <p>
                        <router-link :to="$route.query.from||link('/transfer')" replace class="button button-gxb">{{$t('transfer.success.done')}}</router-link>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import SuccessCheckMark from './sub/SuccessCheckMark.vue';
    import filters from '@/filters';

    export default {
        filters,
        mounted () {
            $.init();
        },
        components: {
            SuccessCheckMark
        }
    };
</script>
<style scoped lang="scss">
    .content {
        background: #fff;
    }

    .center-content {
        margin-top: 3rem;
        align-items: flex-end;
        display: flex;
        justify-content: center;
        .content-block {
            width: 100%;
        }
        .text-success {
            letter-spacing: .15rem;
            margin-top: 1.5rem;
        }
        .block-button {
            margin-top: 1rem;
        }
    }

    .tip-alert {
        margin-top: 5rem;
        letter-spacing: normal;
    }

    .asset {
        color: #6699ff;
        font-family: bebas;
        font-size: 1.1rem;
    }

    .link-green {
        color: #a2dfd9
    }
</style>
