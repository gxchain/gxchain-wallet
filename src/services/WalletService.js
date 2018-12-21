import {Aes, key, PrivateKey, TransactionBuilder, TransactionHelper} from 'gxbjs';
import {Apis} from 'gxbjs-ws';
import Promise from 'bluebird';
import uniq from 'lodash/uniq';
import some from 'lodash/some';
import map from 'lodash/map';
import flatten from 'lodash/flatten';
import unionBy from 'lodash/unionBy';
import Vue from 'vue';
import i18n from '@/locales';
import find from 'lodash/find';
import util from '@/common/util';
import {accMult} from './CommonService';

/**
 * get objects by id
 * @param ids
 */
const get_objects = (ids) => {
    return Apis.instance().db_api().exec('get_objects', [ids]);
};

/**
 * get asset by symbol
 * @param {*} symbol
 */
const get_asset = (symbol) => {
    return Apis.instance().db_api().exec('lookup_asset_symbols', [[symbol]]);
};

let assetsMap = {};
/***
 * get assets by ids
 * @param ids
 * @returns {bluebird}
 */
const get_assets_by_ids = (ids) => {
    return new Promise(function (resolve, reject) {
        let new_ids = [];
        ids.forEach(id => {
            if (!assetsMap[id]) {
                new_ids.push(id);
            }
        });
        if (new_ids.length > 0) {
            return get_objects(new_ids).then(assets => {
                assets.forEach(asset => {
                    assetsMap[asset.id] = asset;
                });
                resolve(ids.map(id => {
                    return assetsMap[id];
                }));
            }).catch(reject);
        } else {
            resolve(ids.map(id => {
                return assetsMap[id];
            }));
        }
    });
};

/***
 * get fee list
 */
const get_fee_list = () => {
    return [
        {id: '1.3.1', precision: 5, symbol: 'GXS'},
        {id: '1.3.1', precision: 5, symbol: 'GXC'}
    ];
};

/**
 * get account information by name
 * @param account_name
 */
const fetch_account = (account_name) => {
    return Apis.instance().db_api().exec('get_account_by_name', [account_name]);
};

/**
 * get accounts by names
 * @param account_names
 */
const fetch_accounts = (account_names) => {
    return Apis.instance().db_api().exec('lookup_account_names', [account_names]);
};

const fetch_full_account = (account) => {
    return Apis.instance().db_api().exec('get_full_accounts', [[account], true]);
};

/**
 * fetch account histories by account name
 * @param account_name
 * @returns {Promise.<TResult>|*}
 */
const fetch_account_history = (account_name) => {
    return fetch_account(account_name).then((account) => {
        return Apis.instance().history_api().exec('get_account_history', [account.id, '1.11.0', 100, '1.11.0']);
    });
};

/**
 * fetch brain key dictionary
 * @returns {bluebird}
 */
const fetch_dictionary = () => {
    return new Promise((resolve, reject) => {
        resolve(Vue.http.get(`${process.env.__HOST__.replace('/#', '')}/static/dictionary_en.json`).then((resp) => {
            return resp.data.en;
        }));
    });
};

/**
 * get wallets from local storage
 */
const get_wallets = () => {
    let wallets = localStorage.getItem(`gxb_wallets_${Apis.instance().chain_id || process.env.chain_id}`);
    if (!wallets) {
        wallets = [];
    } else {
        wallets = JSON.parse(wallets);
    }
    return wallets;
};

const bak_wallet = () => {
    let localStorageWallets = get_wallets();
    if (!(localStorage.getItem(`gxb_wallets_bak3_${Apis.instance().chain_id || process.env.chain_id}`))) {
        localStorage.setItem(`gxb_wallets_bak3_${Apis.instance().chain_id || process.env.chain_id}`, JSON.stringify(localStorageWallets));
    }
};

