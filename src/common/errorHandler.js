const handler = function (resp, msg) {
    let data = resp.data;
    var message = data && (data.message || (data.error && data.error.base[0])) || msg || '服务请求失败,请重试';
    $.toast(message);
};

export default handler;
