const locale = {
    index: {
        balance_loading: 'loading..',
        backup_wallet: 'backup private key',
        asset_name: 'GXC',
        asset_full_name: 'GX Coin',
        value: 'Total Assets($)',
        unit: '$',
        transfer: 'Send',
        receive: 'Receive',
        wallet: 'Wallet',
        account_name: 'Account',
        copy: 'Copy Account Name',
        copied: 'Copied',
        join_loyalty_program: 'Loyalty Program',
        loyalty_program_icon: 'loyalty-program-btn-en.png',
        account_is_address: 'Account name is your address',
        staking: 'Staking',
        assets: 'Assets',
        collection: 'Collection'
    },
    nft: {
        send: 'Send',
        please_input_account: 'Please Input Account',
        view_info: 'View Detail',
        confirm_send: 'Confirm'
    },
    market: {
        title: 'Market'
    },
    tabs: {
        wallet: 'Wallet',
        market: 'Market',
        staking: 'Staking',
        balance: 'Balance',
        my: 'User'
    },
    left_panel: {
        import_wallet: 'Import Wallet',
        create_wallet: 'Create Wallet',
        node_vote: 'Node Vote',
        manage_wallets: 'Manage Wallets',
        history: 'History',
        language: 'Language',
        about: 'About',
        disclaimer: 'Disclaimer',
        Income_received: 'Income received'
    },
    wallet_create: {
        index: {
            title: 'Wallet',
            tip_empty: 'GXC Wallet was not created',
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
                account_should_start_with_a_letter:
          'Each account segment should start with a letter',
                account_format_error:
          'Each account segment should have only letters, digits, or dashes',
                account_one_dash_error:
          'Each account segment should have only one dash in a row',
                account_end_error:
          'Each account segment should end with a letter or digit',
                account_segment_should_be_longer:
          'Each account segment should be longer',
                premium_name:
          'This is a premium name which is not supported by this faucet Please enter a regular name containing least one dash, a number or no vowels'
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
                account_has_been_registered:
          'Account has bean registered by someone, please select another.',
                account_create_failed: 'Account create failed, please retry'
            }
        },
        success: {
            title: 'Create Success',
            tip1: 'Wallet created',
            tip2:
        'Please do remember to backup your wallet private key, there is no way to find it back if you lost it.',
            backup_wallet: 'Backup Now',
            detail: 'Open my wallet'
        }
    },
    wallet_import: {
        title: 'Wallet Import',
        label: {
            password: 'Password',
            confirm: 'Confirm'
        },
        placeholder: {
            key: 'Enter your active private key here',
            password: 'Not less than 6 characters'
        },
        confirm: 'Import Now',
        error: {
            password_not_equal: 'Password not equal',
            account_already_exist: 'Account already imported',
            account_not_found: 'Account not found',
            invalid_key: 'Incorrect key format',
            no_reference_account:
        'Import failed! No account for this active private key was found.'
        },
        success: {
            title: 'Import Success',
            tip1: 'Wallet imported',
            tip2:
        'Please do remember to backup your wallet private key, there is no way to find it back if you lost it.',
            backup_wallet: 'Backup Now',
            detail: 'Open my wallet'
        }
    },
    wallet_manage: {
        title: 'Wallets',
        tip_backup: 'Backup required',
        button_import: 'Import Wallet',
        button_create: 'Create Wallet'
    },
    wallet_backup: {
        index: {
            title: 'Private key backup',
            tip:
        'When APP is deleted and used on another device, you need to import backed-up private key of the current wallet, or assets in the wallet could be lost permanently. Please make sure your wallet is backed up and backed-up info is kept in good care.',
            label: {
                account: 'Account',
                asset: 'Asset(GXC)',
                private_key: 'Private Key'
            },
            button_backup: 'Backup Now',
            button_remove: 'Remove Wallet'
        },
        detail: {
            title: 'Private key backup',
            tip:
        'To make backup easier, your wallet account is encrypted with the following key of letters. Back up this key to retrieve your wallet.',
            tip1:
        'Copy or transcribe the key verbatim on paper, and keep it in good care.',
            tip2:
        'Anyone with knowledge of info on your key gains access to the assets in your wallet.',
            unlock: 'Unlock',
            copy: 'Copy Private Key',
            copied: 'Copied',
            cancel: 'Cancel',
            ok: 'OK',
            confirm: 'Verify that the private key has been backed up?',
            tip_password: 'Unlock your wallet',
            go_back: 'Go Back',
            placeholder: {
                password: 'Please enter your password'
            },
            error: {
                invalid_password: 'Invalid password'
            }
        }
    },
    wallet_del: {
        title: 'Wallet delete',
        cancel: 'Cancel',
        ok: 'Ok',
        tip_del:
      'Confirm unlock and delete this wallet. This operation is irrevocable. Are you sure to delete this wallet?',
        placeholder: {
            password: 'Please enter your password'
        },
        error: {
            invalid_password: 'Invalid password',
            invalid_delete: 'Unable to delete account with balance'
        }
    },
    language_setting: {
        title: 'Language'
    },
    about: {
        title: 'About us',
        version: 'V1.0.1',
        desc: {
            line1: 'GXC Wallet is a lite mobile wallet APP ',
            line2: 'to facilitate GXC transfer, collection, wallet management',
            line3: 'and review of updates on GXC at any time.'
        },
        disclaimer: 'Disclaimer'
    },
    disclaimer: {
        title: 'Disclaimer',
        content:
      '<h4 class="text-center">Notice to Use and Disclaimer</h4>' +
      '<p>GXC Wallet is a decentralized blockchain application. Please acquire a full understanding of the blockchain technology before use. Make sure you have the basic competence to use and manage decentralized wallet on a reasonable level.</p>' +
      '<p>1. Once GXC Wallet account or password is lost, it is unable to retrieve. Please keep properly your account and password, and make sure to back up your private key to the wallet, which is the only credential to get back your wallet. GXChain is not responsible for the loss or theft of the wallet due to your failure to back up the private key, safekeep or properly use the wallet.</p>' +
      '<p>2. If you obtain GXC Wallet app or any other application under the same name of this sofeware from any unauthorized third party, GXB will not vouch for its security. You will be responsible for the loss inflicted thereby. </p>' +
      '<p>3. By transferring GXC via GXC wallet, you understand the IRRETRIEVABLE attribute of blockchain-based operation and will be responsible for irreversible loss due to your misoperation.</p>' +
      '<p>4. You shall comply with relevant state laws, policies and regulations when trading on GXC Wallet.</p>',
        accept: 'I have read and accept'
    },
    unlock: {
        account_not_found: 'Account not found in current wallet',
        cancel: 'Cancel',
        ok: 'OK',
        tip_password: 'Unlock your wallet',
        placeholder: {
            password: 'Please enter your password'
        },
        error: {
            invalid_password: 'Invalid password'
        }
    },
    transfer: {
        title: 'Send',
        from: 'From',
        to: 'To',
        to_placeholder: 'account name',
        amount: 'Amount',
        amount_placeholder: 'Amount to send',
        receive_amount: 'Amount to receive',
        available: '<span class="color-danger">{amount}</span> {symbol} Available',
        memo: 'Memo',
        fee: 'Fee',
        memo_placeholder: 'Optional',
        next: 'Next',
        send: 'Send',
        sending: 'Sending',
        error: {
            amount: {
                invalid: 'Invalid amount',
                insufficient_balance:
          'Insufficient balance, Please make sure your balance are more than amount and fee',
                insufficient_diff_balance:
          'Insufficient balance, Please make sure your balance are more than amount',
                insufficient_diff_fee: 'Insufficient fee',
                minimum: 'The minimum amount must not be less than 1'
            },
            account: {
                cannot_send_to_yourself: 'Cannot send to yourself',
                from_account_not_exist: 'From account not found',
                to_account_not_exist: 'To account not found',
                empty_account: 'Account name should not be empty',
                account_should_be_longer: 'Account name be longer',
                account_should_be_shorter: 'Account name be shorter',
                account_should_start_with_a_letter:
          'Each account segment should start with a letter',
                account_format_error:
          'Each account segment should have only letters, digits, or dashes',
                account_one_dash_error:
          'Each account segment should have only one dash in a row',
                account_end_error:
          'Each account segment should end with a letter or digit',
                account_segment_should_be_longer:
          'Each account segment should be longer',
                premium_name:
          'This is a premium name which is not supported by this faucet Please enter a regular name containing least one dash, a number or no vowels',
                memo_signer_not_exist:
          'Cannot encrypt memo,since memo private key not exist'
            },
            claim: {
                not_arrived: 'Claim timepoint has not arrived yet'
            }
        },
        confirm: {
            title: 'Confirm',
            title_password: 'Password',
            enter_password: 'Enter Password',
            remember_password: 'Remember Password'
        },
        success: {
            title: 'Success',
            tip1: 'Send successful',
            tip2: 'has received your transfer',
            done: 'Done'
        },
        memo_tip:
      'Found that you entered the platform account, please be sure to fill in Memo'
    },
    trade_history: {
        title: 'Trade History',
        switch: 'Switch',
        currentAccount: 'Current Account: {account}',
        empty: 'No more record',
        received: 'Received',
        sent: 'Sent'
    },
    trade: {
        title: 'Trade Detail',
        sent: 'Send to',
        receive: 'Receive from',
        label: {
            from: 'Send Account',
            to: 'Receive Account',
            timestamp: 'Timestamp',
            fee: 'Fee({symbol})',
            memo: 'Memo'
        },
        modal: {
            ok: 'OK',
            copy: 'Copy',
            copy_success: 'Copy successfully'
        }
    },
    loyalty_program: {
        title: 'Loyalty Program',
        tip1: 'Grow with GXB',
        tip2: 'Benefit for value investors, extra bonus for long-run holders',
        tip3:
      'GXB\'s Loyalty Program is a benefit program designed for investors to lock up certain amount of GXC (GX Coin). During the lockup period, the capital is frozen, meanwhile investors are entitled to extra bonus. For example, lock up 10,000 GXC for 9 months; calculating by 6% annualized return,  you may get 450 GXC for bonus on the due date. GXC would like our investors to join the Loyalty Program and enjoy the long-term benefits brought by GXB\'s growth in the future.',
        banner: 'loyalty-program-banner-en.jpg',
        term: 'Lockup Term',
        bonus: 'Annualized Bonus',
        expected_bonus: 'Expected bonus',
        month: '{month} month|{month} months',
        day: '{day} day|{day} days',
        due: 'Due Date',
        amount: 'Lockup Amount',
        available: '<span class="color-danger">{amount}</span> GXC Available',
        reward: '<span class="color-danger">{amount}</span> GXC Reward',
        join: 'Setup',
        history: 'History',
        no_record: 'No record',
        locked_at: 'Locked At',
        locked_amount: 'Locked Amount(GXC)',
        button_join:
      'Earn <span class="asset">{bonus}</span>% by joining our Loyalty Program',
        placeholder: {
            amount: 'Amount to lock'
        },
        modal: {
            message:
        'The amount subscribed to the Loyalty Program will be locked up and unable to sell. This operation is irrevocable. Are you sure to join the program?',
            cancel: 'Cancel',
            confirm: 'Confirm',
            placeholder: 'Please enter your password'
        },
        error: {
            insufficient_balance: 'Insufficient balance',
            invalid_amount: 'Invalid amount',
            too_less: 'At least 1 GXC'
        },
        status: {
            title: 'Status',
            locked: 'Locked',
            can_unlock: 'Manually unlock'
        },
        success: {
            title: 'Success',
            message:
        'Congratulations,{amount} GXC were locked for join loyalty program'
        },
        detail: {
            title: 'Program Details',
            success: {
                title: 'Success',
                message: 'Congratulations,{amount} GXC were unlocked.'
            }
        }
    },
    node_vote: {
        tab: {
            tab1: 'TrustNodes',
            tab2: 'Proxy Voting'
        },
        index: {
            title: 'Node Voting',
            records: 'Voting record',
            intro:
        'The TrustNode is the producer of the block in GXChain. They validate transaction data and maintain network security. You can vote for the person you trust to become a public trust node. When you vote, the candidate you choose will receive the same number of votes you cast.',
            proxy_tip: '*Voting rights are taken over by proxy voting account.',
            tips: '*updated every hour',
            name: 'TrustNode candidate',
            no_record: 'No records',
            vote_num: 'Vote Num',
            vote_num_weight: 'New Votes',
            btn_vote: 'Confirm',
            btn_update: 'Update',
            view_new_vote: 'View old votes'
        },
        proxy: {
            intro:
        'After setting up a proxy voting account, the proxy voting account will exercise voting power on your behalf.',
            input_label: 'Account',
            input_placeholder: 'please enter proxy account',
            btn_submit: 'Save changes',
            btn_remove: 'Remove Proxy'
        },
        confirm: {
            title: 'Confirm the vote',
            title2: 'Update proxy account',
            account: 'Account',
            proxy_account: 'Proxy account',
            selected_node: 'Selected',
            fee: 'Fee',
            btn_confirm: 'Confirm',
            success: 'Successful Vote',
            success2: 'Successful Update'
        },
        error: {
            cannot_proxy_to_yourself: 'Cannot proxy to yourself'
        }
    },
    node: {
        vote: {
            count: {
                max: 'Support up to 10 nodes',
                min: 'Support at least 2 nodes'
            },
            gxc: {
                lack:
          'The voting account GXC balance is insufficient, at least 0.1GXC is required.'
            }
        }
    },
    realtime_quotations: {
        title: 'Real Time Quotes',
        high: '24h High',
        low: '24h Low',
        volume: '24h Volume',
        line: 'Line',
        candle: 'Candle',
        strategy: 'Exchange strategy',
        allcoin_step1_img1: 'allcoin_step1_img1.png',
        allcoin_step1_img2: 'allcoin_step1_img2.png',
        allcoin_step1_img3: 'allcoin_step1_img3.png',
        allcoin_step1_img4: 'allcoin_step1_img4.png',
        allcoin_step2_img1: 'allcoin_step2_img1.png',
        allcoin_step2_img2: 'allcoin_step2_img2.png',
        allcoin_step2_img3: 'allcoin_step2_img3.png',
        allcoin_step2_img4: 'allcoin_step2_img4.png',
        allcoin_step2_img5: 'allcoin_step2_img5.png',
        allcoin_step2_img6: 'allcoin_step2_img6.png',
        allcoin_step2_img7: 'allcoin_step2_img7.png',
        allcoin_step3_img1: 'allcoin_step3_img1.png',
        allcoin_step3_img2: 'allcoin_step3_img2.png',
        allcoin_step3_img3: 'allcoin_step3_img3.png',
        allcoin_step3_img4: 'allcoin_step3_img4.png',
        allcoin_step3_img5: 'allcoin_step3_img5.png',
        allcoin_step3_img6: 'allcoin_step3_img6.png',
        allcoin_step3_img7: 'allcoin_step3_img7.png',
        allcoin_step3_img8: 'allcoin_step3_img8.png',
        allcoin_step3_img9: 'allcoin_step3_img9.png',
        bigone_step1_img1: 'bigone_step1_img1.png',
        bigone_step1_img2: 'bigone_step1_img2.png',
        bigone_step1_img3: 'bigone_step1_img3.png',
        bigone_step1_img4: 'bigone_step1_img4.png',
        bigone_step1_img5: 'bigone_step1_img5.png',
        bigone_step2_img1: 'bigone_step2_img1.png',
        bigone_step2_img2: 'bigone_step2_img2.png',
        bigone_step2_img3: 'bigone_step2_img3.png',
        bigone_step2_img4: 'bigone_step2_img4.png',
        bigone_step2_img5: 'bigone_step2_img5.png',
        bigone_step2_img6: 'bigone_step2_img6.png',
        bigone_step2_img7: 'bigone_step2_img7.png',
        bigone_step2_img8: 'bigone_step2_img8.png',
        bigone_step2_img9: 'bigone_step2_img9.png',
        binance_step1_img1: 'binance_step1_img1.png',
        binance_step1_img2: 'binance_step1_img2.png',
        binance_step2_img1: 'binance_step2_img1.png',
        binance_step2_img2: 'binance_step2_img2.png',
        binance_step3_img1: 'binance_step3_img1.png',
        binance_step3_img2: 'binance_step3_img2.png',
        binance_step3_img3: 'binance_step3_img3.png',
        binance_step3_img4: 'binance_step3_img4.png',
        binance_step3_img5: 'binance_step3_img5.png',
        binance_step3_img6: 'binance_step3_img6.png',
        binance_step3_img7: 'binance_step3_img7.png',
        binance_step3_img8: 'binance_step3_img8.png',
        binance_step3_img9: 'binance_step3_img9.png',
        bitz_step1_img1: 'bitz_step1_img1.png',
        bitz_step1_img2: 'bitz_step1_img2.png',
        bitz_step1_img3: 'bitz_step1_img3.png',
        bitz_step2_img1: 'bitz_step2_img1.png',
        bitz_step2_img2: 'bitz_step2_img2.png',
        bitz_step2_img3: 'bitz_step2_img3.png',
        bitz_step2_img4: 'bitz_step2_img4.png',
        bitz_step3_img1: 'bitz_step3_img1.png',
        bitz_step3_img2: 'bitz_step3_img2.png',
        bitz_step3_img3: 'bitz_step3_img3.png',
        bitz_step3_img4: 'bitz_step3_img4.png',
        bitz_step3_img5: 'bitz_step3_img5.png',
        bitz_step3_img6: 'bitz_step3_img6.png',
        bitz_step3_img7: 'bitz_step3_img7.png',
        bitz_step3_img8: 'bitz_step3_img8.png'
    },
    add_assets: {
        title: 'Add Assets',
        tip: 'The asset balance is greater than 0, it cannot be closed'
    },
    smart_contract: {
        title: 'Smart Contract',
        params: {
            method_type: 'Method Type',
            request_data: 'Request Data'
        },
        tabs: {
            detail: 'Detail',
            data: 'Data'
        },
        btn: {
            confirm: 'Confirm',
            cancel: 'Cancel'
        }
    },
    pick_wallet: {
        title: {
            step1: 'Choose a GXC Wallet account',
            step2: 'Enter password to unlock',
            no_wallet: 'No Wallet'
        },
        empty_tip: 'No binding wallet, please go to the GXC Wallet to create',
        btn: {
            confirm: 'Confirm',
            next: 'Next'
        },
        remember_pwd: 'remember password during app lifetime'
    },
    oauth: {
        authorize: {
            title: 'Authorization',
            error: {
                default: 'Please open in the BlockCity client',
                response_type: 'response_type parameter is invalid.',
                client_id: 'client_id parameter is invalid.',
                redirect_uri: 'redirect_uri parameter is invalid.',
                login_status: 'Get the user login status is abnormal.'
            },
            chain: {
                data: 'Data on the chain',
                wechat: 'WeChat information',
                confirm_tip1: 'The system detected your ',
                confirm_tip2:
          ', the blockchain has not been uploaded and the app can\'t get your information.',
                confirm: 'To Upload',
                datakey: {
                    lost:
            'The system detects that you have not generated a Data-Key or the Data-Key has been lost, and the application cannot obtain your information.',
                    confirm: 'Generate or retrieve Data-Key'
                }
            },
            current_app: 'This DApp',
            confirm_tip1: 'You agree',
            confirm_tip2: 'get the following permissions',
            confirm_tip3: 'Confirm and agree',
            confirm_tip4: '《User License Agreement》',
            wallet_account: 'Get the name of the GXChain wallet account.',
            wallet_pubkey: 'Get the PublicKey of the GXChain wallet account.',
            btn: {
                confirm: 'Confirm',
                cancel: 'Not yet'
            }
        },
        maintenance: {
            title: 'Application maintenance',
            tips:
        'The app is currently under maintenance. Your assets within the app are not affected during maintenance. The official of BlockCity has instructed the application side to step up processing and resume operations as soon as possible. Please be patient.'
        }
    },
    transactionConfirm: {
        transfer: 'Transfer',
        vote: 'Vote',
        signature: 'Signature'
    },
    staking: {
        staking_create: 'Create staking',
        staking_claim: 'Claim staking',
        staking_update: 'Update staking',
        staking_max_count:
      'The number of staking has reached the limit. Please change your account to staking',
        staking_program: 'Days',
        please_select_program: 'Please select terms',
        please_input_staking_amount: 'Please input Staking amount',
        staking_amount: 'Amount',
        staking_amount_weight: 'Votes',
        available_count: 'Available ',
        fee: 'Fee',
        confirm: 'Confirm',
        cancel: 'Cancel',
        please_input_amount: 'Please input Amount',
        select_node: 'TrustNode',
        please_select_node: 'Please select TrustNode',
        nodeList: 'TrustNode',
        staking_success: 'Create staking successfully',
        staking_update_success: 'Update staking successfully',
        staking_claim_success: 'Claim staking successfully',
        staking_for_node: 'Staking for TrustNode ',
        Income_received: 'Income received',
        collect_immediately: 'Claim now',
        collect_immediately_all: 'Try to claim all',
        get_earned: 'Vesting balance amount',
        earned_coin_day: 'Coin days earned',
        required_coin_day: 'Coin days required',
        remain_day: 'Days left of vesting period',
        get_amount: 'Available to claim',
        coin_day: 'coin days',
        day: 'days',
        income_received_success: 'Income received success',
        please_input_min_amount: 'At least {amount}GXC is required',
        title: 'Staking',
        node_rate: 'Commission rate',
        error: {
            insufficient_balance: 'Insufficient service charge'
        },
        income: {
            amount: 'Amount',
            confirmTitle: 'Please confirm the transaction',
            tips: 'WITHDRAW VESTING BALANCE'
        }
    },
    my: {
        title: 'My'
    }
};

export default locale;
