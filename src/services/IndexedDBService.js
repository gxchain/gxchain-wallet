import Promise from 'bluebird';
export default {
    indexedDB: window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB,
    openDB: function (dbname, version, db, newStore) {
        return new Promise(function (resolve, reject) {
            var version = version || 1;
            var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
            var request = indexedDB.open(dbname, version);
            request.onerror = function (event) {
                reject(new Error('open db error'));
            };
            request.onsuccess = function (event) {
                db = event.target.result;
                resolve(db);
            };
            request.onupgradeneeded = function (event) {
                var db = event.target.result;
                if (newStore) {
                    if (!db.objectStoreNames.contains(newStore.name)) {
                        db.createObjectStore(newStore.name, {
                            keyPath: newStore.key
                            // autoIncrement: true
                        });
                    }
                }
            };
        });
    },
    closeDB: function (dbname) {
        dbname.close();
    },
    putJSON: function (db, storename, json) {
        return new Promise(function (resolve, reject) {
            var store = db.transaction(storename, 'readwrite').objectStore(storename);
            var request;
            request = store.put(json);
            request.onerror = function () {
                reject(new Error('put json error'));
            };
            request.onsuccess = function () {
                resolve();
            };
        });
    },
    getData: function (db, storename, key) {
        return new Promise(function (resolve, reject) {
            var store = db.transaction(storename, 'readonly').objectStore(storename);
            var request;
            request = store.get(key);
            request.onerror = function () {
                console.log('get data error');
                reject(new Error('get data error'));
            };
            request.onsuccess = function (event) {
                var result = event.target.result;
                resolve(result);
            };
        });
    }
};