const merge_wallets = () => {
    return new Promise((resolve, reject) => {
        let chain_id = Apis.instance().chain_id || process.env.chain_id;
        let query = util.query2Obj(location.hash);
        let isNative = query.platform === 'ios' || query.platform === 'android';
        if (isNative) {
            get_wallet_native().then((wallets_native) => {
                let localStorageWallets = get_wallets();
                let unionWallets = unionBy(localStorageWallets, wallets_native, 'account');
                localStorage.setItem(`gxb_wallets_${chain_id}`, JSON.stringify(unionWallets));
                resolve();
            }).catch(ex => {
                console.error('failed when merge wallets from native', ex);
                reject(ex);
            });
        } else {
            resolve();
        }
    });
};

/**
 * save wallets to native storage
 * @param wallets
 * @returns {bluebird}
 */
const set_wallet_native = (wallets) => {
    return new Promise((resolve, reject) => {
        let query = util.query2Obj(location.hash);
        let pluginName = 'AppConfig';
        if (query.platform === 'ios') {
            pluginName = 'KV';
        }
        cordova.exec(function () { //eslint-disable-line
            console.log('wallets have been save to native storage successfully');
            resolve();
        }, function () {
            reject();
        }, pluginName, 'set', [`gxb_wallets_${Apis.instance().chain_id || process.env.chain_id}`, JSON.stringify(wallets)]);
    });
};

/**
 * load wallets from native storage
 * @returns {bluebird}
 */
const get_wallet_native = () => {
    return new Promise((resolve, reject) => {
        let query = util.query2Obj(location.hash);
        let pluginName = 'AppConfig';
        if (query.platform === 'ios') {
            pluginName = 'KV';
        }
        cordova.exec(function (result) { //eslint-disable-line
            console.log('wallets from native storage:', result);
            let wallets_str = ((result && typeof result === 'string') ? result : '[]') || '[]';
            let wallets = result instanceof Array ? result : JSON.parse(wallets_str);
            resolve(wallets);
        }, function () {
            reject();
        }, pluginName, 'get', [`gxb_wallets_${Apis.instance().chain_id || process.env.chain_id}`]);
    });
};

/**
 * save wallets into local storage
 * @param wallets
 */
const set_wallets = (wallets) => {
    return new Promise((resolve, reject) => {
        localStorage.setItem(`gxb_wallets_${Apis.instance().chain_id || process.env.chain_id}`, JSON.stringify(wallets));
        try {
            set_wallet_native(wallets);
        } catch (ex) {
            reject(ex);
        } finally {
            resolve();
        }
    });
};

/**
 * get index of current wallet
 * @returns {number}
 */
const get_wallet_index = () => {
    let wallets = get_wallets();
    let index = localStorage.getItem(`gxb_wallet_index_${Apis.instance().chain_id || process.env.chain_id}`);
    if (!index) {
        return 0;
    }
    index = Number(index);
    if ((index + 1) > wallets.length) {
        set_wallet_index(wallets.length - 1);
        return wallets.length - 1;
    }
    return index;
};

/**
 * save wallet index to native storage
 * @param index
 * @returns {bluebird}
 */
const set_wallet_index_native = (index) => {
    return new Promise((resolve, reject) => {
        let query = util.query2Obj(location.hash);
        let chain_id = Apis.instance().chain_id || process.env.chain_id;
        let pluginName = 'AppConfig';
        if (query.platform === 'ios') {
            pluginName = 'KV';
        }
        cordova.exec(function () { //eslint-disable-line
            console.log('wallet index have been save to native storage successfully');
            resolve();
        }, function () {
            reject();
        }, pluginName, 'set', [`gxb_wallet_index_${chain_id}`, index]);
    });
};

/**
 * set index of current wallet
 * @param index
 */
const set_wallet_index = (index) => {
    index = Number(index);
    let wallets = get_wallets();
    localStorage.setItem(`gxb_wallet_index_${Apis.instance().chain_id || process.env.chain_id}`, Math.min(wallets.length - 1, index));
    set_wallet_index_native(Math.min(wallets.length - 1, index));
};

