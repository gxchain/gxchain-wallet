import {PrivateKey, key, Aes, TransactionBuilder, TransactionHelper} from 'gxbjs'
import {Apis} from 'gxbjs-ws'
import Promise from 'bluebird'
import uniq from 'lodash/uniq'
import some from 'lodash/some'
import unionBy from 'lodash/unionBy'
import Vue from 'vue'
import i18n from '@/locales'
import IndexedDB from './IndexedDBService'


/**
 * get objects by id
 * @param ids
 */
const get_objects = (ids) => {
  return Apis.instance().db_api().exec('get_objects', [ids])
}

/**
 * get account information by name
 * @param account_name
 */
const fetch_account = (account_name) => {
  return Apis.instance().db_api().exec('get_account_by_name', [account_name])
}

const fetch_full_account = (account) => {
  return Apis.instance().db_api().exec('get_full_accounts', [[account], true])
}

/**
 * fetch account histories by account name
 * @param account_name
 * @returns {Promise.<TResult>|*}
 */
const fetch_account_histroy = (account_name) => {
  return fetch_account(account_name).then((account) => {
    return Apis.instance().history_api().exec('get_account_history', [account.id, "1.11.0", 100, "1.11.0"])
  })
}

/**
 * fetch brain key dictionary
 * @returns {bluebird}
 */
const fetch_dictionary = () => {
  return new Promise((resolve, reject) => {
    resolve(Vue.http.get(`${process.env.__HOST__.replace('/#','')}/static/dictionary_en.json`).then((resp) => {
      return resp.data.en;
    }))
  })
}

/**
 * get wallets from local storage
 */
const get_wallets = () => {
  let wallets = localStorage.getItem(`gxb_wallets_${Apis.instance().chain_id}`);
  if (!wallets) {
    wallets = [];
  }
  else {
    wallets = JSON.parse(wallets);
  }
  return wallets;
}

/**
 * merge wallets into localStorage
 */
const merge_wallets = () =>{
  return new Promise((resolve, reject) => {
    let walletDB = null;
    return IndexedDB.openDB(`gxb_wallets_${Apis.instance().chain_id}`,1,walletDB,{
      name:'wallet',
      key:'walletKey'
    }).then((db)=>{
      let walletDB = db;
      return IndexedDB.getData(walletDB,'wallet',`gxb_wallets_${Apis.instance().chain_id}`).then((res)=>{
        if(res){
          let localStorageWallets = get_wallets();
          let unionWallets = unionBy(localStorageWallets,res.value,'account');
          localStorage.setItem(`gxb_wallets_${Apis.instance().chain_id}`, JSON.stringify(unionWallets));
        }
        IndexedDB.closeDB(walletDB);
        resolve();
      })
    }).catch((ex)=>{
      resolve();
    })
  })
}

/**
 * save wallets into indexedDB
 * @param wallets
 */
const set_wallets_db = (wallets) => {
  return new Promise((resolve,reject)=>{
    let walletDB = null;
    return IndexedDB.openDB(`gxb_wallets_${Apis.instance().chain_id}`,1,walletDB,{
      name:'wallet',
      key:'walletKey'
    }).then((db)=>{
      let walletDB = db;
      return IndexedDB.putJSON(walletDB,'wallet',{walletKey:`gxb_wallets_${Apis.instance().chain_id}`,value:wallets}).then(()=>{
        IndexedDB.closeDB(walletDB);
        resolve();
      });
    }).catch((ex)=>{
      resolve();
    })
  })
}

/**
 * save wallets into local storage
 * @param wallets
 */
const set_wallets = (wallets) => {
  return new Promise((resolve,reject)=>{
    return set_wallets_db(wallets).then(()=>{
      localStorage.setItem(`gxb_wallets_${Apis.instance().chain_id}`, JSON.stringify(wallets));
      resolve();
    })
  })
}

/**
 * get index of current wallet
 * @returns {number}
 */
const get_wallet_index = () => {
  let wallets = get_wallets();
  let index = localStorage.getItem(`gxb_wallet_index_${Apis.instance().chain_id}`);
  if (!index) {
    return 0;
  }
  index = Number(index);
  if ((index + 1) > wallets.length) {
    set_wallet_index(wallets.length - 1);
    return wallets.length - 1;
  }
  return index;
}

