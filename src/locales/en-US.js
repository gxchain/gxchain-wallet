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
        collection: 'NFT'
    },
    nft: {
        send: 'Send',
        please_input_account: 'Please Input Account',
        view_info: 'View Detail',
        nft_list: 'NFT List',
        confirm_send: 'Confirm',
        details: 'Detail: ',
        total: 'Total: ',
        successful: 'Send successful'
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
            insufficient_balance: 'Insufficient service charge',
            notavailable: 'Staking on GXChain1.0 is not available anymore, please stake on REI Network'
        },
        income: {
            amount: 'Amount',
            confirmTitle: 'Please confirm the transaction',
            tips: 'WITHDRAW VESTING BALANCE'
        }
    },
    my: {
        title: 'My'
    },
    proposal: {
        vote: 'Vote',
        vote_number: 'Number of votes',
        active: 'Active',
        information: 'Information',
        result: 'Current result',
        report: 'Download report',
        support: 'Are you sure you agree?',
        no_support: ' Are you sure you disagree?',
        vote_success: 'Successful voting',
        vote_fail: 'Voting failed',
        yes: 'Confirm',
        expand: 'Expand the remainder',
        change_support: 'Are you sure to change to agree?',
        change_noSupport: 'Are you sure to change to disagree?',
        totalVote: 'Total votes',
        totalUserVote: 'Number of voters',
        agree: 'Yes',
        disagree: 'No',
        cast_agree: 'You have voted to agree~',
        cast_disagree: 'You have already voted to disagree~',
        start_date: 'Start date',
        end_date: 'End date',
        start_block: 'Start block',
        end_block: 'End block',
        dint: 'The results are subject to the final statistics',
        expend_more: 'Click to expand more',
        tips: 'Tip: Participating in voting will not lock GXC, we will count all the addresses participating in the voting at the snapshot height, and the GXC of the account balance and the GXC of the node voting Stake will be counted.'
    },

    proposal_content: {
        name: '#Governance Proposal: From GXChain 2.0 to REI Network',
        background: {
            title: 'Background',
            stage1: 'GXChain mainnet was launched in 2017, aiming to build a data Internet of value. In just four years, GXChain has not only gained recognition from the top capitals as well as the market but also gained strong support from dozens of enterprises, including UnionPay, to reach a cooperative relationship.',
            stage2: 'In the past four years, the blockchain industry has undergone radical changes, and GXChain has never stopped moving forward. The revolutionary changes of DeFi in 2020 brought unprecedented changes to the blockchain industry, with the number of locked positions, the users, and on-chain accounts in decentralized finance increasing exponentially.In August 2020, we decided to embrace the change of DeFi, and start again with a collaborative mindset. And now, one year later, we have finally reached a historic moment on the road to change, and we will once again embark on a new journey in the crypto universe.'
        },
        substance: {
            content1: {
                title: 'Section 1 of the proposal: "GXChain 2.0" is renamed "REI Network"',
                change_name: 'Why do we name REI Network?',
                stage1: 'It is known that the architectural design and roadmap of GXChain 2.0 have been in the actual development process since August 2020. The development of GXChain 2.0 is progressing well, with the GXChain 2.0 test network has launched on 14 July 2021, running smoothly and having undergone various tests.The slashing module was introduced in August and the free economic model was technically completed in October, which means that GXChain 2.0 is getting closer and closer to us. According to the current development schedule, the mainnet of GXChain 2.0 is expected to go live in December.',
                stage2: 'By then, GXChain 2.0 will be completely upgraded and refactored at the technical level and at the code level, becoming a brand new blockchain and an EVM-compatible Ethereum parallel chain, which is the biggest update and iteration after four years since GXChain first mainnet was published on June 15, 2017.As such, GXChain 2.0 is not only a new technical upgrade and iteration but also a new leap in positioning. We are pleased to see that GXChain 2.0 will be given a new historical mission, so we believe that the name of GXChain needs a more profound new naming to accommodate the team and the rapid development in future planning, so the team has decided to GXChain 2.0 be given a new name - REI Network - before the mainnet launched.',
                rei_mean: 'The meaning and origin of REI',
                stage3: 'REI is derived from the first three initials of the words Rapid, Economical, and Innovative, which correspond to the three important features of the REI Network. It also stands for free and economical, which fits in perfectly with the fundamental features of GXChain 2.0.',
                stage4: 'REI is a name that has been selected by the team with a strong sense of mission, it is the embodiment of GXC`s historical beginnings with a new vision for the future. Nor is the name change an end in itself, but rather a desire to face the unknown challenges. It represents our determination to change thoroughly, and REI will move forward again with our aspirations.'
            },
            content2: {
                title: 'Section 2 of the proposal: The upgrade of Tokenomic',
                stage1: 'The existing GXC is a native coin issued on the GXChain, and during this year, GXChain will officially launch the GXChain 2.0 mainnet, while GXC will also be mapped to the GXChain 2.0 main network through a cross-chain approach.',
                stage2: 'The GXChain 2.0 main network is a new system that will be compatible with Ethereum and will be more friendly to supporting enterprises and developers, lightweight, and quasi-free new application-level public chain. Through the optimization of the underlying code and the 4-year exploration of the public chain model and user building of its predecessor GXChain, the new public chain is built to meet the actual needs of the current blockchain and public chain segment development.',
                stage3: 'The new public chain GXChain 2.0  is likely to grow beyond the expected scale of the future ecosystem, and the demand for and use of coins will increase significantly. For this reason, the new public chain needs more fresh blood to ensure the development and promotion of GXChain 2.0. REI Network has a good solution for the current industry hotspots and for DeFi, GameFi, NFTs, and other sectors, and will become the hotspot and focus of the next industry competition to a certain extent. To make sure that REI network can better seize the opportunities in the foreseeable blockchain industry ecosystem in the future, the GXChain Foundation will implement the following plans -',
                steps1: '1. Coin split in a fixed proportion',
                split: 'The conversion of the core asset from GXC to REI on the main network will follow a 1:10 split proportion, so the maximum supply of REI will be 1 billion, once the proposal is approved.',
                steps2: '2. The unlocked part of the team is upgraded to ecosystem fund',
                upgrade: 'The team took out all the unlocked 25 million pieces as the ecosystem funds, of which 5 million were used for node rewards, 5 million for marketing, and 15 million for incentivizing developers and the ecosystem.',
                steps3: '3. New governance function launched',
                govern: 'The new governance function will be different from the previous one. The new governance function support will be different from the existing model of voting by the board of directors and node members but will become a "direct democracy" model where every coin holder can vote. Changes to the REI Network or suggestions from the community can be publicized in the community through proposals, and users can vote on REI to achieve the goal of "everyone can govern the REI Network", which is to increase the governance value of REI. It is also the basis for the function of "community governance" in a deeper sense.',
                steps4: '4. REI coin distribution after the split',
                total: 'Total supply after split: 1,000,000,000',
                port1: '750 million: circulated (including Staking 1-150 million, users have lost about 10% of the estimated part, the actual amount of circulated about 500 million, 41.7%) ',
                port2: '250 million: developer ecosystem',
                spread1: '150 million incentive developers',
                spread2: '5 million for marketing promoting',
                spread3: '5 million selected nodes mining rewards',
                image: require('../assets/images/imageEN.png'),
                steps5: 'TrustNodes migration solution of GXChain 1.0 to GXChain 2.0 (REI)',
                detailed: 'The TrustNode of GXChain 1.0 was originated from the initial election starting in 2018, is  a sign that the GXChain community has strong vitality and self-organization capabilities. In several iterations period since then, the TrustNode have proven to complete the stage of protecting the underlying security and stability of the public chain, so we will still continue the supernode election model on the REI Network in the future, with the specific implementation plan as follows：',
                plan1: '1) Coin swap between REI and GXC the core assets',
                consult: 'Please refer to《6. Token swap plan of REI-GXC》below.',
                plan2: '2) Protective period of the node hosting ',
                deposit: 'During the coin swap process, in the event of network instability, the 21 supernodes will be temporarily hosted by official nodes within a specified period of time. The escrow is required for two conditions to be met: ',
                term_a: 'a. The proposal has been voted on by the community and the native coin swap between GXChain and REI Network has already taken place.',
                term_b: 'b. Most of the main chain assets have cross-chained to the REI Network and this has the potential to affect the stability and security of the original public chain.',
                plan3: '3) REI Network Super Node election campaign',
                campaign: 'At the start of the migration, the REI Network Super Node election campaign will be launched to welcome more powerful, influential, and inspiring crypto organizations and community members to become REI Network Super Nodes.',
                steps6: '6.Token swap plan of REI-GXC',
                rei_gxc: 'After the adoption of this proposal, the coin swap mechanism between REI and GXC will be processed every 24 hours in the smart contract, and the exchange between REI-GXC  will be processed during that time period, this function will remain as a fundamental swap function for a longer period.'
            },
            content3: {
                title: 'Section 3 of the proposal: The Roadmap of REI Network',
                construct: {
                    head: 'The team holds "0" coins and gives back to the eco-building',
                    stage1: 'The key to public chain development is the prosperity of its ecosystem, and developers are the foundation of it, and the development of the public chain ecosystem needs the cluster and support of developers. Therefore, we need to attract more developers to join the ecosystem to strengthen the public chain itself. Different from the other chains that were claimed to be ETH killers, REI Network will take on the commercial value of ETH overflowed through its high performance, free, and lightweight features, and will subsequently access EVM to form an ecosystem chain exclusively for REI Network from various aspects.',
                    stage2: 'Since 2017, GXC has been unlocking 5 million per year for the GXChain team`s operations and marketing, with 25 million GXC remaining unlocked as of this year. The team will use the unlocked 250 million REI (after the GXC split) to incentivize REI Network contributors and developers, including but not limited to rewards for outstanding developers, investment in quality projects, user rewards for significant contributions to the ecosystem, etc. The amount of coins held by the team has also been changed from 25% to 0%.',
                    stage3: 'The ecological fund will be released gradually as the ecosystemdevelops, and will not be directly circulated in the market for a considerable period of time, which will not cause an increase in market circulation in the short term and thus put more pressure on the token price but will instead be converted into an incentive for ecological construction. This incentive will attract a large number of developers and the REI Network ecosystem will flourish, creating an efficient and virtuous cycle between the ecosystem and the main chain of REI Network.。',
                    stage4: 'This is just the beginning of the REI Network, and it`s far from over for the public chain ecosystem. We will turn more attention to the developers, and only a large community of developers can create a greater public chain ecosystem.'
                },
                worth: {
                    head: 'Giving back to the community and the value of returning',
                    stage1: 'With the explosion of new on-chain applications such as DeFi, GameFi, NFTs, etc., a large number of users who would only trade in CeFi have successfully started to convert to on-chain trading. We can foresee that in the near future, more crypto users will start to convert to the on-chain users, who will trade, collect, entertain and even live on-chain, which is an irreversible trend brought about by the development of blockchain.',
                    stage2: 'his is our ultimate goal in splitting GXC, after which we will continue to strengthen the on-chain ecosystem and find our own method in the surging blockchain industry. REI Network is a new type of public chain that meets the actual needs of the current blockchain and public chain`s development through the optimization of the underlying code and the 4-year exploration of the public chain model and user building of its predecessor GXChain. In the past 4 years, our original goal has never changed. The scars we have had are the medals of fearlessness that we keep moving forward.',
                    stage3: 'At the same time, REI Network will be an international public chain with users in mind! We will focus on improving the performance of the public chain, and will also dedicate more to user experience optimization. The 5 million GXC allocated for marketing will be partly spent by the team, which includes not only marketing but also, more importantly, giving back to the community, and rewarding users and the contributors from our community.',
                    stage4: 'The on-chain governance support has been prepared, its importance will become more prominent. In which anyone will be allowed to initiate proposals to the community through the governance function. I believe that in the foreseeable future, more people will stand together with REI Network to share the right of governance!'
                },
                extra: {
                    head: 'The Symbiotic value for the EVM ecosystem',
                    stage1: 'REI Network will be compatible with Ethereum, and more friendly to support enterprises and developers, lightweight and quasi-free new application-level public chain. The main feature is to strengthen the tech features of lightweight and free, while being infinitely extensible, so as to develop lightweight and self-contained innovative public chains, dedicated to solving the collective dilemma faced by the current public chains, and providing a self-contained solution for the transformation of public chains and a new paradigm of cross-chain.',
                    stage2: 'When building a new blockchain, the initial users are actually the developers, who need to use their creativity to attract users (including the top applications, innovative use cases, and experiences, etc.). But the choice between the various platforms is a key question for developers to consider from the outset. The EVM ecosystem could be seen as a mobile operating system created by ETH and is the most technically mature and stable mobile system available, which is certainly the most attractive to existing developers who can develop on any EVM-compatible blockchain platform without any learning costs.',
                    stage3: 'The upgrade to EVM compatibility means that REI Network can seamlessly migrate almost all DeFi DApps with higher performance and lower cost of use, thus creating the conditions for lower cost Defi innovation and cross-chain migration. By enabling the rapid expansion of its application landscape in a short period of time, users within the ecosystem will have a wider choice of applications and development tools, and as development becomes less difficult, the incentive component of the ecosystem will become more attractive to the average developer, creating the perfect loop for a virtuous cycle.',
                    stage4: 'Secondly, EVM compatibility means that as the number of users on the chain grows and the DeFi universe continues to expand, the emerging public chain ecosystem has the opportunity to take over the overflow from ETH due to performance limitations. Thanks to the ease of EVM, new public chains will also have the opportunity to gain access to the top existing DeFi projects and the users who use them.'
                },
                reality: 'And all of this, at REI Network, is the reality of what is about to happen.',
                stage_end: 'In the ever-changing crypto world, we are glad to see the magnificent transformation of GXChain, which is not just a simple change, but a self-revolution for adapting to the crypto world, as we find great potential in the new framework, and we still do not give up being a pioneer in our own field, but also propose our own thinking and optimal solutions to the current challenges faced by the blockchain world. It is also a self-iteration and transmission of the geek spirit we have always upheld.',
                ending: 'In the crypto world of the future, make friends with REI Network and make friends with time.'
            }
        }
    },
    vote_rules: {
        title: 'REI (GXC) Community Governance Proposal (Voting Rules)',
        statistics: 'Statistics Rules',
        details: 'In order to make all the users who own GXCs in the wallet, GXC community governance will count users` GXCs for voting in two ways,',
        balance: '1. The GXC of balance in the wallet',
        locked_position: '2. The GXC in staking ',
        rules: 'Rules for Voting',
        first_rules: '1. The GXCs used for voting needn`t to be locked during the voting period, which could be transferred, but once the GXCs were not be owned by the original address, the vote cast will be invalidated.',
        second_rules: '2. The voting period is 120 hours and ends according to the corresponding block height. Before the snapshot, the user can change the number of GXC in the address, i.e. the number of votes to be voted on, and also the voting options.',
        third_rules: '3. When initiating a vote, GXCs from a single address can only be voted for one option for the proposal.',
        conditions: 'Conditions For the Adoption of Proposal',
        first_conditions: '1. The total number of votes for each proposal must reach 10% of the circulating supply GXC (7.5 million GXCs) to be considered a valid proposal, and if the turnout was less than 10%, the proposal will be invalidated.',
        second_conditions: '2. The option for approving must receive more than 50% of the total votes, otherwise, the proposal will be failed.'
    }
};

export default locale;
