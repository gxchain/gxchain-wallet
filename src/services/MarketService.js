import Vue from 'vue'
const get_market_info = ()=>{
  return Vue.http.get(`${process.env.__SERVICE__}/exchange`).then(resp=>resp.data);
}

export {
  get_market_info
}
