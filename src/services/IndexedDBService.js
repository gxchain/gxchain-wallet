export default {
    indexedDB: window.indexedDB || window.webkitindexedDB || window.msIndexedDB || mozIndexedDB,
    openDB: function (dbname, version, db, newStore, callback) {
        var version = version || 1;
        var request = this.indexedDB.open(dbname, version);
        request.onerror = function (event) {
            console.log('open error');
        };
        request.onsuccess = function (event) {
            db = event.target.result;
            if (callback && (typeof callback === 'function')) {
                callback(db);
            }
        };
        request.onupgradeneeded = function (event) {
            var db = event.target.result;
            if (newStore) {
                if (!db.objectStoreNames.contains(newStore.name)) {
                    db.createObjectStore(newStore.name, {
                        keyPath: newStore.key,
                        // autoIncrement: true
                    });
                }
            }
        };
    },
    deleteDB: function (dbname, callback) {
        var deleteQuest = this.indexedDB.deleteDatabase(dbname);
        deleteQuest.onerror = function () {
            console.log('删除数据库出错');
        };
        deleteQuest.onsuccess = function () {
            if (callback && (typeof callback === 'function')) {
                callback();
            }
        }
    },
    closeDB: function (dbname) {
        dbname.close();
        console.log('db close');
    },
    addData: function (db, storename, dataArr, callback) {
        var store = db.transaction(storename, 'readwrite').objectStore(storename),
            request;
        for (var i = 0, len = dataArr.length; i < len; i++) {
            request = store.add(dataArr[i]);
            request.onerror = function () {
                console.error('add error');
            };
            request.onsuccess = function () {
                if (callback && (typeof callback === 'function')) {
                    callback();
                }
            };
        }
    },
    putJSON: function (db, storename, json, callback) {
        var store = db.transaction(storename, 'readwrite').objectStore(storename),
            request;
            request = store.put(json);
            request.onerror = function () {
                console.error('put error');
            };
            request.onsuccess = function () {
                if (callback && (typeof callback === 'function')) {
                    callback();
                }
            };
    },
    putData: function (db, storename, dataArr, callback) {
        var store = db.transaction(storename, 'readwrite').objectStore(storename),
            request;
        for (var i = 0, len = dataArr.length; i < len; i++) {
            request = store.put(dataArr[i]);
            request.onerror = function () {
                console.error('PUT添加数据报错');
            };
            request.onsuccess = function () {
                if (callback && (typeof callback === 'function')) {
                    callback();
                }
            };
        }
    },
    deleteData: function (db, storename, key) {
        var store = db.transaction(storename, 'readwrite').objectStore(storename);
        store.delete(key);
    },
    clearData: function (db, storename) {
        var store = db.transaction(storename, 'readwrite').objectStore(storename);
        store.clear();
    },
    getData: function (db, storename, key, callback) {
        var store = db.transaction(storename, 'readonly').objectStore(storename),
            request;
        request = store.get(key);
        request.onerror = function () {
            console.log('get data by key');
        };
        request.onsuccess = function (event) {
            var result = event.target.result;
            if (callback && (typeof callback === 'function')) {
                callback(result);
            }
        }
    },
    handleDataByCursor: function (db, storename, callback, keyRange) {
        var keyRange = keyRange || '';
        var store = db.transaction(storename, 'readwrite').objectStore(storename),
            request;
        request = store.openCursor(keyRange);
        request.onerror = function () {
            console.log('handleDataByCursor error');
        };
        request.onsuccess = function (event) {
            var cursor = event.target.result;
            if (cursor) {
                if (callback && (typeof callback === 'function')) {
                    callback(cursor);
                }
                // cursor.continue();
            }
        }
    },
    handleDataByIndex: function (db, storename, cursorIndex, callback, keyRange) {
        var keyRange = keyRange || '';
        var store = db.transaction(storename, 'readwrite').objectStore(storename),
            request;
        request = store.index(sursorIndex).openCursor(keyRange);
        request.onerror = function () {
            console.log('handleDataByIndex error');
        };
        request.onsuccess = function (event) {
            var cursor = event.target.result;
            if (cursor) {
                if (callback && (typeof callback === 'function')) {
                    callback(cursor);
                }
                // cursor.continue();
            }
        }
    },
    createCursorIndex: function (db, storename, cursorIndex, callback) {
        var store = db.transaction(storename, 'readwrite').objectStore(storename);
        store.createIndex(cursorIndex, cursorIndex, { unique: false });
        if (callback && (typeof callback === 'function')) {
            callback();
        }
    }
}