/**
 * get disclaimer accepted
 * @returns {boolean}
 */
const get_disclaimer_accepted = () => {
    let result = localStorage.getItem(`gxb_disclaimer_accepted_${Apis.instance().chain_id || process.env.chain_id}`);
    return !!Number(result);
};

/**
 * set disclaimer accepted
 * @param accepted
 */
const set_disclaimer_accepted = (accepted) => {
    if (accepted) {
        localStorage.setItem(`gxb_disclaimer_accepted_${Apis.instance().chain_id || process.env.chain_id}`, accepted ? 1 : 0);
    } else {
        localStorage.removeItem(`gxb_disclaimer_accepted_${Apis.instance().chain_id || process.env.chain_id}`);
    }
};

/**
 * update wallet in local storage
 * @param wallet
 */
const update_wallet = (wallet) => {
    return new Promise((resolve, reject) => {
        let wallets = get_wallets();
        let updated = 0; // eslint-disable-line
        wallets = wallets.map((w) => {
            if (w.account == wallet.account) {
                updated += 1;
                return wallet;
            }
            return w;
        });
        return set_wallets(wallets).then(() => {
            resolve();
        });
    });
};

/**
 * del wallet from local storage
 * @param wallet
 */
const del_wallet = (wallet) => {
    return new Promise((resolve, reject) => {
        let wallets = get_wallets();
        for (let i = 0; i < wallets.length; i++) {
            if (wallet.account === wallets[i].account) {
                wallets.splice(i, 1);
            }
        }
        return set_wallets(wallets).then(() => {
            resolve();
        });
    });
};

/**
 * unlock wallet
 * @param account
 * @param password
 * @returns {bluebird}
 */
const unlock_wallet = (account, password) => {
    return new Promise((resolve, reject) => {
        let wallets = get_wallets();
        let wallet = find(wallets, function (w) {
            return w.account == account;
        });
        let password_private = PrivateKey.fromSeed(password);
        let password_pubkey = password_private.toPublicKey().toPublicKeyString(); // used to validate password
        if (wallet == null) {
            reject(new Error(i18n.t('unlock.account_not_found')));
        } else if (password_pubkey != wallet.password_pubkey) {
            reject(new Error(i18n.t('unlock.error.invalid_password')));
        } else {
            let password_aes = Aes.fromSeed(password);
            let encryption_plainbuffer = password_aes.decryptHexToBuffer(wallet.encryption_key);
            let aes_private = Aes.fromSeed(encryption_plainbuffer);
            let wifKey = aes_private.decryptHexToText(wallet.encrypted_wifkey);
            resolve({
                wifKey,
                wallet
            });
        }
    });
};

/**
 * import account into wallet by passing wif key and password
 * @param wifKey
 * @param password
 * @returns {bluebird}
 */