/**
 * set index of current wallet
 * @param index
 */
const set_wallet_index = (index) => {
  index = Number(index);
  let wallets = get_wallets();
  localStorage.setItem(`gxb_wallet_index_${Apis.instance().chain_id}`, Math.min(wallets.length - 1, index));
}


/**
 * get disclaimer accepted
 * @returns {boolean}
 */
const get_disclaimer_accepted = () => {
  let result = localStorage.getItem(`gxb_disclaimer_accepted_${Apis.instance().chain_id}`);
  return !!Number(result);
}

/**
 * set disclaimer accepted
 * @param accepted
 */
const set_disclaimer_accepted = (accepted) => {
  if (accepted) {
    localStorage.setItem(`gxb_disclaimer_accepted_${Apis.instance().chain_id}`, accepted ? 1 : 0);
  }
  else {
    localStorage.removeItem(`gxb_disclaimer_accepted_${Apis.instance().chain_id}`)
  }
}


/**
 * update wallet in local storage
 * @param wallet
 */
const update_wallet = (wallet) => {
  return new Promise((resolve,reject)=>{
    let wallets = get_wallets();
    let updated = 0;
    wallets = wallets.map((w) => {
      if (w.account == wallet.account) {
        updated += 1;
        return wallet;
      }
      return w;
    })
    return set_wallets(wallets).then(()=>{
      resolve();
    });
  })
}

/**
 * del wallet from local storage
 * @param wallet
 */
const del_wallet = (wallet) => {
  return new Promise((resolve,reject)=>{
    let wallets = get_wallets();
    for (let i = 0; i < wallets.length; i++) {
      if (wallet.account === wallets[i].account) {
        wallets.splice(i, 1);
      }
    }
    return set_wallets(wallets).then(()=>{
      resolve();
    });
  })
}

/**
 * unlock wallet
 * @param account
 * @param password
 * @returns {bluebird}
 */
const unlock_wallet = (account, password) => {
  return new Promise((resolve, reject) => {
    let wallets = get_wallets();
    let wallet = wallets.find(function (w) {
      return w.account == account;
    })
    let password_private = PrivateKey.fromSeed(password)
    let password_pubkey = password_private.toPublicKey().toPublicKeyString() // used to validate password
    if (wallet == null) {
      reject(new Error(i18n.t('unlock.account_not_found')));
    }
    else if (password_pubkey != wallet.password_pubkey) {
      reject(new Error(i18n.t('unlock.error.invalid_password')));
    }
    else {
      let password_aes = Aes.fromSeed(password)
      let encryption_plainbuffer = password_aes.decryptHexToBuffer(wallet.encryption_key)
      let aes_private = Aes.fromSeed(encryption_plainbuffer)
      let wifKey = aes_private.decryptHexToText(wallet.encrypted_wifkey)
      resolve({
        wifKey,
        wallet
      });
    }
  })
}

/**
 * import account into wallet by passing wif key and password
 * @param wifKey
 * @param password
 * @returns {bluebird}
 */
