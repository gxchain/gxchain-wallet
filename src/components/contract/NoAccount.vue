<template>
    <Modal class="gxb">
        <div class="header" slot="header">
            {{$t('pick_wallet.title.no_wallet')}}
            <div class="closeBtn" @click="onCancel()"></div>
        </div>
        <div class="body" slot="body">
            <div class="cont">
                <div class="pick-wallet">
                    <div class="empty-placeholder">
                        <i class="gxicon gxicon-bind"></i>
                        <p class="empty-tip">{{$t('pick_wallet.empty_tip') }}</p>
                    </div>
                </div>
            </div>
        </div>
    </Modal>
</template>

<script>
    import Modal from '@/components/sub/Modal.vue';
    import util from '@/common/util';

    export default {
        methods: {
            onCancel () {
                this.endContract({code: 0, msg: 'cancel'});
            },
            endContract (params) {
                util.callNative('endContract', params);
            }
        },
        components: {
            Modal
        }
    };
</script>

<style scoped lang="scss" type="text/scss">
    .gxb /deep/ .modal-wrapper {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        .modal-container {
            color: #333;
            background-color: #fff;
            padding: 0;

            .modal-header {

                .header {
                    position: relative;
                    padding: 15px 0;
                    margin: 0 15px;
                    border-bottom: 1px solid #ddd;
                    color: #344961;
                    text-align: center;
                    font-size: 16px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;

                    .closeBtn {
                        position: absolute;
                        top: 10px;
                        right: 10px;
                        width: 20px;
                        height: 20px;
                        background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAABPUlEQVRoQ+2XUQ6CQAxEy828iXoy9SbeTFMDyYaAtjOzEGL5UmPLvJntLgx28Gs4uH4rgL0TrAQqAdKBWkKkgXR5JUBbSDaoBEgD6fK/T+BuZi8zu4JWsvXUw5zf/DwK989ZCLb+c2tmCbUCvFcGYl77MLMLkiIDMImeUohCyMSzCUyGZZKQilcBRJOQi1cC/ILoIl4NsAbhc9bOCTywS0PODvFSz7nb7X+k4nsksDbY/rtc/NYAmXMifCRsvYTkEGqApd3G3cwedrsk8G2rzBx2YfHKGYjs810gFEsoIh557AglwQJkxHeBYAAQ8XIIBsCf32+jIuSQag3wlyH/nr4YAL+ZQ5zQl5FR9BMVr9yF0s6pCtgEVDrgPgUAWycqrARERsJtKgHYOlFhJSAyEm5TCcDWiQorAZGRcJs3kqZFMRtRkakAAAAASUVORK5CYII=");
                        background-size: 100% 100%;
                    }

                }
            }
            .modal-body {
                margin: 0;

                .body {
                    text-align: center;
                    font-size: .7rem;
                    line-height: 1.25rem;

                    .cont {
                        padding: 15px;
                        min-height: 36px;
                        position: relative;
                    }

                    .empty-placeholder {
                        margin-top: 1rem;
                    }

                    .gxicon-bind {
                        font-size: 4.5rem;
                        color: #d5d5d5;
                    }

                }
            }

            .modal-footer {
                display: none;
            }
            .icon-check {
                color: #6699ff;
                font-weight: bold;
            }

        }
    }

    @media (-webkit-min-device-pixel-ratio: 2), (min-device-pixel-ratio: 2) {
        .header {

            &::after {
                -webkit-transform: scaleY(0.5);
                transform: scaleY(0.5);
            }
        }

        .footer {

            &
            ::before {
                -webkit-transform: scaleY(0.5);
                transform: scaleY(0.5);
            }

        }
    }
</style>
