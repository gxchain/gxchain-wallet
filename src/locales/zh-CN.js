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
        result: '当前结果',
        report: '下载报告',
        support: '确定同意吗？',
        yes: '确认',
        no_support: ' 确定不同意吗？',
        vote_success: '投票成功',
        vote_fail: '投票失败',
        expand: '展开剩余部分',
        change_support: '确定更改为同意吗',
        change_noSupport: '确定更改为不同意吗？',
        totalVote: '投票总数',
        totalUserVote: '投票人数',
        agree: '同意',
        disagree: '不同意',
        cast_agree: '您已投过同意了～',
        cast_disagree: '您已投过不同意了～'
    }
};

export default locale;
