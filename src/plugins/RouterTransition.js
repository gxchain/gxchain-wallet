export default {
    use (store, router, options) {
        const moduleName = (options || {}).moduleName || 'route';
        const initTransitionName = (options || {}).initTransitionName || '';
        const forwardTransitionName = (options || {}).forwardTransitionName || '';
        const backTransitionName = (options || {}).backTransitionName || '';
        store.registerModule(moduleName, {
            namespaced: true,
            state: {
                transitionName: initTransitionName
            },
            getters: {
                transitionName: state => state.transitionName
            },
            mutations: {
                'TRANSITION_CHANGED' (state, playload) {
                    store.state[moduleName].transitionName = playload.transitionName;
                }
            }
        });

        router.prototype.replace = function replace (location, onComplete, onAbort) {
            let transitionName = backTransitionName;
            if (location.query && (location.query.animate === 'false' || location.query.animate === false)) {
                transitionName = '';
            }
            store.commit(moduleName + '/TRANSITION_CHANGED', { transitionName: transitionName });
            this.history.replace(location, onComplete, onAbort);
        };

        router.prototype.push = function push (location, onComplete, onAbort) {
            let transitionName = forwardTransitionName;
            if (location.query && (location.query.animate === 'false' || location.query.animate === false)) {
                transitionName = '';
            }
            store.commit(moduleName + '/TRANSITION_CHANGED', { transitionName: transitionName });
            this.history.push(location, onComplete, onAbort);
        };
    }
};
