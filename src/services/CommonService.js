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

export const accMult = (arg1, arg2) => {
    let m = 0;
    let s1 = arg1.toString();
    let s2 = arg2.toString();
    try {
        m += s1.split('.')[1].length;
    } catch (e) {
    }
    try {
        m += s2.split('.')[1].length;
    } catch (e) {
    }
    return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m);
};

export const accSub = (arg1, arg2) => {
    let r1, r2, m, n;
    try {
        r1 = arg1.toString().split('.')[1].length;
    } catch (e) {
        r1 = 0;
    }
    try {
        r2 = arg2.toString().split('.')[1].length;
    } catch (e) {
        r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    n = (r1 >= r2) ? r1 : r2;
    return ((arg1 * m - arg2 * m) / m).toFixed(n);
};
