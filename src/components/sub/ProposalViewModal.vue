<template>
    <div class="popup popup-vote-confirm">
        <div class="bar bar-nav normal-nav">
            <h3 class="title">
                {{$t('proposals.viewProposal')}}
            </h3>
            <a href="javascript:;" class="pull-right icon icon-close close-popup" @click="cancel">&times;</a>
        </div>
        <div class="content">
            <div class="list-block">
                <json :json="proposal" ></json>
            </div>
            <div class="content-block button-block">
                <p>
                    <a href="javascript:;" @click="cancel" class="button button-gxb">
                        <div class="line-scale-pulse-out" v-if="submitting">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                        <span v-if="!submitting">{{$t('node_vote.confirm.btn_confirm')}}</span>
                    </a>
                </p>
            </div>
        </div>
    </div>
</template>
<script>
    import filters from '@/filters';
    import Json from '@/components/sub/Json.vue';

    export default {
        name: 'proposalViewModal',
        filters,
        components: {
            Json
        },
        data () {
            return {
                submitting: false
            };
        },
        props: {
            proposal: {
                type: Object
            }
        },
        methods: {
            show () {
                this.submitting = false;
                $.popup($(this.$el));
            },
            onConfirm () {
                if (!this.currentPayAccount) {
                    $.toast(this.$t('proposals.please_select_account'));
                    return;
                }
                if (!this.currentApprovalAccount) {
                    $.toast(this.$t('proposals.please_select_account'));
                    return;
                }
                if (this.submitting) {
                    return;
                }
                this.submitting = true;
                this.$emit('onApproval', this.currentPayAccount, this.currentApprovalAccount);
            },
            cancel () {
                this.submitting = false;
                $.closeModal($(this.$el));
            }
        }
    };
</script>
<style lang="scss" scoped>
    .tips{
        color:#999;
        font-size: .7rem;
    }
    .asset {
        font-family: bebas;
        font-size: 1.1rem;
        color: #6699ff;
    }

    .bar-nav {
        background: transparent;
        .title {
            font-weight: normal;
            color: #3d3d3b;
        }
        .icon {
            color: #3d3d3b;
        }
    }

    .popup-vote-confirm {
        max-height: 27rem;
        bottom: 0;
        top: initial;
        background: #fff;
        transition-duration: .2s;
    }
    .selected-votes {
        max-height: 7rem;
        width: 10rem;
        margin: 0;
        white-space: pre-wrap;
        word-wrap: break-word;
        text-align: right;
    }

    .tip-error {
        word-break: break-all;
    }
    .list-block{
      margin: .6rem;
    }
</style>
