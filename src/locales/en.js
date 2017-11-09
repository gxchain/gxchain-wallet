const locale = {
  index: {
    balance_loading: 'loading..',
    backup_wallet: 'backup wallet',
    asset_name: 'GXS(GXShares)',
    value: 'Total Assets($)',
    transfer: 'Send',
    receive: 'Receive',
    wallet:'Wallet',
    account_name:'Account'
  },
  account_import:{
    title:'Account Import',
    error:{
      account_not_found:'Account not found'
    }
  },
  left_panel:{
    import_wallet:'Import Wallet',
    create_wallet:'Create Wallet',
    manage_wallets:'Manage Wallets',
    history:'History',
    language:'Language',
    about:'About'
  },
  language_setting: {
    title: 'Language'
  },
  account_create: {
    title: 'Account Create',
    empty_account: 'Account name should not be empty',
    account_should_be_longer: 'Account name be longer',
    account_should_be_shorter: 'Account name be shorter',
    account_should_start_with_a_letter: 'Each account segment should start with a letter',
    account_format_error: 'Each account segment should have only letters, digits, or dashes',
    account_one_dash_error: 'Each account segment should have only one dash in a row',
    account_end_error: 'Each account segment should end with a letter or digit',
    account_segment_should_be_longer: 'Each account segment should be longer',
    premium_name: "This is a premium name which is not supported by this faucet Please enter a regular name containing least one dash, a number or no vowels",
  },
  unlock:{
    account_not_found:'Account not found in current wallet',
    wrong_password:'Wrong password'
  },
  transfer: {
    title: 'Send',
    from:'From',
    to:'To',
    to_placeholder:'account name',
    amount:'Amount',
    amount_placeholder:'Amount to send',
    available: '{amount} <small class="color-gray">GXS Available</small>',
    memo:'Memo',
    fee:'Fee',
    memo_placeholder:'Optional',
    next:'Next',
    send:'Send',
    sending:'Sending',
    error:{
      amount:{
        invalid:'Invalid amount',
        insufficient_balance:'Insufficient balance, Please make sure your balance are more than amount and fee'
      },
      account:{
        cannot_send_to_yourself:'Cannot send to yourself',
        from_account_not_exist:'From account not found',
        to_account_not_exist:'To account not found',
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
    confirm:{
      title:'Confirm',
      title_password:'Password',
      enter_password:'Enter Password'
    }
  }
}

export default locale