const import_account = (wifKey, password) => {
    return new Promise((resolve, reject) => {
        let password_aes = Aes.fromSeed(password);
        let encryption_buffer = key.get_random_key().toBuffer();
        let encryption_key = password_aes.encryptToHex(encryption_buffer);
        let local_aes_private = Aes.fromSeed(encryption_buffer);
        let encrypted_wifkey = local_aes_private.encryptToHex(wifKey);
        let password_private = PrivateKey.fromSeed(password);
        let password_pubkey = password_private.toPublicKey().toPublicKeyString(); // used to validate password

        let imported = [];
        let exist = [];

        let private_key = PrivateKey.fromWif(wifKey);
        let public_key = private_key.toPublicKey().toPublicKeyString();
        resolve(Apis.instance().db_api().exec('get_key_references', [[public_key]]).then((resp) => {
            if (resp.length > 0) {
                return uniq(resp[0]);
            } else {
                throw new Error(i18n.t('wallet_import.error.account_not_found'));
            }
        }).then((account_ids) => {
            return Apis.instance().db_api().exec('get_objects', [account_ids]).then((accounts) => {
                if (accounts.length > 0) {
                    let wallets = get_wallets();
                    accounts.forEach((account) => {
                        let weight_threshold = account.active.weight_threshold;
                        // available key should have enough weight
                        let isKeyAvailable = some(account.active.key_auths, function (key) {
                            if (key[0] == public_key && key[1] >= weight_threshold) {
                                return true;
                            }
                            return false;
                        });
                        if (isKeyAvailable) {
                            let alreadyExist = some(wallets, function (wallet) {
                                return wallet.account == account.name;
                            });
                            let wallet = {
                                account: account.name,
                                password_pubkey,
                                encryption_key,
                                encrypted_wifkey,
                                backup_date: null
                            };
                            if (!alreadyExist) {
                                wallets.push(wallet);
                                imported.push(wallet);
                            } else {
                                wallets = map(wallets, w => {
                                    if (w.account === account.name) {
                                        return wallet;
                                    }
                                    return w;
                                });
                                imported.push(wallet);
                                // console.log('account:', account.name, 'already exist');
                                // exist.push({
                                //     account: account.name
                                // });
                            }
                        }
                    });
                    if (imported.length > 0) {
                        set_wallets(wallets);
                        localStorage.setItem(`gxb_wallet_index_${Apis.instance().chain_id || process.env.chain_id}`, wallets.length - 1);
                    }
                    return {
                        imported,
                        exist
                    };
                } else {
                    throw new Error(i18n.t('wallet_import.error.account_not_found'));
                }
            });
        }));
    });
};

/**
 * fetch accounts by public keys
 * @param publicKeys
 */
const fetch_reference_accounts = (account_names) => {
    return new Promise((resolve, reject) => {
        fetch_accounts(account_names).then((accounts) => {
            let accountArr = [];
            accounts.forEach(account => {
                accountArr.push({
                    account_id: account.id,
                    name: account.name,
                    public_key: account.active.key_auths[0][0]
                });
            });
            let uniqPublickeys = uniq(accountArr.map(item => item.public_key));
            Apis.instance().db_api().exec('get_key_references', [uniqPublickeys]).then((resp) => {
                if (resp.length > 0) {
                    let account_maps = {};
                    resp.forEach((ids, i) => {
                        ids.forEach(id => {
                            account_maps[id] = uniqPublickeys[i];
                        });
                    });
                    let account_ids = uniq(flatten(resp));
                    let new_account_ids = account_ids.filter(account_id => {
                        return !some(accountArr, (item) => {
                            return item.account_id == account_id;
                        });
                    });
                    get_objects(new_account_ids).then(function (accounts) {
                        let wallets = get_wallets();
                        accounts.forEach((account) => {
                            let alreadyExist = some(wallets, function (wallet) {
                                return wallet.account == account.name;
                            });
                            if (!alreadyExist) {
                                let publicKey = account_maps[account.id];
                                let sameAccountName = accountArr.find(account => account.public_key === publicKey).name;
                                let wallet = JSON.parse(JSON.stringify(wallets.find(wallet => wallet.account === sameAccountName)));
                                wallet.account = account.name;
                                let weight_threshold = account.active.weight_threshold;
                                // available key should have enough weight
                                let isKeyAvailable = some(account.active.key_auths, function (key) {
                                    if (key[0] == publicKey && key[1] >= weight_threshold) {
                                        return true;
                                    }
                                    return false;
                                });
                                wallet.partial = !isKeyAvailable;
                                wallets.push(wallet);
                            }
                        });
                        set_wallets(wallets);
                        resolve(wallets);
                    }).catch(reject);
                } else {
                    throw new Error(i18n.t('wallet_import.error.account_not_found'));
                }
            }).catch(reject);
        }).catch(reject);
    });
};

/**
 * create an account by faucet api and import
 * @param account
 * @param password
 * @returns {bluebird}
 */