const import_account = (wifKey, password) => {
  return new Promise((resolve, reject) => {
    let password_aes = Aes.fromSeed(password)
    let encryption_buffer = key.get_random_key().toBuffer()
    let encryption_key = password_aes.encryptToHex(encryption_buffer)
    let local_aes_private = Aes.fromSeed(encryption_buffer)
    let encrypted_wifkey = local_aes_private.encryptToHex(wifKey)
    let password_private = PrivateKey.fromSeed(password)
    let password_pubkey = password_private.toPublicKey().toPublicKeyString() // used to validate password

    let imported = [];
    let exist = [];

    let private_key = PrivateKey.fromWif(wifKey);
    let public_key = private_key.toPublicKey().toPublicKeyString();
    resolve(Apis.instance().db_api().exec('get_key_references', [[public_key]]).then((resp) => {
      if (resp.length > 0) {
        return uniq(resp[0]);
      }
      else {
        throw new Error(i18n.t('wallet_import.error.account_not_found'))
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
            })
            if (isKeyAvailable) {
              // do not import a duplicate account
              let alreadyExist = some(wallets, function (wallet) {
                return wallet.account == account.name;
              });
              if (!alreadyExist) {
                let wallet = {
                  account: account.name,
                  password_pubkey,
                  encryption_key,
                  encrypted_wifkey,
                  backup_date: null
                }
                wallets.push(wallet);
                imported.push(wallet);
              }
              else {
                console.log('account:', account.name, 'already exist');
                exist.push({
                  account: account.name
                });
              }
            }
          })
          if (imported.length > 0) {
            set_wallets(wallets);
            localStorage.setItem(`gxb_wallet_index_${Apis.instance().chain_id}`, wallets.length - 1);
          }
          return {
            imported,
            exist
          };
        }
        else {
          throw new Error(i18n.t('wallet_import.error.account_not_found'))
        }
      })
    }))
  });
}

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
        let wallets = get_wallets()
        let wifKey = privateKey.toWif()
        let password_aes = Aes.fromSeed(password)
        let encryption_buffer = key.get_random_key().toBuffer()
        let encryption_key = password_aes.encryptToHex(encryption_buffer)
        let local_aes_private = Aes.fromSeed(encryption_buffer)
        let encrypted_wifkey = local_aes_private.encryptToHex(wifKey)
        let password_private = PrivateKey.fromSeed(password)
        let password_pubkey = password_private.toPublicKey().toPublicKeyString() // used to validate password
        let wallet = {
          account: account,
          password_pubkey,
          encryption_key,
          encrypted_wifkey,
          backup_date: null
        }
        wallets.push(wallet)
        set_wallets(wallets);
        localStorage.setItem(`gxb_wallet_index_${Apis.instance().chain_id}`, wallets.length - 1);
        return wallet
      })
    }));
  })
}

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
      })
    }))
  })
}

/**
 * send GXS to another account
 * @param from
 * @param to
 * @param amount
 * @param memo
 * @param password
 * @returns {*}
 */
const transfer = (from, to, amount, memo, password, broadcast = true) => {
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
          memo_to_public = null
        }
        let fromPrivate = PrivateKey.fromWif(results[2].wifKey);
        if(memo_from_public!=fromPrivate.toPublicKey().toPublicKeyString()){
          throw new Error(i18n.t('transfer.error.account.memo_signer_not_exist'));
        }
      }

      let memo_object;
      if (memo && memo_to_public && memo_from_public) {
        let nonce = TransactionHelper.unique_nonce_uint64()
        memo_object = {
          from: memo_from_public,
          to: memo_to_public,
          nonce,
          message: Aes.encrypt_with_checksum(
            PrivateKey.fromWif(results[2].wifKey),
            memo_to_public,
            nonce,
            memo
          )
        };
      }

      let tr = new TransactionBuilder();
      tr.add_operation(tr.get_type_operation('transfer', {
        fee: {
          amount: 0,
          asset_id: '1.3.1'
        },
        from: fromAcc.id,
        to: toAcc.id,
        amount: {amount: amount * 100000, asset_id: '1.3.1'},
        memo: memo_object
      }))
      return process_transaction(tr, from, password, broadcast)
    }));
  })
}

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
    get_objects(["2.1.0"]),
    fetch_account(account)
  ]).then(function (resp) {
    let time = resp[0][0].time;
    if (!/Z$/.test(time)) {
      time += 'Z'
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
      memo: memo,
    }))
    return process_transaction(tr, account, password, broadcast)
  });
}


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
    }))
    return process_transaction(tr, account, password, broadcast)
  })
}

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
        }
        else {
          return tr;
        }
      })
    }))
  })
}

/**
 * fetch block info
 * @param block_num
 */
const fetch_block = (block_num) => {
  return Apis.instance().db_api().exec('get_block', [block_num]);
}

export {
  get_objects,
  transfer,
  fetch_dictionary,
  merge_wallets,
  get_wallets,
  set_wallets,
  get_wallet_index,
  set_wallet_index,
  unlock_wallet,
  update_wallet,
  del_wallet,
  fetch_account,
  fetch_full_account,
  import_account,
  create_account,
  fetch_account_balance,
  set_disclaimer_accepted,
  get_disclaimer_accepted,
  fetch_account_histroy,
  fetch_block,
  lock_balance,
  unlock_balance
}
