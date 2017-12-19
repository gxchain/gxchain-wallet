let fallbackStore = {};
export const set_item = (key, val) => {
    try {
        localStorage.setItem(key, val);
    } catch (ex) {
        console.log('fallback to memory store');
        fallbackStore[key] = val;
    }
};

export const get_item = (key) => {
    try {
        return localStorage.getItem(key);
    } catch (ex) {
        return fallbackStore[key];
    }
};
