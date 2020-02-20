<template>
    <nav class="bar bar-tab">
        <router-link replace :to="link('/',{animate:false})"
                     :class="isActive(['WalletIndex']) ? 'tab-item external router-link-exact-active' : 'tab-item external'">
            <span class="icon gxicon gxicon-balance"></span>
            <span class="tab-label">{{$t('tabs.wallet')}}</span>
        </router-link>
        <router-link replace :to="link('/staking-index',{animate:false})"
                     :class="isActive(['StakingIndex']) ? 'tab-item external router-link-exact-active' : 'tab-item external'">
            <span class="icon gxicon gxicon-staking"></span>
            <span class="tab-label">{{$t('tabs.staking')}}</span>
        </router-link>
        <router-link replace :to="link('/my-index',{animate:false})"
                     :class="isActive(['MyIndex']) ? 'tab-item external router-link-exact-active' : 'tab-item external'">
            <span class="icon gxicon gxicon-my"></span>
            <span class="tab-label">{{$t('tabs.my')}}</span>
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
        color: #6699ff !important;
    }
</style>
