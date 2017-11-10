const locale = {
  index: {
    balance_loading: 'loading..',
    backup_wallet: 'backup wallet',
    asset_name: 'GXS(GXShares)',
    value: 'Total Assets($)',
    transfer: 'Send',
    receive: 'Receive',
    wallet: 'Wallet',
    account_name: 'Account',
    copy:'Copy',
    copied:'Copied'
  },
  left_panel: {
    import_wallet: 'Import Wallet',
    create_wallet: 'Create Wallet',
    manage_wallets: 'Manage Wallets',
    history: 'History',
    language: 'Language',
    about: 'About'
  },
  wallet_create: {
    index: {
      title: 'Wallet',
      tip_empty: 'Wallet was not created',
      button_create: 'Create Wallet',
      button_import: 'Import Wallet',
      tip_how: 'How to import wallet'
    },
    step1: {
      title: 'Wallet Create',
      label: {
        account: 'Account'
      },
      placeholder: {
        account: 'Enter account name here'
      },
      query_account_name: 'Checking account name',
      error: {
        query_account_failed: 'Failed to query account, please retry',
        account_already_exist: 'Account already exist',
        empty_account: 'Account name should not be empty',
        account_should_be_longer: 'Account name be longer',
        account_should_be_shorter: 'Account name be shorter',
        account_should_start_with_a_letter: 'Each account segment should start with a letter',
        account_format_error: 'Each account segment should have only letters, digits, or dashes',
        account_one_dash_error: 'Each account segment should have only one dash in a row',
        account_end_error: 'Each account segment should end with a letter or digit',
        account_segment_should_be_longer: 'Each account segment should be longer',
        premium_name: "This is a premium name which is not supported by this faucet Please enter a regular name containing least one dash, a number or no vowels"
      },
      next: 'Next'
    },
    step2: {
      title: 'Wallet Create',
      label: {
        password: 'Password',
        confirm: 'Confirm'
      },
      placeholder: {
        password: 'Not less than 6 characters'
      },
      creating: 'Account Creating',
      done: 'Done',
      notice: 'Notice',
      error: {
        password_not_equal: 'Password not equal',
        account_has_been_registered: 'Account has bean registered by someone, please select another.',
        account_create_failed: 'Account create failed, please retry'
      }
    },
    success: {
      title: 'Create Success',
      tip1: 'Wallet created',
      tip2: 'Please do remember to backup your wallet, there is no way to find it back if you lost it.',
      backup_wallet: 'Backup Now',
      detail: 'Open my wallet',
    }
  },
  wallet_import: {
    title: 'Wallet Import',
    label: {
      password: 'Password',
      confirm: 'Confirm'
    },
    placeholder: {
      key: 'Enter your active key here',
      password: 'Not less than 6 characters'
    },
    confirm: 'Import Now',
    error: {
      password_not_equal: 'Password not equal',
      account_already_exist: 'Account already imported',
      account_not_found: 'Account not found',
      invalid_key: 'Incorrect key format',
      no_reference_account: 'Import failed! No account for this active key was found.'
    },
    success: {
      title: 'Import Success',
      tip1: 'Wallet imported',
      tip2: 'Please do remember to backup your wallet, there is no way to find it back if you lost it.',
      backup_wallet: 'Backup Now',
      detail: 'Open my wallet',
    }
  },
  wallet_manage: {
    title: 'Wallets',
    tip_backup: 'Backup required',
    button_import: 'Import wallet',
    button_create: 'Create Wallet'
  },
  wallet_backup: {
    index: {
      title: 'Wallet backup',
      tip: 'When APP is deleted and used on another device, you need to import backed-up information of the current wallet, or assets in the wallet could be lost permanently. Please make sure your wallet is backed up and backed-up info is kept in good care.',
      label: {
        account: 'Account',
        asset: 'Asset(GXS)',
        private_key: 'Private Key'
      },
      button_backup: 'Backup Now',
      button_remove: 'Remove Wallet'
    },
    detail: {
      title: 'Wallet backup',
      tip: 'To make backup easier, your wallet account is encrypted with the following key of letters. Back up this key to retrieve your wallet.',
      tip1: 'Copy or transcribe the key verbatim on paper, and keep it in good care.',
      tip2: 'Anyone with knowledge of info on your key gains access to the assets in your wallet.',
      unlock: 'Unlock',
      copy: 'Copy',
      copied: 'Copied',
      cancel: 'Cancel',
      ok: 'OK',
      tip_password: 'Unlock your wallet',
      placeholder: {
        password: 'Please enter your password'
      },
      error: {
        invalid_password: 'Invalid password'
      }
    }
  },
  language_setting: {
    title: 'Language'
  },
  about: {
    title: 'About us',
    version: 'V0.0.1(Beta)',
    desc: {
      line1: 'GXB wallet is a lite mobile wallet APP ',
      line2: 'to facilitate GXS transfer, collection, wallet management',
      line3: 'and review of updates on GXB at any time.'
    },
    disclaimer: 'Disclaimer'
  },
  disclaimer: {
    title: 'Disclaimer',
    content: '<p>Notice to Use and Disclaimer</p>' +
    '<p>GXS Wallet is a decentralized blockchain application. Please acquire a full understanding of the blockchain technology before use. Make sure you have the basic competence to use and manage decentralized wallet on a reasonable level.</p>' +
    '<p>1. Once GXS Wallet account or password is lost, it is unable to retrieve. Please keep properly your account and password, and back up your wallet. GXB is not responsible for the loss or theft of the wallet due to your failure to back up, safekeep or properly use the wallet.\n</p>' +
    '<p>2. If you obtain GXS Wallet app or any other application under the same name of this sofeware from any unauthorized third party, GXB will not vouch for its security. You will be responsible for the loss inflicted thereby. </p>' +
    '<p>3. By transferring GXS via GXS wallet, you understand the IRRETRIEVABLE attribute of blockchain-based operation and will be responsible for irreversible loss due to your misoperation.</p>' +
    '<p>4. You shall comply with relevant state laws, policies and regulations when trading on GXS Wallet.</p>',
    accept: 'I have read and accept'
  },
  unlock: {
    account_not_found: 'Account not found in current wallet',
    wrong_password: 'Wrong password'
  },
  transfer: {
    title: 'Send',
    from: 'From',
    to: 'To',
    to_placeholder: 'account name',
    amount: 'Amount',
    amount_placeholder: 'Amount to send',
    available: '{amount} <small class="color-gray">GXS Available</small>',
    memo: 'Memo',
    fee: 'Fee',
    memo_placeholder: 'Optional',
    next: 'Next',
    send: 'Send',
    sending: 'Sending',
    error: {
      amount: {
        invalid: 'Invalid amount',
        insufficient_balance: 'Insufficient balance, Please make sure your balance are more than amount and fee'
      },
      account: {
        cannot_send_to_yourself: 'Cannot send to yourself',
        from_account_not_exist: 'From account not found',
        to_account_not_exist: 'To account not found',
        empty_account: 'Account name should not be empty',
        account_should_be_longer: 'Account name be longer',
        account_should_be_shorter: 'Account name be shorter',
        account_should_start_with_a_letter: 'Each account segment should start with a letter',
        account_format_error: 'Each account segment should have only letters, digits, or dashes',
        account_one_dash_error: 'Each account segment should have only one dash in a row',
        account_end_error: 'Each account segment should end with a letter or digit',
        account_segment_should_be_longer: 'Each account segment should be longer',
        premium_name: "This is a premium name which is not supported by this faucet Please enter a regular name containing least one dash, a number or no vowels"
      }
    },
    confirm: {
      title: 'Confirm',
      title_password: 'Password',
      enter_password: 'Enter Password'
    },
    success: {
      title: 'Success',
      tip1: 'Send successful',
      tip2: 'has received your transfer',
      done: 'Done'
    }
  },
  trade_history: {
    title: 'Trade History',
    switch:'Switch',
    currentAccount:'Current Account: {account}',
    empty:'No record'
  }
}

export default locale
