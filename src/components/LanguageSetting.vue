<template>
    <div class="page-group">
        <div class="page" id="page-language-setting">
            <header class="bar bar-nav">
                <h3 class="title">{{$t('language_setting.title')}}</h3>
                <router-link :to="link('/')" replace class="icon icon-left"></router-link>
            </header>
            <div class="content">
                <div class="list-block">
                    <ul>
                        <li v-for="language in languages" :key="language.id">
                            <a @click="switchLanguage(language.id)" class="item-content">
                                <div class="item-inner">
                                    <div class="item-title">{{language.text}}</div>
                                    <div class="item-after" v-if="language.id==_i18n.locale">
                                        <span class="icon icon-check"></span>
                                    </div>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {
        mapGetters
    } from 'vuex';
    import {
        set_item
    } from '@/services/CommonService';
    export default {
        data () {
            return {
                languages: [{
                    text: '简体中文',
                    id: 'zh-CN'
                },
                {
                    text: 'English',
                    id: 'en-US'
                }
                ]
            };
        },
        mounted () {
            $.init();
        },
        methods: {
            switchLanguage (locale) {
                this._i18n.locale = locale;
                set_item('_locale', locale);
            }
        },
        computed: {
            ...mapGetters({
                isNative: 'isNative'
            }),
            currentLanguage () {

            }
        }
    };
</script>
<style scoped lang="scss">
    .list-block {
        margin-top: 0;
    }

    .item-content {
        color: #3d3d3b;
        .icon-check {
            color: #6699ff;
        }
    }
</style>
