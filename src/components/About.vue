<template>
    <div class="page-group">
        <div class="page" id="page-about">
            <header class="bar bar-nav">
                <h3 class="title">{{$t('about.title')}}</h3>
                <router-link :to="link('/')" replace class="icon icon-left"></router-link>
            </header>
            <div class="content">
                <div class="center-content">
                    <div class="row-logo">
                        <span class="gxicon gxicon-wallet logo"></span>
                    </div>
                    <p>{{$t('about.version')}}</p>
                    <div class="app-intro text-center">
                        <p>{{$t('about.desc.line1')}}</p>
                        <p>{{$t('about.desc.line2')}}</p>
                        <p>{{$t('about.desc.line3')}}</p>
                    </div>
                </div>
                <div class="list-block">
                    <ul>
                        <li>
                            <router-link :to="linkDisclaimer" class="item-content item-link">
                                <div class="item-inner">
                                    <div class="item-title">{{$t('about.disclaimer')}}</div>
                                </div>
                            </router-link>
                        </li>
                    </ul>
                </div>
                <div class="copy-right">
                    <p>{{copyright}}</p>
                    <p>All rights reserved.</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {mapGetters} from 'vuex';

    export default {
        mounted () {
            $.init();
        },
        computed: {
            ...mapGetters({
                isNative: 'isNative'
            }),
            linkDisclaimer () {
                let query = $.extend({}, this.$route.query, {
                    from: this.$route.fullPath
                });
                return `/disclaimer?${$.param(query)}`;
            },
            copyright () {
                if (localStorage.getItem('version') === '1.2.0') {
                    return 'Copyright © 2018 Hangzhou Credit Data Technology CO., Ltd.';
                } else {
                    return 'Copyright © 2018 GXChain.';
                }
            }
        }
    };
</script>
<style scoped lang="scss">
    .page {
        display: flex;
        flex-direction: row;
        .content {
            display: flex;
            flex-direction: column;
            .center-content {
                flex: 1;
                align-items: center;
                display: flex;
                flex-direction: column;
                justify-content: center;
                min-height: 17.625rem;
                background: linear-gradient(to bottom, #150838 0%, #3853bc 49%, #18bce2 100%);
                color: #fff;
                .logo {
                    font-size: 6rem;
                }
                .app-intro {
                    p {
                        font-size: .65rem;
                        margin: .5rem 0;
                    }
                }
            }
            .list-block {
                flex: 1;
                margin-top: 0;
            }
            .copy-right {
                padding: .3rem;
                color: #999;
                font-size: .6rem;
                text-align: center;
                p {
                    margin: .3rem 0;
                }
            }
        }
    }
</style>
