<template>
    <canvas v-if="!imgShow" ref="canvas" :style="{width:size,height:size}" :width="size * 2" :height="size * 2" :data-jdenticon-hash="hash"></canvas>
    <img v-else :src="imgSrc" :style="{width:size,height:size}" :width="size * 2" :height="size * 2"/>
</template>
<script>
    import jdenticon from 'jdenticon';
    import sha256 from 'js-sha256';

    export default {
        props: {
            size: {
                type: Number,
                default: 30
            },
            account: {
                type: String,
                default: ''
            }
        },
        data () {
            return {
                imgShow: false,
                imgSrc: ''
            };
        },
        computed: {
            hash: function () {
                return this.account ? sha256(this.account) : '';
            }
        },
        watch: {
            account () {
                this.drawCanvas();
            },
            size () {
                this.drawCanvas();
            }
        },
        methods: {
            drawCanvas () {
                if ((this.account === 'GXS') || (this.account === 'GXC')) {
                    this.imgShow = true;
                    if (this.account === 'GXS') {
                        this.imgSrc = 'https://gxs-wallet.oss-cn-shanghai.aliyuncs.com/symbols/gxs.png';
                    }
                    if (this.account === 'GXC') {
                        this.imgSrc = 'https://gxs-wallet.oss-cn-shanghai.aliyuncs.com/symbols/gxc.png';
                    }
                } else {
                    this.imgShow = false;
                    if (this.account) {
                        jdenticon.update(this.$refs.canvas, this.hash, 0);
                    } else {
                        let ctx = this.$refs.canvas.getContext('2d');
                        ctx.fillStyle = 'rgba(100, 100, 100, 0.5)';
                        let size = ctx.canvas.width;
                        ctx.clearRect(0, 0, size, size);
                        ctx.fillRect(0, 0, size, size);
                        ctx.clearRect(0 + 1, 0 + 1, size - 2, size - 2);
                        ctx.font = `${size}px sans-serif`;
                        ctx.fillText('?', size / 4, size - size / 6);
                    }
                }
            }
        },
        mounted () {
            this.drawCanvas();
        }
    };
</script>
