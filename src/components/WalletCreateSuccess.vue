<template>
    <div class="page-group">
        <div class="page" id="page-wallet-create-success">
            <header class="bar bar-nav">
                <h3 class="title">{{$t('wallet_create.success.title')}}</h3>
                <router-link :to="link('/')" replace class="icon icon-left"></router-link>
            </header>
            <div class="content">
                <div class="center-content">
                    <div class="content-block">
                        <success-check-mark></success-check-mark>
                        <p class="text-center text-success">{{$t('wallet_create.success.tip1')}}</p>
                        <p class="tip-alert text-center">{{$t('wallet_create.success.tip2')}}</p>
                        <div class="content-block block-button">
                            <p>
                                <router-link :to="link('/wallet-backup',{account:$route.query.account})" replace class="button button-gxb">{{$t('wallet_create.success.backup_wallet')}}</router-link>
                            </p>
                            <p class="text-center">
                                <router-link :to="link('/')" replace class="link-green">{{$t('wallet_create.success.detail')}}</router-link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import SuccessCheckMark from './sub/SuccessCheckMark.vue';

    export default {
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
        letter-spacing: .15rem;
        .content-block {
            width: 100%;
        }
        .text-success {
            margin-top: 1.5rem;
        }
        .block-button {
            margin-top: 1rem;
        }
    }

    .tip-alert {
        margin-top: 5rem;
        letter-spacing: normal;
        word-break: normal;
    }

    .link-green {
        color: #a2dfd9
    }
</style>
