const locale = {
  index: {
    balance_loading: '**',
    backup_wallet: '备份钱包',
    asset_name: 'GXS(公信股)',
    value: '价值(CNY)',
    transfer: '发送',
    receive: '接收',
    wallet: '钱包账户',
    account_name: '账户名',
    copy: '复制',
    copied: '已复制'
  },
  left_panel: {
    import_wallet: '导入钱包',
    create_wallet: '创建钱包',
    manage_wallets: '管理钱包',
    history: '转账记录',
    language: '语言设置',
    about: '关于我们'
  },
  wallet_create: {
    index: {
      title: '钱包',
      tip_empty: '暂未绑定公信股钱包',
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
        empty_account: "账户名不可为空",
        account_should_be_longer: "账户名至少3位",
        account_should_be_shorter: "账户名过长",
        account_should_start_with_a_letter: "账户名需以字母开头",
        account_format_error: "账户名只能是字母、数字和-的组合",
        account_one_dash_error: "-只能使用一次",
        account_end_error: "账户名需要以字母或数字结尾",
        account_segment_should_be_longer: "账户名过短，.分割的部分应超过3位",
        premium_name: "你使用的是高级账户名,请选择其他名字，包含至少一个横杠、数字或者不含元音字母"
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
      tip2: '强烈建议您在使用前备份钱包，一旦丢失不可找回',
      backup_wallet: '备份钱包',
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
      key: '在此填入账户活跃权限私钥',
      password: '6位以上字符'
    },
    confirm: '确认导入',
    error: {
      password_not_equal: '两次输入密码不一致',
      account_already_exist: '账户已存在,请勿重复导入',
      account_not_found: '账户不存在',
      invalid_key: '私钥格式错误',
      no_reference_account: '导入失败, 私钥对应账户不存在，请检查是否为活跃权限私钥'
    },
    success: {
      title: '导入成功',
      tip1: '钱包导入成功',
      tip2: '强烈建议您在使用前备份钱包，一旦丢失不可找回',
      backup_wallet: '备份钱包',
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
      title: '钱包备份',
      tip: '当APP被删后在其他手机上使用钱包时，需导入当前钱包备份信息，否则可能永久丢失钱包资产，请务必备份好钱包，并妥善保管备份信息。',
      label: {
        account: '钱包账号',
        asset: '钱包资产(GXS)',
        private_key: '私钥'
      },
      button_backup: '备份钱包',
      button_remove: '删除钱包'
    },
    detail: {
      title: '钱包备份',
      tip: '为了方便备份，我们将钱包账户加密为以下英文字母组成的密钥，备份该密钥即可恢复钱包。',
      tip1: '按顺序将密钥复制或抄录在纸上，并妥善保存',
      tip2: '任何人获得你的密钥信息即可操作你的钱包资金',
      unlock: '解锁',
      copy: '复制',
      copied: '已复制',
      cancel: '取消',
      ok: '确定',
      tip_password: '解锁你的钱包',
      placeholder: {
        password: '请输入密码'
      },
      error: {
        invalid_password: '密码错误'
      }
    }
  },
  language_setting: {
    title: '语言设置'
  },
  about: {
    title: '关于我们',
    version: 'V0.0.1(Beta)',
    desc: {
      line1: '公信宝钱包是一款移动端轻钱包APP，',
      line2: '通过它能实现公信股的转账、收款和钱包管理，',
      line3: '并及时掌握公信宝的最新动态。'
    },
    disclaimer: '免责声明'
  },
  disclaimer: {
    title: "免责声明",
    content: '<p>使用须知和免责声明</p>' +
    '<p>GXS钱包是去中心化区块链应用，在您使用之前，请充分了解区块链科技知识，具备合理使用和管理中心化钱包的基本能力。</p>' +
    '<p>一、GXS钱包账户和密码一旦丢失不可找回，请妥善保管好您的账户和密码，并备份好钱包。因未备份、未妥善保管或因操作不当而造成钱包丢失或被盗的情况，公信宝概不负责。</p>' +
    '<p>二、如果您从未经授权的第三方获取GXS钱包APP或与本软件名称相同的应用程序，公信宝将无法保证软件的安全性，因此造成的损失由您自行承担。</p>' +
    '<p>三、使用GXS钱包发送GXS等功能时，您应理解区块链操作“不可撤销”属性，并自行承担因操作失误而导致结果不可逆的损失。\n</p>' +
    '<p>四、在GXS钱包上交易时，您应当遵循有关国家政策、法律法规的要求。</p>',
    accept: '我已阅读并同意'
  },
  unlock: {
    account_not_found: '钱包内没有此账户',
    wrong_password: '密码错误'
  },
  transfer: {
    title: '发送',
    from: '发送账户',
    to: '对方账户',
    to_placeholder: '填写对方账号',
    amount: '发送数量',
    amount_placeholder: '填写GXS数量',
    available: '<small class="color-gray">可用GXS:</small> {amount}',
    memo: '备注信息',
    fee: '手续费',
    memo_placeholder: '选填',
    next: '下一步',
    send: '发送',
    sending: '发送中',
    error: {
      amount: {
        invalid: '数量不正确',
        insufficient_balance: '余额不足,请确认余额大于转账金额+手续费'
      },
      account: {
        cannot_send_to_yourself: '不能向自己转账',
        from_account_not_exist: '转出账户不存在',
        to_account_not_exist: '对方账户不存在',
        empty_account: "账户名不可为空",
        account_should_be_longer: "账户名至少3位",
        account_should_be_shorter: "账户名过长",
        account_should_start_with_a_letter: "账户名需以字母开头",
        account_format_error: "账户名只能是字母、数字和-的组合",
        account_one_dash_error: "-只能使用一次",
        account_end_error: "账户名需要以字母或数字结尾",
        account_segment_should_be_longer: "账户名过短，.分割的部分应超过3位",
        premium_name: "你使用的是高级账户名,请选择其他名字，包含至少一个横杠、数字或者不含元音字母"
      }
    },
    confirm: {
      title: '确认转账',
      title_password: '密码',
      enter_password: '输入密码'
    },
    success: {
      title: '转账成功',
      tip1: '转账成功',
      tip2: '已收到你的转账',
      done: '完成'
    }
  },
  trade_history: {
    title: '交易记录'
  }
}

export default locale
