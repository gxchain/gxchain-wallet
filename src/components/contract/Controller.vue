<template>
    <div class="wrapper">
        <component :is="componentType" :extra="extra"></component>
    </div>
</template>

<script>
    import Default from './Call.vue';
    import Transfer from './Trans.vue';
    import Contract from './Contract.vue';
    import Vote from './Vote.vue';
    import NoAccount from './NoAccount.vue';

    function getQueryObject (str) {
        try {
            return JSON.parse(str);
        } catch (err) {
        }
        return {};
    }

    export default {
        components: {
            default: Default,
            contract: Contract,
            transfer: Transfer,
            vote: Vote,
            noidentity: NoAccount
        },
        data () {
            return {
                componentType: 'default',
                extra: {}
            };
        },
        created () {
            this.componentType = this.$route.query.type || 'default';
            this.extra = getQueryObject(decodeURIComponent(this.$route.query.extra));
        }
    };
</script>