const create_account = (account, password) => {
    return new Promise((resolve, reject) => {
        resolve(fetch_dictionary().then((dictionary) => {
            let brainKey = key.suggest_brain_key(dictionary);
            let privateKey = key.get_brainPrivateKey(brainKey);
            let publicKey = privateKey.toPublicKey().toPublicKeyString();
            return Vue.http.post(`${process.env.faucet_addr}/account/register`, {
                account: {
                    name: account,
                    owner_key: publicKey,
                    active_key: publicKey
                }
            }).then((resp) => {
                let wallets = get_wallets();
                let wifKey = privateKey.toWif();
                let password_aes = Aes.fromSeed(password);
                let encryption_buffer = key.get_random_key().toBuffer();
                let encryption_key = password_aes.encryptToHex(encryption_buffer);
                let local_aes_private = Aes.fromSeed(encryption_buffer);
                let encrypted_wifkey = local_aes_private.encryptToHex(wifKey);
                let password_private = PrivateKey.fromSeed(password);
                let password_pubkey = password_private.toPublicKey().toPublicKeyString(); // used to validate password
                let wallet = {
                    account: account,
                    password_pubkey,
                    encryption_key,
                    encrypted_wifkey,
                    backup_date: null
                };
                wallets.push(wallet);
                set_wallets(wallets);
                localStorage.setItem(`gxb_wallet_index_${Apis.instance().chain_id || process.env.chain_id}`, wallets.length - 1);
                return wallet;
            });
        }));
    });
};

/**
 * fetch account balance of GXS by account name or id
 * @param account_name
 * @returns {bluebird}
 */
const fetch_account_balance = (account_name) => {
    return new Promise((resolve, reject) => {
        resolve(fetch_account(account_name).then((account) => {
            return Apis.instance().db_api().exec('get_account_balances', [account.id, ['1.3.1']]).then(function (balances) {
                return balances && balances.length > 0 ? balances[0] : {amount: 0, asset_id: '1.3.1'};
            });
        }));
    });
};

/**
 * fetch account balances by account name or id
 * @param account_name
 * @returns {bluebird}
 */
const fetch_account_balances = (account_name) => {
    return new Promise((resolve, reject) => {
        resolve(fetch_account(account_name).then((account) => {
            return Apis.instance().db_api().exec('get_account_balances', [account.id, []]).then(function (balances) {
                if (balances && balances.length > 0) {
                    // GXC order first
                    if (balances[1] && balances[1].asset_id === '1.3.1') {
                        let tmpObj = balances[0];
                        balances[0] = balances[1];
                        balances[1] = tmpObj;
                    }
                    return balances;
                } else {
                    return [{amount: 0, asset_id: '1.3.1'}];
                }
            });
        }));
    });
};

/**
 * send GXC to another account
 * @param from
 * @param to
 * @param amount
 * @param memo
 * @param password
 * @returns {*}
 */
