const locale = {
    index: {
        balance_loading: '**',
        backup_wallet: '备份私钥',
        asset_name: 'GXS',
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
        account_is_address: '账户名即转账地址'
    },
    market: {
        title: '行情'
    },
    tabs: {
        wallet: '钱包',
        market: '行情'
    },
    left_panel: {
        import_wallet: '导入钱包',
        create_wallet: '创建钱包',
        manage_wallets: '管理钱包',
        history: '收发记录',
        language: 'Language',
        about: '关于我们'
    },
    wallet_create: {
        index: {
            title: '钱包',
            tip_empty: '暂未绑定GXS钱包',
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
                premium_name: '你使用的是高级账户名,请选择其他名字，包含至少一个横杠、数字或者不含元音字母'
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
            tip: '当APP被删后在其他手机上使用钱包时，需导入当前钱包备份私钥，否则可能永久丢失钱包资产，请务必备份好钱包，并妥善保管备份信息。',
            label: {
                account: '钱包账号',
                asset: '钱包资产(GXS)',
                private_key: '私钥'
            },
            button_backup: '备份私钥',
            button_remove: '删除钱包'
        },
        detail: {
            title: '备份私钥',
            tip: '为了方便备份，我们将钱包账户加密为以下英文字母组成的密钥，备份该密钥即可恢复钱包。',
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
            line1: 'GXS Wallet是一款移动端轻钱包APP，',
            line2: '通过它能实现GXS的转账、收款和钱包管理，',
            line3: '并及时掌握GXS的最新动态。'
        },
        disclaimer: '免责声明'
    },
    disclaimer: {
        title: '免责声明',
        content: '<h4 class="text-center">使用须知和免责声明</h4>' +
        '<p>GXS钱包是去中心化区块链应用，在您使用之前，请充分了解区块链科技知识，具备合理使用和管理去中心化钱包的基本能力。</p>' +
        '<p>一、GXS钱包账户和密码一旦丢失不可找回，请妥善保管好您的账户和密码，并务必备份好钱包的私钥。私钥是找回钱包的唯一凭证！因未备份私钥、未妥善保管或因操作不当而造成钱包丢失或被盗的情况，公信宝概不负责。</p>' +
        '<p>二、如果您从未经授权的第三方获取GXS钱包APP或与本软件名称相同的应用程序，公信宝将无法保证软件的安全性，因此造成的损失由您自行承担。</p>' +
        '<p>三、使用GXS钱包发送GXS等功能时，您应理解区块链操作“不可撤销”属性，并自行承担因操作失误而导致结果不可逆的损失。\n</p>' +
        '<p>四、在GXS钱包上交易时，您应当遵循有关国家政策、法律法规的要求。</p>',
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
        receive_amount: '填写接收GXS数量',
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
                premium_name: '你使用的是高级账户名,请选择其他名字，包含至少一个横杠、数字或者不含元音字母',
                memo_signer_not_exist: '备注私钥不存在，无法添加备注'
            }
        },
        confirm: {
            title: '确认转账',
            title_password: '密码',
            enter_password: '请输入密码'
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
            ok: '好的'
        }
    },
    loyalty_program: {
        title: '忠诚计划',
        tip1: '与公信宝一起成长',
        tip2: '价值投资者的福利，长线持有还送奖励',
        tip3: '忠诚计划是公信宝推出的一项福利计划，投资者可锁定一定额度的GXS，锁定期间金额冻结，同时享受对应的奖励。如锁定1万GXS9个月，按年化6%，到期后可获得450个GXS的奖励。公信宝希望投资者通过忠诚计划，享受未来公信宝发展所带来的长期效益！',
        banner: 'loyalty-program-banner-zh.jpg',
        term: '锁定期限',
        bonus: '年化奖励',
        expected_bonus: '到期奖励',
        month: '{month}月 | {month}月',
        day: '{day}日 | {day}日',
        due: '到期时间',
        amount: '锁定金额',
        available: '可用: <span class="color-danger">{amount}</span> GXS',
        reward: '奖励: <span class="color-danger">{amount}</span> GXS',
        join: '设置计划',
        history: '锁定记录',
        no_record: '无记录',
        locked_at: '锁定时间',
        locked_amount: '锁定金额(GXS)',
        button_join: '加入忠诚计划 赚 <span class="big">{bonus}</span>%',
        placeholder: {
            amount: '填写锁定金额'
        },
        modal: {
            message: '加入忠诚计划的金额将被锁定，期间不可卖出，此操作不可撤销，确定加入吗？',
            cancel: '取消',
            confirm: '确认',
            placeholder: '请输入密码'
        },
        error: {
            insufficient_balance: '余额不足',
            invalid_amount: '金额错误',
            too_less: '最少锁仓金额为1GXS'
        },
        status: {
            title: '状态',
            locked: '已锁定',
            can_unlock: '手动解锁'
        },
        success: {
            title: '参与成功',
            message: '成功锁定 {amount} GXS'
        },
        detail: {
            title: '锁定详情',
            success: {
                title: '提示',
                message: '恭喜，成功解锁 {amount} GXS'
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
    }
};

export default locale;
