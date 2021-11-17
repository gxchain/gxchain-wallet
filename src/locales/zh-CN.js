const locale = {
    index: {
        balance_loading: '**',
        backup_wallet: '备份私钥',
        asset_name: 'GXC',
        asset_full_name: '',
        value: '价值(CNY)',
        unit: '￥',
        transfer: '发送',
        receive: '接收',
        wallet: '钱包账户',
        account_name: '账户名',
        copy: '复制账户名',
        copied: '已复制',
        join_loyalty_program: '参与忠诚者计划',
        loyalty_program_icon: 'loyalty-program-btn-zh.png',
        account_is_address: '账户名即转账地址',
        staking: '质押',
        assets: '资产',
        collection: 'NFT'
    },
    nft: {
        send: '发送',
        please_input_account: '请输入账号',
        view_info: '查看信息',
        nft_list: 'NFT列表',
        confirm_send: '确认发送',
        details: '简介：',
        total: '总量：',
        successful: '发送成功'
    },
    market: {
        title: '行情'
    },
    tabs: {
        wallet: '钱包',
        market: '行情',
        staking: '投票',
        balance: '资产',
        my: '我的'
    },
    left_panel: {
        import_wallet: '导入钱包',
        create_wallet: '创建钱包',
        node_vote: '节点投票',
        manage_wallets: '管理钱包',
        history: '收发记录',
        language: 'Language',
        about: '关于我们',
        disclaimer: '免责声明',
        Income_received: '领取收益'
    },
    wallet_create: {
        index: {
            title: '钱包',
            tip_empty: '暂未绑定GXC钱包',
            button_create: '创建钱包',
            button_import: '导入钱包',
            tip_how: '如何导入钱包?'
        },
        step1: {
            title: '钱包创建',
            label: {
                account: '账户名'
            },
            placeholder: {
                account: '输入字母加数字的组合'
            },
            query_account_name: '正在检查账户名',
            error: {
                query_account_failed: '查询账户失败，请重试',
                account_already_exist: '账户已存在',
                empty_account: '账户名不可为空',
                account_should_be_longer: '账户名至少3位',
                account_should_be_shorter: '账户名过长',
                account_should_start_with_a_letter: '账户名需以字母开头',
                account_format_error: '账户名只能是字母、数字和-的组合',
                account_one_dash_error: '-只能使用一次',
                account_end_error: '账户名需要以字母或数字结尾',
                account_segment_should_be_longer: '账户名过短，.分割的部分应超过3位',
                premium_name:
          '你使用的是高级账户名,请选择其他名字，包含至少一个横杠、数字或者不含元音字母'
            },
            next: '下一步'
        },
        step2: {
            title: '钱包创建',
            label: {
                password: '输入密码',
                confirm: '确认密码'
            },
            placeholder: {
                password: '6位以上字符'
            },
            creating: '正在创建账户',
            done: '完成',
            notice: '提示',
            error: {
                password_not_equal: '两次输入密码不一致',
                account_has_been_registered: '账号已经被注册，请重新填写账号',
                account_create_failed: '创建账户失败，请重试'
            }
        },
        success: {
            title: '创建成功',
            tip1: '钱包创建成功',
            tip2: '强烈建议您在使用前备份钱包私钥，一旦丢失不可找回',
            backup_wallet: '备份私钥',
            detail: '查看钱包详情'
        }
    },
    wallet_import: {
        title: '账户导入',
        label: {
            password: '输入密码',
            confirm: '确认密码'
        },
        placeholder: {
            key: '在此填入活跃权限私钥',
            password: '6位以上字符'
        },
        confirm: '确认导入',
        error: {
            password_not_equal: '两次输入密码不一致',
            account_already_exist: '账户已存在，请勿重复导入',
            account_not_found: '账户不存在',
            invalid_key: '私钥格式错误',
            no_reference_account: '导入失败，私钥对应账户不存在'
        },
        success: {
            title: '导入成功',
            tip1: '钱包导入成功',
            tip2: '强烈建议您在使用前备份钱包私钥，一旦丢失不可找回',
            backup_wallet: '备份私钥',
            detail: '查看钱包详情'
        }
    },
    wallet_manage: {
        title: '钱包管理',
        tip_backup: '请备份',
        button_import: '导入钱包',
        button_create: '创建钱包'
    },
    wallet_backup: {
        index: {
            title: '备份私钥',
            tip:
        '当APP被删后在其他手机上使用钱包时，需导入当前钱包备份私钥，否则可能永久丢失钱包资产，请务必备份好钱包，并妥善保管备份信息。',
            label: {
                account: '钱包账号',
                asset: '钱包资产(GXC)',
                private_key: '私钥'
            },
            button_backup: '备份私钥',
            button_remove: '删除钱包'
        },
        detail: {
            title: '备份私钥',
            tip:
        '为了方便备份，我们将钱包账户加密为以下英文字母组成的密钥，备份该密钥即可恢复钱包。',
            tip1: '按顺序将密钥复制或抄录在纸上，并妥善保存',
            tip2: '任何人获得你的密钥信息即可操作你的钱包资金',
            unlock: '解锁',
            copy: '复制私钥',
            copied: '已复制',
            cancel: '取消',
            ok: '确定',
            confirm: '确定已备份好密钥？',
            tip_password: '解锁你的钱包',
            go_back: '回到首页',
            placeholder: {
                password: '请输入密码'
            },
            error: {
                invalid_password: '密码错误'
            }
        }
    },
    wallet_del: {
        title: '删除钱包',
        cancel: '取消',
        ok: '确定',
        tip_del: '确认解锁并删除此钱包，此操作不可撤销，确定删除吗？',
        placeholder: {
            password: '请输入密码'
        },
        error: {
            invalid_password: '密码错误',
            invalid_delete: '无法删除含有余额的账户'
        }
    },
    language_setting: {
        title: 'Language'
    },
    about: {
        title: '关于我们',
        version: 'V1.0.1',
        desc: {
            line1: 'GXC Wallet是一款移动端轻钱包APP，',
            line2: '通过它能实现GXC的转账、收款和钱包管理，',
            line3: '并及时掌握GXC的最新动态。'
        },
        disclaimer: '免责声明'
    },
    disclaimer: {
        title: '免责声明',
        content:
      '<h4 class="text-center">使用须知和免责声明</h4>' +
      '<p>GXC钱包是去中心化区块链应用，在您使用之前，请充分了解区块链科技知识，具备合理使用和管理去中心化钱包的基本能力。</p>' +
      '<p>一、GXC钱包账户和密码一旦丢失不可找回，请妥善保管好您的账户和密码，并务必备份好钱包的私钥。私钥是找回钱包的唯一凭证！因未备份私钥、未妥善保管或因操作不当而造成钱包丢失或被盗的情况，公信宝概不负责。</p>' +
      '<p>二、如果您从未经授权的第三方获取GXC钱包APP或与本软件名称相同的应用程序，公信宝将无法保证软件的安全性，因此造成的损失由您自行承担。</p>' +
      '<p>三、使用GXC钱包发送GXC等功能时，您应理解区块链操作“不可撤销”属性，并自行承担因操作失误而导致结果不可逆的损失。\n</p>' +
      '<p>四、在GXC钱包上交易时，您应当遵循有关国家政策、法律法规的要求。</p>',
        accept: '我已阅读并同意'
    },
    unlock: {
        account_not_found: '钱包内没有此账户',
        cancel: '取消',
        ok: '确定',
        tip_password: '解锁你的钱包',
        placeholder: {
            password: '请输入密码'
        },
        error: {
            invalid_password: '密码错误'
        }
    },
    transfer: {
        title: '发 送',
        from: '发送账户',
        to: '对方账户',
        to_placeholder: '填写对方账号',
        amount: '发送数量',
        amount_placeholder: '填写{symbol}数量',
        receive_amount: '填写接收GXC数量',
        available: '可用: <span class="color-danger">{amount}</span> {symbol}',
        memo: '备注(MEMO)',
        fee: '手续费',
        memo_placeholder: '选填',
        next: '下 一 步',
        send: '发送',
        sending: '发送中',
        error: {
            amount: {
                invalid: '数量不正确',
                insufficient_balance: '余额不足，请确认余额大于转账金额+手续费',
                insufficient_diff_balance: '余额不足，请确认余额大于转账金额',
                insufficient_diff_fee: '手续费余额不足',
                minimum: '最小数量不能少于1'
            },
            account: {
                cannot_send_to_yourself: '不能向自己转账',
                from_account_not_exist: '转出账户不存在',
                to_account_not_exist: '对方账户不存在',
                empty_account: '账户名不可为空',
                account_should_be_longer: '账户名至少3位',
                account_should_be_shorter: '账户名过长',
                account_should_start_with_a_letter: '账户名需以字母开头',
                account_format_error: '账户名只能是字母、数字和-的组合',
                account_one_dash_error: '-只能使用一次',
                account_end_error: '账户名需要以字母或数字结尾',
                account_segment_should_be_longer: '账户名过短，.分割的部分应超过3位',
                premium_name:
          '你使用的是高级账户名,请选择其他名字，包含至少一个横杠、数字或者不含元音字母',
                memo_signer_not_exist: '备注私钥不存在，无法添加备注'
            },
            claim: {
                not_arrived: '取回投票时间未到'
            }
        },
        confirm: {
            title: '确认转账',
            title_password: '密码',
            enter_password: '请输入密码',
            remember_password: '记住密码'
        },
        success: {
            title: '转账成功',
            tip1: '转账成功',
            tip2: '已收到你的转账',
            done: '完成'
        },
        memo_tip: '检测到你输入的是平台账号，请务必填写Memo'
    },
    trade_history: {
        title: '收发记录',
        switch: '切换',
        currentAccount: '当前账户: {account}',
        empty: '无更多记录',
        received: '接收',
        sent: '发送'
    },
    trade: {
        title: '记录详情',
        sent: '转到以下账户',
        receive: '来自以下账户',
        label: {
            from: '发送账号',
            to: '接收账号',
            timestamp: '操作时间',
            fee: '手续费({symbol})',
            memo: '备注(MEMO)'
        },
        modal: {
            ok: '好的',
            copy: '复制',
            copy_success: '复制成功'
        }
    },
    loyalty_program: {
        title: '忠诚计划',
        tip1: '与公信宝一起成长',
        tip2: '价值投资者的福利，长线持有还送奖励',
        tip3:
      '忠诚计划是公信宝推出的一项福利计划，投资者可锁定一定额度的GXC，锁定期间金额冻结，同时享受对应的奖励。如锁定1万GXC9个月，按年化6%，到期后可获得450个GXC的奖励。公信宝希望投资者通过忠诚计划，享受未来公信宝发展所带来的长期效益！',
        banner: 'loyalty-program-banner-zh.jpg',
        term: '锁定期限',
        bonus: '年化奖励',
        expected_bonus: '到期奖励',
        month: '{month}月 | {month}月',
        day: '{day}日 | {day}日',
        due: '到期时间',
        amount: '锁定金额',
        available: '可用: <span class="color-danger">{amount}</span> GXC',
        reward: '奖励: <span class="color-danger">{amount}</span> GXC',
        join: '设置计划',
        history: '锁定记录',
        no_record: '无记录',
        locked_at: '锁定时间',
        locked_amount: '锁定金额(GXC)',
        button_join: '加入忠诚计划 赚 <span class="big">{bonus}</span>%',
        placeholder: {
            amount: '填写锁定金额'
        },
        modal: {
            message:
        '加入忠诚计划的金额将被锁定，期间不可卖出，此操作不可撤销，确定加入吗？',
            cancel: '取消',
            confirm: '确认',
            placeholder: '请输入密码'
        },
        error: {
            insufficient_balance: '余额不足',
            invalid_amount: '金额错误',
            too_less: '最少锁仓金额为1GXC'
        },
        status: {
            title: '状态',
            locked: '已锁定',
            can_unlock: '手动解锁'
        },
        success: {
            title: '参与成功',
            message: '成功锁定 {amount} GXC'
        },
        detail: {
            title: '锁定详情',
            success: {
                title: '提示',
                message: '恭喜，成功解锁 {amount} GXC'
            }
        }
    },
    node_vote: {
        tab: {
            tab1: '公信节点',
            tab2: '代理投票'
        },
        index: {
            title: '节点投票',
            records: '投票记录',
            intro:
        '公信节点(TrustNode)是GXChain中区块的生产者。他们验证交易数据并维护网络安全。你可以投票选举你信任的人成为公信节点。投票时，你选择的候选人将获得你投出的相同票数。',
            proxy_tip: '*投票权由投票代理账户接管',
            tips: '*票数每小时更新一次',
            name: '公信节点候选人',
            no_record: '暂无记录',
            vote_num: '票数',
            vote_num_weight: '新票数',
            btn_vote: '提交投票',
            btn_update: '更新投票',
            view_new_vote: '查看老票数'
        },
        proxy: {
            intro: '设置了代理投票账户之后，代理投票账户将代表你行使投票权力。',
            input_label: '代理投票账户',
            input_placeholder: '请输入账户名',
            btn_submit: '保存修改',
            btn_remove: '移除投票代理'
        },
        confirm: {
            title: '请确认投票',
            title2: '更新代理投票账户',
            account: '账户',
            proxy_account: '代理投票账户',
            selected_node: '所选节点',
            fee: '手续费',
            btn_confirm: '确认',
            success: '投票成功',
            success2: '更新成功'
        },
        error: {
            cannot_proxy_to_yourself: '不能代理自己账号'
        }
    },
    node: {
        vote: {
            count: {
                max: '最多支持十个节点',
                min: '请至少支持两个节点'
            },
            gxc: {
                lack: '投票账户GXC余额不足,至少需要0.1GXC'
            }
        }
    },
    realtime_quotations: {
        title: '实时行情',
        high: '24h最高价',
        low: '24h最低价',
        volume: '24h成交量',
        line: '分时',
        candle: '日k',
        strategy: '交易所入金攻略',
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
        title: '添加新资产',
        tip: '该资产余额大于0，不能关闭'
    },
    smart_contract: {
        title: '智能合约',
        params: {
            method_type: '函数类型',
            request_data: '请求数据'
        },
        tabs: {
            detail: '详情',
            data: '数据'
        },
        btn: {
            confirm: '确认',
            cancel: '取消'
        }
    },
    pick_wallet: {
        title: {
            step1: '选择公信链钱包账户',
            step2: '输入钱包密码解锁',
            no_wallet: '没有钱包'
        },
        empty_tip: '暂无绑定钱包，请前往公信链钱包创建',
        btn: {
            confirm: '确认',
            next: '下一步'
        },
        remember_pwd: '在app生命周期内记住密码'
    },
    oauth: {
        authorize: {
            title: '服务授权',
            error: {
                default: '请在布洛克城客户端打开',
                response_type: 'response_type参数不合法',
                client_id: 'client_id参数不合法',
                redirect_uri: 'redirect_uri参数不合法',
                login_status: '获取用户登录状态异常'
            },
            chain: {
                data: '链上数据',
                wechat: '微信信息',
                confirm_tip1: '系统检测到你的',
                confirm_tip2: '还未上传区块链，应用方无法获取你的信息',
                confirm: '去完成数据上链',
                datakey: {
                    lost:
            '系统检测到你还未生成Data-Key或Data-Key已经丢失，应用方无法获取到你的信息',
                    confirm: '生成或者找回Data-Key'
                }
            },
            current_app: '当前应用',
            confirm_tip1: '你同意',
            confirm_tip2: '获取以下权限',
            confirm_tip3: '确认授权并同意',
            confirm_tip4: '《用户授权协议》',
            wallet_account: '获取GXChain钱包帐户的名称',
            wallet_pubkey: '获取GXChain钱包帐户的公钥',
            btn: {
                confirm: '确认授权',
                cancel: '暂不'
            }
        },
        maintenance: {
            title: '应用维护中',
            tips:
        '该应用目前正在维护中。维护期间，您在应用内的资产不受影响。布洛克城官方已责成应用方加紧处理，尽快恢复运营，请耐心等待。'
        }
    },
    transactionConfirm: {
        transfer: '转账',
        vote: '投票',
        signature: '签名'
    },
    staking: {
        staking_create: '创建投票',
        staking_claim: '取回投票',
        staking_update: '更改投票',
        staking_max_count: '投票次数已经达到上限，请更换账号投票',
        staking_program: '投票周期',
        please_select_program: '请选择投票周期',
        please_input_staking_amount: '请输入投票数量',
        staking_amount: '投票数量',
        staking_amount_weight: '票数',
        available_count: '可用量',
        fee: '手续费',
        confirm: '确认',
        cancel: '取消',
        please_input_amount: '请输入投票数量',
        select_node: '选择节点',
        please_select_node: '请选择节点',
        nodeList: '节点',
        staking_success: '提交投票成功',
        staking_update_success: '更改投票成功',
        staking_claim_success: '取回投票成功',
        staking_for_node: '投票给节点',
        Income_received: '领取收益',
        collect_immediately: '立即领取',
        collect_immediately_all: '尝试领取所有',
        get_earned: '返现',
        earned_coin_day: '已完成的币天',
        required_coin_day: '要求的的币天',
        remain_day: '剩余解冻天数',
        get_amount: '可领取数量',
        coin_day: '币天',
        day: '天',
        income_received_success: '领取收益成功',
        please_input_min_amount: '至少需要投票 {amount} 个GXC',
        title: '投票',
        node_rate: '分红比例',
        error: {
            insufficient_balance: '手续费不足'
        },
        income: {
            amount: '金额',
            confirmTitle: '请确认交易',
            tips: '提取解冻账户余额'
        }
    },
    my: {
        title: '我的'
    },
    proposal: {
        vote: '投票',
        vote_number: '投票数',
        active: '活跃',
        information: '信息',
        result: '当前结果',
        report: '下载报告',
        support: '确定同意吗？',
        yes: '确认',
        no_support: ' 确定不同意吗？',
        vote_success: '投票成功',
        vote_fail: '投票失败',
        expend_more: '点击展开更多',
        change_support: '确定更改为同意吗',
        change_noSupport: '确定更改为不同意吗？',
        totalVote: '投票总数',
        totalUserVote: '投票人数',
        agree: '同意',
        disagree: '不同意',
        cast_agree: '您已投过同意了～',
        cast_disagree: '您已投过不同意了～',
        start_date: '开始日期',
        end_date: '结束日期',
        dint: '结果以最终统计数据为准'
    },
    proposal_content: {
        name: '从GXChain2.0 到REI Network的治理提案11.15',
        background: {
            title: '议案背景',
            stage1: '2017 年 GXChain（公信链）主网上线，旨在打造可信数据的价值网络，在短短4年时间内 GXChain（公信链）不仅获得了国内外资本以及市场的认可，也获得了包括中国银联在内的数十家企业的大力支持，达成了合作关系。',
            stage2: '四年以来，区块链行业发生了翻天覆地的变化，GXChain（公信链）也从未停下前进的脚步，而 2020 年 DeFi 的革命性变化给区块链行业带来历史前所未有之大变革，去中心化金融的锁仓金额、用户量级，链上账户都呈指数级上升。而原来为可信数据打造的公信链应对这样的时局变得需要有画龙点睛般的转型和补足，所以我们于 2020 年 8 月就决定拥抱变革，拥抱 DeFi，怀着合作心态再出发。而在一年后的今天，我们终于迎来变革路上历史性的一刻，我们将再次踏上新的征程，去往我们的星辰大海。'
        },
        substance: {
            content1: {
                title: '其一: “GXChain2.0”更名为“REI Network”',
                change_name: '更名为“REI Network”',
                stage1: '众所周知，GXChain2.0 的架构设计和 Roadmap 推进从 2020 年 8 月伊始，已经开始进入实际的开发进程。从概念提出，路线图的确立，再到实际进入开发阶段，历时已经一年有余，目前 GXChain2.0 开发进展顺利，GXChain2.0 的测试网已经于 2021 年 7 月 14 日正式上线，平稳运行并且经过了各项测试，与此同时，GXChain2.0 主网上线之前的最为核心两个板块功能的开发也十分顺利，8 月引入 slashing 模块，10 月在技术层面完成免费的经济模型设计，也就是说 GXChain2.0 离我们越来越近了，按照现在的开发进度，GXChain2.0 的主网将会在预计中的 12 月份正式上线',
                stage2: '届时，GXChain2.0 将会在技术层面，在代码层面彻底完成升级和重构，成为一条全新的区块链，成为一条兼容 EVM 的以太坊平行链，这是继 GXChain 于 2017 年 6 月 15 日首次上线主网之后，时隔四年最大的更新和迭代。因此，GXChain 2.0 不仅是一次全新的技术升级和迭代，还是公链定位和所属板块的全新跃迁移，我们欣然看到 GXChain2.0 将会被赋予全新的历史使命，所以我们认为 GXChain 的名字需要有更深刻的新命名来，以适应团队和未来规划中快速发展的需要，所以，团队决定将在主网上线之前奖 GXChain2.0 赋予之一个全新的名字——REI Network。',
                rei_mean: 'REI 的含义以及由来',
                stage3: 'REI 取自 Rapid(快速的)、economical(经济的)、innovative(革新的)前三个单词的首写字母，三个字母分别对应 REI Network 的三个重要特性。REI 还可以翻译为 0，也即为最初的意思，代表 REI 代替 GXC 的使命再重新开始的，同时 0 也代表着免费和经济，和 GXChain2.0 的根本特性非常契合。',
                stage4: 'REI 是经过团队层层筛选后确定的名字，它带有浓厚的使命感，它是 GXC 的历史初心带着对未来新的愿景的化身。改名也并不是目的，而是希望以一个全新的面貌去面对未知的挑战，它代表着我们改革的决心和未来，REI 会带着我们的期望再次向前。'
            },
            content2: {
                title: '其二 : 经济模型更改',
                stage1: '现有的 GXC 是基于 GXChain 发行的 Coin，在今年内，公信链将正式启动 GXChain2.0 主网，同时 GXC 也将通过跨链的方式映射到 GXChain2.0 的主网中。',
                stage2: 'GXChain2.0 主网是一个全新的系统，将兼容以太坊 EVM，并对支持企业和开发者更为友好，轻量而准免费的应用级新型公链。通过底层代码的优化，同时兼以其前身 GXChain 4 年的公链模式和用户建设的探索，而建立的符合当前区块链以及公链板块发展实际需求的新型公链。',
                stage3: '新型的 GXChain2.0 公链未来生态发展的规模很可能会超出了之前的预期，对 Coin 的需求以及实际使用会随之大大增加。为此新的公链需要更多的新鲜血液，保证 GXChain2.0 的发展和推广，REI Network 对于当前的行业热点和对于 DeFi，GameFi，NFTs等板块都有着良好的解决方案，一定程度上会成为接下来行业竞争的热点和焦点，因此 GXChain 基金会为了 REI Network 能更好的在未来可以预见的区块链行业生态中抓住更好的机会，将实行如下计划——',
                steps1: '1. 代币等比例拆分',
                split: '主网的原生 Coin 从 GXC 转化成为 REI 的过程中，将会遵循 1:10 的拆分规则，因此 REI 的最大供应量将会达到 10 亿枚。',
                steps2: '2. 团队未解锁部分升级为“生态基金”',
                upgrade: '团队拿出所有未解锁的 2500 万枚作为生态基金，其中 500 万用于节点奖励，500 万用于市场推广，1500 万用于激励开发者和生态系统。',
                steps3: '3. 新增治理功能',
                govern: '上线链上治理模块，该治理功能和此前的有所不同，新的治理功能将会区别于已有的由理事会和节点成员投票的模式，而会成为每一位持币者都可以进行投票的“直接民主”模式，REI Network 链上的改动或者社区的建议均可通过提案的方式在社区进行公示，而用户可用 REI 进行投票，以达到“人人皆可治理公链”的目的，同时增加 REI 的治理价值。也是更深刻意义上的“社区共治”的功能基础。',
                steps4: '4. 拆分后 REI 分配情况一览',
                total: '拆分后 Coin 总量：10 亿',
                port1: '7.5 亿：已流通 （包括 Staking 1-1.5 亿枚，用户已丢失部分预估约 10%，实际可流通量约为 5 亿枚，41.7%）',
                port2: '2.5 亿：开发者生态',
                spread1: '1.5 亿 激励开发者',
                spread2: '0.5 亿 市场推广',
                spread3: '0.5 亿 节点奖励',
                steps5: '5. GXChain1.0到GXChain2.0（REI）的节点迁移方案',
                detailed: '基于GXChain1.0的公信节点，是发轫于2018年开始的初次选举，是来自于GXChain社区的自治，也是GXChain社区有强大生命力和自 组织能力的表现。事实证明在此后的若干个周期和迭代中，公信节点都完成了保护公链底层安全和稳定的阶段性任务，因此未来我们在REI Network上依然会延续超级节点的竞选模式，具体的执行方案大致如下：',
                plan1: '1) 开放REI-GXC主链代币之间的兑换',
                consult: '具体兑换方式请参考下文《6. REI和GXC之间的代币兑换方案》',
                plan2: '2) 保护性的节点托管',
                deposit: '在原生代币转移的过程之中，在网络环境不稳定的情况下官方会进行保护性的托管，即在规定的时间之内将21个超级节点由官方的节 点暂时性的托管。需要托管的情况需要满足以下两个条件：',
                term_a: 'a.该提案已经在社区投票下通过，且GXChain和REI Network之间的新旧链上资产的兑换环节已经开始进行。',
                term_b: 'b.多数的主链资产已经跨链到REI Network，且由此产生潜在影响原公链稳定和安全因素的情况下。',
                plan3: '3) REI Network的超级节点竞选',
                campaign: '在开始迁移之时，REI Network的超级节点竞选同时开展，欢迎更多有实力，有影响力，有号召力的加密主题和社区成员来成为 REI Network 的超级节点竞选。',
                steps6: '6. REI和GXC之间的代币兑换方案',
                rei_gxc: '在本提案通过之后，REI和GXC之间的代币兑换机制，会在智能合约中每24小时会处理一次代币的兑换，在该时间段内集中处理REI-GXC 主链代币之间的兑换，该功能作为基础性的兑换功能，会在较长的一段时间内保留其存在。'
            },
            content3: {
                title: '在新的经济模型下，REI Network 的未来路线',
                construct: {
                    head: '团队持币为“0”，回馈生态建设',
                    stage1: '公链发展的护城河是其生态的繁荣，而开发者是公链生态发展的基础，公链生态的发展需要开发者们的簇拥和支持。因此我们需要吸引更 多的开发者加入生态中，来壮大公链本身。与很多的 ETH 杀手不同，REI Network 将通过高性能、免费、轻量的特点去承接 ETH 溢出 的商业价值，后续 REI Network 会接入 EVM，从多方面出发形成专属于 REI Network 的生态链。',
                    stage2: 'GXC 自 2017 年开始，每年解锁 500 万用于 GXChain 团队的运营和市场推广，截止今年还剩余 2500 万枚 GXC 未解锁，而现在 为表达重建生态体系之决心，本次团队将未解锁的 2.5 亿 REI（GXC 拆分后数量）全部用于激励 REI Network 中的生态贡献者以及 开发者，方式包括且不限于给予优秀开发者的奖励、优质项目的投资、为生态作出重大贡献者的用户奖励等等，团队的持币数量也由 25% 变为 0%。',
                    stage3: '生态基金将随着着生态的发展逐步释放，在相当的时间里并不会直接流通于市场，短期内并不会造成市场流通量的增加，继而对于代币价 格形成较大压力，而相反会等价地转化为对于生态建设的激励。这部分对于开发者的激励，会吸引大量的开发者，REI Network 的生态 也会随之更加繁荣，继而形成生态和 REI 主链之间高效良性的循环。',
                    stage4: '这只是 REI Network 的开始，而对于公链生态的建立还远远不会结束。我们将把更多的注意力转移到开发者身上，只有庞大的开发者 群体，才能造就更伟大的公链生态。'
                },
                worth: {
                    head: '回馈社区，实现价值回归',
                    stage1: '随着 DeFi，GameFi，NFTs 等等链上新玩法的爆炸式出现，让一大批只会在 Cefi 中交易买卖的用户成功开始像链上转化，我们可以 预见在不久的未来，更多的币圈用户会开始向链上用户转化，他们将在链上完成交易、收藏、娱乐、甚至生活，这是区块链发展带来的不可 逆转的趋势。',
                    stage2: '这也是我们拆分 GXC 的最终目的，之后我们将继续强大链上的生态，在奔涌的区块链行业中找到自己的路，REI Network 是通过底层代 码的优化，同时兼以其前身 GXChain 4 年的公链模式和用户建设的探索，而建立的符合当前区块链以及公链板块发展实际需求的新型公链， 是一条具有能够承接行业数亿级用户能力的新型公链。4 年来，我们最初的目标从未改变。我们所积累下来的伤痕是我们一直向前的无畏勋章。',
                    stage3: '同时REI Network将是一条更为用户考虑的国际公链！我们注重公链的性能提升，也将更注重用户的体验与价值。市场推广所分配的500万 将由团队部分支出，其中除开市场推广，更重要的是也包含回馈社区的部分，对生态作出重要贡献的用户和团队，更会给予一定奖励和支持。',
                    stage4: 'REI Network 也将上线链上治理模块，任何人都可通过治理功能向社区发起提案，将用户的意见放在首位听取大众的意见是我们需要更加努力 的地方。我相信在能够看见的未来，会有更多的人和 REI Network 站在一起，去共同分享时代的红利 ！'
                },
                extra: {
                    head: '对于 EVM 的共生红利',
                    stage1: 'REI Network 将兼容以太坊 EVM，并对支持企业和开发者更为友好，轻量而准免费的应用级新型公链。特点主要在于强化轻量、免费的特 点，同时可以无限延展，做到开发轻量级且自备创新能力的公链，致力于解决当前公链所面对的集体困境，为公链转型和跨链的新范式提供了 自我完备的解决方案。',
                    stage2: '新构建一个区块链平台，最初的用户其实就是开发者，开发者需要发挥自己的创造力吸引用户到来 (包括优质的应用、创新的用例和使用体验等等)。但五花八门的平台如何选择，就成为开发者一开始就需要思考的关键问题。我们可以将 EVM 看作 ETH 创造的一个手机操作系统，且是目前技术成熟度最高最稳定的手机系统，这对于现有的开发者来说无疑是最具有吸引力的，他们无需任何学习成本即可在兼容 EVM 的任何区块链平台完成开发。',
                    stage3: '而升级后与 EVM 兼容意味着 REI Network 能在更高性能、更低使用成本的前提下，对几乎所有 Defi 应用进行无缝迁移，从而为更低成本的 Defi 创新和跨链迁移创造条件。得以让其应用场景短时间快速拓展，生态内的用户便会有更多的应用选择和开发工具，而随着开发难度降低，生态激励部分对于普通开发者的吸引力会进一步扩大，从而形成良性循环的完美闭环。',
                    stage4: '其次，兼容 EVM 就意味随着链上用户的增加以及 DeFi 宇宙的继续扩大，新兴的公链生态能够有机会承接 ETH 因为性能限制溢出的需求。由于 EVM 的便捷，新公链也能有机会争取到现有的顶级 DeFi 项目，以及使用这些 DeFi 项目的用户。'
                },
                reality: '而这些，在 REI Network 或者都是即将发生的现实。',
                stage_end: '「逝者如斯夫，不舍昼夜」，在日新月异的加密世界，我们很高兴看到了 GXChain 的华丽转型，这不仅仅是一场简单的改变，而是对于适应加密世界的自我革命，因为我们发现在新的框架内大有可为，我们依然不放弃在自己的领域内作天下倡，同时也为当前的区块链世界面对的难题提出自己的思考、方案和最优解，也是我们一贯的秉持的极客精神的自我迭代和脉络传承。',
                ending: '在未来加密世界，和 REI Network 做朋友，和时间做朋友。'
            }
        }
    }
};

export default locale;