const transfer = (from, to, asset, fee_id, amount, memo, password, broadcast = true) => {
    return new Promise((resolve, reject) => {
        resolve(Promise.all([fetch_account(from), fetch_account(to), unlock_wallet(from, password)]).then(results => {
            let fromAcc = results[0];
            if (!fromAcc) {
                throw new Error(i18n.t('transfer.error.account.from_account_not_exist'));
            }
            let toAcc = results[1];
            if (!toAcc) {
                throw new Error(i18n.t('transfer.error.account.to_account_not_exist'));
            }

            let memo_from_public, memo_to_public;
            if (memo) {
                memo_from_public = fromAcc.options.memo_key;

                // The 1s are base58 for all zeros (null)
                if (/111111111111111111111/.test(memo_from_public)) {
                    memo_from_public = null;
                }

                memo_to_public = toAcc.options.memo_key;
                if (/111111111111111111111/.test(memo_to_public)) {
                    memo_to_public = null;
                }
                let fromPrivate = PrivateKey.fromWif(results[2].wifKey);
                if (memo_from_public != fromPrivate.toPublicKey().toPublicKeyString()) {
                    throw new Error(i18n.t('transfer.error.account.memo_signer_not_exist'));
                }
            }

            let memo_object;
            if (memo && memo_to_public && memo_from_public) {
                let nonce = TransactionHelper.unique_nonce_uint64();
                memo_object = {
                    from: memo_from_public,
                    to: memo_to_public,
                    nonce,
                    message: Aes.encrypt_with_checksum(
                        PrivateKey.fromWif(results[2].wifKey),
                        memo_to_public,
                        nonce,
                        new Buffer(memo, 'utf-8')
                    )
                };
            }

            let tr = new TransactionBuilder();
            tr.add_operation(tr.get_type_operation('transfer', {
                fee: {
                    amount: 0,
                    asset_id: fee_id
                },
                from: fromAcc.id,
                to: toAcc.id,
                amount: {amount: accMult(amount, Math.pow(10, asset.precision)), asset_id: asset.id},
                memo: memo_object
            }));
            return process_transaction(tr, from, password, broadcast);
        }));
    });
};

/**
 * lock balance to join loyalty program
 * @param program_id
 * @param account_id
 * @param amount
 * @param rate
 * @param lock_days
 * @param memo
 * @param password
 * @param broadcast
 * @returns {Promise.<TResult>|*}
 */
const lock_balance = (program_id, account, amount, rate, lock_days, memo = '', password, broadcast) => {
    return Promise.all([
        get_objects(['2.1.0']),
        fetch_account(account)
    ]).then(function (resp) {
        let time = resp[0][0].time;
        if (!/Z$/.test(time)) {
            time += 'Z';
        }
        let tr = new TransactionBuilder();
        tr.add_operation(tr.get_type_operation('balance_lock', {
            fee: {
                amount: 0,
                asset_id: '1.3.1'
            },
            account: resp[1].id,
            lock_days: lock_days,
            create_date_time: new Date(time),
            program_id: program_id,
            amount: {
                amount: amount,
                asset_id: '1.3.1'
            },
            interest_rate: rate,
            memo: memo
        }));
        return process_transaction(tr, account, password, broadcast);
    });
};

/**
 * unlock account balance for loyalty program
 * @param lock_id
 * @param account
 * @returns {Promise.<TResult>|*}
 */
const unlock_balance = (lock_id, account, password, broadcast) => {
    return fetch_account(account).then(acc => {
        let tr = new TransactionBuilder();
        tr.add_operation(tr.get_type_operation('balance_unlock', {
            fee: {
                amount: 0,
                asset_id: '1.3.1'
            },
            account: acc.id,
            lock_id: lock_id
        }));
        return process_transaction(tr, account, password, broadcast);
    });
};

/**
 * process transaction
 * @param tr
 * @param account
 * @param password
 * @returns {bluebird}
 */
const process_transaction = (tr, account, password, broadcast) => {
    let walletInfo = null;
    return new Promise((resolve, reject) => {
        resolve(unlock_wallet(account, password).then(info => {
            walletInfo = info;
            return Promise.all([tr.update_head_block(), tr.set_required_fees()]).then(() => {
                tr.add_signer(PrivateKey.fromWif(walletInfo.wifKey));
                if (broadcast) {
                    return tr.broadcast();
                } else {
                    return tr;
                }
            });
        }));
    });
};

/**
 * fetch block info
 * @param block_num
 */
const fetch_block = (block_num) => {
    return Apis.instance().db_api().exec('get_block', [block_num]);
};

/**
 * get trust nodes
 * @returns {*}
 */
