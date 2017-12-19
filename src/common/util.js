export default {
    query2Obj: function (query) {
        var url = query || location.search;
        var result = url.match(new RegExp('[\?\&][^\?\&]+=[^\?\&]+', 'g')) || [];
        var obj = {};
        for (var i = 0; i < result.length; i++) {
            result[i] = result[i].substring(1);
            var splits = result[i].split('=');
            if (splits.length > 2) {
                splits[1] = result[i].substr(result[i].indexOf('=') + 1);
            }
            obj[splits[0]] = splits[1];
        }
        return obj;
    }
};
