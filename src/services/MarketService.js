import Vue from 'vue';

const get_market_info = (version) => {
    return Vue.http.get(`${process.env.__SERVICE__}/exchange`, {
        params: {
            version
        }
    }).then(resp => resp.data);
};
const get_realtime_quotation = (name, symbol) => {
    return Vue.http.get(`${process.env.__SERVICE__}/exchange/${name}/${symbol}`).then(resp => resp.data);
};
const get_chart_data = (name, symbol, interval) => {
    return Vue.http.get(`${process.env.__SERVICE__}/kline/${name}/${symbol}`, { params: { interval: interval } }).then(resp => resp.data);
};
const get_need_memo_accounts = () => {
    return Vue.http.get(`${process.env.__SERVICE__}/customer/withdraw/need/memo`);
};
const get_market_asset_price = (symbols) => {
    return Vue.http.getX(`${process.env.__SERVICE__}/market/asset/price`, {
        params: {
            symbols
        }
    }).then(resp => resp.data.data);
};
const get_market_asset_list = () => {
    return Vue.http.getX(`${process.env.__SERVICE__}/market/asset/list`).then(resp => resp.data.data);
};

export {
    get_market_info,
    get_realtime_quotation,
    get_chart_data,
    get_need_memo_accounts,
    get_market_asset_price,
    get_market_asset_list
};