const get_trust_nodes = () => {
    return new Promise((resolve, reject) => {
        Apis.instance().db_api().exec('get_trust_nodes', []).then((nodes) => {
            let accounts = [];
            for (let i = 0; i < nodes.length; i++) {
                Promise.all([
                    Apis.instance().db_api().exec('get_witness_by_account', [nodes[i]]),
                    Apis.instance().db_api().exec('get_committee_member_by_account', [nodes[i]])
                ]).then(results => {
                    let account = results[0];
                    account.vote_ids = [account.vote_id, results[1].vote_id];
                    Apis.instance().db_api().exec('get_objects', [[account.witness_account]]).then(res => {
                        account.name = res[0].name;
                        accounts.push(account);
                        if (accounts.length === nodes.length) {
                            resolve(accounts);
                        }
                    }).catch(ex => {
                        reject(ex);
                    });
                }).catch(ex => {
                    reject(ex);
                });
            }
        }).catch(ex => {
            reject(ex);
        });
    });
};

/**
 * vote for accounts
 * @param account_ids - An array of account_id to vote
 * @param fee_paying_asset - The asset to pay the fee
 * @param broadcast
 * @returns {Promise<any>}
 */
const vote_for_accounts = (accounts, fee_paying_asset = 'GXC', account, proxy_account, password, broadcast = false) => {
    return new Promise((resolve, reject) => {
        resolve(Promise.all([
            fetch_account(account),
            get_objects(['2.0.0']),
            get_asset(fee_paying_asset)
        ]).then(results => {
            let acc = results[0];
            let globalObject = results[1][0];
            let fee_asset = results[2][0];
            if (!acc) {
                throw Error(`account_id ${account} not exist`);
            }
            if (!fee_asset) {
                throw Error(`asset ${fee_paying_asset} not exist`);
            }

            let new_options = {
                memo_key: acc.options.memo_key,
                voting_account: proxy_account || '1.2.5'
            };

            // filter empty records since some of the account are not witness or committee
            let votes = [];
            accounts.forEach(a => {
                if (a) {
                    votes = votes.concat(a.vote_ids);
                }
            });
            new_options.votes = votes;
            let num_witness = 0;
            let num_committee = 0;
            new_options.votes.forEach(v => {
                let vote_type = v.split(':')[0];
                if (vote_type == '0') {
                    num_committee += 1;
                }
                if (vote_type == 1) {
                    num_witness += 1;
                }
            });
            new_options.num_committee = Math.min(num_committee, globalObject.parameters.maximum_committee_count);
            new_options.num_witness = Math.min(num_witness, globalObject.parameters.maximum_witness_count);
            new_options.votes = new_options.votes.sort((a, b) => {
                let a_split = a.split(':');
                let b_split = b.split(':');
                return parseInt(a_split[1]) - parseInt(b_split[1]);
            });

            let tr = new TransactionBuilder();
            tr.add_operation(tr.get_type_operation('account_update', {
                fee: {
                    amount: 0,
                    asset_id: fee_asset.id
                },
                account: acc.id,
                new_options: new_options
            }));
            return process_transaction(tr, account, password, broadcast);
        }));
    });
};

const get_nodes_detail = () => {
    return Vue.http.get('https://walletgateway.gxb.io/node/vote/trust_nodes').then(resp => {
        return resp.data.list || [];
    });
};

export {
    bak_wallet,
    get_objects,
    transfer,
    fetch_dictionary,
    merge_wallets,
    get_wallets,
    set_wallets,
    get_wallet_index,
    set_wallet_index,
    set_wallet_index_native,
    unlock_wallet,
    update_wallet,
    del_wallet,
    fetch_account,
    fetch_full_account,
    import_account,
    create_account,
    fetch_account_balance,
    fetch_account_balances,
    set_disclaimer_accepted,
    get_disclaimer_accepted,
    fetch_account_history,
    fetch_block,
    lock_balance,
    unlock_balance,
    get_asset,
    get_assets_by_ids,
    get_fee_list,
    fetch_reference_accounts,
    get_trust_nodes,
    vote_for_accounts,
    get_nodes_detail
};
