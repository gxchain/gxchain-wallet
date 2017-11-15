export default {
  use(store, router, options) {
    const moduleName = (options || {}).moduleName || 'route';
    const initTransitionName = (options || {}).initTransitionName || '';
    const fowardTransitionName = (options || {}).fowardTransitionName || '';
    const backTransitionName = (options || {}).backTransitionName || '';
    store.registerModule(moduleName, {
      namespaced: true,
      state: {
        transitionName: initTransitionName
      },
      getters: {
        transitionName: state => state.transitionName,
      },
      mutations: {
        'TRANSITION_CHANGED' (state, playload) {
          store.state[moduleName].transitionName = playload.transitionName
        }
      }
    });

    router.prototype.replace = function replace(location, onComplete, onAbort) {
      store.commit(moduleName + '/TRANSITION_CHANGED', {transitionName: backTransitionName});
      this.history.replace(location, onComplete, onAbort);
    };

    router.prototype.push = function push (location, onComplete, onAbort) {
      store.commit(moduleName + '/TRANSITION_CHANGED', {transitionName: fowardTransitionName});
      this.history.push(location, onComplete, onAbort);
    };
  }
}
