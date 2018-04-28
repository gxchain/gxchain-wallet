<template>
    <nav class="bar bar-tab">
        <router-link replace :to="link('/',{animate:false})"
                     :class="isActive(['WalletIndex']) ? 'tab-item external router-link-exact-active' : 'tab-item external'">
            <span class="icon gxicon gxicon-miner"></span>
            <span class="tab-label">{{$t('tabs.wallet')}}</span>
        </router-link>
        <router-link replace :to="link('/market',{animate:false})"
                     :class="isActive(['Market']) ? 'tab-item external router-link-exact-active' : 'tab-item external'">
            <span class="icon gxicon gxicon-blockcity"></span>
            <span class="tab-label">{{$t('tabs.market')}}</span>
        </router-link>
    </nav>
</template>
<script>
    export default {
        methods: {
            isActive (name) {
                const names = name instanceof Array ? name : [name];
                return names.some(name => {
                    return this.$route.name == name; // current path starts with this path string
                });
            }
        }
    };
</script>
<style scoped="">
    .router-link-exact-active {
        color: #6699ff;
    }
</style>
