import Vue from 'vue';
const get_market_info = () => {
    return Vue.http.get(`${process.env.__SERVICE__}/exchange`).then(resp => resp.data);
};
const get_realtime_quotation = (name, symbol) => {
    return Vue.http.get(`${process.env.__SERVICE__}/exchange/${name}/${symbol}`).then(resp => resp.data);
};
const get_chart_data = (name, symbol, interval) => {
    return Vue.http.get(`${process.env.__SERVICE__}/kline/${name}/${symbol}`, { params: { interval: interval } }).then(resp => resp.data);
};

export {
    get_market_info,
    get_realtime_quotation,
    get_chart_data
};
